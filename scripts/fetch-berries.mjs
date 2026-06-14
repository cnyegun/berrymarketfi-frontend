/**
 * fetch-berries.mjs — one-time data ingestion for the /demo map.
 *
 * Pulls Finnish wild-berry observations from the FinBIF / laji.fi open data
 * warehouse and writes a compact, browser-ready snapshot to
 * public/data/berries.json. Run it manually (NOT part of `vite build`):
 *
 *     LAJI_TOKEN=xxxx npm run fetch:data
 *     # or put  LAJI_TOKEN=xxxx  in a gitignored .env.local and run:
 *     npm run fetch:data
 *
 * The token is used ONLY here, at build time. It is never written into the
 * output file or shipped to the browser. Data is CC-BY 4.0 — attribute laji.fi.
 *
 * Uses only Node built-ins (global fetch, fs, path) — no dependencies.
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "public/data/berries.json");

// ---- config -------------------------------------------------------------
const BASE = "https://api.laji.fi/v0";
const TIME = "2020/2025"; // recent window
const ACC_MAX = 100; // metres, server-side — drops synthesised herbarium coords
const PER_SPECIES_CAP = 1000; // ~6-8k points total; smooth with clustering
const PAGE_SIZE = 1000;

// Keys must match src/demo/species.ts
const SPECIES = [
  { key: "myrtillus", sci: "Vaccinium myrtillus" },
  { key: "vitis-idaea", sci: "Vaccinium vitis-idaea" },
  { key: "chamaemorus", sci: "Rubus chamaemorus" },
  { key: "idaeus", sci: "Rubus idaeus" },
  { key: "vesca", sci: "Fragaria vesca" },
  { key: "uliginosum", sci: "Vaccinium uliginosum" },
  { key: "nigrum", sci: "Empetrum nigrum" },
  { key: "juniperus", sci: "Juniperus communis" },
];

// Rough Finland bounding box, to drop the occasional stray point.
const BBOX = { latMin: 59, latMax: 71, lonMin: 18, lonMax: 33 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getToken() {
  if (process.env.LAJI_TOKEN) return process.env.LAJI_TOKEN.trim();
  const envFile = resolve(ROOT, ".env.local");
  if (existsSync(envFile)) {
    const m = readFileSync(envFile, "utf8").match(/^\s*LAJI_TOKEN\s*=\s*(.+?)\s*$/m);
    if (m) return m[1].replace(/^["']|["']$/g, "").trim();
  }
  return null;
}

/** Drop the access_token before a URL ever reaches a log line. */
function redact(url) {
  const u = new URL(url);
  u.searchParams.delete("access_token");
  return `${u.pathname}?${u.searchParams.toString()}`;
}

async function getJSON(url, attempt = 1) {
  let res;
  try {
    res = await fetch(url, { headers: { Accept: "application/json" } });
  } catch (e) {
    if (attempt <= 4) {
      await sleep(500 * attempt);
      return getJSON(url, attempt + 1);
    }
    throw new Error(`network error on ${redact(url)} :: ${e.message}`);
  }
  if ((res.status === 429 || res.status >= 500) && attempt <= 4) {
    await sleep(500 * attempt);
    return getJSON(url, attempt + 1);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} on ${redact(url)} :: ${body.slice(0, 160)}`);
  }
  return res.json();
}

const round5 = (n) => Math.round(n * 1e5) / 1e5;

/** laji.fi GeoJSON feature -> compact record (without species key). */
function normalize(feature) {
  const p = feature.properties || {};
  const coords = feature.geometry && feature.geometry.coordinates;
  let lon, lat;
  if (Array.isArray(coords) && coords.length >= 2) {
    [lon, lat] = coords; // featureType=CENTER_POINT -> [lon, lat]
  } else {
    lat = p["gathering.conversions.wgs84CenterPoint.lat"];
    lon = p["gathering.conversions.wgs84CenterPoint.lon"];
  }
  lat = Number(lat);
  lon = Number(lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (lat < BBOX.latMin || lat > BBOX.latMax || lon < BBOX.lonMin || lon > BBOX.lonMax) return null;

  const place =
    p["gathering.interpretations.municipalityDisplayname"] || p["gathering.locality"] || "";
  const acc = p["gathering.interpretations.coordinateAccuracy"];
  return {
    lat: round5(lat),
    lon: round5(lon),
    place: String(place).slice(0, 60),
    acc: acc == null || acc === "" ? null : Math.round(Number(acc)),
  };
}

function buildUrl(sci, page, token) {
  const u = new URL(`${BASE}/warehouse/query/unit/list`);
  const params = {
    format: "geojson",
    featureType: "CENTER_POINT",
    crs: "WGS84",
    target: sci,
    finnish: "true",
    coordinateAccuracyMax: String(ACC_MAX),
    time: TIME,
    qualityIssues: "NO_ISSUES",
    pageSize: String(PAGE_SIZE),
    page: String(page),
    access_token: token,
  };
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  return u.toString();
}

async function fetchSpecies(sci, token) {
  const kept = [];
  let page = 1;
  let total = null;
  while (kept.length < PER_SPECIES_CAP) {
    const data = await getJSON(buildUrl(sci, page, token));
    if (total == null && typeof data.total === "number") total = data.total;
    const feats = data.features || [];
    for (const f of feats) {
      const rec = normalize(f);
      if (rec) kept.push(rec);
      if (kept.length >= PER_SPECIES_CAP) break;
    }
    if (!data.nextPage || feats.length === 0) break;
    page = data.nextPage;
  }
  return { kept, total };
}

async function main() {
  const token = getToken();
  if (!token) {
    console.error(
      "✖ No laji.fi token found. Set LAJI_TOKEN env var, or add LAJI_TOKEN=... to .env.local\n",
    );
    process.exit(1);
  }

  console.log(
    `Fetching ${SPECIES.length} species from laji.fi  (acc<=${ACC_MAX}m, time=${TIME}, NO_ISSUES, cap ${PER_SPECIES_CAP}/sp)\n`,
  );

  const records = [];
  const counts = {};
  for (const s of SPECIES) {
    process.stdout.write(`  ${s.sci.padEnd(22)} … `);
    try {
      const { kept, total } = await fetchSpecies(s.sci, token);
      for (const r of kept) records.push({ sp: s.key, ...r });
      counts[s.key] = kept.length;
      const note =
        total != null && total > kept.length ? ` (of ${total} available — capped)` : ` (of ${total ?? "?"})`;
      console.log(`kept ${kept.length}${note}`);
    } catch (e) {
      counts[s.key] = 0;
      console.log(`FAILED — ${e.message}`);
    }
  }

  const out = {
    meta: {
      generatedAt: new Date().toISOString(),
      source: "FinBIF / laji.fi",
      license: "CC-BY 4.0",
      filters: `coordinateAccuracyMax=${ACC_MAX}, qualityIssues=NO_ISSUES`,
      perSpeciesCap: PER_SPECIES_CAP,
      counts,
      total: records.length,
    },
    records,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  const json = JSON.stringify(out);
  writeFileSync(OUT, json);
  console.log(
    `\n✔ Wrote ${records.length} records → public/data/berries.json (${Math.round(
      Buffer.byteLength(json) / 1024,
    )} KB)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
