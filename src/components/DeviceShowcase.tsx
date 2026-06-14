import { useEffect, useState } from "react";

/**
 * iPhone mockup for the hero.
 *
 * The screen cross-fades between the app screenshots below every few
 * seconds. Screens are 617×1280, so the frame aspect matches that ratio
 * and the images fill it edge-to-edge with no cropping.
 */
const SCREENS = ["/map.jpg", "/sell.jpg", "/chat.jpg"];
const INTERVAL_MS = 5000;

export default function DeviceShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % SCREENS.length),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-[240px] sm:w-[270px] lg:w-[300px]">
        {/* iPhone frame */}
        <div className="rounded-[3rem] bg-[#0e0f11] p-[7px] shadow-[0_45px_90px_-25px_rgba(20,40,30,0.55)] ring-1 ring-black/5">
          <div className="relative aspect-[617/1280] overflow-hidden rounded-[2.55rem] bg-white">
            {SCREENS.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="Berrymarket app"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
