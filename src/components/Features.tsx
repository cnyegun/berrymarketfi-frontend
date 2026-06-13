import {
  MapPinned,
  ShoppingBasket,
  ShoppingBag,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type Feature = { icon: LucideIcon; title: string; desc: string };

const FEATURES: Feature[] = [
  {
    icon: MapPinned,
    title: "Find the best spots",
    desc: "Explore verified wild berry locations and real-time yield reports.",
  },
  {
    icon: ShoppingBasket,
    title: "Plan your picking trip",
    desc: "Check directions, terrain, access info and offline maps.",
  },
  {
    icon: ShoppingBag,
    title: "Sell with ease",
    desc: "List your harvest, set your price and connect with buyers.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & fair",
    desc: "Verified users, secure payments and transparent reviews.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-6">
        <h2 className="text-center text-[26px] font-extrabold tracking-[-0.01em] text-ink sm:text-[30px]">
          Everything you need in one app
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <Icon size={34} strokeWidth={1.5} className="text-brand" />
              <h3 className="mt-4 text-[15.5px] font-bold text-ink">{title}</h3>
              <p className="mt-2 max-w-[230px] text-[13.5px] leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
