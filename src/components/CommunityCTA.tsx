import { Sprout, ShoppingBasket } from "lucide-react";

export default function CommunityCTA() {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="relative grid min-h-[300px] overflow-hidden rounded-3xl bg-[#f6f3ec] lg:grid-cols-[40%_60%]">
          {/* Photo (reuses the forest/berry-bowl scene) */}
          <div className="relative min-h-[220px]">
            <img
              src="/background.png"
              alt="Wild blueberries in a wooden cup on the forest floor"
              className="absolute inset-0 h-full w-full object-cover object-[center_72%]"
            />
            {/* blend the photo into the panel on desktop */}
            <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent to-[#f6f3ec] lg:block" />
          </div>

          {/* Copy + actions */}
          <div className="flex flex-col justify-center p-8 lg:p-14">
            <h2 className="max-w-md text-[26px] font-extrabold leading-[1.15] tracking-[-0.01em] text-ink sm:text-[32px]">
              Join a community that values nature and builds local value.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2.5 rounded-xl bg-brand px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Sign up as a picker
                <Sprout size={19} strokeWidth={2} />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink/30"
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
