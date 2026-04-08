"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Home,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/use-session";

export function CompareScreen() {
  const { state, dispatch } = useSession();
  const { feedback1, feedback2, transcript1, transcript2 } = state;

  if (!feedback1 || !feedback2) return null;

  const delta = feedback2.structure_score - feedback1.structure_score;
  const improved = delta > 0;
  const same = delta === 0;

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-10 overflow-y-auto">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-rust/60 mb-2">
            Side-by-Side Comparison
          </div>
          <p className="text-sm text-muted-foreground italic max-w-md mx-auto">
            &ldquo;{state.prompt?.text}&rdquo;
          </p>
        </motion.div>

        {/* Score comparison */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="grid grid-cols-3 gap-4 items-center"
        >
          {/* Attempt 1 score */}
          <Card className="bg-card border-border p-6 text-center">
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Attempt 1
            </div>
            <div className="text-5xl font-bold text-muted-foreground">
              {feedback1.structure_score}
            </div>
          </Card>

          {/* Delta */}
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                improved
                  ? "bg-emerald-500/15 text-emerald-400"
                  : same
                  ? "bg-muted text-muted-foreground"
                  : "bg-rust/15 text-rust"
              }`}
            >
              {improved ? (
                <TrendingUp className="w-5 h-5" />
              ) : same ? (
                <Minus className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
            </div>
            <span
              className={`text-xl font-bold font-mono ${
                improved
                  ? "text-emerald-400"
                  : same
                  ? "text-muted-foreground"
                  : "text-rust"
              }`}
            >
              {delta > 0 ? "+" : ""}
              {delta}
            </span>
          </div>

          {/* Attempt 2 score */}
          <Card className="bg-card border-rust/20 p-6 text-center">
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-rust mb-2">
              Attempt 2
            </div>
            <div className="text-5xl font-bold text-rust">
              {feedback2.structure_score}
            </div>
          </Card>
        </motion.div>

        {/* What changed */}
        {feedback2.what_changed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="bg-rust/5 border-rust/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-rust" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-rust">
                  What Changed
                </span>
              </div>
              <p className="text-[15px] text-ink/90 leading-relaxed">
                {feedback2.what_changed}
              </p>
            </Card>
          </motion.div>
        )}

        {/* Remaining collapse point */}
        {feedback2.remaining_collapse_point && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  Collapse Pattern
                </span>
              </div>
              <p className="text-[14px] text-ink/70 leading-relaxed">
                {feedback2.remaining_collapse_point}
              </p>
            </Card>
          </motion.div>
        )}

        {/* Justification */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-card border-border p-5">
            <p className="text-[15px] text-ink/80 leading-relaxed">
              {feedback2.justification}
            </p>
          </Card>
        </motion.div>

        {/* Transcripts side by side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <details className="group">
            <summary className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground cursor-pointer hover:text-ink/60 transition-colors">
              View both transcripts
            </summary>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <Card className="bg-card border-border p-4">
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Attempt 1
                </div>
                <p className="text-[12px] text-ink/50 leading-relaxed whitespace-pre-wrap">
                  {transcript1}
                </p>
              </Card>
              <Card className="bg-card border-rust/10 p-4">
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-rust/60 mb-2">
                  Attempt 2
                </div>
                <p className="text-[12px] text-ink/70 leading-relaxed whitespace-pre-wrap">
                  {transcript2}
                </p>
              </Card>
            </div>
          </details>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-3 justify-center pt-4 pb-8"
        >
          <Button
            onClick={() => dispatch({ type: "RESET" })}
            size="lg"
            className="gap-2 bg-rust text-white hover:bg-rust-light font-semibold"
          >
            <RotateCcw className="w-4 h-4" />
            Try Another Prompt
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
