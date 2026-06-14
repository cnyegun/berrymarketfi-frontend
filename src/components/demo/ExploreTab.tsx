import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AlertTriangle, Loader2, MapPin, X } from "lucide-react";
import BerryMap from "./BerryMap";
import SpeciesLegend from "./SpeciesLegend";
import { useBerryData } from "../../demo/useBerryData";
import { SPECIES, SPECIES_BY_KEY } from "../../demo/species";
import type { BerryRecord, SpeciesKey } from "../../demo/types";

const ALL_KEYS = SPECIES.map((s) => s.key);
const fmt = (n: number) => n.toLocaleString("en-US");

/** Consistent sizing wrapper so loading/error states don't shift the layout. */
function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 lg:h-[calc(100vh-13.5rem)] lg:min-h-[560px] lg:flex-row">
      {children}
    </div>
  );
}

function StatusBox({ tone = "muted", children }: { tone?: "muted" | "error"; children: ReactNode }) {
  return (
    <Frame>
      <div className="flex min-h-[440px] flex-1 items-center justify-center rounded-2xl border border-line bg-brand-soft/30">
        <div
          className={`flex items-center gap-2.5 text-[15px] ${
            tone === "error" ? "text-red-700" : "text-muted"
          }`}
        >
          {children}
        </div>
      </div>
    </Frame>
  );
}

function HintCard() {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-brand-soft/40 p-4 text-[13px] leading-relaxed text-muted">
      <MapPin size={16} className="mb-1.5 text-brand" />
      Tap any point to see the species, where and when it was recorded, and how precise the
      location is. Toggle species in the legend to filter the map.
    </div>
  );
}

function RecordDetail({ rec, onClose }: { rec: BerryRecord; onClose: () => void }) {
  const sp = SPECIES_BY_KEY[rec.sp];
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="mt-0.5 h-3.5 w-3.5 flex-none rounded-full ring-2 ring-white"
            style={{ background: sp.color, boxShadow: `0 0 0 1px ${sp.color}` }}
          />
          <div>
            <div className="text-[16px] font-bold leading-tight text-ink">{sp.fi}</div>
            <div className="text-[13px] text-muted">
              {sp.en} · <span className="italic">{sp.scientific}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-md p-1 text-muted transition-colors hover:bg-brand-soft hover:text-ink"
        >
          <X size={16} />
        </button>
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-x-3 gap-y-2 text-[13px]">
        <dt className="text-muted">Place</dt>
        <dd className="col-span-2 text-ink">{rec.place || "—"}</dd>
        <dt className="text-muted">Accuracy</dt>
        <dd className="col-span-2 text-ink">{rec.acc == null ? "—" : `±${rec.acc} m`}</dd>
        <dt className="text-muted">Coords</dt>
        <dd className="col-span-2 tabular-nums text-ink">
          {rec.lat.toFixed(4)}, {rec.lon.toFixed(4)}
        </dd>
      </dl>

      <p className="mt-3 border-t border-line pt-2 text-[11px] text-muted">
        Observation record · FinBIF / laji.fi · CC-BY 4.0
      </p>
    </div>
  );
}

export default function ExploreTab() {
  const { data, loading, error } = useBerryData();
  const [visible, setVisible] = useState<Set<SpeciesKey>>(() => new Set(ALL_KEYS));
  const [selected, setSelected] = useState<BerryRecord | null>(null);

  const counts = (data?.meta.counts ?? {}) as Record<SpeciesKey, number>;
  const total = data?.meta.total ?? 0;
  const showing = useMemo(
    () => ALL_KEYS.reduce((sum, k) => (visible.has(k) ? sum + (counts[k] ?? 0) : sum), 0),
    [visible, counts],
  );

  const toggle = (key: SpeciesKey) =>
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  if (loading) {
    return (
      <StatusBox>
        <Loader2 size={18} className="animate-spin text-brand" />
        Loading observations…
      </StatusBox>
    );
  }
  if (error || !data) {
    return (
      <StatusBox tone="error">
        <AlertTriangle size={18} />
        Couldn’t load the map data. {error ?? "Try running npm run fetch:data."}
      </StatusBox>
    );
  }

  return (
    <Frame>
      <div className="relative min-h-[440px] flex-1 overflow-hidden rounded-2xl border border-line shadow-sm">
        <BerryMap records={data.records} visible={visible} onSelect={setSelected} />
        <div className="pointer-events-none absolute right-3 top-3 z-[1000] rounded-full border border-line bg-white/90 px-3.5 py-1.5 text-[12.5px] font-semibold text-ink shadow-sm backdrop-blur">
          <span className="text-brand">{fmt(showing)}</span> of {fmt(total)} observations
        </div>
      </div>

      <aside className="flex shrink-0 flex-col gap-4 lg:w-80 lg:overflow-y-auto">
        <SpeciesLegend
          counts={counts}
          visible={visible}
          onToggle={toggle}
          onAll={() => setVisible(new Set(ALL_KEYS))}
          onNone={() => setVisible(new Set())}
        />
        {selected ? <RecordDetail rec={selected} onClose={() => setSelected(null)} /> : <HintCard />}
      </aside>
    </Frame>
  );
}
