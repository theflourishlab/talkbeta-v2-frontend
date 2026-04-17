"use client";

/**
 * Browser audio recording hook using MediaRecorder API.
 * Captures audio as webm blob for Whisper transcription.
 */

import { useRef, useState, useCallback } from "react";

export interface UseRecorderReturn {
  isRecording: boolean;
  elapsedSeconds: number;
  /** Ref that always holds the current elapsed seconds — safe to read in callbacks */
  elapsedSecondsRef: React.MutableRefObject<number>;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob>;
  error: string | null;
}

export function useRecorder(maxDurationMs = 90_000): UseRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resolveRef = useRef<((blob: Blob) => void) | null>(null);
  // Ref mirrors the state — always current, safe inside async callbacks
  const elapsedSecondsRef = useRef<number>(0);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    setError(null);
    chunksRef.current = [];
    setElapsedSeconds(0);
    elapsedSecondsRef.current = 0;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Pick a supported MIME type
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        cleanup();
        stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);

        const blob = new Blob(chunksRef.current, { type: mimeType });
        resolveRef.current?.(blob);
        resolveRef.current = null;
      };

      recorder.start(1000); // Collect data every second
      setIsRecording(true);

      // Elapsed timer
      const start = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - start) / 1000);
        setElapsedSeconds(elapsed);
        elapsedSecondsRef.current = elapsed;

        // Auto-stop at max duration
        if (elapsed >= maxDurationMs / 1000) {
          recorder.stop();
        }
      }, 250);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Microphone access denied. Please allow microphone permissions."
      );
    }
  }, [maxDurationMs, cleanup]);

  const stopRecording = useCallback((): Promise<Blob> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
    });
  }, []);

  return { isRecording, elapsedSeconds, elapsedSecondsRef, startRecording, stopRecording, error };
}
