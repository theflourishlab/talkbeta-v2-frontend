export type CategoryId =
  | "interview_ready"
  | "pitch_sharp"
  | "debate_fast"
  | "speak_freely";

export interface GlobalEntry {
  headline: string;
  body: string;          // Full paragraph body text
  aside: string;         // The indented accent block (the cost lines)
  footer_label: string;  // Small muted label above CTA
  cta: string;
}

export interface CategoryCard {
  id: CategoryId;
  name: string;          // Display name shown on the card
  tagline: string;       // One-line emotional fingerprint
}

export interface CategoryModule {
  id: CategoryId;
  dark: boolean;         // true = ink background, false = paper background
  // The 5 copy beats — all required, no optional fields
  pain: string;
  stakes: string;
  reframe_head: string;  // Short serif italic heading for the reframe beat
  reframe_body: string;  // Explanatory body copy for the reframe
  promise: string;
  drill_intro: string;
}

// Composed type used in components
export interface ResolvedCategory {
  card: CategoryCard;
  module: CategoryModule;
}
