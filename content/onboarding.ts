import type { GlobalEntry, CategoryCard, CategoryModule } from "./types";

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
