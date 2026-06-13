import { motion } from "motion/react";
import {
  Sprout,
  ShoppingBasket,
  Leaf,
  ShieldCheck,
  HandHeart,
  type LucideIcon,
} from "lucide-react";
import DeviceShowcase from "./DeviceShowcase";
import StoreBadges from "./StoreBadges";

type Feature = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

const FEATURES: Feature[] = [
  { icon: Leaf, title: "100% wild", subtitle: "From clean Finnish forests" },
  { icon: ShieldCheck, title: "Trusted network", subtitle: "Verified pickers and buyers" },
  { icon: HandHeart, title: "Sustainable", subtitle: "Supporting people and nature" },
];

// Stagger helpers for the load-in
const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1240px] px-6">
      <div className="grid items-center gap-10 pb-20 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6 lg:pb-28 lg:pt-10">
        {/* ---------- Left: copy ---------- */}
        <div className="max-w-xl">
          <motion.h1
            {...rise(0.05)}
            className="text-[44px] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[56px] lg:text-[64px]"
          >
            Find <span className="text-brand">wild berries.</span>
            <br />
            Earn naturally.
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-md text-[17px] leading-[1.7] text-muted"
          >
            Berrymarket provide you a curated list of wild berries picking location and 
            connects berry pickers with trusted buyers across
            Finland.
          </motion.p>

          {/* CTAs */}
          <motion.div {...rise(0.27)} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-brand px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(47,106,57,0.7)] transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              I want to pick berries
              <Sprout size={19} strokeWidth={2} className="transition-transform group-hover:rotate-6" />
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-ink/15 bg-white/80 px-6 py-3.5 text-[15px] font-semibold text-ink backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white"
            >
              I want to buy berries
              <ShoppingBasket size={19} strokeWidth={2} className="text-brand" />
            </a>
          </motion.div>

          {/* App store badges */}
          <motion.div {...rise(0.36)} className="mt-5">
            {/* <p className="mb-2.5 text-[13px] font-medium text-muted">Get the Berrymarket app</p> */}
            <StoreBadges />
          </motion.div>

          {/* Feature badges */}
          <motion.ul {...rise(0.48)} className="mt-12 flex max-w-lg gap-5 sm:mt-14 sm:gap-12">
            {FEATURES.map(({ icon: Icon, title, subtitle }) => (
              <li key={title} className="flex flex-1 flex-col items-center text-center">
                <Icon size={30} strokeWidth={1.4} className="text-ink/80" />
                <p className="mt-3 text-[15px] font-bold text-ink">{title}</p>
                <p className="mt-1 text-[13px] leading-snug text-muted">{subtitle}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---------- Right: device mockup ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="relative"
        >
          <DeviceShowcase />
        </motion.div>
      </div>
    </section>
  );
}
