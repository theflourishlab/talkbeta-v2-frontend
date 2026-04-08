"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Sparkles, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { fetchPrompts, type Prompt } from "@/lib/api";
import { useSession } from "@/lib/use-session";

export function HomeScreen() {
  const { dispatch } = useSession();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchPrompts()
      .then((data) => {
        setPrompts(data);
        // Auto-expand the first category
        if (data.length > 0) {
          setOpenCategory(data[0].category);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Group prompts by category
  const grouped = prompts.reduce<Record<string, Prompt[]>>((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 max-w-xl"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-rust" />
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-rust/70">
            Structural Thinking Coach
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight mb-4">
          Talk<span className="text-rust">Beta</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Train yourself to hold the structure of your thinking together — under
          the pressure of the moment, not before it.
        </p>
      </motion.div>

      {/* Prompt selection */}
      {loading && (
        <div className="text-muted-foreground font-mono text-sm animate-pulse">
          Loading prompts...
        </div>
      )}

      {error && (
        <div className="text-rust font-mono text-sm">
          Could not load prompts. Is the backend running?
        </div>
      )}

      <div className="w-full max-w-2xl space-y-3">
        {Object.entries(grouped).map(([category, categoryPrompts], gi) => {
          const isOpen = openCategory === category;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + gi * 0.1, duration: 0.5 }}
              className="rounded-xl border border-border bg-card/50 overflow-hidden"
            >
              {/* Category header — clickable */}
              <button
                type="button"
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 cursor-pointer
                           hover:bg-accent/60 transition-colors duration-200 text-left"
              >
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <ChevronRight className="w-4 h-4 text-rust/70" />
                </motion.span>

                <span className="font-mono text-[11px] sm:text-xs tracking-[0.15em] uppercase text-rust/80 font-medium">
                  {category}
                </span>

                <span className="ml-auto font-mono text-[10px] text-muted-foreground/50">
                  {categoryPrompts.length} {categoryPrompts.length === 1 ? "prompt" : "prompts"}
                </span>
              </button>

              {/* Collapsible prompt list */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2">
                      {categoryPrompts.map((prompt, i) => (
                        <motion.div
                          key={prompt.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.25 }}
                        >
                          <Card
                            onClick={() =>
                              dispatch({ type: "SELECT_PROMPT", prompt })
                            }
                            className="group cursor-pointer bg-card hover:bg-accent border-border
                                       transition-all duration-200 p-3 sm:p-4 flex items-start gap-3 sm:gap-4"
                          >
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rust/10 flex items-center justify-center shrink-0 group-hover:bg-rust/20 transition-colors">
                              <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rust" />
                            </div>
                            <p className="text-[13px] sm:text-[15px] text-ink/90 leading-relaxed pt-0.5 group-hover:text-ink transition-colors">
                              {prompt.text}
                            </p>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
