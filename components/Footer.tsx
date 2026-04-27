import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Column 1 — Logo + socials */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              <Image
                src="/brand/Logo--white.png"
                alt="Recruitencer"
                width={160}
                height={32}
                className="h-7 w-auto block"
                style={{ height: "auto" }}
              />
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-6 font-light">
              South Asia&apos;s tech talent.
              <br />
              Built for the world.
            </p>
            <div className="flex gap-2">
              {[
                {
                  href: "https://www.facebook.com/Recruitencer/",
                  label: "Facebook",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.instagram.com/Recruitencer/",
                  label: "Instagram",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.1em] mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/company", label: "For companies" },
                { href: "/talent", label: "For talent" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.1em] mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "#", label: "How it works" },
                { href: "#", label: "Roles we fill" },
                { href: "#", label: "Why South Asia" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.1em] mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="mailto:hire.apply.recruitencer@gmail.com"
                  className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors duration-200 font-light truncate max-w-full"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  hire.apply.recruitencer@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:apply.recruitencer@gmail.com"
                  className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors duration-200 font-light truncate max-w-full"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  apply.recruitencer@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-[12px] text-white/20 font-light">
          <span>© 2026 Recruitencer. All rights reserved.</span>
          <span>Kathmandu, Nepal</span>
        </div>
      </div>
    </footer>
  );
}

export function FooterMinimal() {
  return (
    <footer className="bg-navy py-10 px-6 md:px-12 border-t border-white/5">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <Link href="/">
          <Image
            src="/brand/Logo--white.png"
            alt="Recruitencer"
            width={120}
            height={22}
            className="h-[18px] w-auto block opacity-60"
            style={{ height: "auto" }}
          />
        </Link>
        <div className="flex gap-8">
          <Link
            href="/"
            className="text-[13px] text-white/30 hover:text-white/60 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/company"
            className="text-[13px] text-white/30 hover:text-white/60 transition-colors"
          >
            For companies
          </Link>
          <Link
            href="/talent"
            className="text-[13px] text-white/30 hover:text-white/60 transition-colors"
          >
            For talent
          </Link>
        </div>
        <p className="text-[12px] text-white/20 font-light">
          © 2026 Recruitencer · Kathmandu, Nepal
        </p>
      </div>
    </footer>
  );
}
