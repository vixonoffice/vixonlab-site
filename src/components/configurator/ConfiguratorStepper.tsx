import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConfigurator } from './useConfigurator';
import { PackageStep } from './PackageStep';
import { ExtraPagesStep } from './ExtraPagesStep';
import { AddOnsStep } from './AddOnsStep';
import { MaintenanceStep } from './MaintenanceStep';
import { ConfigSummary } from './ConfigSummary';
import { Check, Package, FileText, Puzzle, Shield, Sparkles, ArrowLeft } from 'lucide-react';

// ---------------------------------------------------------------------------
// Step config
// ---------------------------------------------------------------------------

const STEP_IDS = ['package', 'pages', 'addons', 'maintenance', 'summary'] as const;
type StepId = (typeof STEP_IDS)[number];

const STEP_META: Record<StepId, { icon: typeof Package; ro: string; en: string }> = {
  package:     { icon: Package,   ro: 'Pachet',       en: 'Package' },
  pages:       { icon: FileText,  ro: 'Pagini',       en: 'Pages' },
  addons:      { icon: Puzzle,    ro: 'Add-ons',      en: 'Add-ons' },
  maintenance: { icon: Shield,    ro: 'Mentenanță',   en: 'Hosting' },
  summary:     { icon: Sparkles,  ro: 'Sumar',        en: 'Summary' },
};

// ---------------------------------------------------------------------------
// Slide animation — content swaps in same spot
// ---------------------------------------------------------------------------

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: 'spring' as const, stiffness: 400, damping: 35 },
  opacity: { duration: 0.2 },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ConfiguratorStepper() {
  const { language } = useLanguage();
  const {
    packages, addons, maintenancePlans, loading,
    state, dispatch,
    selectedPkg, selectedMaintenance, packageMeta,
    totalPrice, monthlyPrice, summaryLines, whatsappUrl,
  } = useConfigurator();

  const [currentStep, setCurrentStep] = useState<StepId>('package');
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const containerRef = useRef<HTMLDivElement>(null);

  // Which steps are available based on selection
  const availableSteps: StepId[] = (() => {
    const steps: StepId[] = ['package'];
    if (selectedPkg) {
      if (packageMeta?.extra_pages) steps.push('pages');
      if (addons.length > 0) steps.push('addons');
      if (maintenancePlans.length > 0) steps.push('maintenance');
      steps.push('summary');
    }
    return steps;
  })();

  const currentIdx = availableSteps.indexOf(currentStep);
  const isFirst = currentIdx === 0;

  // Navigate
  const goTo = useCallback((stepId: StepId) => {
    const fromIdx = availableSteps.indexOf(currentStep);
    const toIdx = availableSteps.indexOf(stepId);
    setDirection(toIdx > fromIdx ? 1 : -1);
    setCurrentStep(stepId);
    // Scroll container into view
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, [availableSteps, currentStep]);

  const goNext = useCallback(() => {
    if (currentIdx < availableSteps.length - 1) {
      goTo(availableSteps[currentIdx + 1]);
    }
  }, [currentIdx, availableSteps, goTo]);

  const goBack = useCallback(() => {
    if (currentIdx > 0) {
      goTo(availableSteps[currentIdx - 1]);
    }
  }, [currentIdx, availableSteps, goTo]);

  // Auto-advance when package selected
  const handlePackageSelect = useCallback((id: string) => {
    dispatch({ type: 'SET_PACKAGE', id });
  }, [dispatch]);

  // After package state updates, advance
  useEffect(() => {
    if (selectedPkg && currentStep === 'package') {
      // Small delay for visual feedback
      const t = setTimeout(() => goNext(), 350);
      return () => clearTimeout(t);
    }
  }, [selectedPkg?.id]);

  // Auto-advance after maintenance selection
  const handleMaintenanceSelect = useCallback((id: string) => {
    dispatch({ type: 'SET_MAINTENANCE', id });
  }, [dispatch]);

  useEffect(() => {
    if (selectedMaintenance && currentStep === 'maintenance') {
      const t = setTimeout(() => goNext(), 350);
      return () => clearTimeout(t);
    }
  }, [selectedMaintenance?.id]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="scroll-mt-28">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 mb-8">
        {availableSteps.map((stepId, i) => {
          const isCurrent = stepId === currentStep;
          const isDone = i < currentIdx;
          const meta = STEP_META[stepId];
          const Icon = meta.icon;

          return (
            <button
              key={stepId}
              onClick={() => isDone && goTo(stepId)}
              disabled={!isDone && !isCurrent}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                isCurrent
                  ? 'bg-primary/20 text-primary-light'
                  : isDone
                    ? 'bg-white/5 text-foreground hover:bg-white/10 cursor-pointer'
                    : 'bg-transparent text-muted-foreground/40 cursor-default'
              }`}
            >
              {isDone ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Icon className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {language === 'ro' ? meta.ro : meta.en}
              </span>
            </button>
          );
        })}
      </div>

      {/* Back button */}
      {!isFirst && (
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'ro' ? 'Înapoi' : 'Back'}
        </button>
      )}

      {/* Content area — fixed position, content swaps */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
          >
            {currentStep === 'package' && (
              <PackageStep
                packages={packages}
                selectedId={state.packageId}
                onSelect={handlePackageSelect}
              />
            )}

            {currentStep === 'pages' && packageMeta && (
              <div>
                <ExtraPagesStep
                  extraPages={state.extraPages}
                  maxPages={packageMeta.max_pages}
                  onChange={(count) => dispatch({ type: 'SET_EXTRA_PAGES', count })}
                />
                <NextButton onClick={goNext} lang={language} />
              </div>
            )}

            {currentStep === 'addons' && (
              <div>
                <AddOnsStep
                  addons={addons}
                  selectedSlugs={state.selectedAddons}
                  onToggle={(slug) => dispatch({ type: 'TOGGLE_ADDON', slug })}
                />
                <NextButton onClick={goNext} lang={language} />
              </div>
            )}

            {currentStep === 'maintenance' && (
              <MaintenanceStep
                plans={maintenancePlans}
                selectedId={state.maintenanceId}
                onSelect={handleMaintenanceSelect}
              />
            )}

            {currentStep === 'summary' && (
              <ConfigSummary
                summaryLines={summaryLines}
                totalPrice={totalPrice}
                monthlyPrice={monthlyPrice}
                whatsappUrl={whatsappUrl}
                hasSelection={!!selectedPkg}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Running total — visible from step 2 onward, except summary */}
      {selectedPkg && currentStep !== 'summary' && currentStep !== 'package' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-between px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5"
        >
          <span className="text-sm text-muted-foreground">
            {language === 'ro' ? 'Total curent' : 'Current total'}
          </span>
          <span className="font-heading font-bold text-lg gradient-text">
            {totalPrice}€
            {monthlyPrice > 0 && (
              <span className="text-sm font-normal text-primary-light ml-1.5">
                + {monthlyPrice}€/{language === 'ro' ? 'lună' : 'mo'}
              </span>
            )}
          </span>
        </motion.div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Next button
// ---------------------------------------------------------------------------

function NextButton({ onClick, lang }: { onClick: () => void; lang: string }) {
  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 gradient-primary text-white font-semibold px-7 py-3 rounded-2xl text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
      >
        {lang === 'ro' ? 'Continuă' : 'Continue'}
        <ArrowLeft className="w-4 h-4 rotate-180" />
      </button>
    </div>
  );
}
