"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer } from "lucide-react";
import { useSession } from "@/lib/use-session";

export function PrepScreen() {
  const { state, dispatch } = useSession();
  const [seconds, setSeconds] = useState(10);

  const onComplete = useCallback(() => {
    if (state.step === "prep") {
      dispatch({ type: "START_RECORDING_1" });
    } else {
      dispatch({ type: "START_RECORDING_2" });
    }
  }, [state.step, dispatch]);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, onComplete]);

  const isAttempt2 = state.step === "prep-2";
  const instruction = state.feedback1?.next_attempt_instruction;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      {/* Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-xl mb-16"
      >
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-rust/60 mb-6">
          {isAttempt2 ? "Attempt 2 — Same Prompt" : "Your Prompt"}
        </div>
        <p className="text-xl md:text-2xl text-ink/90 leading-relaxed font-light italic">
          &ldquo;{state.prompt?.text}&rdquo;
        </p>
      </motion.div>

      {/* Attempt 2 instruction */}
      {isAttempt2 && instruction && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-rust/10 border border-rust/30 rounded-lg px-6 py-4 max-w-md mb-12 text-center"
        >
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-rust mb-2">
            Your one instruction
          </div>
          <p className="text-[14px] text-ink/80 leading-relaxed">
            {instruction}
          </p>
        </motion.div>
      )}

      {/* Timer */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative w-40 h-40 flex items-center justify-center"
        >
          {/* Circular progress ring */}
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="rgba(201, 168, 76, 0.15)"
              strokeWidth="3"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 72}
              animate={{
                strokeDashoffset: 2 * Math.PI * 72 * (seconds / 10),
              }}
              transition={{ duration: 0.3 }}
            />
          </svg>

          <AnimatePresence mode="popLayout">
            <motion.span
              key={seconds}
              initial={{ y: -20, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-6xl font-bold text-rust tabular-nums"
            >
              {seconds}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center gap-2 text-muted-foreground"
      >
        <Timer className="w-4 h-4" />
        <span className="font-mono text-xs tracking-wide">
          Think. No notes. No writing.
        </span>
      </motion.div>
    </div>
  );
}
