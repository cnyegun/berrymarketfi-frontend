/**
 * Official app store badges.
 *
 * Both are the canonical brand-distributed lockups (stored in
 * /public/badges). Apple's and Google's guidelines require using these
 * exact artworks. They share a 3.375:1 aspect ratio, so rendering both
 * at the same height keeps them visually matched.
 */
const SIGNUP_URL = "https://forms.gle/nALcbR2uoQ8VHqEo6";

export default function StoreBadges() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
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
          href={SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
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
      <p className="mt-3 text-[14px] italic text-muted">
        Sign up for beta testing
      </p>
    </div>
  );
}
