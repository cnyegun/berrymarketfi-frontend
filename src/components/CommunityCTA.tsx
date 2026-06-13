import { Sprout, ShoppingBasket } from "lucide-react";

export default function CommunityCTA() {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="relative grid min-h-[300px] overflow-hidden rounded-3xl bg-[#f6f3ec] lg:grid-cols-[40%_60%]">
          {/* Photo: a tray of freshly picked wild bilberries */}
          <div className="relative min-h-[220px]">
            <img
              src="/community.webp"
              alt="A tray of freshly picked wild bilberries"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* blend the photo into the panel on desktop */}
            <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-[#f6f3ec] lg:block" />
            {/* photo credit (image is CC BY-SA 4.0) */}
            <a
              href="https://commons.wikimedia.org/wiki/File:Fresh_bilberries_picked_in_Tuntorp_4.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 left-2 z-10 rounded bg-black/35 px-1.5 py-0.5 text-[10px] text-white/85 backdrop-blur-sm transition-colors hover:bg-black/55"
            >
              Photo: W.carter · CC BY-SA 4.0
            </a>
          </div>

          {/* Copy + actions */}
          <div className="flex flex-col justify-center p-8 lg:p-14">
            <h2 className="max-w-md text-[30px] font-extrabold leading-[1.15] tracking-[-0.01em] text-ink sm:text-[37px]">
              Join a community that values nature and builds local value.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2.5 rounded-xl bg-brand px-6 py-3.5 text-[17px] font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Sign up as a picker
                <Sprout size={19} strokeWidth={2} />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-6 py-3.5 text-[17px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink/30"
              >
                Sign up as a buyer
                <ShoppingBasket size={19} strokeWidth={2} className="text-brand" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
