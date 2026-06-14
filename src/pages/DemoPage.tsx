import { useState } from "react";
import { CheckCircle2, Map as MapIcon, Store, Tag, X } from "lucide-react";
import PageLayout from "../components/PageLayout";
import ExploreTab from "../components/demo/ExploreTab";
import MarketplaceTab from "../components/demo/MarketplaceTab";
import SellTab from "../components/demo/SellTab";
import { MOCK_LISTINGS } from "../demo/listings";
import { SPECIES_BY_KEY } from "../demo/species";
import type { Listing } from "../demo/types";

type Tab = "explore" | "market" | "sell";

const TABS: { key: Tab; label: string; icon: typeof MapIcon }[] = [
  { key: "explore", label: "Explore", icon: MapIcon },
  { key: "market", label: "Marketplace", icon: Store },
  { key: "sell", label: "Sell", icon: Tag },
];

export default function DemoPage() {
  const [tab, setTab] = useState<Tab>("explore");
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [flash, setFlash] = useState<string | null>(null);

  const changeTab = (t: Tab) => {
    setFlash(null);
    setTab(t);
  };

  const handleList = (listing: Listing) => {
    setListings((prev) => [listing, ...prev]);
    const sp = SPECIES_BY_KEY[listing.sp];
    setFlash(`Your ${sp.fi.toLowerCase()} (${listing.kg} kg) is now live in the Marketplace.`);
    setTab("market");
  };

  return (
    <PageLayout>
      {/* App header + tab switcher */}
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1240px] items-center px-6 py-3">
          <div className="inline-flex rounded-full border border-line bg-brand-soft/50 p-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => changeTab(t.key)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                    active ? "bg-white text-brand shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  <Icon size={16} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Success flash */}
      {flash && (
        <div className="border-b border-brand/20 bg-brand-soft">
          <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-6 py-2.5 text-[14px] font-medium text-brand-dark">
            <CheckCircle2 size={17} className="flex-none text-brand" />
            <span className="flex-1">{flash}</span>
            <button
              type="button"
              onClick={() => setFlash(null)}
              aria-label="Dismiss"
              className="rounded p-1 hover:bg-white/60"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Active tab */}
      <div className="mx-auto w-full max-w-[1240px] px-6 py-6">
        {tab === "explore" && <ExploreTab />}
        {tab === "market" && <MarketplaceTab listings={listings} />}
        {tab === "sell" && <SellTab onSubmit={handleList} />}
      </div>
    </PageLayout>
  );
}
