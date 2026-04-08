"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Mic, MessageSquareText, ArrowRightLeft, Target } from "lucide-react";

/* ──────────────────────────────────────────────
   Shared animation helpers
   ────────────────────────────────────────────── */

function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Section 1 — Hero
   ────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center px-6 py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-rust/[0.03] blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-rust/[0.02] blur-[100px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_minmax(400px,1fr)] gap-16 items-center">
        {/* Left side text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
          className="max-w-2xl text-left"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-4 h-4 text-rust/80" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-rust/60 font-medium">
              Structural Thinking Coach
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[4rem] font-medium text-ink leading-[1.05] tracking-tight mb-8">
            You know what you want to say.
            <br />
            <span className="text-rust font-bold">Train yourself to hold it together</span>
            <br />
            <span className="text-ink/50 italic font-light text-[0.8em]">
              — when it matters most.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-ink/60 leading-relaxed max-w-lg mb-10">
            TalkBeta trains you to open clearly, make your point, and land — under
            the pressure of the moment, not before it.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/app"
              className="group inline-flex items-center gap-3 bg-rust text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full
                         hover:bg-rust-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,76,42,0.25)]"
            >
              Start Training
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <span className="font-mono text-xs text-ink/30 tracking-widest uppercase">
              No sign-up required
            </span>
          </div>
        </motion.div>

        {/* Right side glassmorphic visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0, 1] }}
          className="relative lg:h-[600px] w-full hidden md:flex items-center justify-center pointer-events-none"
        >
          {/* Floating element behind */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [12, 14, 12] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute z-10 -top-4 right-8 w-64 h-40 rounded-2xl border border-ink/[0.04] bg-paper/[0.015] backdrop-blur-3xl shadow-2xl" 
          />
          
          {/* Main glass card */}
          <div className="absolute z-20 w-[360px] h-[480px] rounded-3xl border border-ink/[0.08] bg-white/40 backdrop-blur-2xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden">
             {/* decorative UI elements inside glass card */}
             <div className="w-full flex items-center justify-between mb-8 opacity-70">
               <div className="w-10 h-2.5 rounded-full bg-rust/40" />
               <div className="w-2.5 rounded-full h-2.5 bg-paper/10" />
             </div>
             
             <div className="space-y-4 flex-1">
               <div className="w-3/4 h-3 rounded-full bg-paper/10" />
               <div className="w-full h-3 rounded-full bg-paper/10" />
               <div className="w-5/6 h-3 rounded-full bg-paper/10" />
               <div className="w-1/2 h-3 rounded-full bg-paper/10" />
             </div>

             <div className="mt-auto border-t border-ink/[0.06] pt-6 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-rust/10 flex items-center justify-center">
                 <Mic className="w-5 h-5 text-rust/80" />
               </div>
               <div className="flex-1">
                 <div className="w-16 h-2 rounded-full bg-rust/40 mb-2" />
                 <div className="w-full h-1.5 rounded-full bg-paper/10 overflow-hidden">
                   <div className="w-1/3 h-full bg-rust rounded-full" />
                 </div>
               </div>
             </div>
          </div>

          {/* Floating element front */}
          <motion.div 
            animate={{ y: [10, -10, 10], rotate: [-6, -4, -6] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute z-30 -bottom-8 -left-8 w-64 h-32 rounded-2xl border border-rust/[0.15] bg-white/80 backdrop-blur-xl shadow-xl p-6 flex flex-col gap-3 justify-center"
          >
             <div className="w-8 h-8 rounded-full bg-rust/15 flex items-center justify-center mb-1">
               <Target className="w-3.5 h-3.5 text-rust" />
             </div>
             <div className="w-24 h-2.5 rounded-full bg-paper/30" />
             <div className="w-36 h-2 rounded-full bg-paper/10" />
          </motion.div>
          
          {/* Glowing orbs */}
          <div className="absolute z-0 top-1/4 left-1/4 w-32 h-32 rounded-full bg-rust/30 blur-[70px]" />
          <div className="absolute z-0 bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-rust/5 blur-[80px]" />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-paper/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-paper/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 2 — The Moment
   ────────────────────────────────────────────── */

const momentLines = [
  { text: "You walked in prepared.", delay: 0 },
  { text: "You knew exactly what you wanted to say.", delay: 0.08 },
  { text: "You'd gone over it in your head, maybe even out loud.", delay: 0.16 },
  { text: "", delay: 0 },
  { text: "And then — the moment you opened your mouth —", delay: 0.24, dim: true },
  { text: "it was gone.", delay: 0.32, bold: true, gold: true },
  { text: "", delay: 0 },
  { text: "The thread of your thought broke mid-sentence.", delay: 0.4 },
  { text: "You noticed it breaking — and that made it worse.", delay: 0.48 },
  { text: "The silence became its own kind of pressure.", delay: 0.56 },
  { text: "Words you know stopped coming.", delay: 0.64, italic: true },
  { text: "", delay: 0 },
  { text: "You finished.", delay: 0.72 },
  { text: "And you felt like a stranger in your own voice.", delay: 0.8, italic: true },
];

function TheMoment() {
  return (
    <section className="relative py-24 sm:py-32 px-6">
      {/* Subtle warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper to-cream pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-ink tracking-tight mb-16">
            You&apos;ve been here before.
          </h2>
        </FadeIn>

        {/* Poem-like text reveal */}
        <div className="space-y-3 mb-20">
          {momentLines.map((line, i) => {
            if (line.text === "") return <div key={i} className="h-6" />;

            let textClass = "text-base sm:text-lg leading-relaxed text-ink/60";
            if (line.bold) textClass += " font-bold text-2xl sm:text-3xl";
            if (line.gold) textClass = textClass.replace("text-ink/60", "text-rust");
            if (line.italic) textClass += " italic";
            if (line.dim) textClass = textClass.replace("text-ink/60", "text-ink/40");

            return (
              <FadeIn key={i} delay={line.delay} y={16}>
                <p className={textClass}>{line.text}</p>
              </FadeIn>
            );
          })}
        </div>

        {/* Separator */}
        <FadeIn delay={0.9}>
          <div className="w-12 h-px bg-rust/30 mb-16" />
        </FadeIn>

        {/* The cost */}
        <div className="space-y-4 mb-16">
          <FadeIn delay={0.95}>
            <p className="text-base sm:text-lg text-ink/50 leading-relaxed">
              That moment has cost you before.
            </p>
          </FadeIn>
          <FadeIn delay={1.0}>
            <p className="text-base sm:text-lg text-ink/50 leading-relaxed">
              An interview you were qualified for.
              <br />A room you should have commanded.
              <br />A version of yourself you couldn&apos;t show when it counted.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={1.1}>
          <p className="text-base sm:text-lg text-ink/40 leading-relaxed mb-4">
            And the worst part?
            <br />
            You started to believe the problem is <em className="text-ink/60">you</em>.
          </p>
        </FadeIn>

        <FadeIn delay={1.2}>
          <p className="text-3xl sm:text-4xl font-bold text-rust tracking-tight">
            It&apos;s not.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 3 — What's Actually Happening
   ────────────────────────────────────────────── */

function Mechanism() {
  return (
    <section className="relative py-24 sm:py-32 px-6 bg-slate-brand">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-paper tracking-tight mb-10">
            Here&apos;s what&apos;s actually going on.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-6 mb-12">
            <p className="text-base sm:text-lg text-paper/70 leading-relaxed">
              Under pressure, your brain splits its resources. Half is trying to
              speak. The other half is watching you speak — asking{" "}
              <em className="text-paper/90">&quot;how am I doing?&quot;</em>
            </p>
            <p className="text-base sm:text-lg text-paper/70 leading-relaxed">
              That self-monitoring eats into the same working memory you need to
              hold your thought together. You start a sentence and lose where
              it&apos;s going. You notice that happening. The noticing takes up
              even more room. The spiral locks.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-2 mb-12">
            <p className="text-base sm:text-lg text-paper/60 leading-relaxed">
              This is not a confidence problem.
            </p>
            <p className="text-base sm:text-lg text-paper/60 leading-relaxed">
              This is not a preparation problem.
            </p>
            <p className="text-base sm:text-lg text-rust-light leading-relaxed font-bold">
              It&apos;s a cognitive load problem — and it can be trained.
            </p>
          </div>
        </FadeIn>

        {/* Pull quote */}
        <FadeIn delay={0.3}>
          <blockquote className="border-l-2 border-rust/60 pl-6 py-2">
            <p className="text-sm sm:text-base text-paper/50 leading-relaxed italic">
              Fluency under pressure improves when you practise under conditions
              that simulate the specific cognitive load of pressure — not in
              comfortable, low-stakes environments.
            </p>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 4 — The Loop (How It Works)
   ────────────────────────────────────────────── */

const steps = [
  {
    num: "01",
    icon: Target,
    title: "A real prompt.",
    body: 'Not a practice question. A high-stakes speaking scenario — the kind that makes your chest tighten just reading it.',
    examples: [
      '"Tell me about a time you failed at something important."',
      '"You have 90 seconds to explain what you\'re building and why it matters. Go."',
    ],
  },
  {
    num: "02",
    icon: Clock,
    title: "10 seconds to think. No notes.",
    body: "This is the gap between the question and the moment you have to speak. You can't skip it. The constraint is the point.",
  },
  {
    num: "03",
    icon: Mic,
    title: "90 seconds. Go.",
    body: "Your first attempt is captured raw. No redo. No polish. This is you under pressure — and that's exactly what we need.",
  },
  {
    num: "04",
    icon: MessageSquareText,
    title: "Structural feedback.",
    body: 'Not "great job." Not "try speaking slower." You get a structure score, your exact collapse point quoted from your transcript, and one instruction for your next attempt. Not three, not five. One.',
  },
  {
    num: "05",
    icon: ArrowRight,
    title: "Try again. Same prompt. Same pressure.",
    body: "But now you have one thing to hold onto. The re-attempt is the intervention.",
  },
  {
    num: "06",
    icon: ArrowRightLeft,
    title: "See what changed.",
    body: '',
    highlight:
      '"In attempt 1 you lost the thread at 38 seconds. In attempt 2 you held it to 61."',
    closer: "That 23-second difference? That's not encouragement. That's proof.",
  },
];

function TheLoop() {
  return (
    <section className="relative py-24 sm:py-32 px-6 bg-paper">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-rust/40 block mb-6">
            How It Works
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-ink tracking-tight mb-4">
            One prompt. Two attempts.
            <br />
            Ninety seconds each.
          </h2>
          <p className="text-base sm:text-lg text-ink/40 mb-16">
            That&apos;s it. That&apos;s the whole thing. And it works.
          </p>
        </FadeIn>

        <div className="space-y-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.num} delay={i * 0.08}>
                <div className="group relative rounded-xl border border-border bg-card/40 p-5 sm:p-7 hover:bg-card/70 transition-colors duration-300">
                  {/* Step header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-rust/8 border border-rust/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-rust/60" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-rust/40 tracking-wider">
                        STEP {step.num}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-medium text-ink/90 mt-0.5">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  {step.body && (
                    <p className="text-sm sm:text-[15px] text-ink/45 leading-relaxed ml-14">
                      {step.body}
                    </p>
                  )}

                  {/* Example prompts */}
                  {step.examples && (
                    <div className="ml-14 mt-4 space-y-2">
                      {step.examples.map((ex, j) => (
                        <p
                          key={j}
                          className="text-sm text-ink/30 italic font-mono leading-relaxed"
                        >
                          {ex}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Highlight quote */}
                  {step.highlight && (
                    <div className="ml-14 mt-4 border-l-2 border-rust/30 pl-5 py-1">
                      <p className="text-sm sm:text-base text-rust/70 italic leading-relaxed">
                        {step.highlight}
                      </p>
                    </div>
                  )}

                  {/* Closer */}
                  {step.closer && (
                    <p className="ml-14 mt-4 text-sm sm:text-[15px] text-ink/60 font-medium leading-relaxed">
                      {step.closer}
                    </p>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 5 — The Proof
   ────────────────────────────────────────────── */

function Proof() {
  return (
    <section className="relative py-24 sm:py-32 px-6 bg-cream">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-ink tracking-tight mb-12">
            This isn&apos;t theory.
          </h2>
        </FadeIn>

        {/* Big stat */}
        <FadeIn delay={0.1}>
          <div className="relative rounded-2xl border border-rust/15 bg-rust/[0.03] p-8 sm:p-10 mb-10">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-rust leading-none tracking-tight">
                +1.4
              </span>
              <span className="text-sm sm:text-base text-ink/40 font-mono">
                / 5
              </span>
            </div>
            <p className="text-base sm:text-lg text-ink/50 leading-relaxed">
              Average improvement on a 5-point structural score.
              <br />
              <span className="text-ink/35">
                One session. Fifteen minutes. Same person, same prompt, same
                pressure.
              </span>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base sm:text-lg text-ink/50 leading-relaxed">
            In early testing, the pattern is consistent — people who go through
            the loop once come out measurably sharper the second time. Not
            because of motivation. Because the feedback is specific enough to
            act on, and the second attempt is immediate enough to act on it{" "}
            <em className="text-ink/65">before the insight fades.</em>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 6 — Final CTA
   ────────────────────────────────────────────── */

function ClosingCTA() {
  return (
    <section className="relative py-28 sm:py-36 px-6 bg-paper overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[900px] h-[500px] rounded-full bg-rust/[0.05] blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-ink tracking-tight mb-6 leading-[1.15]">
            You are not a bad speaker.
            <br />
            <span className="text-rust italic font-light text-[0.8em]">
              You just never trained for this part.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-base sm:text-lg text-ink/40 leading-relaxed max-w-lg mx-auto mb-4">
            Not the vocabulary. Not the grammar. Not the confidence.
            <br />
            The part where you hold a thought together while the pressure is
            happening.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-base sm:text-lg text-ink/50 leading-relaxed max-w-lg mx-auto mb-12">
            That&apos;s a skill. And like any skill — it gets better with
            practice that&apos;s specific, honest, and just uncomfortable enough
            to matter.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-sm text-ink/30 mb-8 font-mono tracking-wide">
            This is that practice.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Link
            href="/app"
            className="group inline-flex items-center gap-2.5 bg-rust text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-full
                       hover:bg-rust-light transition-all duration-300 hover:shadow-[0_0_60px_rgba(184,76,42,0.3)]"
          >
            Start Your First Session
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Minimal nav bar
   ────────────────────────────────────────────── */

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        {/* Glassmorphism pill */}
        <div className="flex items-center justify-between w-full bg-paper/60 backdrop-blur-xl border border-ink/[0.06] rounded-full px-5 py-2.5">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-ink tracking-tight">
              Talk<span className="text-rust">Beta</span>
            </span>
          </Link>

          <Link
            href="/app"
            className="text-xs sm:text-sm font-medium text-ink bg-rust hover:bg-rust-light px-4 py-1.5 rounded-full transition-colors duration-200"
          >
            Start Training
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ──────────────────────────────────────────────
   Footer
   ────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-ink/[0.05] py-8 px-6 bg-paper">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink/25 font-mono">
        <span>
          Talk<span className="text-rust/40">Beta</span> © {new Date().getFullYear()}
        </span>
        <span className="tracking-wide">
          Built for the people who need it most.
        </span>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   Landing Page
   ────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TheMoment />
        <Mechanism />
        <TheLoop />
        <Proof />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
