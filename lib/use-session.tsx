"use client";

/**
 * Session state management for TalkBeta.
 * Holds all state for one session: prompt, transcripts, feedback, and usage.
 * No persistence — refresh resets everything.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { Prompt, FeedbackResponse } from "./api";

// ── Pricing constants (update if API pricing changes) ─────────
// Whisper: $0.006 per minute → $0.0001 per second
const WHISPER_COST_PER_SECOND = 0.006 / 60;
// Claude claude-sonnet-4-20250514: $3.00 per 1M input, $15.00 per 1M output
const CLAUDE_INPUT_COST_PER_TOKEN = 3.0 / 1_000_000;
const CLAUDE_OUTPUT_COST_PER_TOKEN = 15.0 / 1_000_000;

// ── Types ────────────────────────────────────────────────────

export interface UsageSummary {
  /** Total audio processed across both attempts in seconds */
  totalAudioSeconds: number;
  /** Total tokens sent to Claude across all feedback calls */
  totalInputTokens: number;
  /** Total tokens received from Claude across all feedback calls */
  totalOutputTokens: number;
  /** Estimated Whisper cost in USD */
  whisperCostUSD: number;
  /** Estimated Claude cost in USD */
  claudeCostUSD: number;
  /** Total estimated session cost in USD */
  estimatedCostUSD: number;
}

export type SessionStep =
  | "home"
  | "prep"
  | "record-1"
  | "processing-1"
  | "feedback-1"
  | "prep-2"
  | "record-2"
  | "processing-2"
  | "compare";

export interface SessionState {
  step: SessionStep;
  prompt: Prompt | null;
  transcript1: string | null;
  feedback1: FeedbackResponse | null;
  transcript2: string | null;
  feedback2: FeedbackResponse | null;
  usageSummary: UsageSummary;
}

// ── Actions ──────────────────────────────────────────────────

type SessionAction =
  | { type: "SELECT_PROMPT"; prompt: Prompt }
  | { type: "START_RECORDING_1" }
  | { type: "START_PROCESSING_1" }
  | { type: "SET_ATTEMPT_1"; transcript: string; feedback: FeedbackResponse }
  | { type: "START_PREP_2" }
  | { type: "START_RECORDING_2" }
  | { type: "START_PROCESSING_2" }
  | { type: "SET_ATTEMPT_2"; transcript: string; feedback: FeedbackResponse }
  | {
      type: "ACCUMULATE_USAGE";
      audioSeconds: number;
      inputTokens: number;
      outputTokens: number;
    }
  | { type: "RESET" };

// ── Helpers ──────────────────────────────────────────────────

const emptyUsage: UsageSummary = {
  totalAudioSeconds: 0,
  totalInputTokens: 0,
  totalOutputTokens: 0,
  whisperCostUSD: 0,
  claudeCostUSD: 0,
  estimatedCostUSD: 0,
};

function computeUsage(
  totalAudioSeconds: number,
  totalInputTokens: number,
  totalOutputTokens: number
): UsageSummary {
  const whisperCostUSD = totalAudioSeconds * WHISPER_COST_PER_SECOND;
  const claudeCostUSD =
    totalInputTokens * CLAUDE_INPUT_COST_PER_TOKEN +
    totalOutputTokens * CLAUDE_OUTPUT_COST_PER_TOKEN;
  return {
    totalAudioSeconds,
    totalInputTokens,
    totalOutputTokens,
    whisperCostUSD,
    claudeCostUSD,
    estimatedCostUSD: whisperCostUSD + claudeCostUSD,
  };
}

// ── Reducer ──────────────────────────────────────────────────

const initialState: SessionState = {
  step: "home",
  prompt: null,
  transcript1: null,
  feedback1: null,
  transcript2: null,
  feedback2: null,
  usageSummary: emptyUsage,
};

function sessionReducer(
  state: SessionState,
  action: SessionAction
): SessionState {
  switch (action.type) {
    case "SELECT_PROMPT":
      return { ...initialState, step: "prep", prompt: action.prompt };
    case "START_RECORDING_1":
      return { ...state, step: "record-1" };
    case "START_PROCESSING_1":
      return { ...state, step: "processing-1" };
    case "SET_ATTEMPT_1":
      return {
        ...state,
        step: "feedback-1",
        transcript1: action.transcript,
        feedback1: action.feedback,
      };
    case "START_PREP_2":
      return { ...state, step: "prep-2" };
    case "START_RECORDING_2":
      return { ...state, step: "record-2" };
    case "START_PROCESSING_2":
      return { ...state, step: "processing-2" };
    case "SET_ATTEMPT_2":
      return {
        ...state,
        step: "compare",
        transcript2: action.transcript,
        feedback2: action.feedback,
      };
    case "ACCUMULATE_USAGE": {
      const newAudioSeconds =
        state.usageSummary.totalAudioSeconds + action.audioSeconds;
      const newInputTokens =
        state.usageSummary.totalInputTokens + action.inputTokens;
      const newOutputTokens =
        state.usageSummary.totalOutputTokens + action.outputTokens;
      return {
        ...state,
        usageSummary: computeUsage(newAudioSeconds, newInputTokens, newOutputTokens),
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────

interface SessionContextValue {
  state: SessionState;
  dispatch: React.Dispatch<SessionAction>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState);
  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}
