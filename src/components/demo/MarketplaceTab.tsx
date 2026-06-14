import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import ListingCard from "./ListingCard";
import { SPECIES } from "../../demo/species";
import type { Listing, SpeciesKey } from "../../demo/types";

type Filter = SpeciesKey | "all";

function Chip({
  active,
  color,
  onClick,
  children,
}: {
  active: boolean;
  color?: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors ${
        active ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-ink/25"
      }`}
    >
      {color && (
        <span className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10" style={{ background: color }} />
      )}
      {children}
    </button>
  );
}

export default function MarketplaceTab({ listings }: { listings: Listing[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const present = useMemo(() => {
    const set = new Set(listings.map((l) => l.sp));
    return SPECIES.filter((s) => set.has(s.key));
  }, [listings]);

  const shown = filter === "all" ? listings : listings.filter((l) => l.sp === filter);

  return (
    <div>
      <p className="text-[15px] leading-relaxed text-muted">
        <span className="font-semibold text-ink">{listings.length}</span> fresh harvests from pickers
        across Finland — bought directly, priced by the picker.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </Chip>
        {present.map((s) => (
          <Chip
            key={s.key}
            active={filter === s.key}
            color={s.color}
            onClick={() => setFilter(s.key)}
          >
            {s.fi}
          </Chip>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-10 text-center text-[15px] text-muted">No harvests in this category yet.</p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
