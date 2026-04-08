"use client";

/**
 * Session state management for TalkBeta.
 * Holds all state for one session: prompt, transcripts, feedback.
 * No persistence — refresh resets everything.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { Prompt, FeedbackResponse } from "./api";

// ── Types ────────────────────────────────────────────────────

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
  | { type: "RESET" };

// ── Reducer ──────────────────────────────────────────────────

const initialState: SessionState = {
  step: "home",
  prompt: null,
  transcript1: null,
  feedback1: null,
  transcript2: null,
  feedback2: null,
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
