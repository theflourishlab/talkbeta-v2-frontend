import React, { useState } from 'react';
import { CategoryModule } from '@/content/types';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CategoryModuleScreenProps {
  module: CategoryModule;
  categoryName: string;
  onComplete: () => void;
  onBack: () => void;
}

const SLOT_LABELS: Record<number, string> = {
  0: "PAIN",
  1: "STAKES",
  2: "REFRAME",
  3: "PROMISE",
  4: "DRILL INTRO",
};

export function CategoryModuleScreen({ module, categoryName, onBack, onComplete }: CategoryModuleScreenProps) {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const isDark = module.dark;
  const bgColor = isDark ? 'bg-ink' : 'bg-paper';
  const textColor = isDark ? 'text-paper' : 'text-ink';
  const mutedTextColor = isDark ? 'text-muted/70' : 'text-ink/35';
  const bodyTextColor = isDark ? 'text-paper/70' : 'text-ink/67';
  
  // Custom colors for specific steps
  const bodyStepColor = step === 1 ? 'text-rust' : step === 3 ? 'text-gold' : bodyTextColor;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
      router.push('/app');
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 0: return { body: module.pain };
      case 1: return { body: module.stakes, accent: 'bg-rust' };
      case 2: return { head: module.reframe_head, body: module.reframe_body };
      case 3: return { body: module.promise, accent: 'bg-gold' };
      case 4: return { head: "Here's what you're about to do.", body: module.drill_intro };
      default: return { body: "" };
    }
  };

  const content = getStepContent();

  return (
    <div className={`flex flex-col h-full ${bgColor} ${textColor} overflow-hidden transition-colors duration-300`}>
      {/* Top Bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 pt-12 pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 active:opacity-60 transition-opacity"
        >
          <ChevronLeft className={`w-4 h-4 text-muted-foreground`} strokeWidth={2} />
          <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">Categories</span>
        </button>
        <span className="font-mono text-[9px] text-gold uppercase tracking-[0.14em] font-medium">
          {categoryName}
        </span>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-1.5 justify-center py-3 flex-shrink-0">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-[5px] rounded-[3px] transition-all duration-300 ${
              i === step 
                ? 'w-[22px] bg-gold' 
                : `w-[5px] ${isDark ? 'bg-white/15' : 'bg-black/15'}`
            }`}
          />
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center px-7 pb-2 space-y-4">
        <div className={`font-mono text-[9px] ${mutedTextColor} uppercase tracking-[0.18em]`}>
          {SLOT_LABELS[step]}
        </div>

        {content.head && (
          <h3 className={`font-heading text-[24px] font-semibold italic leading-[1.2] mb-4 whitespace-pre-line`}>
            {content.head}
          </h3>
        )}

        <p className={`font-sans text-[16px] leading-[1.76] ${bodyStepColor}`}>
          {content.body}
        </p>

        {content.accent && (
          <div className={`w-7 h-[2px] ${content.accent} mt-6 rounded-[1px]`} />
        )}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleNext}
        className={`mx-7 mb-8 py-[17px] font-mono text-[11px] uppercase tracking-[0.14em] rounded-[10px] transition-all active:opacity-80 flex items-center justify-center ${
          step === 4
            ? 'bg-gold text-ink border-none'
            : isDark
            ? 'bg-white/5 text-paper border border-white/10'
            : 'bg-black/5 text-ink border border-black/10'
        }`}
      >
        {step === 4 ? 'Begin Training →' : 'Continue →'}
      </button>
    </div>
  );
}
