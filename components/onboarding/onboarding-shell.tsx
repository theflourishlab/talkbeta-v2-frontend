'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { globalEntry, categoryCards, categoryModules } from '@/content/onboarding';
import { CategoryId } from '@/content/types';
import { EntryScreen } from './entry-screen';
import { CategorySelectScreen } from './category-select-screen';
import { CategoryModuleScreen } from './category-module-screen';

type OnboardingScreen = 'entry' | 'select' | 'module';

export function OnboardingShell() {
  const [currentScreen, setCurrentScreen] = useState<OnboardingScreen>('entry');
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | null>(null);

  const selectedModule = categoryModules.find((m) => m.id === selectedCategoryId);
  const selectedCategoryName = categoryCards.find((c) => c.id === selectedCategoryId)?.name || '';

  const handleSelectCategory = (id: CategoryId) => {
    setSelectedCategoryId(id);
    setCurrentScreen('module');
  };

  return (
    <div className="flex justify-center min-h-screen bg-ink">
      {/* Container */}
      <div className="relative w-full max-w-[390px] min-h-screen flex flex-col bg-ink overflow-hidden mx-auto">
        <AnimatePresence mode="wait">
          {currentScreen === 'entry' && (
            <motion.div
              key="entry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <EntryScreen 
                content={globalEntry} 
                onContinue={() => setCurrentScreen('select')} 
              />
            </motion.div>
          )}

          {currentScreen === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <CategorySelectScreen
                cards={categoryCards}
                onSelect={handleSelectCategory}
                onBack={() => setCurrentScreen('entry')}
              />
            </motion.div>
          )}

          {currentScreen === 'module' && selectedModule && (
            <motion.div
              key="module"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <CategoryModuleScreen
                module={selectedModule}
                categoryName={selectedCategoryName}
                onBack={() => setCurrentScreen('select')}
                onComplete={() => {
                  // Navigation to /app is handled in the page or via router
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
