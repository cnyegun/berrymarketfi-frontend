import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = ["How it works", "Pricing", "About us"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30">
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5">
        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center" aria-label="Berrymarket home">
          <img src="/logo.png" alt="Berrymarket" className="h-12 w-auto sm:h-16" />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="block px-5 py-4 text-[15px] font-medium text-ink/80 transition-colors duration-200 hover:text-brand"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop action */}
        <div className="hidden items-center lg:flex">
          <a
            href="#"
            className="rounded-[10px] bg-brand px-6 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            Sign up
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 bg-white/70 text-ink lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-4 mb-2 rounded-2xl border border-line bg-white/95 p-4 shadow-xl backdrop-blur lg:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink/80 hover:bg-brand-soft hover:text-brand"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-line pt-3">
            <a
              href="#"
              className="block rounded-[10px] bg-brand px-5 py-2.5 text-center text-[15px] font-semibold text-white"
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
