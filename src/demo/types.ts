/** Shared types for the /demo web-app. */

export type SpeciesKey =
  | "myrtillus"
  | "vitis-idaea"
  | "chamaemorus"
  | "idaeus"
  | "vesca"
  | "uliginosum"
  | "nigrum"
  | "juniperus";

export interface Species {
  key: SpeciesKey;
  scientific: string;
  fi: string;
  en: string;
  /** Hex colour used for the map markers, legend and listing accents. */
  color: string;
  /** Default listing photo path (under public/). */
  photo: string;
}

/** One observation point, as baked into public/data/berries.json. */
export interface BerryRecord {
  sp: SpeciesKey;
  lat: number;
  lon: number;
  place: string;
  acc: number | null; // coordinate accuracy in metres
}

export interface BerryData {
  meta: {
    generatedAt: string;
    source: string;
    license: string;
    filters: string;
    perSpeciesCap: number;
    counts: Record<SpeciesKey, number>;
    total: number;
  };
  records: BerryRecord[];
}

/** A (mock) harvest offered for sale in the marketplace. */
export interface Listing {
  id: string;
  sp: SpeciesKey;
  photo: string;
  kg: number;
  pricePerKg: number; // euros
  picker: string;
  rating: number; // 0–5
  municipality: string;
  listedOn: string; // "YYYY-MM-DD"
  note: string;
}
