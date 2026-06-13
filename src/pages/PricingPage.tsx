import { Check } from "lucide-react";
import PageLayout from "../components/PageLayout";

type Plan = {
  name: string;
  price: string;
  cadence: string;
  desc: string;
  features: string[];
  note?: string;
  cta: string;
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Explorer",
    price: "€0",
    cadence: "free forever",
    desc: "For curious foragers finding their very first spots.",
    features: [
      "Find verified berry spots",
      "Browse the marketplace",
      "Community yield reports",
      "Sustainable picking guides",
    ],
    cta: "Get started",
  },
  {
    name: "Picker",
    price: "€5",
    cadence: "per month, in season",
    desc: "For pickers who long to sell their harvest directly and fairly.",
    features: [
      "Everything in Explorer",
      "List unlimited harvests",
      "Set your own prices",
      "Verified picker badge",
      "Offline maps & terrain info",
      "Secure in-app payments",
    ],
    note: "+ 2.5% fee per completed sale",
    cta: "Start selling",
    highlighted: true,
  },
  {
    name: "Buyer",
    price: "Custom",
    cadence: "let's talk",
    desc: "For restaurants, juiceries and wholesalers lovingly sourcing at scale.",
    features: [
      "Source verified wild berries",
      "Reliable seasonal supply",
      "Direct picker connections",
      "Bulk & recurring orders",
      "Dedicated support",
    ],
    cta: "Contact sales",
  },
];

const FAQS = [
  {
    q: "Why €5 a month?",
    a: "Finland's berry season unfolds from roughly July to September, so most pickers happily subscribe for only the few precious months they're out picking. It keeps Berrymarket wonderfully fair and affordable, while quietly funding a platform built for pickers — never for middlemen.",
  },
  {
    q: "What's the 2.5% fee?",
    a: "Whenever you complete a sale through the app, Berrymarket takes a small 2.5% transaction fee. That's truly all — no hidden cuts, no little surprises, and you always, proudly set your own price.",
  },
  {
    q: "Do buyers pay a subscription?",
    a: "Casual buyers are warmly welcome to browse and purchase entirely for free. Larger businesses sourcing at volume settle into a custom Buyer plan, with dedicated support and a reliable, recurring supply.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Of course. There are no lock-ins of any kind — simply pause or cancel as the season draws to a close, and take it up again, just as easily, next summer.",
  },
];

export default function PricingPage() {
  return (
    <PageLayout>
      {/* Header */}
      <header className="mx-auto max-w-[760px] px-6 pt-12 pb-10 text-center lg:pt-16">
        <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[46px]">
          Simple pricing for a fair market
        </h1>
        <p className="mt-5 text-[18px] leading-relaxed text-muted">
          Berrymarket is always free to explore, at your own pace. You pay only
          when you're truly ready to sell — just €5 a month through the season, with a
          small, fair 2.5% fee whenever you make a sale.
        </p>
      </header>

      {/* Plans */}
      <section className="mx-auto max-w-[1080px] px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl p-8 ${
                plan.highlighted
                  ? "bg-white shadow-[0_30px_60px_-30px_rgba(20,40,30,0.35)] ring-2 ring-brand"
                  : "bg-white ring-1 ring-line"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-[12px] font-bold uppercase tracking-wide text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-[18px] font-bold text-ink">{plan.name}</h3>
              <div className="mt-4 flex items-end gap-1.5">
                <span className="text-[40px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                  {plan.price}
                </span>
                <span className="pb-1 text-[14px] text-muted">{plan.cadence}</span>
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{plan.desc}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink/85">
                    <Check size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>

              {plan.note && (
                <p className="mt-5 rounded-lg bg-brand-soft px-3 py-2 text-center text-[13px] font-semibold text-brand-dark">
                  {plan.note}
                </p>
              )}

              <a
                href="#"
                className={`mt-6 block rounded-xl px-6 py-3.5 text-center text-[15px] font-semibold transition-all hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? "bg-brand text-white shadow-sm hover:bg-brand-dark"
                    : "border border-ink/15 text-ink hover:border-ink/30"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[14px] text-muted">
          Finland's berry season runs from July to September — so do subscribe only
          for the precious months you pick.
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[760px] px-6 py-20">
        <h2 className="text-center text-[26px] font-extrabold tracking-[-0.01em] text-ink sm:text-[30px]">
          Questions, answered
        </h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {FAQS.map((item) => (
            <div key={item.q} className="py-6">
              <h3 className="text-[17px] font-bold text-ink">{item.q}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
