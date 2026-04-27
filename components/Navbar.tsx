"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] h-[64px] flex items-center border-b border-border-light transition-all duration-300"
        style={{
          background: "rgba(247, 244, 238, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <nav
          className="w-full max-w-[1200px] mx-auto flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded shrink-0"
            aria-label="Recruitencer — home"
          >
            <Image
              src="/brand/Logo.png"
              alt="Recruitencer"
              width={160}
              height={32}
              className="h-8 w-auto block"
              style={{ height: "auto" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8" role="list">
              <li>
                <Link
                  href="/company"
                  className="text-[14px] font-[400] text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  For companies
                </Link>
              </li>
              <li>
                <Link
                  href="/talent"
                  className="text-[14px] font-[400] text-gold hover:text-gold-light transition-colors duration-200"
                >
                  For talent
                </Link>
              </li>
            </ul>
            <Link
              href="/company"
              className="bg-navy hover:bg-blue text-white px-[22px] py-[9px] rounded text-[14px] font-[500] transition-colors duration-200 tracking-[-0.01em]"
            >
              Hire engineers →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen ? "true" : "false"}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile slide-in overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[110] md:hidden transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#f7f4ee] border-l border-border flex flex-col transition-transform duration-300 ease-out shadow-xl ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-16 flex items-center justify-end px-6 border-b border-border-light">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <nav
            className="flex flex-col px-6 pt-4 gap-4"
            aria-label="Mobile navigation"
          >
            <Link
              href="/company"
              className="text-base font-medium py-3 border-b border-border-light text-text-secondary hover:text-text-primary transition-colors"
            >
              For companies
            </Link>
            <Link
              href="/talent"
              className="text-base font-medium py-3 border-b border-border-light text-gold hover:text-gold-light transition-colors"
            >
              For talent
            </Link>
            <Link
              href="/company"
              className="bg-navy hover:bg-blue text-white px-5 py-3 rounded text-center text-sm font-medium transition-colors duration-200 mt-4"
            >
              Hire engineers →
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
