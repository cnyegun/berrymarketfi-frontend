import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/** Shared chrome for content pages: solid sticky navbar + footer. */
export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <Navbar variant="solid" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
