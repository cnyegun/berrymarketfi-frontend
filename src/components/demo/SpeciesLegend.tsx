import { Check } from "lucide-react";
import type { SpeciesKey } from "../../demo/types";
import { SPECIES } from "../../demo/species";

interface Props {
  counts: Record<SpeciesKey, number>;
  visible: Set<SpeciesKey>;
  onToggle: (key: SpeciesKey) => void;
  onAll: () => void;
  onNone: () => void;
}

const fmt = (n: number) => n.toLocaleString("en-US");

export default function SpeciesLegend({ counts, visible, onToggle, onAll, onNone }: Props) {
  return (
    <div className="rounded-2xl border border-line bg-white/95 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-ink">Species</h3>
        <div className="flex items-center gap-2 text-[12px] font-semibold">
          <button type="button" onClick={onAll} className="text-brand hover:underline">
            All
          </button>
          <span className="text-line">|</span>
          <button type="button" onClick={onNone} className="text-muted hover:underline">
            None
          </button>
        </div>
      </div>

      <ul className="mt-3 space-y-0.5">
        {SPECIES.map((s) => {
          const on = visible.has(s.key);
          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => onToggle(s.key)}
                aria-pressed={on}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-brand-soft ${
                  on ? "" : "opacity-40"
                }`}
              >
                <span
                  className="flex h-4 w-4 flex-none items-center justify-center rounded-[5px] ring-1 ring-black/10"
                  style={{ background: s.color }}
                >
                  {on && <Check size={11} className="text-white" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-[14px] font-semibold text-ink">{s.fi}</span>
                  <span className="block text-[12px] text-muted">{s.en}</span>
                </span>
                <span className="text-[12px] tabular-nums text-muted">{fmt(counts[s.key] ?? 0)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
