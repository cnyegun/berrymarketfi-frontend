import type { Species, SpeciesKey } from "./types";

/**
 * The eight target species — single source of truth for names, colours and the
 * default listing photo. `key` matches the `sp` field in
 * public/data/berries.json and scripts/fetch-berries.mjs.
 */
export const SPECIES: Species[] = [
  { key: "myrtillus", scientific: "Vaccinium myrtillus", fi: "Mustikka", en: "Bilberry", color: "#3b3b8f", photo: "/listings/myrtillus-1.jpg" },
  { key: "vitis-idaea", scientific: "Vaccinium vitis-idaea", fi: "Puolukka", en: "Lingonberry", color: "#c1352e", photo: "/listings/vitis-idaea-2.jpg" },
  { key: "chamaemorus", scientific: "Rubus chamaemorus", fi: "Lakka", en: "Cloudberry", color: "#e2900c", photo: "/listings/chamaemorus-2.jpg" },
  { key: "idaeus", scientific: "Rubus idaeus", fi: "Vadelma", en: "Raspberry", color: "#cf4d72", photo: "/listings/idaeus-1.jpg" },
  { key: "vesca", scientific: "Fragaria vesca", fi: "Metsämansikka", en: "Wild strawberry", color: "#e2483b", photo: "/listings/vesca-1.jpg" },
  { key: "uliginosum", scientific: "Vaccinium uliginosum", fi: "Juolukka", en: "Bog bilberry", color: "#5d83b3", photo: "/listings/uliginosum-1.jpg" },
  { key: "nigrum", scientific: "Empetrum nigrum", fi: "Variksenmarja", en: "Crowberry", color: "#2f2f38", photo: "/listings/nigrum-2.jpg" },
  { key: "juniperus", scientific: "Juniperus communis", fi: "Kataja", en: "Juniper", color: "#4f7d6a", photo: "/listings/juniperus-1.jpg" },
];

export const SPECIES_BY_KEY = Object.fromEntries(SPECIES.map((s) => [s.key, s])) as Record<
  SpeciesKey,
  Species
>;
