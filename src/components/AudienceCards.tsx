import { Check, ArrowRight } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder";

// Swap with real illustrations when ready.
const PICKER_IMAGE: string | null = null;
const BUYER_IMAGE: string | null = null;

const PICKER_POINTS = [
  "Find more berries",
  "Earn fair money",
  "Flexible on your terms",
  "Be part of a growing community",
];
const BUYER_POINTS = [
  "Access quality wild berries",
  "Verified pickers",
  "Reliable supply",
  "Easy communication",
];

function Card({
  title,
  points,
  img,
  label,
  bg,
}: {
  title: string;
  points: string[];
  img: string | null;
  label: string;
  bg: string;
}) {
  return (
    <div className={`relative min-h-[260px] overflow-hidden rounded-3xl ${bg} p-7 lg:p-9`}>
      <div className="relative z-10 max-w-[58%]">
        <h3 className="text-[20px] font-bold text-ink">{title}</h3>
        <ul className="mt-4 space-y-2.5">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-[14px] text-ink/85">
              <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-brand" />
              {p}
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand transition-all hover:gap-2.5"
        >
          Learn more <ArrowRight size={15} />
        </a>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-[82%] w-[44%]">
        <ImagePlaceholder src={img} label={label} contain />
      </div>
    </div>
  );
}

export default function AudienceCards() {
  return (
    <section className="bg-white py-6 lg:py-10">
      <div className="mx-auto grid max-w-[1240px] gap-6 px-6 lg:grid-cols-2">
        <Card
          title="For Pickers"
          points={PICKER_POINTS}
          img={PICKER_IMAGE}
          label="Picker illustration"
          bg="bg-[#f3efe3]"
        />
        <Card
          title="For Buyers"
          points={BUYER_POINTS}
          img={BUYER_IMAGE}
          label="Buyer illustration"
          bg="bg-[#e9f0f5]"
        />
      </div>
    </section>
  );
}
