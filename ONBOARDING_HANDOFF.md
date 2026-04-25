# TalkBeta — Onboarding Feature Handoff

> **For the developer and their AI agents implementing this feature.**
> Read this entire document before writing a single line of code.

---

## 1. Branch Instruction

**Create a new branch before doing anything else.**

```bash
git checkout -b feature/onboarding-pwa
```

This branch must NOT be merged to `main` without explicit owner approval.
The current `main` branch is live and deployed. Do not touch it.

---

## 2. What You're Building

A **pre-authentication onboarding flow** for TalkBeta — a practice-first speaking fluency app.

The onboarding is a **3-screen mobile experience** (PWA, not native) that:
1. Hooks any user with a universal truth about speaking
2. Lets them self-select into their specific goal category
3. Walks them through 5 copy beats that make them feel precisely understood **before they touch a single drill**

The goal of the onboarding is conversion: take a skeptical first-time visitor and make them a committed user — through copy and design, not features.

**This is pre-auth. No login. No account creation. No API calls during onboarding.**

---

## 3. This Is a PWA

The entire frontend must feel like a native mobile app. This means:

- Target viewport: **375–390px wide** (iPhone-sized). This is the primary design target.
- No horizontal scroll. No visible browser chrome feeling.
- Smooth, snappy transitions between screens (not page navigations — in-app state transitions).
- Touch-friendly tap targets (minimum 44px height for interactive elements).
- The prototype (see Section 7) already demonstrates the correct feel. Match it.
- **Do not build separate desktop/tablet layouts for the onboarding flow.** It is mobile-first and mobile-only. On larger screens, center the mobile frame.

Next.js is already configured. You do not need to add a service worker or manifest for this task — that can be added later. Focus on the UI and flow.

---

## 4. What Already Exists (Do Not Break)

The current codebase has a working deployed product. Your work lives in **one new route** and should not alter any of the following:

| Path | What it is | Touch it? |
|---|---|---|
| `app/page.tsx` | Marketing landing page | ❌ No |
| `app/app/page.tsx` | The main training app | ❌ No |
| `components/screens/home-screen.tsx` | Prompt selection screen | ❌ No |
| `components/screens/record-screen.tsx` | Recording screen | ❌ No |
| `components/screens/compare-screen.tsx` | Results comparison screen | ❌ No |
| `components/screens/prep-screen.tsx` | Prep countdown screen | ❌ No |
| `components/screens/feedback-screen.tsx` | Feedback screen | ❌ No |
| `components/screens/processing-screen.tsx` | Processing screen | ❌ No |
| `app/globals.css` | Design tokens — read-only | ❌ No |
| `app/layout.tsx` | Root layout | ❌ No |

**Your new files will go in:**
```
app/onboarding/page.tsx          ← New route: /onboarding
components/onboarding/           ← New component directory
content/onboarding.ts            ← New content file (single source of truth)
content/types.ts                 ← New type definitions
```

---

## 5. Design System (Already Set Up — Use These)

Do not invent new colors, fonts, or tokens. Everything is already configured in `globals.css` and `layout.tsx`.

### Color Tokens (use via Tailwind)
```
bg-ink        → #0d0d0d   (near-black, used for dark backgrounds)
bg-paper      → #f5f0e8   (warm off-white, used for light backgrounds)
bg-cream      → #ede8da   (slightly darker warm, used for secondary sections)
text-gold     → #c9a84c   (gold accent — used for category labels and key highlights)
text-rust     → #b84c2a   (rust — primary action color, CTAs)
text-muted    → #8a8070   (muted warm gray — secondary text)
bg-slate-brand→ #2c3e50   (dark slate — used for dark sections)
```

### Font Tokens
```
font-heading  → Fraunces (serif, used for ALL large headlines — the editorial voice)
font-sans     → Inter (used for body copy and UI text)
font-mono     → DM Mono (used for labels, categories, small caps UI text)
```

### Typography Rules from the Prototype
- **Category labels** → `font-mono`, uppercase, letter-spacing, `text-gold`, 9–11px
- **Large headlines** → `font-heading` (Fraunces), 28–38px, weight 600
- **Body copy** → `font-sans` (Inter), 14–16px, line-height ~1.7
- **CTA buttons** → `font-mono`, uppercase, letter-spacing, full-width on mobile

---

## 6. The Content System (The Only Source of Truth)

All copy lives in `content/onboarding.ts`. **No copy string should ever be hardcoded inside a component.**

### Step 1 — Create `content/types.ts`

```typescript
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
```

### Step 2 — Create `content/onboarding.ts`

Paste in the exact copy below. Do not paraphrase or modify the copy. The owner has approved this exact wording.

```typescript
import type { GlobalEntry, CategoryCard, CategoryModule, CategoryId } from "./types";

// ─── LAYER 1: Global Entry ────────────────────────────────────────────────────

export const globalEntry: GlobalEntry = {
  headline: "You think clearly. Why doesn't it sound that way?",
  body: "Most people aren't bad at thinking. They're untrained at speaking — and it costs more than you've been told.",
  aside: "The job you didn't get. The room you lost. The point you couldn't land when it counted.\n\nThose weren't failures of intelligence — they were failures of expression.",
  footer_label: "TalkBeta closes that gap",
  cta: "What are you training for →",
};

// ─── LAYER 2: Category Cards ──────────────────────────────────────────────────

export const categoryCards: CategoryCard[] = [
  {
    id: "interview_ready",
    name: "Interview Ready",
    tagline: "Stop leaving interviews hoping for the best.",
  },
  {
    id: "pitch_sharp",
    name: "Pitch Sharp",
    tagline: "Make people feel what you feel about what you're building.",
  },
  {
    id: "debate_fast",
    name: "Debate Fast",
    tagline: "Respond to anything. Lose your composure over nothing.",
  },
  {
    id: "speak_freely",
    name: "Speak Freely",
    tagline: "Start sounding like the person you actually are.",
  },
];

// ─── LAYER 3: Category Modules ────────────────────────────────────────────────

export const categoryModules: CategoryModule[] = [
  {
    id: "interview_ready",
    dark: true,
    pain: "You know your answers. You've rehearsed them. But the moment you're in that room — you ramble, trail off, or freeze on a question you've answered a hundred times before.",
    stakes: "Every interview you walk out of unsure about is a job, a salary, and a version of your future you don't get back.",
    reframe_head: "It's not confidence.\nIt's structure.",
    reframe_body: "When you know how to organize your thinking under pressure, the words follow. That's not a personality trait — it's trainable.",
    promise: "You'll stop leaving interviews hoping for the best and start walking out knowing you represented yourself well.",
    drill_intro: "Your drills build the ability to structure a clear, compelling answer in seconds — even for questions you've never heard before.",
  },
  {
    id: "pitch_sharp",
    dark: false,
    pain: "You know your business inside out. But in front of an investor or a panel, the clarity you have in your head doesn't make it into the room. You over-explain what's simple and under-sell what's powerful.",
    stakes: "One unclear pitch can cost you a check, a partner, or the shot at building what you've spent months on.",
    reframe_head: "A great pitch isn't\nthe right words.",
    reframe_body: "It's making someone else feel what you feel about what you're building. That's a skill, not a gift — and it's learnable.",
    promise: "You'll walk into any room and make people understand, believe, and want to be part of what you're building.",
    drill_intro: "Your drills train you to distill complex ideas into clear language and hold your ground when the questions get hard.",
  },
  {
    id: "debate_fast",
    dark: true,
    pain: "You're sharp. You can build a case. But when someone hits you with an argument you didn't prepare for, there's a gap between what you know and what you can say — and that gap costs you the room.",
    stakes: "In a debate, hesitation reads as weakness. One fumbled response can undo a position you've spent the whole round building.",
    reframe_head: "Speed isn't quickness.\nIt's pattern recognition.",
    reframe_body: "The more you practice structuring arguments under pressure, the faster your mind retrieves and deploys them.",
    promise: "You'll hear any argument and respond with a clear, structured counter — without losing your composure or your thread.",
    drill_intro: "Your drills simulate live pressure — prompts you haven't seen, positions to defend on the spot, timed to build your response speed and structure.",
  },
  {
    id: "speak_freely",
    dark: false,
    pain: "It's not one big moment that gets you — it's the small ones. The meeting where you couldn't find the words. The opinion you had but couldn't land. The conversation where you felt like a lesser version of yourself.",
    stakes: "How you show up in everyday conversation shapes how people see you, how much space you take up, and how much of yourself actually gets expressed.",
    reframe_head: "You're not a bad\ncommunicator.",
    reframe_body: "You're an untrained one. Everyday fluency is a skill — and like every skill, it compounds with practice.",
    promise: "You'll stop trailing off mid-thought and start saying what you actually mean — clearly, confidently, without performing.",
    drill_intro: "Your drills build the habit of thinking and speaking at the same time — so expression starts feeling natural, not effortful.",
  },
];
```

---

## 7. The Visual Prototype

A fully functional HTML prototype of the onboarding flow already exists at:

```
frontend/talkbeta_onboarding_prototype.html
```

**Open this file in a browser before writing any code.** It demonstrates:
- The exact 3-screen flow (Entry → Category Select → Category Module)
- The dark/light background alternation per category
- The 5-beat slot progression with dot indicators
- The typography hierarchy and color usage
- Touch-optimized CTA button behavior
- The status bar, pill notch, and phone-frame aesthetic

Your job is to implement this prototype's behavior and visual as a proper Next.js + React component system — not to redesign it. The prototype IS the design spec.

---

## 8. Component Architecture

### File Structure to Create

```
frontend/
├── content/
│   ├── types.ts                          ← Type definitions (Section 6)
│   └── onboarding.ts                     ← All copy (Section 6)
├── app/
│   └── onboarding/
│       └── page.tsx                      ← Route: /onboarding
└── components/
    └── onboarding/
        ├── onboarding-shell.tsx          ← Top-level state manager
        ├── entry-screen.tsx              ← Layer 1 (the universal hook)
        ├── category-select-screen.tsx    ← Layer 2 (the 4 cards)
        └── category-module-screen.tsx    ← Layer 3 (the 5-beat sequence)
```

### Component Contracts

#### `onboarding-shell.tsx`
- Manages which of the 3 screens is active via local state
- Manages which category is selected
- Passes content as props down to child screens
- Imports from `content/onboarding.ts` — this is the ONE place that imports content
- Does not render any UI itself, only coordinates

```typescript
type OnboardingScreen = "entry" | "select" | "module";
```

#### `entry-screen.tsx`
```typescript
interface EntryScreenProps {
  content: GlobalEntry;
  onContinue: () => void;  // advances to select screen
}
```

- Renders Layer 1 copy
- Dark background (`bg-ink`)
- `headline` in large Fraunces serif, gold accent on last phrase
- `body` in Inter sans
- `aside` in a left-border accent block (rust border, dimmed text)
- `footer_label` as tiny mono uppercase label above CTA
- Full-width gold CTA button at bottom

#### `category-select-screen.tsx`
```typescript
interface CategorySelectScreenProps {
  cards: CategoryCard[];
  onSelect: (id: CategoryId) => void;
  onBack: () => void;
}
```

- Renders Layer 2 — the 4 category cards
- Light background (`bg-paper`)
- Each card: dark background (`bg-ink`), gold mono label, white-ish tagline, arrow glyph
- Cards are tappable — calls `onSelect` with the category id

#### `category-module-screen.tsx`
```typescript
interface CategoryModuleScreenProps {
  module: CategoryModule;
  categoryName: string;
  onComplete: () => void;  // called when user finishes all 5 beats — redirect to /app
  onBack: () => void;
}
```

- Renders Layer 3 — the 5-beat sequence
- Background alternates based on `module.dark`
- Manages its own internal slot index (0–4)
- Renders dot progress indicators (5 dots, active dot is wider, gold)
- The 5 slots render in this fixed order:
  1. `pain` — body only, no heading
  2. `stakes` — body only, rust accent bar at bottom
  3. `reframe` — `reframe_head` as italic serif heading + `reframe_body`
  4. `promise` — body only, gold accent bar at bottom
  5. `drill_intro` — heading "Here's what you're about to do." + body, CTA becomes gold "Begin Training →"
- Slot label (mono uppercase) shown above each beat: PAIN / STAKES / REFRAME / PROMISE / DRILL INTRO
- CTA: "Continue →" for slots 1–4, "Begin Training →" for slot 5

### The Slot Label Map
```typescript
const SLOT_LABELS: Record<number, string> = {
  0: "PAIN",
  1: "STAKES",
  2: "REFRAME",
  3: "PROMISE",
  4: "DRILL INTRO",
};
```

### Screen Transition
Use `framer-motion` `AnimatePresence` with a simple fade or slide transition between screens. The library is already installed. Keep transitions under 300ms — feel snappy, not sluggish.

---

## 9. Routing

The onboarding lives at `/onboarding`.

```
/           → existing landing page (do not touch)
/app        → existing training app (do not touch)
/onboarding → NEW — the 3-screen onboarding flow
```

When a user completes the module screen (taps "Begin Training →"), navigate them to `/app`.

Use `next/navigation` `useRouter` for this. Do not use `<Link>` inside the module CTA — it's a programmatic navigation after state completion.

---

## 10. Modifiability Rules

These rules must be followed so the owner can update copy without touching components:

1. **No copy string lives in a component.** Not even a word. Everything comes from `content/onboarding.ts`.
2. **TypeScript will enforce completeness.** Every field in `CategoryModule` is required. If a new category is added, all fields must be filled before it compiles.
3. **Component order is fixed.** The slot sequence (pain → stakes → reframe → promise → drill_intro) is an emotional arc, not configurable data. It is the one thing hardcoded in the component, intentionally.
4. **Adding a new category** requires only: a new `CategoryId` literal + one new `CategoryCard` + one new `CategoryModule`. Zero component changes.

---

## 11. Tech Stack Summary

```
Framework:      Next.js 16 (App Router)
Language:       TypeScript
Styling:        Tailwind CSS v4
Animations:     framer-motion (already installed)
Icons:          lucide-react (already installed)
Fonts:          Fraunces (heading), Inter (sans), DM Mono (mono) — loaded via next/font
Analytics:      PostHog (already wired up — do not add new tracking events for onboarding)
```

No new dependencies should be added unless absolutely necessary (and cleared with the owner first).

---

## 12. Acceptance Criteria

Before handing back, verify every item:

- [ ] Branch is `feature/onboarding-pwa`, not `main`
- [ ] `/onboarding` route exists and renders correctly
- [ ] Entry screen renders all Layer 1 copy correctly (headline, body, aside, cta)
- [ ] Category select screen shows all 4 cards with correct names and taglines
- [ ] Tapping a card navigates to its correct module
- [ ] Module screen shows correct category name and 5 dots
- [ ] All 5 beats render in order with correct slot labels
- [ ] Slot 3 (REFRAME) shows the italic serif heading + body
- [ ] Slot 5 CTA reads "Begin Training →" and is gold
- [ ] Completing slot 5 navigates to `/app`
- [ ] Back button on select screen goes to entry
- [ ] Back button on module screen goes to select
- [ ] All copy matches `content/onboarding.ts` exactly — no paraphrasing
- [ ] No copy strings are hardcoded in any component
- [ ] `npm run build` passes with zero TypeScript errors
- [ ] Existing routes (`/` and `/app`) are completely unaffected
- [ ] Visual matches the HTML prototype in `talkbeta_onboarding_prototype.html`

---

## 13. Questions

Direct all questions to the project owner before making design decisions.
Do not make assumptions about copy, layout, or routing changes that affect existing screens.
