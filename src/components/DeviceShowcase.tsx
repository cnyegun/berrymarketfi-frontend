/**
 * iPhone mockup for the hero.
 *
 * The phone screen is a PLACEHOLDER for now. When you have the app
 * screenshot, drop the file into /public (e.g. /public/phone.png) and
 * set PHONE_SCREENSHOT below — the frame and sizing stay as-is.
 */
const PHONE_SCREENSHOT: string | null = null; // e.g. "/phone.png"

function ScreenPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,#eef4ee_0%,#ffffff_45%,#e8f1ea_100%)]">
      <img src="/favicon.png" alt="" className="h-12 w-12 opacity-50" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/70">
        App screenshot
      </span>
    </div>
  );
}

export default function DeviceShowcase() {
  return (
    <div className="flex justify-center">
      <div className="w-[240px] sm:w-[270px] lg:w-[300px]">
        {/* iPhone frame */}
        <div className="rounded-[3rem] bg-[#0e0f11] p-[7px] shadow-[0_45px_90px_-25px_rgba(20,40,30,0.55)] ring-1 ring-black/5">
          <div className="relative aspect-[9/19.3] overflow-hidden rounded-[2.55rem] bg-white">
            {/* Dynamic island */}
            <div className="absolute left-1/2 top-2.5 z-10 h-[22px] w-[32%] -translate-x-1/2 rounded-full bg-[#0e0f11]" />
            {PHONE_SCREENSHOT ? (
              <img src={PHONE_SCREENSHOT} alt="Berrymarket app" className="h-full w-full object-cover" />
            ) : (
              <ScreenPlaceholder />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
