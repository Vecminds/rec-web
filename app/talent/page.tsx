import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { TalentForm } from "@/components/TalentForm";

export const metadata: Metadata = {
  title: "Join our talent pool — Recruitencer",
  description:
    "Mid-to-senior engineers from Nepal and South Asia: join Recruitencer's talent pool and connect with remote-first global tech companies.",
};

const benefits = [
  "We review your profile within 3 business days",
  "If there's a match, we reach out directly",
  "No spam. No generic job alerts.",
];

export default function TalentPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left panel — brand context ─────────────────────────────────── */}
      <aside className="lg:w-[420px] lg:min-h-screen bg-background-dark border-b lg:border-b-0 lg:border-r border-border flex flex-col px-10 py-12 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="flex flex-col flex-1">
          {/* Back + Logo row */}
          <div className="flex items-center gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Image
              src="/brand/Logo--white.png"
              alt="Recruitencer"
              width={140}
              height={28}
              className="w-28 h-auto opacity-70"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-widest block mb-4">
                For talent
              </span>
              <h1 className="font-display font-bold text-3xl text-white mb-4 leading-tight">
                Join our talent pool.
              </h1>
              <p className="text-white/70 text-base leading-relaxed">
                We connect engineers from Nepal and South Asia with remote-first
                global tech companies looking for mid-to-senior talent.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                What happens next
              </p>
              <ul className="flex flex-col gap-4" role="list">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-white/70 leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right panel — form ─────────────────────────────────────────── */}
      <main className="flex-1 px-6 md:px-10 lg:px-16 py-16 bg-white">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="mb-10">
            <h2 className="font-display font-bold text-2xl text-text-primary mb-2">
              Your profile
            </h2>
            <p className="text-sm text-text-tertiary">
              All fields marked with{" "}
              <span className="text-accent font-medium" aria-label="required">*</span>{" "}
              are required.
            </p>
          </div>
          <TalentForm />
        </div>
      </main>
    </div>
  );
}
