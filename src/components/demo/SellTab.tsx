import { useState } from "react";
import type { FormEvent } from "react";
import { Camera, Sprout } from "lucide-react";
import { SPECIES, SPECIES_BY_KEY } from "../../demo/species";
import type { Listing, SpeciesKey } from "../../demo/types";

const TODAY = new Date().toISOString().slice(0, 10);

const FIELD =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-brand";
const LABEL = "block text-[13px] font-semibold text-ink";

export default function SellTab({ onSubmit }: { onSubmit: (l: Listing) => void }) {
  const [sp, setSp] = useState<SpeciesKey>(SPECIES[0].key);
  const [kg, setKg] = useState("");
  const [price, setPrice] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const valid = Number(kg) > 0 && Number(price) > 0 && municipality.trim().length > 0;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid) return;
    onSubmit({
      id: `lst-${Date.now()}`,
      sp,
      photo: SPECIES_BY_KEY[sp].photo,
      kg: Number(kg),
      pricePerKg: Number(price),
      picker: name.trim() || "You",
      rating: 5,
      municipality: municipality.trim(),
      listedOn: TODAY,
      note: note.trim() || "Freshly listed harvest.",
    });
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-7">
        <h3 className="text-[20px] font-bold text-ink">List your harvest</h3>
        <p className="mt-1 text-[14px] text-muted">It takes about a minute — and you set the price.</p>

        <div className="mt-5 space-y-4">
          <div>
            <label className={LABEL} htmlFor="sell-sp">
              Berry
            </label>
            <select
              id="sell-sp"
              className={`${FIELD} mt-1.5`}
              value={sp}
              onChange={(e) => setSp(e.target.value as SpeciesKey)}
            >
              {SPECIES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.fi} — {s.en}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL} htmlFor="sell-kg">
                Amount (kg)
              </label>
              <input
                id="sell-kg"
                className={`${FIELD} mt-1.5`}
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                placeholder="e.g. 12"
                value={kg}
                onChange={(e) => setKg(e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="sell-price">
                Price (€/kg)
              </label>
              <input
                id="sell-price"
                className={`${FIELD} mt-1.5`}
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                placeholder="e.g. 7.50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL} htmlFor="sell-muni">
                Municipality
              </label>
              <input
                id="sell-muni"
                className={`${FIELD} mt-1.5`}
                placeholder="e.g. Kuusamo"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="sell-name">
                Your name
              </label>
              <input
                id="sell-name"
                className={`${FIELD} mt-1.5`}
                placeholder="e.g. Aino V."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={LABEL} htmlFor="sell-note">
              Note <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="sell-note"
              rows={3}
              className={`${FIELD} mt-1.5 resize-none`}
              placeholder="How and where you picked, freshness, pickup…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-dashed border-line bg-brand-soft/30 px-4 py-3 text-muted">
            <Camera size={18} className="flex-none text-brand" />
            <span className="text-[13px]">Photo upload is disabled in this demo.</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-[12.5px] text-muted">
              Estimated value:{" "}
              <span className="font-semibold text-ink">
                {kg && price ? `€${(Number(kg) * Number(price)).toFixed(2)}` : "—"}
              </span>
            </p>
            <button
              type="submit"
              disabled={!valid}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-all enabled:hover:-translate-y-0.5 enabled:hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              List my harvest <Sprout size={17} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
