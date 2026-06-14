import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Mail, type LucideIcon } from "lucide-react";

type FooterLink = { label: string; to?: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [{ label: "About us", to: "/about" }, { label: "Blog", to: "/blog" }, { label: "Careers" }],
  },
  { title: "Support", links: [{ label: "Help center" }, { label: "Contact" }, { label: "Safety" }] },
  { title: "Legal", links: [{ label: "Terms" }, { label: "Privacy", to: "/privacy" }, { label: "Cookies" }] },
];

const SOCIALS: { icon: LucideIcon; label: string }[] = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white py-12 lg:py-14">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-[1.7fr_1fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <img src="/logo.png" alt="Berrymarket" className="h-9 w-auto" />
            <p className="mt-4 max-w-[210px] text-[16px] leading-relaxed text-muted">
              Building the bridge between nature and value.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[16px] font-bold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to} className="text-[16px] text-muted transition-colors hover:text-brand">
                        {l.label}
                      </Link>
                    ) : (
                      <a href="#" className="text-[16px] text-muted transition-colors hover:text-brand">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h4 className="text-[16px] font-bold text-ink">Follow us</h4>
            <div className="mt-4 flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-ink transition-colors hover:bg-brand hover:text-white"
                >
                  <Icon size={17} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
