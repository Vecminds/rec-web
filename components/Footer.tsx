import Image from "next/image";
import Link from "next/link";
import { Mail, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background-darkest border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 — Wordmark + tagline */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-display font-bold text-xl text-text-primary hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded w-fit"
              aria-label="Recruitencer — home"
            >
              <Image
                src="/brand/Logo--white.png"
                alt="Logo"
                width={200}
                height={200}
                className="w-36 h-auto"
                priority
              />
            </Link>
            <p className="text-sm text-text-tertiary leading-relaxed max-w-[220px]">
              South Asia&apos;s tech talent.
              <br />
              Built for the world.
            </p>
          </div>

          {/* Column 2 — Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-widest">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3" role="list">
                {[
                  { href: "/", label: "Home" },
                  { href: "/companies", label: "For Companies" },
                  { href: "/talent", label: "For Talent" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-widest">
              Contact
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href="mailto:hello@recruitencer.com"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  aria-label="Email Recruitencer"
                >
                  <Mail
                    className="w-4 h-4 text-text-tertiary flex-shrink-0"
                    aria-hidden="true"
                  />
                  hello@recruitencer.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  aria-label="Recruitencer on LinkedIn (opens in new tab)"
                >
                  <Globe
                    className="w-4 h-4 text-text-tertiary flex-shrink-0"
                    aria-hidden="true"
                  />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-text-tertiary">
            © 2026 Recruitencer. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary">Kathmandu, Nepal</p>
        </div>
      </div>
    </footer>
  );
}
