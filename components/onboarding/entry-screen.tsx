import React from 'react';
import { GlobalEntry } from '@/content/types';

interface EntryScreenProps {
  content: GlobalEntry;
  onContinue: () => void;
}

export function EntryScreen({ content, onContinue }: EntryScreenProps) {
  return (
    <div className="flex flex-col h-full bg-ink text-paper overflow-hidden">
      <div className="flex-1 overflow-y-auto px-7 pt-12">
        <div className="font-mono text-[10px] text-gold uppercase tracking-[0.15em] mb-12">
          TalkBeta
        </div>

        <h1 className="font-heading text-[38px] leading-[1.1] font-semibold mb-6">
          {/* Manually highlighting the last phrase as per prototype */}
          You think clearly. Why doesn't it <em className="text-gold italic">sound that way?</em>
        </h1>

        <p className="font-sans text-[15px] leading-[1.74] text-muted-foreground mb-8">
          {content.body}
        </p>

        <div className="border-l-2 border-rust pl-4 py-1 mb-11">
          {content.aside.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className={`font-sans text-[13px] leading-[1.76] text-paper/40 ${idx > 0 ? 'mt-[10px]' : ''}`}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="h-px bg-white/10 mb-7" />

        <p className="font-mono text-[9px] text-muted-foreground/60 text-center uppercase tracking-widest mb-4">
          {content.footer_label}
        </p>
      </div>

      <button
        onClick={onContinue}
        className="mx-7 mb-8 py-[17px] bg-gold text-ink font-mono text-[11px] uppercase tracking-[0.14em] rounded-[10px] transition-opacity active:opacity-80"
      >
        {content.cta}
      </button>
    </div>
  );
}
