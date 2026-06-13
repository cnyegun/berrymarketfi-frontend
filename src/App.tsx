import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import AudienceCards from "./components/AudienceCards";
import CommunityCTA from "./components/CommunityCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="font-sans text-ink">
      {/* ---------- Hero block (forest scene scoped to here) ---------- */}
      <div className="relative min-h-screen overflow-hidden bg-white">
        {/* Forest / lake scene bleeds in from the right, fades to white behind the copy */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_right]"
            style={{ backgroundImage: "url('/background.png')" }}
          />
          {/* Desktop wash: scene bleeds in from the right, copy stays white on the left */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(100deg,#ffffff 0%,#ffffff 33%,rgba(255,255,255,0.9) 44%,rgba(255,255,255,0.32) 58%,rgba(255,255,255,0) 72%)",
            }}
          />
          {/* Mobile/tablet wash: white through the copy, forest settles toward the bottom */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(180deg,#ffffff 0%,#ffffff 42%,rgba(255,255,255,0.92) 54%,rgba(255,255,255,0.55) 66%,rgba(255,255,255,0.12) 84%,rgba(255,255,255,0) 100%)",
            }}
          />
          {/* gentle top fade so the nav reads cleanly */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/80 to-transparent" />
          {/* soft white glow under the copy on the lower-left (desktop) */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "radial-gradient(110% 70% at -5% 95%, rgba(255,255,255,0.78), rgba(255,255,255,0) 52%)",
            }}
          />
        </div>

        <div className="relative z-10">
          <Navbar />
          <Hero />
        </div>
      </div>

      {/* ---------- Latter part of the landing page ---------- */}
      <Features />
      <HowItWorks />
      <AudienceCards />
      <CommunityCTA />
      <Footer />
    </div>
  );
}
