import { Leaf, ShieldCheck, Sprout, HandHeart, Mail, type LucideIcon } from "lucide-react";
import PageLayout from "../components/PageLayout";

const VALUES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: HandHeart, title: "Fair pay", desc: "Pickers set their own prices and keep the value the forest so freely gives." },
  { icon: Leaf, title: "100% wild", desc: "Truly wild berries from clean Finnish forests — each one traceable, lovingly, to the picker." },
  { icon: ShieldCheck, title: "Trusted", desc: "Verified people, safe and secure payments, and warmly transparent reviews." },
  { icon: Sprout, title: "Sustainable", desc: "Picking guidelines that keep the forest giving, faithfully, for generations to come." },
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Header */}
      <header className="mx-auto max-w-[820px] px-6 pt-12 pb-10 text-center lg:pt-16">
        <h1 className="text-[39px] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[53px]">
          A fairer home for Finland's wild berries
        </h1>
        <p className="mt-5 text-[21px] leading-relaxed text-muted">
          Berrymarket tenderly connects the millions of people who pick Finland's berries
          with the buyers who so dearly want them — directly, transparently, and always on
          the picker's own terms.
        </p>
      </header>

      {/* Story */}
      <section className="mx-auto max-w-[1080px] px-6 py-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl">
            <img
              src="/background.webp"
              alt="Wild blueberries in a Finnish forest"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-[30px] font-bold tracking-[-0.01em] text-ink sm:text-[34px]">
              Why we started
            </h2>
            <p className="mt-5 text-[19px] leading-[1.7] text-muted">
              Finland's forests give so freely and so quietly — and yet the market that has
              grown up around them has long been broken. Large-scale picking has been marred
              by labour exploitation, and even by human-trafficking convictions, while
              independent pickers are left to sell their precious harvest through scattered
              Facebook groups, with no settled prices and very little trust.
            </p>
            <p className="mt-4 text-[19px] leading-[1.7] text-muted">
              We believe, deeply, that the value the forest so patiently produces ought to
              reach the very people who do the picking. And so we lovingly built a single
              platform — a place to find spots, to sell harvests, and to buy fresh,
              traceable berries — fairly, and entirely in the open.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1080px] px-6 py-14">
        <h2 className="text-center text-[30px] font-extrabold tracking-[-0.01em] text-ink sm:text-[34px]">
          What we stand for
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <Icon size={32} strokeWidth={1.5} className="text-brand" />
              <h3 className="mt-4 text-[18px] font-bold text-ink">{title}</h3>
              <p className="mt-2 max-w-[230px] text-[16px] leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-[1080px] px-6 pb-20 pt-2">
        <div className="rounded-3xl bg-[#f3efe3] px-8 py-12 text-center lg:px-16">
          <h2 className="text-[30px] font-extrabold tracking-[-0.01em] text-ink sm:text-[34px]">
            Want to be part of it?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[18px] leading-relaxed text-muted">
            Whether you pick or buy, there is always a warm place for you in
            our community.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand px-6 py-3.5 text-[17px] font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Sign up
            </a>
            <a
              href="mailto:hello@berrymarket.fi"
              className="inline-flex items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-6 py-3.5 text-[17px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink/30"
            >
              <Mail size={18} strokeWidth={2} className="text-brand" />
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
