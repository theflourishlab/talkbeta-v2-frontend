"use client";

import { motion } from "framer-motion";
import {
  Target,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Home,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/use-session";

export function FeedbackScreen() {
  const { state, dispatch } = useSession();
  const { feedback1, transcript1 } = state;

  if (!feedback1 || !transcript1) return null;

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-10 overflow-y-auto">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-rust/60 mb-2">
            Attempt 1 — Structural Feedback
          </div>
          <p className="text-sm text-muted-foreground italic max-w-md mx-auto">
            &ldquo;{state.prompt?.text}&rdquo;
          </p>
        </motion.div>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="text-7xl font-bold text-rust">
            {feedback1.structure_score}
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            Structure Score (1–5)
          </div>
        </motion.div>

        {/* Justification */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-border p-5">
            <p className="text-[15px] text-ink/85 leading-relaxed">
              {feedback1.justification}
            </p>
          </Card>
        </motion.div>

        {/* Collapse point */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="bg-card border-rust/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-rust" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-rust">
                Collapse Point
              </span>
            </div>
            <p className="text-[14px] text-ink/70 leading-relaxed italic">
              &ldquo;{feedback1.collapse_point}&rdquo;
            </p>
          </Card>
        </motion.div>

        {/* Next attempt instruction */}
        {feedback1.next_attempt_instruction && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-rust/5 border-rust/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-rust" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-rust">
                  Your one instruction for Attempt 2
                </span>
              </div>
              <p className="text-[15px] text-ink/90 leading-relaxed">
                {feedback1.next_attempt_instruction}
              </p>
            </Card>
          </motion.div>
        )}

        {/* Transcript (collapsed) */}
        <motion.details
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="group"
        >
          <summary className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground cursor-pointer hover:text-ink/60 transition-colors">
            View full transcript
          </summary>
          <Card className="mt-2 bg-card border-border p-4">
            <p className="text-[13px] text-ink/60 leading-relaxed whitespace-pre-wrap">
              {transcript1}
            </p>
          </Card>
        </motion.details>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-3 justify-center pt-4 pb-8"
        >
          <Button
            onClick={() => dispatch({ type: "START_PREP_2" })}
            size="lg"
            className="gap-2 bg-rust text-white hover:bg-rust-light font-semibold"
          >
            Try Again
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => dispatch({ type: "RESET" })}
            variant="outline"
            size="lg"
            className="gap-2 border-paper/20 text-ink/60 hover:text-ink hover:bg-paper/5"
          >
            <Home className="w-4 h-4" />
            New Prompt
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
