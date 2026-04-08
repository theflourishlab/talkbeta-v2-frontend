"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/use-session";

export function ProcessingScreen() {
  const { state } = useSession();
  const isAttempt2 = state.step === "processing-2";

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="mb-8 inline-block"
        >
          <Loader2 className="w-10 h-10 text-rust" />
        </motion.div>

        <h2 className="text-xl font-semibold text-ink mb-3">
          Analyzing your structure
        </h2>

        {/* Progress steps */}
        <div className="space-y-2 font-mono text-xs text-muted-foreground">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Transcribing your speech...
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {isAttempt2
              ? "Comparing both attempts..."
              : "Identifying collapse point..."}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            Generating structural feedback...
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
