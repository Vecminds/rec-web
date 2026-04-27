"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  CheckCircle2,
  MessageSquare
} from "lucide-react";
import { TalentForm } from "@/components/TalentForm";
import { FooterMinimal } from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function TalentPageClient() {
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
            <div className="text-[11px] font-semibold text-gold-light uppercase tracking-[0.1em] mb-4">For talent</div>
            <h1 className="font-serif text-3xl leading-tight mb-4">Join our talent pool.</h1>
            <p className="text-[14px] text-white/50 font-light leading-relaxed">
              We connect engineers from Nepal and South Asia with remote-first
              global tech companies looking for mid-to-senior talent. Apply once —
              we do the matching.
            </p>
          </div>

          <div className="mb-10">
            <div className="text-[11px] font-semibold text-white/20 uppercase tracking-[0.08em] mb-4">What happens next</div>
            <div className="space-y-4">
              {[
                "We review your profile within 3 business days",
                "If there's a fit, we reach out to schedule a 30-min screening call",
                "We only submit your profile to roles you'd actually want",
                "We prep you for interviews with the specific company"
              ].map((text, i) => (
                <div key={i} className="flex gap-3.5 items-start py-3 border-b border-white/5 last:border-0">
                  <div className="w-6 h-6 rounded-full bg-[#f0b429]/15 border border-[#f0b429]/25 flex items-center justify-center shrink-0 mt-0.5 text-gold-light">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <div className="text-[13px] text-white/55 font-light leading-relaxed">
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f0b429]/5 border border-[#f0b429]/15 rounded-lg p-5 mb-10">
             <p className="text-[13px] text-white/50 leading-relaxed font-light">
               <strong className="text-gold-light font-semibold">No spam. No generic job alerts.</strong> We never share your
               profile without asking you first. You never pay us anything, ever.
             </p>
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
            <p className="text-[12px] text-white/25 leading-relaxed font-light flex items-center gap-2">
              <MessageSquare className="w-3 h-3 opacity-50" />
              Questions? Email us at
            </p>
            <a href="mailto:apply.recruitencer@gmail.com" className="text-[12px] text-white/40 hover:text-white transition-colors block mt-1">apply.recruitencer@gmail.com</a>
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
                  <h2 className="font-serif text-3xl text-navy mb-2">Your profile</h2>
                  <p className="text-sm text-text-secondary font-light">
                    All fields marked with <span className="text-red-600 font-medium">*</span> are required. Takes about 10 minutes.
                  </p>
                </div>

                <div className="bg-transparent">
                  <TalentForm onSubscribed={() => setIsSubmitted(true)} />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-[calc(100vh-60px)] flex items-center justify-center p-6"
              >
                <div className="bg-white border border-border rounded-xl p-12 max-w-[500px] w-full text-center shadow-card">
                  <div className="w-14 h-14 rounded-full bg-gold-light/10 border border-gold-light/20 flex items-center justify-center mx-auto mb-6 text-gold">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h2 className="font-serif text-2xl text-navy mb-3">You&apos;re in the pool.</h2>
                  <p className="text-[15px] text-text-secondary font-light leading-relaxed mb-8">
                    Your profile has been submitted. We review applications every week — here&apos;s what to expect:
                  </p>
                  
                  <div className="text-left space-y-0 mb-8 bg-background rounded-xl p-6 border border-border/50">
                    {[
                      { step: 1, title: "Within 3 business days", desc: "we review your profile and skills.", active: true },
                      { step: 2, title: "If there's a fit", desc: "we reach out to schedule a 30-min call. No fit? We'll let you know honestly." },
                      { step: 3, title: "Screening call", desc: "we get to know you, benchmark your salary, and understand what you actually want." },
                      { step: 4, title: "Role matching & prep", desc: "we match you to roles that fit, prep you for interviews, and stay with you through the offer." }
                    ].map(s => (
                      <div key={s.step} className="flex gap-4 items-start py-3.5 border-b border-border/50 last:border-0">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold ${s.active ? 'bg-navy text-white' : 'bg-white border border-border text-text-tertiary'}`}>
                          {s.step}
                        </div>
                        <div className="text-[13px] text-text-secondary font-light leading-relaxed">
                          <strong className="text-navy font-semibold">{s.title}</strong> — {s.desc}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[12px] text-text-tertiary font-light italic mb-8">
                    We will never share your profile without asking you first.
                  </p>

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
