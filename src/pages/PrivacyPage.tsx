import { Mail } from "lucide-react";
import PageLayout from "../components/PageLayout";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Information we collect",
    body: (
      <p className="mt-4 text-[19px] leading-[1.7] text-muted">
        Berrymarket does not require an account and does not collect, store, or transmit
        any personal information to us or to any server we control.
      </p>
    ),
  },
  {
    title: "Location",
    body: (
      <p className="mt-4 text-[19px] leading-[1.7] text-muted">
        If you grant location permission, the app uses your device's location only on the
        device to center the map and show berry locations near you. Your location is not
        transmitted to us, is not stored, and is not shared with any third party. You can
        deny or revoke this permission at any time in your device settings; the app remains
        usable without it.
      </p>
    ),
  },
  {
    title: "Map data",
    body: (
      <p className="mt-4 text-[19px] leading-[1.7] text-muted">
        The app displays maps using OpenStreetMap. To draw the map, your device requests
        map image tiles directly from OpenStreetMap's tile servers. These requests are
        handled by OpenStreetMap under its own privacy policy:{" "}
        <a
          href="https://wiki.osmfoundation.org/wiki/Privacy_Policy"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand underline-offset-2 hover:underline"
        >
          https://wiki.osmfoundation.org/wiki/Privacy_Policy
        </a>
        .
      </p>
    ),
  },
  {
    title: "Data sharing",
    body: (
      <p className="mt-4 text-[19px] leading-[1.7] text-muted">
        We do not sell, rent, or share any user data with third parties, because the app
        does not collect any such data.
      </p>
    ),
  },
  {
    title: "Children's privacy",
    body: (
      <p className="mt-4 text-[19px] leading-[1.7] text-muted">
        The app is not directed at children under 13 and does not knowingly collect data
        from them.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    body: (
      <p className="mt-4 text-[19px] leading-[1.7] text-muted">
        We may update this policy from time to time. Changes will be posted on this page
        with an updated date above.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PageLayout>
      {/* Header */}
      <header className="mx-auto max-w-[820px] px-6 pt-12 pb-10 text-center lg:pt-16">
        <h1 className="text-[39px] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[53px]">
          Privacy Policy for Berrymarket
        </h1>
        <p className="mt-5 text-[17px] font-medium text-muted">Last updated: 14 June 2026</p>
        <p className="mt-5 text-[21px] leading-relaxed text-muted">
          This Privacy Policy explains how the Berrymarket app ("the app", "we") handles
          information. By using the app you agree to the practices described here.
        </p>
      </header>

      {/* Sections */}
      <section className="mx-auto max-w-[820px] px-6 pb-6">
        <div className="space-y-10">
          {SECTIONS.map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-[26px] font-bold tracking-[-0.01em] text-ink sm:text-[30px]">
                {title}
              </h2>
              {body}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-[820px] px-6 pb-20 pt-8">
        <div className="rounded-3xl bg-[#f3efe3] px-8 py-12 text-center lg:px-16">
          <h2 className="text-[30px] font-extrabold tracking-[-0.01em] text-ink sm:text-[34px]">
            Contact
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[18px] leading-relaxed text-muted">
            If you have questions about this policy, get in touch.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <a
              href="mailto:rgmunssel@gmail.com"
              className="inline-flex items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-6 py-3.5 text-[17px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink/30"
            >
              <Mail size={18} strokeWidth={2} className="text-brand" />
              rgmunssel@gmail.com
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
