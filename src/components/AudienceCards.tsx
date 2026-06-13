import { Check, ArrowRight } from "lucide-react";

// Real photos that blend into each card (see the fade overlay below).
const PICKER_IMAGE = "/picker.png";
const BUYER_IMAGE = "/buyer.png";

// A long, eased left→right fade that runs across the WHOLE photo so it melts
// into the panel with no visible seam or plateau. `c` is the card's bg colour.
const fadeInto = (c: string) =>
  `linear-gradient(to right, ${c} 0%, ${c} 6%, ${c}fa 16%, ${c}f0 24%, ${c}e0 32%, ${c}c8 40%, ${c}a8 48%, ${c}85 56%, ${c}60 64%, ${c}40 72%, ${c}26 80%, ${c}12 88%, ${c}00 100%)`;

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
  alt,
  bg,
  blend,
  objectPosition,
}: {
  title: string;
  points: string[];
  img: string;
  alt: string;
  bg: string;
  /** card background colour, used to fade the photo into the panel */
  blend: string;
  objectPosition: string;
}) {
  return (
    <div className={`relative min-h-[260px] overflow-hidden rounded-3xl ${bg} p-7 lg:p-9`}>
      {/* Photo bleeds to the card edges, then fades into the panel colour */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[72%] sm:w-[66%]">
        <img
          src={img}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: fadeInto(blend) }} />
      </div>

      <div className="relative z-10 max-w-[56%]">
        <h3 className="text-[23px] font-bold text-ink">{title}</h3>
        <ul className="mt-4 space-y-2.5">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-[16px] text-ink/85">
              <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-brand" />
              {p}
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-1.5 text-[16px] font-semibold text-brand transition-all hover:gap-2.5"
        >
          Learn more <ArrowRight size={15} />
        </a>
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
          alt="Pickers gathering wild berries in a Finnish forest"
          bg="bg-[#f3efe3]"
          blend="#f3efe3"
          objectPosition="center 40%"
        />
        <Card
          title="For Buyers"
          points={BUYER_POINTS}
          img={BUYER_IMAGE}
          alt="Fresh wild blueberries in punnets"
          bg="bg-[#e9f0f5]"
          blend="#e9f0f5"
          objectPosition="center 45%"
        />
      </div>
    </section>
  );
}
