/**
 * TalkBeta API client.
 * Talks to the FastAPI backend for prompts, transcription, and feedback.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// ── Types ────────────────────────────────────────────────────

export interface Prompt {
  id: string;
  category: string;
  text: string;
}

export interface UsageMetrics {
  /** Exact tokens sent to Claude for this call */
  input_tokens: number;
  /** Exact tokens returned by Claude for this call */
  output_tokens: number;
}

export interface TranscriptionResponse {
  transcript: string;
  /** Duration of the audio clip in seconds, echoed back from what the frontend sent */
  audio_duration_seconds: number;
}

export interface FeedbackResponse {
  attempt_number: number;
  structure_score: number;
  justification: string;
  // Attempt 1 fields
  collapse_point?: string | null;
  next_attempt_instruction?: string | null;
  // Attempt 2 fields
  what_changed?: string | null;
  remaining_collapse_point?: string | null;
  // Exact Claude token counts for this call
  usage: UsageMetrics;
}

// ── Prompts ──────────────────────────────────────────────────

export async function fetchPrompts(): Promise<Prompt[]> {
  const res = await fetch(`${API_BASE}/api/prompts`);
  if (!res.ok) throw new Error("Failed to fetch prompts");
  const data = await res.json();
  return data.prompts;
}

// ── Transcription ────────────────────────────────────────────

export async function transcribeAudio(
  audioBlob: Blob,
  durationSeconds: number = 0
): Promise<TranscriptionResponse> {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");
  formData.append("duration_seconds", String(durationSeconds));

  const res = await fetch(`${API_BASE}/api/sessions/transcribe`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Transcription failed");
  }

  return res.json();
}

// ── Feedback ─────────────────────────────────────────────────

export async function getFeedback(params: {
  prompt_text: string;
  transcript: string;
  attempt_number: 1 | 2;
  previous_transcript?: string;
}): Promise<FeedbackResponse> {
  const res = await fetch(`${API_BASE}/api/sessions/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Feedback failed");
  }

  return res.json();
}
