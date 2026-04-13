import { NextResponse } from 'next/server';

const llmsMarkdown = `# TalkBeta - App Context & Features for LLMs

## Overview
TalkBeta is a practice-first speaking fluency app that trains people to think on their feet and communicate with clarity under pressure. It's built for students, professionals, and founders who need to perform when it counts — pitches, interviews, presentations, high-stakes conversations. The core premise is that speaking well isn't a personality trait, it's a skill that can be trained. And the stakes are real: economic opportunity, credibility, access — all of it flows through how well you can express yourself in the moment.

## Current Core Feature: The Thinking Coach Loop
Currently, the app consists of a single, highly deliberate interaction loop.

### How It Works (Step-by-Step Flow)
1. **Prompt Phase**: The user is presented with a high-stakes speaking prompt (e.g., "Tell me about yourself and why you're the right person for this role.").
2. **Prep Timer**: A mandatory 10-second countdown begins. The user cannot skip this, simulating real-world immediate pressure. No notes can be written.
3. **Record (Attempt 1)**: Audio recording begins immediately after the timer. The user has up to 90 seconds to state their answer.
4. **First Feedback**: 
   - The audio is transcribed securely via the backend (Whisper).
   - The transcript is processed by an LLM (Claude) to evaluate structural integrity.
   - The user is immediately presented with actionable, structural feedback.
5. **Re-Attempt**: The user is given the same prompt again (10s prep, 90s record) with their feedback in mind.
6. **Comparison View**: The app presents a side-by-side comparison of Attempt 1 and Attempt 2 to demonstrate concrete structural improvement.

### What the API / AI Response is Like
The AI feedback strictly ignores filler words, tone, or grammar. It only cares if a structural thought was established, developed, and completed cleanly.

**Attempt 1 Feedback Response:**
- **Structure Score**: A score from 1-5.
- **Justification**: A one-sentence explanation of the score, referencing what the user actually said.
- **Collapse Point**: An exact quote from the transcript pinpointing the exact moment the speaker's thinking broke down or trail of thought was lost. If none, it states so.
- **Next Attempt Instruction**: Exactly one specific, actionable instruction focused on maintaining structure for the second attempt.

**Attempt 2 (Comparison) Response:**
- **Structure Score**: A score from 1-5 for the second attempt.
- **Justification**: A one-sentence explanation.
- **What Changed**: One specific structural difference between both attempts (e.g., "In attempt 1 you abandoned your opening point. In attempt 2 you completed it.").
- **Remaining Collapse Point**: Notes if the same breakdown pattern happened again, or what the speaker did right instead.

## Architecture Context
- **Frontend**: Next.js App Router, Tailwind CSS, using MediaRecorder API for audio capture.
- **Backend API**: FastAPI (Python). No persistent database in MVP (session state only).
- **Core AI Integration**: OpenAI \`whisper-1\` model for transcription, Anthropic \`claude-sonnet\` for structural coach feedback.
`;

export async function GET() {
  return new NextResponse(llmsMarkdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
