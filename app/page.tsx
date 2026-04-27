"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Code,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  MessageSquare,
  Monitor,
  Smartphone,
  Users,
  Zap,
  BarChart,
  Server,
  Terminal,
  FileText,
  Filter,
} from "lucide-react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  }),
};

// ─── Data ─────────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "We'd tried three agencies before Recruitencer. They sent five candidates — we hired two. The quality difference was obvious from the first call.",
    attr: "— CTO, Series B fintech startup, Berlin",
  },
  {
    quote:
      "The engineers we interviewed were genuinely mid-senior level — not the junior candidates other agencies had been sending us dressed up as seniors.",
    attr: "— VP Engineering, SaaS company, Amsterdam",
  },
  {
    quote:
      "Remote-ready means something different here. These engineers had async habits from day one — documentation, communication, ownership. No hand-holding needed.",
    attr: "— Head of Engineering, fintech startup, London",
  },
  {
    quote:
      "We were sceptical about hiring from a region we hadn't recruited from before. Three months in, our South Asia hire is one of the strongest engineers on the team.",
    attr: "— CTO, early-stage startup, San Francisco",
  },
];

const coreRoles = [
  {
    title: "Backend engineers",
    desc: "Python, Go, Node — distributed systems, APIs, server-side architecture. People who think about scale.",
    icon: <Terminal className="w-4 h-4" />,
  },
  {
    title: "Fullstack engineers",
    desc: "Product engineers who own features end to end. React + backend, shipped to production, not just prototyped.",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    title: "AI / ML engineers",
    desc: "Model training, LLMs, MLOps, AI product integration. Not just prompt wrappers — real ML engineering depth.",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    title: "DevOps & cloud engineers",
    desc: "AWS/GCP/Azure, Kubernetes, CI/CD — people who've been on-call, handled incidents, and built for reliability.",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    title: "Data engineers",
    desc: "Pipelines, warehouses, dbt, Spark — engineers who make data actually usable rather than just collected.",
    icon: <Database className="w-4 h-4" />,
  },
  {
    title: "Frontend engineers",
    desc: "React, Vue, TypeScript — performance-conscious, accessibility-aware, production-grade UI engineering.",
    icon: <Code className="w-4 h-4" />,
  },
];

const extraRoles = [
  {
    title: "QA & automation engineers",
    desc: "Selenium, Playwright, Cypress, Jest — engineers who own quality end to end, not just run test scripts.",
    icon: <Check className="w-4 h-4" />,
  },
  {
    title: "Security engineers",
    desc: "AppSec, penetration testing, cloud security, compliance — engineers who think like attackers and build like defenders.",
    icon: <Lock className="w-4 h-4" />,
  },
  {
    title: "Mobile engineers",
    desc: "iOS (Swift), Android (Kotlin), React Native, Flutter — engineers who've shipped apps with real users, not just demos.",
    icon: <Smartphone className="w-4 h-4" />,
  },
  {
    title: "Data scientists & analysts",
    desc: "Python, R, SQL, Tableau — people who turn raw data into decisions, not just dashboards nobody looks at.",
    icon: <BarChart className="w-4 h-4" />,
  },
  {
    title: "Platform & SRE engineers",
    desc: "Internal developer platforms, reliability engineering, observability — people who make other engineers faster.",
    icon: <Code className="w-4 h-4" />,
  },
  {
    title: "Blockchain & Web3 engineers",
    desc: "Solidity, Rust, EVM-compatible chains, smart contract auditing — engineers with real on-chain production experience.",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    title: "Embedded & systems engineers",
    desc: "C, C++, Rust, RTOS — engineers working close to the metal, from firmware to real-time operating systems.",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    title: "Engineering managers",
    desc: "Technical leads ready to manage distributed teams — hands-on enough to earn respect, organized enough to unblock everyone.",
    icon: <Users className="w-4 h-4" />,
  },
];

// ─── Components ───────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showAllRoles, setShowAllRoles] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background text-text-primary selection:bg-brand/10 selection:text-brand">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-32 pb-20 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-[-200px] right-[-300px] w-[900px] h-[900px] bg-[radial-gradient(circle,_rgba(41,82,204,0.07)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-24 items-center">
          <motion.div initial="hidden" animate="visible">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 bg-white border border-border px-3.5 py-1.5 rounded-full text-[12px] font-medium text-text-secondary mb-8 tracking-wide shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Nepal & South Asia · Trusted by 40+ remote-first teams
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-[clamp(38px,5.5vw,68px)] leading-[1.08] text-brand tracking-tight mb-6"
            >
              Stop interviewing
              <br />
              engineers who
              <br />
              <em className="italic text-brand-blue">almost</em> fit.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-[17px] leading-relaxed text-text-secondary max-w-[520px] mb-10 font-light"
            >
              Get a vetted shortlist of 3–5 mid-to-senior engineers in 7 days.
              We source, screen, and prepare software engineers, AI/ML
              practitioners, and DevOps specialists from South Asia — so you
              only talk to people worth hiring.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-3.5 mb-14"
            >
              <Link
                href="/company"
                className="bg-brand-blue hover:bg-brand-mid text-white px-7 py-3.5 rounded font-medium text-[15px] transition-all duration-200 hover:-translate-y-px tracking-tight flex items-center gap-2"
              >
                Hire engineers →
              </Link>
              <Link
                href="/talent"
                className="bg-transparent border-[1.5px] border-accent text-accent hover:bg-accent/5 px-7 py-3.5 rounded font-medium text-[15px] transition-all duration-200 hover:-translate-y-px flex items-center gap-2"
              >
                I&apos;m an engineer →
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap gap-10 pt-8 border-t border-border"
            >
              {[
                { num: "7 days", lbl: "Avg. time to shortlist" },
                { num: "3–5", lbl: "Vetted candidates" },
                { num: "$0", lbl: "Fee if no hire" },
                { num: "94%", lbl: "Retention at 12mo" },
              ].map((stat) => (
                <div key={stat.lbl}>
                  <div className="font-serif text-[28px] text-brand leading-none mb-1">
                    {stat.num}
                  </div>
                  <div className="text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.06em]">
                    {stat.lbl}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="bg-white border border-border rounded-2xl p-8 shadow-card">
              <div className="text-[11px] font-semibold text-accent uppercase tracking-[0.1em] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                How it works
              </div>

              <div className="space-y-0 mb-6">
                {[
                  {
                    title: "Brief us — 15 min",
                    desc: "Share the role, seniority, stack, and what great looks like. Call or written form — your choice.",
                    day: "Day 1",
                    icon: (
                      <div className="w-9 h-9 rounded-full bg-cream-dark border border-border flex items-center justify-center text-text-secondary">
                        <FileText className="w-4 h-4" />
                      </div>
                    ),
                    dayStyle: "bg-cream-dark text-text-secondary",
                  },
                  {
                    title: "We filter — you don't",
                    desc: "AI sourcing + human screening across our South Asia network. ~90% of applicants turned away.",
                    day: "Day 2–5",
                    icon: (
                      <div className="w-9 h-9 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                        <Filter className="w-4 h-4" />
                      </div>
                    ),
                    dayStyle: "bg-brand/10 text-brand",
                  },
                  {
                    title: "You receive 3–5 vetted profiles",
                    desc: "Interview who you like. Skip who you don't. We handle the rest.",
                    day: "Day 7",
                    icon: (
                      <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                        <Check className="w-4 h-4" />
                      </div>
                    ),
                    dayStyle: "bg-accent/10 text-accent",
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + idx * 0.2, duration: 0.45 }}
                    className={`flex gap-3.5 items-start py-3.5 ${idx !== 2 ? "border-b border-border-light" : ""}`}
                  >
                    {step.icon}
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-brand mb-0.5">
                        {step.title}
                      </div>
                      <div className="text-[12px] text-text-secondary leading-relaxed font-light">
                        {step.desc}
                      </div>
                    </div>
                    <div
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 mt-0.5 ${step.dayStyle}`}
                    >
                      {step.day}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-px bg-border-light border border-border-light rounded-lg overflow-hidden">
                {[
                  { num: "7", unit: "d", lbl: "Avg. to shortlist" },
                  { num: "90", unit: "%", lbl: "Applicants filtered" },
                  { num: "$", unit: "0", lbl: "Fee if no hire" },
                ].map((metric) => (
                  <div
                    key={metric.lbl}
                    className="bg-background py-3 text-center"
                  >
                    <div className="font-serif text-[20px] text-brand leading-none mb-1">
                      {metric.num === "$" ? metric.num : ""}
                      {metric.num === "$" ? metric.unit : metric.num}
                      <span className="text-accent">
                        {metric.num === "$" ? "" : metric.unit}
                      </span>
                    </div>
                    <div className="text-[10px] text-text-tertiary uppercase tracking-wider leading-tight">
                      {metric.lbl}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROOF STRIP ── */}
      {/* <section className="bg-brand py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="font-serif text-[18px] text-white tracking-tight leading-none mb-2">
              Nepal & <span className="text-gold-light">SA</span>
            </div>
            <div className="text-[13px] text-white/50 font-light leading-relaxed">
              Talent sourced exclusively
              <br />
              from South Asia
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div className="font-serif text-[40px] text-white leading-none mb-2">
              Mid<span className="text-gold-light">–</span>Senior
            </div>
            <div className="text-[13px] text-white/50 font-light leading-relaxed">
              Only 2–8 year engineers.
              <br />
              No entry-level, ever.
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div className="font-serif text-[40px] text-white leading-none mb-2">
              $<span className="text-gold-light">0</span>
            </div>
            <div className="text-[13px] text-white/50 font-light leading-relaxed">
              Upfront fee.
              <br />
              Pay only when you hire.
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-6 relative min-h-[140px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-serif text-[18px] italic text-white/90 leading-relaxed mb-3">
                  &quot;{testimonials[activeTestimonial].quote}&quot;
                </p>
                <div className="text-[12px] text-white/40 font-light">
                  {testimonials[activeTestimonial].attr}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-1.5 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? "bg-gold-light scale-125" : "bg-white/20"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* ── PROBLEM SECTION ── */}
      <section id="aboutus" className="py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="text-[11px] font-semibold text-accent uppercase tracking-[0.1em] mb-4">
              Why this exists
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] leading-[1.15] text-brand tracking-tight">
              The best engineers from South Asia are being filtered out before
              you see them.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="space-y-6"
          >
            <div className="text-[16px] text-text-secondary leading-loose font-light">
              <p>
                Top engineers from Nepal, India, and Bangladesh are applying to
                your roles — and getting screened out by ATS systems that
                don&apos;t recognize their universities. The ones who make it
                through are often lowballed because nobody benchmarked the
                market honestly.
              </p>
              <p className="mt-5">
                Recruitencer fixes both ends: we identify engineers who are
                genuinely mid-to-senior level, and we prepare them to show up
                the way global companies expect. You get the candidate. They get
                a fair shot.
              </p>
            </div>
            <div className="bg-cream-dark border-l-[3px] border-accent p-6 rounded-r-lg font-serif text-[20px] text-brand italic leading-relaxed">
              &quot;High-quality talent not yet visible to most hiring
              managers.&quot;
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS SECTION ── */}
      <section id="process" className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mb-12"
          >
            <div className="text-[11px] font-semibold text-accent uppercase tracking-[0.1em] mb-4">
              Process
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] leading-[1.15] text-brand tracking-tight mb-3">
              From brief to shortlist in one week.
            </h2>
            <p className="text-[16px] text-text-secondary font-light">
              Three steps. No retainers, no upfront fees, no spam.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-border rounded-lg overflow-hidden mb-6">
            {[
              {
                num: "01",
                title: "Brief us — 15 minutes",
                desc: "A quick call or written form. Tell us the role, team context, must-haves, and dealbreakers. We'll push back if anything's vague — that's how we avoid wasting your interview slots.",
              },
              {
                num: "02",
                title: "We filter hard",
                desc: "AI-assisted sourcing across our South Asia network, followed by human screening for technical depth, remote-work readiness, and communication quality. We turn away ~90% of applicants so you don't have to.",
              },
              {
                num: "03",
                title: "You interview. You choose.",
                desc: "Receive 3–5 profiles with our written assessment. Interview who you want, skip who you don't. We handle scheduling, offer coordination, and onboarding support from start to finish.",
              },
            ].map((step) => (
              <div key={step.num} className="bg-white p-10">
                <div className="font-serif text-[52px] text-cream-dark leading-none mb-5 tracking-tight">
                  {step.num}
                </div>
                <h3 className="text-[17px] font-semibold text-brand mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] text-text-secondary leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="text-center py-4 px-6 border border-border-light rounded bg-white text-[13px] text-text-tertiary"
          >
            <strong className="text-brand font-semibold">
              No fee unless you hire.
            </strong>{" "}
            No retainer.{" "}
            <strong className="text-brand font-semibold">
              90-day replacement guarantee
            </strong>{" "}
            if things don&apos;t work out.
          </motion.div>
        </div>
      </section>

      {/* ── ROLES SECTION ── */}
      <section id="roles" className="py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mb-12"
          >
            <div className="text-[11px] font-semibold text-accent uppercase tracking-[0.1em] mb-4">
              Specializations
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] leading-[1.15] text-brand tracking-tight mb-3">
              Core roles — and beyond.
              <br />
              All mid-to-senior.
            </h2>
            <p className="text-[16px] text-text-secondary font-light max-w-2xl">
              We don&apos;t do entry-level. We work a focused set of roles where
              South Asian engineers are genuinely world-class — and where
              we&apos;ve built enough network depth to find someone great, not
              just available.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-t-lg overflow-hidden">
            {coreRoles.map((role) => (
              <div
                key={role.title}
                className="bg-background p-8 flex gap-5 items-start hover:bg-white transition-colors duration-200 group"
              >
                <div className="w-9 h-9 bg-white border border-border rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:border-brand/20 transition-colors">
                  <div className="text-brand">{role.icon}</div>
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-brand mb-1">
                    {role.title}
                  </div>
                  <div className="text-[13px] text-text-secondary leading-relaxed font-light">
                    {role.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expandable roles */}
          <button
            onClick={() => setShowAllRoles(!showAllRoles)}
            className={`w-full bg-white border border-border border-t-0 p-5 px-8 flex items-center justify-between transition-all duration-200 hover:bg-background ${!showAllRoles ? "rounded-b-lg shadow-sm" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-semibold text-brand">
                8 more roles we fill
              </span>
              <div className="hidden sm:flex gap-1.5">
                {["QA", "Security", "Mobile"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-text-secondary px-2.5 py-0.5 rounded-full border border-border-light bg-background"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[13px] font-semibold text-brand">
              <span>
                {showAllRoles ? "Hide extra roles" : "Show all roles"}
              </span>
              <div
                className={`w-6 h-6 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${showAllRoles ? "bg-brand border-brand text-white" : "bg-cream-dark text-brand"}`}
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${showAllRoles ? "rotate-180" : ""}`}
                />
              </div>
            </div>
          </button>

          <AnimatePresence>
            {showAllRoles && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border border-t-0 rounded-b-lg overflow-hidden">
                  {extraRoles.map((role) => (
                    <div
                      key={role.title}
                      className="bg-white p-8 flex gap-5 items-start hover:bg-background transition-colors duration-200 group"
                    >
                      <div className="w-9 h-9 bg-white border border-border rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <div className="text-brand">{role.icon}</div>
                      </div>
                      <div>
                        <div className="text-[15px] font-semibold text-brand mb-1">
                          {role.title}
                        </div>
                        <div className="text-[13px] text-text-secondary leading-relaxed font-light">
                          {role.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-8 text-center text-[13px] text-text-secondary italic font-light">
            We focus on{" "}
            <strong className="text-brand font-semibold not-italic">
              mid-level (2–5 years)
            </strong>{" "}
            and{" "}
            <strong className="text-brand font-semibold not-italic">
              senior/lead (5–8 years)
            </strong>
            . Don&apos;t see your role?{" "}
            <Link
              href="/company"
              className="text-brand-blue font-semibold hover:underline"
            >
              Tell us what you need →
            </Link>
          </p>
        </div>
      </section>

      {/* ── CONTEXT SECTION ── */}
      <section id="aboutus" className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mb-12"
          >
            <div className="text-[11px] font-semibold text-accent uppercase tracking-[0.1em] mb-4">
              Context
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] leading-[1.15] text-brand tracking-tight mb-3">
              This isn&apos;t a cost play.
              <br />
              It&apos;s an access play.
            </h2>
            <p className="text-[16px] text-text-secondary font-light max-w-2xl">
              The engineers we work with aren&apos;t cheap alternatives.
              They&apos;re overlooked competitors — technically strong,
              English-fluent, remote-ready, and not yet discovered by the
              companies they deserve to work for.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Strong engineering culture",
                desc: "Nepal's top universities produce 8,000+ CS graduates annually, trained to global standards. The strongest performers are competitive with candidates from more recognized markets. They just don't have the same LinkedIn visibility yet.",
              },
              {
                num: "02",
                title: "Remote-ready by default",
                desc: "UTC+5:45 overlaps with European mornings and US late afternoons. Async habits are the norm, not a skill in progress. Strong written English. Documented communication. Experience on distributed global teams.",
              },
              {
                num: "03",
                title: "Underrepresented = early access",
                desc: "Most Western hiring pipelines haven't reached this talent pool yet. Less competition for the best people — and more loyalty from engineers who were found and treated fairly before the market caught up.",
              },
            ].map((card) => (
              <div
                key={card.num}
                className="bg-white border border-border rounded-lg p-8"
              >
                <div className="font-serif text-[36px] text-cream-dark leading-none mb-4">
                  {card.num}
                </div>
                <h3 className="text-[16px] font-semibold text-brand mb-3">
                  {card.title}
                </h3>
                <p className="text-[14px] text-text-secondary leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR TALENT SECTION ── */}
      <section className="py-24 px-6 md:px-16 bg-brand text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="text-[11px] font-semibold text-gold-light uppercase tracking-[0.1em] mb-4">
              For engineers
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] leading-[1.15] text-white tracking-tight mb-5">
              Mid-to-senior engineer in Nepal or South Asia?
            </h2>
            <p className="text-[16px] text-white/60 font-light leading-relaxed mb-10">
              We work with a curated network of tech professionals ready for
              remote global roles — and who want more than the local market
              offers. We match you to companies that are serious about remote,
              pay fairly, and know how to work across time zones.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "We interview you before submitting your profile anywhere",
                "We benchmark your salary against the real market — not local rates, not inflated promises",
                "We only send your profile to roles you'd actually want",
                "We prep you for interviews with the specific company",
                "You never pay us anything, ever",
              ].map((point) => (
                <div key={point} className="flex gap-3.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-gold-light/15 border border-gold-light/30 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-light" />
                  </div>
                  <span className="text-[14px] text-white/70 font-light">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/talent"
              className="bg-gold-light hover:opacity-90 text-navy px-8 py-3.5 rounded font-medium text-[15px] transition-all duration-200 hover:-translate-y-px inline-flex items-center gap-2"
            >
              Apply to join the network →
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm shadow-card"
          >
            <div className="mb-8">
              <h3 className="text-[14px] font-semibold text-white/90 mb-1">
                What happens after you apply
              </h3>
              <p className="text-[12px] text-white/40 font-light">
                Typical timeline from submission to placement
              </p>
            </div>

            <div className="space-y-0">
              {[
                {
                  title: "Submit your profile",
                  desc: "Takes about 10 minutes",
                  status: "done",
                },
                {
                  title: "Profile reviewed",
                  desc: "Within 3 business days",
                  status: "done",
                },
                {
                  title: "Screening call with us",
                  desc: "30 min — we get to know you",
                  status: "active",
                },
                {
                  title: "Matched to a role",
                  desc: "Only roles that actually fit",
                  status: "pending",
                },
                {
                  title: "Interview prep & placement",
                  desc: "We're with you through the offer",
                  status: "pending",
                },
              ].map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex gap-4 items-start py-4 ${idx !== 4 ? "border-b border-white/5" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[12px] font-semibold ${
                      item.status === "done"
                        ? "bg-navy-mid/30 text-white/60"
                        : item.status === "active"
                          ? "bg-gold text-navy"
                          : "bg-white/5 border border-white/10 text-white/30"
                    }`}
                  >
                    {item.status === "done"
                      ? "✓"
                      : item.status === "active"
                        ? "→"
                        : idx + 1}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-white/90">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-white/40 font-light mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className="bg-brand-blue py-20 px-6 md:px-16 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] leading-[1.2] text-white tracking-tight mb-4 max-w-2xl mx-auto">
            Ready to hire engineers others haven&apos;t found yet?
          </h2>
          <p className="text-[17px] text-white/70 font-light mb-10 max-w-lg mx-auto">
            Tell us the role. We&apos;ll follow up in 24 hours with a plan — and
            a shortlist in 7 days.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/company"
              className="bg-white hover:opacity-95 text-brand-blue px-9 py-4 rounded font-medium text-[15px] transition-all duration-200 hover:-translate-y-px inline-flex items-center gap-2"
            >
              Get started — hire engineers →
            </Link>
            <Link
              href="/talent"
              className="bg-transparent border-[1.5px] border-white/40 hover:border-white/80 text-white px-9 py-4 rounded font-light text-[15px] transition-all duration-200 hover:-translate-y-px inline-flex items-center gap-2"
            >
              Join as an engineer
            </Link>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
