import { motion } from "motion/react";
import {
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
            className="text-[44px] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[56px] lg:text-[64px] lg:whitespace-nowrap"
          >
            Find <span className="italic text-brand">wild berries.</span>
            <br />
            Earn naturally.
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-md text-[20px] leading-[1.7] text-muted"
          >
            Berrymarket provide you a curated list of wild berries picking location and 
            connects berry pickers with trusted buyers across
            Finland.
          </motion.p>

          {/* App store badges */}
          <motion.div {...rise(0.27)} className="mt-8">
            {/* <p className="mb-2.5 text-[15px] font-medium text-muted">Get the Berrymarket app</p> */}
            <StoreBadges />
          </motion.div>

          {/* Feature badges */}
          <motion.ul {...rise(0.48)} className="mt-12 flex max-w-lg gap-5 sm:mt-14 sm:gap-12">
            {FEATURES.map(({ icon: Icon, title, subtitle }) => (
              <li key={title} className="flex flex-1 flex-col items-center text-center">
                <Icon size={30} strokeWidth={1.4} className="text-ink/80" />
                <p className="mt-3 text-[17px] font-bold text-ink">{title}</p>
                <p className="mt-1 text-[15px] leading-snug text-muted">{subtitle}</p>
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
