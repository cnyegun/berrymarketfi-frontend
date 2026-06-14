import { useEffect, useMemo, useRef } from "react";
import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "../../demo/berry-map.css";
import type { BerryRecord, SpeciesKey } from "../../demo/types";
import { SPECIES_BY_KEY } from "../../demo/species";

interface Props {
  records: BerryRecord[];
  visible: Set<SpeciesKey>;
  onSelect: (rec: BerryRecord) => void;
}

const FINLAND_CENTER: L.LatLngTuple = [64.6, 26.0];

function esc(s: string): string {
  return s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  );
}

function popupHtml(rec: BerryRecord): string {
  const sp = SPECIES_BY_KEY[rec.sp];
  const acc = rec.acc == null ? "—" : `±${rec.acc} m`;
  return `
  <div class="berry-popup">
    <div class="berry-popup__head">
      <span class="berry-popup__dot" style="background:${sp.color}"></span>
      <span><strong>${esc(sp.fi)}</strong> · ${esc(sp.en)}</span>
    </div>
    <table class="berry-popup__meta">
      <tr><th>Place</th><td>${esc(rec.place) || "—"}</td></tr>
      <tr><th>Accuracy</th><td>${acc}</td></tr>
    </table>
    <div class="berry-popup__src">Observation · FinBIF / laji.fi · CC-BY 4.0</div>
  </div>`;
}

/**
 * Encapsulated, framework-agnostic Leaflet map. We use vanilla leaflet +
 * leaflet.markercluster (not react-leaflet, which requires React 19) so the
 * map is immune to React-version churn. Markers are canvas-rendered circle
 * markers, clustered for performance over thousands of points.
 */
export default function BerryMap({ records, visible, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  // Keep the latest onSelect without making the marker effect depend on it.
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // Stable key so the marker effect only re-runs when the visible set changes.
  const visKey = useMemo(() => [...visible].sort().join(","), [visible]);

  // Initialise the map exactly once.
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: FINLAND_CENTER,
      zoom: 5,
      minZoom: 4,
      maxZoom: 16,
      preferCanvas: true,
      worldCopyJump: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);
    map.attributionControl.addAttribution("Data: FinBIF / laji.fi (CC-BY 4.0)");

    const cluster = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50,
      showCoverageOnHover: false,
    });
    map.addLayer(cluster);

    mapRef.current = map;
    clusterRef.current = cluster;

    return () => {
      map.remove();
      mapRef.current = null;
      clusterRef.current = null;
    };
  }, []);

  // (Re)build markers when the data or the visible species change.
  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;
    cluster.clearLayers();

    const markers: L.CircleMarker[] = [];
    for (const rec of records) {
      if (!visible.has(rec.sp)) continue;
      const marker = L.circleMarker([rec.lat, rec.lon], {
        radius: 5,
        weight: 1,
        color: "#ffffff",
        fillColor: SPECIES_BY_KEY[rec.sp].color,
        fillOpacity: 0.9,
      });
      marker.bindPopup(popupHtml(rec));
      marker.on("click", () => onSelectRef.current(rec));
      markers.push(marker);
    }
    cluster.addLayers(markers);
  }, [records, visKey, visible]);

  return <div ref={containerRef} className="h-full w-full" />;
}
