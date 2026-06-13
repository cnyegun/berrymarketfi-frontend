/**
 * Official app store badges.
 *
 * Both are the canonical brand-distributed lockups (stored in
 * /public/badges). Apple's and Google's guidelines require using these
 * exact artworks. They share a 3.375:1 aspect ratio, so rendering both
 * at the same height keeps them visually matched.
 */
export default function StoreBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="#"
        aria-label="Download on the App Store"
        className="inline-block transition-transform hover:-translate-y-0.5"
      >
        <img
          src="/badges/app-store.svg"
          alt="Download on the App Store"
          className="h-[44px] w-auto"
        />
      </a>
      <a
        href="#"
        aria-label="Get it on Google Play"
        className="inline-block transition-transform hover:-translate-y-0.5"
      >
        <img
          src="/badges/google-play.svg"
          alt="Get it on Google Play"
          className="h-[44px] w-auto"
        />
      </a>
    </div>
  );
}
