import { Link } from "react-router-dom";
import { Sprout, ShoppingBasket } from "lucide-react";
import PageLayout from "../components/PageLayout";

const STEPS = [
  {
    img: "/steps/1.png",
    title: "Find a spot",
    body: "Open the app and the forest reveals itself — trusted, generously fruiting spots close to home, each one accompanied by thoughtful community notes on yield, terrain and access, and quietly dependable offline maps for those deeper, signal-less corners. No more wondering which little grove is truly worth the journey.",
  },
  {
    img: "/steps/2.png",
    title: "Pick responsibly",
    body: "Such freedom is a quiet privilege, and it asks for a little tenderness in return. We share simple, thoughtful guidelines for sustainable picking, so the forest may keep giving faithfully, season after season — take only what you'll truly use or sell, leave plenty behind for others and for the year ahead, and tread softly around the land and its wildlife.",
  },
  {
    img: "/steps/3.png",
    title: "List your harvest",
    body: "Back at the trailhead, with the day's harvest still cool in your basket, listing it takes barely a minute — the kind of berry, the amount, a single sunlit photograph, and a price that is entirely, proudly your own. You decide its worth; no one quietly decides it for you.",
  },
  {
    img: "/steps/4.png",
    title: "Connect & earn",
    body: "Buyers — neighbouring households, beloved local restaurants, small juiceries and larger wholesalers alike — discover your listing, reach out with a warm message, and pay securely through the app. Verified profiles and honest reviews keep everyone accountable, so you are paid fairly, directly, and entirely without fuss.",
  },
];

const H2 = "mt-14 text-[24px] font-bold tracking-[-0.01em] text-ink sm:text-[28px]";
const P = "mt-5 text-[17px] leading-[1.75] text-muted";

export default function HowItWorksPage() {
  return (
    <PageLayout>
      {/* Article header */}
      <header className="mx-auto max-w-[760px] px-6 pt-12 pb-8 text-center lg:pt-16">
        <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[46px]">
          How Berrymarket works
        </h1>
        <p className="mt-5 text-[18px] leading-relaxed text-muted">
          Each summer, Finland's quiet forests offer up hundreds of millions of kilos of
          wild berries — and, almost unnoticed, most of them are simply left behind. This
          is the story of how we bring together the people who pick and the people
          who buy: openly, fairly, and without a single middleman slipping away with the
          forest's share.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] text-muted">
          <span className="font-semibold text-ink">The Berrymarket Team</span>
          <span aria-hidden>·</span>
          <span>Updated June 2026</span>
          <span aria-hidden>·</span>
          <span>6 min read</span>
        </div>
      </header>

      {/* Banner */}
      <div className="mx-auto max-w-[1080px] px-6">
        <div className="aspect-[16/7] overflow-hidden rounded-3xl">
          <img
            src="/background.webp"
            alt="Wild blueberries being picked in a Finnish forest"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <article className="mx-auto max-w-[720px] px-6 pb-4 pt-6">
        <h2 className={H2}>A forest full of value</h2>
        <p className={P}>
          Under <em>jokamiehenoikeus</em> — Finland's everyman's right — anyone at
          all may wander freely into the forest and gather its wild berries, entirely for
          free. Around three million Finns do exactly that each year; it is, quite simply,
          woven softly into who we are.
        </p>
        <p className={P}>
          And yet only a small fraction of that quiet abundance ever reaches a buyer. In
          2025, recorded commercial picking gathered roughly{" "}
          <strong>6.8 million kilos of bilberries</strong> and{" "}
          <strong>9.5 million kilos of lingonberries</strong> — and that is merely what was
          carefully counted. Millions of kilos more ripen softly, fall, and feed nothing
          but the patient soil. The berries are there. The longing for them is there. All
          that has ever been missing is a way to bring the two together.
        </p>

        <h2 className={H2}>A market that hasn't kept up</h2>
        <p className={P}>
          Today, the picking and selling of berries unfolds, rather sadly, in two broken
          places.
        </p>
        <p className={P}>
          The first is exploitation. So much of Finland's large-scale commercial harvest
          leans heavily on imported seasonal labour, and the industry has been deeply
          scarred by documented abuse — including human-trafficking convictions and painful,
          repeated accounts of workers left overworked and underpaid. It is a system that
          too often quietly fails the very people doing the hardest, most tender work.
        </p>
        <p className={P}>
          The second is a quieter kind of chaos. Independent pickers hoping to sell their
          own harvest find themselves scattered thinly across dozens of Facebook groups,
          stray Quora threads and word of mouth — with no agreed prices, no verified
          faces, and little to reassure the buyer. Berrymarket lovingly replaces both with a
          single, transparent home, built first and foremost for the people who actually do
          the picking.
        </p>

        <figure className="my-12 border-l-4 border-brand pl-6">
          <blockquote className="text-[22px] font-semibold leading-snug tracking-[-0.01em] text-ink">
            “A picker earns only about €2.39 for a kilo of bilberries that later sells,
            downstream, for more than €13. Selling directly closes that quiet,
            unfair gap.”
          </blockquote>
        </figure>

        <h2 className={H2}>How it works, step by step</h2>
        <p className={P}>
          Three simple things, gathered into one place — to <strong>find</strong>,
          to <strong>sell</strong>, and to <strong>buy</strong>. Here is the whole,
          unhurried journey, from forest floor to market.
        </p>

        <div className="mt-8 space-y-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col gap-5 rounded-2xl bg-[#f5f7f4] p-5 sm:flex-row sm:items-center sm:p-6"
            >
              <div className="relative h-24 w-24 shrink-0 self-center overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 sm:self-start">
                <img src={step.img} alt="" className="h-full w-full object-contain" />
                <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[12px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className={H2}>Why it's different</h2>
        <p className={P}>
          Berrymarket is not merely another buyer standing quietly between the picker and
          the market — it is the market itself, opened up and made kind. Pickers keep
          complete control of their prices, selling straight to the people who long
          for fresh, traceable, wholly wild Finnish berries. Buyers know precisely who
          picked their berries, and exactly where. And because every single person is
          verified and paid through the app, trust is woven in from the very first moment,
          rather than merely hoped for.
        </p>
        <p className={P}>
          The result is a far fairer sharing of the value the forest already gives so
          generously — a little more in the hands of pickers, a cleaner and more
          honest supply for buyers, and a market that Finland might, at last, be quietly
          proud of.
        </p>

        <p className="mt-12 border-t border-line pt-5 text-[13px] leading-relaxed text-muted/80">
          Picker prices, volumes and revenues are from MARSI 2025 by Ruokavirasto / Kantar Agri.
        </p>
      </article>

      {/* CTA */}
      <section className="mx-auto max-w-[1080px] px-6 pb-20 pt-6">
        <div className="rounded-3xl bg-[#f3efe3] px-8 py-12 text-center lg:px-16">
          <h2 className="text-[26px] font-extrabold tracking-[-0.01em] text-ink sm:text-[30px]">
            Find. Sell. Buy. All in one place.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-muted">
            Come and join the warm, growing community turning Finland's forests into
            fair, local value.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Sign up as a picker
              <Sprout size={19} strokeWidth={2} />
            </a>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink/30"
            >
              See pricing
              <ShoppingBasket size={19} strokeWidth={2} className="text-brand" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
