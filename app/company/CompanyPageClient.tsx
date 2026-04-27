"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  Users, 
  Star,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import { CompanyForm } from "@/components/CompanyForm";
import { FooterMinimal } from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function CompanyPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="bg-background min-h-screen text-text-primary selection:bg-brand/10">
      {/* ── TOP NAV ── */}
      <nav className="fixed top-0 left-0 right-0 h-[60px] bg-navy z-[100] flex items-center px-6 md:px-12 border-b border-white/10">
        <div className="flex items-center gap-6 w-full max-w-full">
          <Link href="/" className="text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-px h-5 bg-white/10" />
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/brand/Logo--white.png"
              alt="Recruitencer"
              width={140}
              height={26}
              className="h-[22px] w-auto block"
              style={{ height: "auto" }}
            />
          </Link>
        </div>
      </nav>

      <div className="pt-[60px] grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-screen">
        {/* ── SIDEBAR ── */}
        <aside className="bg-navy text-white p-10 md:p-12 lg:sticky lg:top-[60px] lg:h-[calc(100vh-60px)] overflow-y-auto flex flex-col">
          <div className="mb-10">
            <div className="text-[11px] font-semibold text-gold-light uppercase tracking-[0.1em] mb-4">For company</div>
            <h1 className="font-serif text-3xl leading-tight mb-4">Tell us what you need.</h1>
            <p className="text-[14px] text-white/50 font-light leading-relaxed">
              We&apos;ll source, screen, and deliver a shortlist of vetted engineers —
              typically within 7–10 business days. No fee unless you hire.
            </p>
          </div>

          <div className="mb-10">
            <div className="text-[11px] font-semibold text-white/20 uppercase tracking-[0.08em] mb-4">Why Recruitencer</div>
            <div className="space-y-6">
              {[
                {
                  icon: <Star className="w-3.5 h-3.5" />,
                  text: "Specialist in South Asian tech talent — not a generalist recruiter"
                },
                {
                  icon: <Users className="w-3.5 h-3.5" />,
                  text: "Mid-to-senior engineers only — no entry-level, no volume plays"
                },
                {
                  icon: <ShieldCheck className="w-3.5 h-3.5" />,
                  text: "15% of first-year salary. 90-day replacement guarantee. $0 if no hire."
                }
              ].map((point, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-gold-light">
                    {point.icon}
                  </div>
                  <div className="text-[13px] text-white/55 font-light leading-relaxed pt-0.5">
                    {point.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
            <p className="text-[12px] text-white/25 leading-relaxed font-light flex items-center gap-2">
              <MessageSquare className="w-3 h-3 opacity-50" />
              Questions? Email us at
            </p>
            <a href="mailto:hire.recruitencer@gmail.com" className="text-[12px] text-white/40 hover:text-white transition-colors block mt-1">hire.recruitencer@gmail.com</a>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="bg-background">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="form"
                initial="hidden" animate="visible" exit="hidden" variants={fadeUp}
                className="pt-14 pb-16 px-8 md:px-16 max-w-[760px]"
              >
                <div className="mb-12">
                  <h2 className="font-serif text-3xl text-navy mb-2">Hiring request</h2>
                  <p className="text-sm text-text-secondary font-light">
                    All fields marked with <span className="text-red-600 font-medium">*</span> are required.
                  </p>
                </div>

                <div className="bg-transparent">
                  <CompanyForm onSubscribed={() => setIsSubmitted(true)} />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-[calc(100vh-60px)] flex items-center justify-center p-6"
              >
                <div className="bg-white border border-border rounded-xl p-12 max-w-[480px] w-full text-center">
                  <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-6 text-success">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h2 className="font-serif text-2xl text-navy mb-3">Request received.</h2>
                  <p className="text-[15px] text-text-secondary font-light leading-relaxed mb-10">
                    We&apos;ve got your brief and we&apos;re already on it. Here&apos;s what happens next:
                  </p>
                  
                  <div className="text-left space-y-4 mb-10">
                    {[
                      { step: 1, title: "Within 24 hours", desc: "we'll review your brief and follow up with any clarifying questions." },
                      { step: 2, title: "Day 2–3", desc: "we confirm the brief, align on the role, and start sourcing." },
                      { step: 3, title: "Day 5–7", desc: "you receive a shortlist of 3–5 vetted profiles with our written assessment." }
                    ].map(s => (
                      <div key={s.step} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-navy text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {s.step}
                        </div>
                        <div className="text-[14px] text-text-secondary font-light leading-relaxed">
                          <strong className="text-navy font-semibold">{s.title}</strong> — {s.desc}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:underline transition-all group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back to home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* ── FOOTER ── */}
      <FooterMinimal />
    </div>
  );
}
