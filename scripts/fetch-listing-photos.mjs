/**
 * fetch-listing-photos.mjs — downloads real, CC-licensed berry photos for the
 * demo marketplace from iNaturalist (open API, no key). Run manually:
 *
 *     npm run fetch:photos
 *
 * Writes images to public/listings/<species>-<n>.jpg and a credit map to
 * src/demo/photoCredits.ts. Photos are species-accurate and Finland-first
 * (falls back to global), restricted to CC BY / CC0 so they're safe to show.
 *
 * Node built-ins only (global fetch, fs, path).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const IMG_DIR = resolve(ROOT, "public/listings");
const CREDITS_TS = resolve(ROOT, "src/demo/photoCredits.ts");

const PLACE_FI = 7020; // iNaturalist place id for Finland
const LICENSES = "cc-by,cc0";
const WANT = 2; // photos per species (enough for the marketplace + a per-species default)

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const mediumUrl = (url) => url.replace(/square(\.[a-z0-9]+)(\?|$)/i, "medium$1$2");

function photographer(attr) {
  if (!attr) return "iNaturalist";
  let s = attr.replace(/\s*\((?:CC|cc)[^)]*\)\s*$/, "").trim(); // strip trailing "(CC BY)"
  const uploaded = s.match(/uploaded by\s+(.+)$/i); // CC0 form: "no rights reserved, uploaded by X"
  if (uploaded) return uploaded[1].trim();
  s = s
    .replace(/^\(c\)\s*/i, "")
    .replace(/^©\s*/, "")
    .split(/,\s*(?:some|all|no) rights reserved/i)[0]
    .trim();
  return !s || /^(no|some|all) rights/i.test(s) ? "iNaturalist" : s;
}

function licenseLabel(code) {
  return (
    { "cc-by": "CC BY", cc0: "CC0", "cc-by-sa": "CC BY-SA", "cc-by-nc": "CC BY-NC" }[code] ||
    (code ? code.toUpperCase() : "")
  );
}

async function getCandidates(sci, { useFinland = false, fruiting = false } = {}) {
  const u = new URL("https://api.inaturalist.org/v1/observations");
  u.searchParams.set("taxon_name", sci);
  u.searchParams.set("photos", "true");
  u.searchParams.set("quality_grade", "research");
  u.searchParams.set("photo_license", LICENSES);
  u.searchParams.set("order_by", "votes");
  u.searchParams.set("order", "desc");
  u.searchParams.set("per_page", "30");
  if (useFinland) u.searchParams.set("place_id", String(PLACE_FI));
  if (fruiting) {
    u.searchParams.set("term_id", "12"); // Plant Phenology
    u.searchParams.set("term_value_id", "14"); // Fruiting
  }
  const res = await fetch(u, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("iNat HTTP " + res.status);
  const data = await res.json();
  const out = [];
  for (const o of data.results || []) {
    const p = (o.photos || [])[0];
    if (p && p.url) out.push({ url: mediumUrl(p.url), license: p.license_code, attribution: p.attribution, obs: o.id });
  }
  return out;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("img HTTP " + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error("suspiciously small");
  writeFileSync(dest, buf);
  return buf.length;
}

async function main() {
  mkdirSync(IMG_DIR, { recursive: true });
  const credits = {};

  for (const s of SPECIES) {
    process.stdout.write(`  ${s.sci.padEnd(22)} … `);
    // Prefer fruiting photos from Finland, then broaden until we have enough.
    const cands = [];
    const seen = new Set();
    const strategies = [
      { useFinland: true, fruiting: true },
      { useFinland: false, fruiting: true },
      { useFinland: true, fruiting: false },
      { useFinland: false, fruiting: false },
    ];
    for (const opt of strategies) {
      if (cands.length >= WANT * 4) break;
      try {
        for (const c of await getCandidates(s.sci, opt)) {
          if (!seen.has(c.obs)) {
            seen.add(c.obs);
            cands.push(c);
          }
        }
      } catch {
        /* try next strategy */
      }
    }

    let n = 0;
    let i = 0;
    const got = [];
    while (n < WANT && i < cands.length) {
      const c = cands[i++];
      const file = `${s.key}-${n + 1}.jpg`;
      try {
        await download(c.url, resolve(IMG_DIR, file));
        credits[`/listings/${file}`] = `${photographer(c.attribution)} / iNaturalist (${licenseLabel(c.license)})`;
        got.push(file);
        n++;
      } catch {
        /* try next candidate */
      }
      await sleep(150);
    }
    console.log(got.length ? `${got.length}: ${got.join(", ")}` : "NONE FOUND");
  }

  const lines = Object.entries(credits)
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
    .join("\n");
  const ts =
    `// Auto-generated by scripts/fetch-listing-photos.mjs — do not edit by hand.\n` +
    `// Berry photos from iNaturalist contributors, used under CC BY / CC0.\n` +
    `export const PHOTO_CREDITS: Record<string, string> = {\n${lines}\n};\n`;
  mkdirSync(dirname(CREDITS_TS), { recursive: true });
  writeFileSync(CREDITS_TS, ts);

  console.log(`\n✔ ${Object.keys(credits).length} photos → public/listings/ + credits → src/demo/photoCredits.ts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
