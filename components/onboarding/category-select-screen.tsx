import React from 'react';
import { CategoryCard, CategoryId } from '@/content/types';
import { ChevronLeft } from 'lucide-react';

interface CategorySelectScreenProps {
   cards: CategoryCard[];
   onSelect: (id: CategoryId) => void;
   onBack: () => void;
}

export function CategorySelectScreen({ cards, onSelect, onBack }: CategorySelectScreenProps) {
   return (
      <div className="flex flex-col h-full bg-paper text-ink overflow-hidden">
         {/* Top Bar with Back Button */}
         <div className="flex-shrink-0 flex items-center px-6 pt-12 pb-4">
            <button
               onClick={onBack}
               className="flex items-center gap-1.5 active:opacity-60 transition-opacity"
            >
               <ChevronLeft className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
               <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">Back</span>
            </button>
         </div>

         <div className="pt-[14px] pr-6 pb-[18px] pl-6">
            <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.14em] mb-2.5">
               Choose your track
            </div>
            <h2 className="font-heading text-[30px] font-semibold leading-[1.2]">
               What brings you<br />to TalkBeta?
            </h2>
         </div>

         <div className="flex-1 overflow-y-auto pb-6 space-y-2.5">
            {cards.map((card) => (
               <button
                  key={card.id}
                  onClick={() => onSelect(card.id)}
                  className="w-[calc(100%-40px)] mx-5 p-5 text-left bg-ink border border-white/10 rounded-[14px] flex flex-col gap-2 transition-all active:border-gold group"
               >
                  <div className="font-mono text-[9px] text-gold uppercase tracking-[0.15em]">
                     {card.name}
                  </div>
                  <p className="font-sans text-[14px] text-paper/80 leading-[1.54]">
                     {card.tagline}
                  </p>
                  <div className="font-sans text-[12px] text-muted-foreground group-active:text-gold mt-1">
                     →
                  </div>
               </button>
            ))}
         </div>
      </div>
   );
}
