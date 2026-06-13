/**
 * Official Google Play badge.
 *
 * This is the canonical badge asset Google distributes (stored in
 * /public/badges). Their brand guidelines require using this exact
 * lockup, so it matches what every other site shows.
 * (Apple / App Store intentionally omitted — Android only.)
 */
export default function StoreBadges() {
  return (
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
  );
}
