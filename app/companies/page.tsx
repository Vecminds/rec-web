import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Users, BadgeDollarSign } from "lucide-react";
import { CompanyForm } from "@/components/CompanyForm";

export const metadata: Metadata = {
  title: "Hire South Asian tech talent — Recruitencer",
  description:
    "Submit a hiring request and receive a shortlist of vetted mid-to-senior software engineers, AI/ML practitioners, and DevOps specialists from Nepal and South Asia.",
};

const trustSignals = [
  {
    icon: ShieldCheck,
    text: "Specialist in South Asian tech talent",
  },
  {
    icon: Users,
    text: "Mid-to-senior engineers only",
  },
  {
    icon: BadgeDollarSign,
    text: "Placement fee: 15% of first-year salary, 90-day replacement guarantee",
  },
];

export default function CompaniesPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left panel — brand context ─────────────────────────────────── */}
      <aside className="lg:w-[420px] lg:min-h-screen bg-background-dark border-b lg:border-b-0 lg:border-r border-border flex flex-col px-10 py-16 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="flex flex-col flex-1">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-accent/50 hover:bg-accent/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent mb-12"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>

          <div className="flex flex-col gap-8">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-widest block mb-4">
                For companies
              </span>
              <h1 className="font-display font-bold text-3xl text-text-primary mb-4 leading-tight">
                Tell us what you need.
              </h1>
              <p className="text-text-secondary text-base leading-relaxed">
                We&apos;ll source, screen, and deliver a shortlist of vetted
                engineers — typically within 7–10 business days.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest">
                Why Recruitencer
              </p>
              <ul className="flex flex-col gap-5" role="list">
                {trustSignals.map((signal, i) => {
                  const Icon = signal.icon;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon
                          className="w-4 h-4 text-accent"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-sm text-text-secondary leading-relaxed">
                        {signal.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right panel — form ─────────────────────────────────────────── */}
      <main className="flex-1 px-6 md:px-10 lg:px-16 py-16">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="mb-10">
            <h2 className="font-display font-bold text-2xl text-text-primary mb-2">
              Hiring request
            </h2>
            <p className="text-sm text-text-tertiary">
              All fields marked with{" "}
              <span className="text-accent font-medium" aria-label="required">*</span>{" "}
              are required.
            </p>
          </div>
          <CompanyForm />
        </div>
      </main>
    </div>
  );
}
