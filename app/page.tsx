"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Navbar } from "@/components/Navbar";

// ─── Animation helpers ──────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
  }),
};

// ─── Data ─────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Brief us",
    description:
      "Share the role, team context, and what good looks like. A 15-minute call or a written brief — whatever works for you.",
  },
  {
    number: "02",
    title: "We source",
    description:
      "AI-assisted sourcing and screening across Nepal and South Asia. We filter for quality, not volume.",
  },
  {
    number: "03",
    title: "You hire",
    description:
      "Review a shortlist of 3–5 vetted, prepared candidates. You choose — we handle the rest.",
  },
];

const roles = [
  {
    title: "Backend Engineers",
    description: "APIs, databases, distributed systems, and server-side logic",
  },
  {
    title: "Fullstack Engineers",
    description: "End-to-end product development across web stacks",
  },
  {
    title: "AI / ML Engineers",
    description: "LLMs, model training, MLOps, and AI product integration",
  },
  {
    title: "DevOps & Cloud Engineers",
    description: "Infrastructure, CI/CD, Kubernetes, and cloud platforms",
  },
  {
    title: "Data Engineers",
    description: "Pipelines, warehouses, and data platform engineering",
  },
  {
    title: "Frontend Engineers",
    description: "Performant, accessible UIs with modern JS frameworks",
  },
];

const whyStats = [
  {
    title: "Strong engineering culture",
    description:
      "Top universities producing CS graduates aligned with global standards — Tribhuvan University, Kathmandu University, and others produce thousands of CS graduates annually.",
  },
  {
    title: "Remote-ready",
    description:
      "Professionals experienced working across time zones with global teams. Strong English communication and async-first working styles.",
  },
  {
    title: "Underrepresented on global platforms",
    description:
      "High-quality talent not yet visible to most hiring managers. Recruitencer gives you early access to engineers others haven't found yet.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* ── 1. Hero ────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center dot-grid overflow-hidden">
        {/* Subtle brand glow */}
        <div
          className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(16,39,112,0.04) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        {/* Gold accent glow */}
        <div
          className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(242,174,28,0.06) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16 w-full">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand bg-brand-lighter border border-brand/15 rounded-full px-4 py-2 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                Nepal &amp; South Asia
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-text-primary mb-6"
            >
              Mid-to-senior engineers
              <br />
              <span className="text-brand">from South Asia.</span>
              <br />
              Ready to work with
              <br />
              the world.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl"
            >
              We source, screen, and prepare software engineers, AI/ML
              practitioners, and DevOps specialists from Nepal and South Asia for
              remote-first global companies.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap gap-4 mb-16">
              <Link
                href="/companies"
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Hire talent
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/talent"
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                Join talent pool
                <ChevronRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Stat row */}
            <motion.div
              variants={fadeUp}
              custom={0.4}
              className="flex flex-wrap gap-8 pt-8 border-t border-border"
            >
              {[
                { value: "Mid–Senior", label: "Seniority focus" },
                { value: "7–10 days", label: "Avg. time to shortlist" },
                { value: "Nepal & SA", label: "Talent source" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-display font-bold text-xl text-text-primary">{stat.value}</span>
                  <span className="text-xs text-text-tertiary uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. How it works ───────────────────────────────────────────── */}
      <section className="bg-background-alt section-padding" aria-labelledby="how-it-works-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <motion.p
              variants={fadeIn}
              custom={0}
              className="text-xs font-semibold text-brand uppercase tracking-widest mb-3"
            >
              Process
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              id="how-it-works-heading"
              className="font-display font-bold text-3xl md:text-4xl text-text-primary"
            >
              How Recruitencer works
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
            {/* Connector line on desktop */}
            <div
              className="hidden md:block absolute top-10 left-[calc(33.33%+24px)] right-[calc(33.33%+24px)] h-px bg-border"
              aria-hidden="true"
            />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={i * 0.1}
                className="relative bg-white border border-border rounded-2xl p-8 hover:border-brand/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl font-display font-bold text-brand/15 mb-4 select-none">
                  {step.number}
                </div>
                <h3 className="font-display font-semibold text-xl text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Roles we specialize in ──────────────────────────────────── */}
      <section className="section-padding" aria-labelledby="roles-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <motion.p
              variants={fadeIn}
              custom={0}
              className="text-xs font-semibold text-brand uppercase tracking-widest mb-3"
            >
              Specializations
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              id="roles-heading"
              className="font-display font-bold text-3xl md:text-4xl text-text-primary"
            >
              Roles we specialize in
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i * 0.08}
                className="group bg-white border border-border rounded-2xl p-6 hover:border-brand/20 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-base text-text-primary group-hover:text-brand transition-colors duration-200">
                    {role.title}
                  </h3>
                  <div
                    className="w-2 h-2 rounded-full bg-brand/15 group-hover:bg-accent transition-colors duration-200 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {role.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Seniority note */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0.4}
            className="mt-10 text-sm text-text-tertiary text-center"
          >
            We focus on{" "}
            <span className="text-text-primary font-medium">
              mid-level (2–5 years)
            </span>{" "}
            and{" "}
            <span className="text-text-primary font-medium">
              senior/lead (5–8 years)
            </span>{" "}
            engineers.
          </motion.p>
        </div>
      </section>

      {/* ── 4. Why South Asia ─────────────────────────────────────────── */}
      <section
        className="bg-background-alt section-padding"
        aria-labelledby="why-south-asia-heading"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <motion.p
              variants={fadeIn}
              custom={0}
              className="text-xs font-semibold text-brand uppercase tracking-widest mb-3"
            >
              Context
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              id="why-south-asia-heading"
              className="font-display font-bold text-3xl md:text-4xl text-text-primary"
            >
              Why Nepal &amp; South Asia
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyStats.map((stat, i) => (
              <motion.div
                key={stat.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i * 0.1}
                className="flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-lighter border border-brand/15 flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-brand" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. For engineers (secondary CTA) ─────────────────────────── */}
      <section
        className="bg-white section-padding border-t border-border"
        aria-labelledby="for-engineers-heading"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeIn}
              custom={0}
              className="text-xs font-semibold text-brand uppercase tracking-widest mb-4"
            >
              For engineers
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              id="for-engineers-heading"
              className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-5"
            >
              Are you an engineer in Nepal or South Asia?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-text-secondary text-lg leading-relaxed mb-8"
            >
              We work with a curated pool of mid-to-senior tech professionals.
              If you&apos;re open to remote global opportunities, join our talent
              pool.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.3}>
              <Link
                href="/talent"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Join the talent pool
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Final CTA ──────────────────────────────────────────────── */}
      <section
        className="relative bg-background-dark section-padding overflow-hidden"
        aria-labelledby="final-cta-heading"
      >
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(242,174,28,0.1) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              id="final-cta-heading"
              className="font-display font-bold text-4xl md:text-5xl text-white mb-5"
            >
              Ready to hire?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="text-white/70 text-lg mb-10 max-w-md mx-auto"
            >
              Tell us what you&apos;re looking for. We&apos;ll come back with a plan.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.2}>
              <Link
                href="/companies"
                className="inline-flex items-center justify-center font-sans font-semibold rounded-lg transition-all duration-200 bg-accent text-background-dark hover:bg-accent-hover shadow-sm hover:shadow-md px-8 py-4 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
              >
                Get started
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
