import { useEffect, useState } from "react";
import type { BerryData } from "./types";

interface State {
  data: BerryData | null;
  loading: boolean;
  error: string | null;
}

// Module-level cache so switching tabs doesn't re-fetch the snapshot.
let cache: BerryData | null = null;
let inflight: Promise<BerryData> | null = null;

function load(): Promise<BerryData> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetch(`${import.meta.env.BASE_URL}data/berries.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`Could not load berry data (HTTP ${r.status})`);
        return r.json() as Promise<BerryData>;
      })
      .then((d) => {
        cache = d;
        return d;
      })
      .catch((e) => {
        inflight = null; // allow a retry on next mount
        throw e;
      });
  }
  return inflight;
}

/** Loads the baked observation snapshot from public/data/berries.json. */
export function useBerryData(): State {
  const [state, setState] = useState<State>(() =>
    cache ? { data: cache, loading: false, error: null } : { data: null, loading: true, error: null },
  );

  useEffect(() => {
    if (cache) return;
    let alive = true;
    load()
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((e) => alive && setState({ data: null, loading: false, error: String(e.message || e) }));
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
