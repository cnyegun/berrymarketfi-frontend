import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

// Drop real illustrations here; null shows a placeholder.
const STEP_IMAGES: (string | null)[] = [
  "/steps/1.png",
  "/steps/2.png",
  "/steps/3.png",
  "/steps/4.png",
];

const STEPS = [
  {
    title: "Pick a spot",
    desc: "We provide a curated list of berries picking location.",
    label: "Map illustration",
  },
  {
    title: "Pick responsibly",
    desc: "Be nice!",
    label: "Basket illustration",
  },
  {
    title: "List your harvest",
    desc: "Add details, photos and your price.",
    label: "Phone illustration",
  },
  {
    title: "Connect & earn",
    desc: "Buyers find your harvest. You get paid.",
    label: "Delivery illustration",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#f5f7f4] py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-6">
        <h2 className="text-center text-[30px] font-extrabold tracking-[-0.01em] text-ink sm:text-[34px]">
            How does it work? 
        </h2>
        <div className="mt-14 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-2">
          {STEPS.map((step, i) => (
            <Fragment key={step.title}>
              <div className="flex w-full max-w-[220px] flex-col items-center text-center">
                <div className="h-32 w-32 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                  <ImagePlaceholder src={STEP_IMAGES[i]} label={step.label} contain />
                </div>
                <div className="mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[14px] font-bold text-white shadow-sm">
                  {i + 1}
                </div>
                <h3 className="mt-3 text-[18px] font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-snug text-muted">{step.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <ArrowRight
                  size={22}
                  strokeWidth={1.5}
                  className="hidden shrink-0 text-ink/25 lg:mt-11 lg:block"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
