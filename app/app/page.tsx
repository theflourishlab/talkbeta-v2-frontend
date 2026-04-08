"use client";

import { SessionProvider, useSession } from "@/lib/use-session";
import { HomeScreen } from "@/components/screens/home-screen";
import { PrepScreen } from "@/components/screens/prep-screen";
import { RecordScreen } from "@/components/screens/record-screen";
import { ProcessingScreen } from "@/components/screens/processing-screen";
import { FeedbackScreen } from "@/components/screens/feedback-screen";
import { CompareScreen } from "@/components/screens/compare-screen";

function SessionRouter() {
  const { state } = useSession();

  switch (state.step) {
    case "home":
      return <HomeScreen />;
    case "prep":
    case "prep-2":
      return <PrepScreen />;
    case "record-1":
    case "record-2":
      return <RecordScreen />;
    case "processing-1":
    case "processing-2":
      return <ProcessingScreen />;
    case "feedback-1":
      return <FeedbackScreen />;
    case "compare":
      return <CompareScreen />;
    default:
      return <HomeScreen />;
  }
}

export default function AppPage() {
  return (
    <SessionProvider>
      <main className="flex-1 flex flex-col">
        <SessionRouter />
      </main>
    </SessionProvider>
  );
}
