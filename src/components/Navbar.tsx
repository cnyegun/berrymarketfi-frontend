import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", to: "/", end: true },
  { label: "How it works", to: "/how-it-works" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
  { label: "About us", to: "/about" },
];

export default function Navbar({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [open, setOpen] = useState(false);
  const solid = variant === "solid";

  return (
    <header
      className={
        solid
          ? "sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md"
          : "relative z-30"
      }
    >
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="Berrymarket home"
          onClick={() => setOpen(false)}
        >
          <img src="/logo.png" alt="Berrymarket" className="h-12 w-auto sm:h-16" />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block px-5 py-4 text-[17px] font-medium transition-colors duration-200 hover:text-brand ${
                    isActive ? "text-brand" : "text-ink/80"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop action */}
        <div className="hidden items-center lg:flex">
          <a
            href="#"
            className="rounded-[10px] bg-brand px-6 py-2.5 text-[17px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
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
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-[17px] font-medium hover:bg-brand-soft hover:text-brand ${
                      isActive ? "text-brand" : "text-ink/80"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-line pt-3">
            <a
              href="#"
              className="block rounded-[10px] bg-brand px-5 py-2.5 text-center text-[17px] font-semibold text-white"
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
