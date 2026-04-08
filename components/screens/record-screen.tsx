"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSession } from "@/lib/use-session";
import { useRecorder } from "@/lib/use-recorder";
import { transcribeAudio, getFeedback } from "@/lib/api";

const MAX_SECONDS = 90;

export function RecordScreen() {
  const { state, dispatch } = useSession();
  const { isRecording, elapsedSeconds, startRecording, stopRecording, error } =
    useRecorder(MAX_SECONDS * 1000);
  const hasStarted = useRef(false);

  const isAttempt2 = state.step === "record-2";
  const instruction = state.feedback1?.next_attempt_instruction;

  // Auto-start recording when this screen mounts
  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      startRecording();
    }
  }, [startRecording]);

  const handleStop = useCallback(async () => {
    const blob = await stopRecording();

    // Signal processing state
    if (isAttempt2) {
      dispatch({ type: "START_PROCESSING_2" });
    } else {
      dispatch({ type: "START_PROCESSING_1" });
    }

    try {
      // Step 1: Transcribe
      const { transcript } = await transcribeAudio(blob);

      // Step 2: Get feedback
      const feedback = await getFeedback({
        prompt_text: state.prompt!.text,
        transcript,
        attempt_number: isAttempt2 ? 2 : 1,
        previous_transcript: isAttempt2 ? state.transcript1! : undefined,
      });

      // Step 3: Update state
      if (isAttempt2) {
        dispatch({ type: "SET_ATTEMPT_2", transcript, feedback });
      } else {
        dispatch({ type: "SET_ATTEMPT_1", transcript, feedback });
      }
    } catch (err) {
      // On error, go back to home (simple MVP error handling)
      console.error("Processing failed:", err);
      alert(
        `Processing failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      dispatch({ type: "RESET" });
    }
  }, [stopRecording, dispatch, state, isAttempt2]);

  // Auto-stop when max time reached
  useEffect(() => {
    if (elapsedSeconds >= MAX_SECONDS && isRecording) {
      handleStop();
    }
  }, [elapsedSeconds, isRecording, handleStop]);

  const progress = (elapsedSeconds / MAX_SECONDS) * 100;
  const remaining = MAX_SECONDS - elapsedSeconds;
  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      {/* Attempt 2 instruction banner */}
      {isAttempt2 && instruction && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rust/10 border border-rust/30 rounded-lg px-5 py-3 max-w-md mb-10 text-center"
        >
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-rust mb-1">
            Focus on this
          </div>
          <p className="text-[13px] text-ink/80 leading-relaxed">
            {instruction}
          </p>
        </motion.div>
      )}

      {/* Recording indicator */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-8"
      >
        {/* Pulsing ring */}
        {isRecording && (
          <motion.div
            className="absolute inset-0 rounded-full bg-rust/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <div className="relative w-32 h-32 rounded-full bg-rust/20 border-2 border-rust/40 flex items-center justify-center">
          <Mic className="w-10 h-10 text-rust" />
        </div>
      </motion.div>

      {/* Timer display */}
      <div className="text-center mb-8">
        <div className="text-5xl font-bold text-ink tabular-nums font-mono">
          {minutes}:{secs.toString().padStart(2, "0")}
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-2">
          {isRecording ? "Recording — Speak now" : "Starting..."}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-8">
        <Progress value={progress} className="h-1" />
      </div>

      {/* Stop button */}
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handleStop}
            variant="outline"
            size="lg"
            className="gap-2 border-paper/20 hover:bg-paper/10 text-ink"
          >
            <Square className="w-4 h-4" />
            Done Speaking
          </Button>
        </motion.div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-6 text-rust text-sm font-mono text-center max-w-sm">
          {error}
        </div>
      )}
    </div>
  );
}
