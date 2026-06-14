import { useState } from "react";
import { MapPin, Star } from "lucide-react";
import type { Listing } from "../../demo/types";
import { SPECIES_BY_KEY } from "../../demo/species";
import { PHOTO_CREDITS } from "../../demo/photoCredits";

const eur = (n: number) => `€${n.toFixed(2)}`;

export default function ListingCard({ listing }: { listing: Listing }) {
  const sp = SPECIES_BY_KEY[listing.sp];
  const credit = PHOTO_CREDITS[listing.photo];
  const [sent, setSent] = useState(false);
  const total = listing.kg * listing.pricePerKg;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Photo header — the species colour shows through if the image fails. */}
      <div
        className="relative h-36 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${sp.color}, ${sp.color}aa)` }}
      >
        <img
          src={listing.photo}
          alt={`${sp.en} (${sp.fi})`}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
        <div className="absolute bottom-3 left-4 text-white">
          <div className="text-[18px] font-bold leading-tight drop-shadow-sm">{sp.fi}</div>
          <div className="text-[12.5px] font-medium text-white/90 drop-shadow-sm">{sp.en}</div>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-bold text-ink shadow-sm">
          {eur(listing.pricePerKg)}
          <span className="font-medium text-muted"> /kg</span>
        </span>
        {credit && (
          <span className="absolute bottom-1 right-2 text-[9px] leading-none text-white/65">
            📷 {credit}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-semibold text-ink">{listing.kg} kg available</span>
          <span className="text-muted">≈ {eur(total)} total</span>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 text-[13px] text-muted">
          <MapPin size={14} className="text-brand" />
          {listing.municipality}
          <span aria-hidden>·</span>
          <span>{listing.listedOn}</span>
        </div>

        <p className="mt-2.5 line-clamp-3 text-[13.5px] leading-relaxed text-muted">{listing.note}</p>

        <div className="mt-3.5 flex items-center gap-2 border-t border-line pt-3">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-soft text-[13px] font-bold text-brand">
            {listing.picker.charAt(0)}
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-[13px] font-semibold text-ink">{listing.picker}</div>
            <div className="flex items-center gap-1 text-[12px] text-muted">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {listing.rating.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="mt-3">
          {sent ? (
            <div className="rounded-xl bg-brand-soft px-3 py-2.5 text-center text-[13px] font-semibold text-brand">
              ✓ We’ve let {listing.picker.split(" ")[0]} know — they’ll be in touch.
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSent(true)}
                className="flex-1 rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-ink/30"
              >
                Message
              </button>
              <button
                type="button"
                onClick={() => setSent(true)}
                className="flex-1 rounded-xl bg-brand px-3 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Buy now
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
