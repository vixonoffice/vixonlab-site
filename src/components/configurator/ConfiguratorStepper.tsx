import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConfiguratorState } from './useConfiguratorState';
import { useConfiguratorOptions } from '@/hooks/useConfiguratorOptions';
import { STEP_LABELS, STEP_ORDER, label } from './configuratorConfig';
import type { StepId } from './configuratorConfig';
import { ProjectStep } from './steps/ProjectStep';
import { PagesStep } from './steps/PagesStep';
import { FeaturesStep } from './steps/FeaturesStep';
import { BrandStep } from './steps/BrandStep';
import { ContentStep } from './steps/ContentStep';
import { MaintenanceNewStep } from './steps/MaintenanceNewStep';
import { SummaryStep } from './steps/SummaryStep';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const slideTransition = {
  x: { type: 'spring' as const, stiffness: 400, damping: 35 },
  opacity: { duration: 0.2 },
};

// ---------------------------------------------------------------------------
// Step titles
// ---------------------------------------------------------------------------

const STEP_TITLES: Record<StepId, { ro: string; en: string }> = {
  project: { ro: 'Spune-ne despre proiectul tau', en: 'Tell us about your project' },
  pages: { ro: 'Ce pagini vrei pe site?', en: 'What pages do you want?' },
  features: { ro: 'Ce functionalitati ai nevoie?', en: 'What features do you need?' },
  brand: { ro: 'Design & Branding', en: 'Design & Branding' },
  content: { ro: 'Continut & Marketing', en: 'Content & Marketing' },
  maintenance: { ro: 'Mentenanta & Hosting', en: 'Maintenance & Hosting' },
  summary: { ro: 'Trimite configurarea', en: 'Submit your configuration' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ConfiguratorStepper() {
  const { language } = useLanguage();
  const { options, loading: optionsLoading } = useConfiguratorOptions();
  const {
    state, setField, toggleArray, addCustomPage, removeCustomPage,
    buildWhatsAppUrl, canProceed,
  } = useConfiguratorState();

  const [currentStep, setCurrentStep] = useState<StepId>('project');
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIdx = STEP_ORDER.indexOf(currentStep);
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === STEP_ORDER.length - 1;

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, []);

  const goTo = useCallback((stepId: StepId) => {
    const fromIdx = STEP_ORDER.indexOf(currentStep);
    const toIdx = STEP_ORDER.indexOf(stepId);
    setDirection(toIdx > fromIdx ? 1 : -1);
    setCurrentStep(stepId);
    scrollToTop();
  }, [currentStep, scrollToTop]);

  const goNext = useCallback(() => {
    if (currentIdx < STEP_ORDER.length - 1) goTo(STEP_ORDER[currentIdx + 1]);
  }, [currentIdx, goTo]);

  const goBack = useCallback(() => {
    if (currentIdx > 0) goTo(STEP_ORDER[currentIdx - 1]);
  }, [currentIdx, goTo]);

  const isRo = language === 'ro';

  if (optionsLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />)}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="scroll-mt-28">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            {isRo ? 'Pas' : 'Step'} {currentIdx + 1}/{STEP_ORDER.length}
          </span>
          <span className="text-xs text-muted-foreground">
            {Math.round(((currentIdx + 1) / STEP_ORDER.length) * 100)}%
          </span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-primary rounded-full"
            initial={false}
            animate={{ width: `${((currentIdx + 1) / STEP_ORDER.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-center gap-1 mb-6 flex-wrap">
        {STEP_ORDER.map((stepId, i) => {
          const isCurrent = stepId === currentStep;
          const isDone = i < currentIdx;
          return (
            <button
              key={stepId}
              onClick={() => isDone && goTo(stepId)}
              disabled={!isDone && !isCurrent}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                isCurrent
                  ? 'bg-primary/20 text-primary-light'
                  : isDone
                    ? 'bg-white/5 text-foreground hover:bg-white/10 cursor-pointer'
                    : 'text-muted-foreground/30 cursor-default'
              }`}
            >
              {isDone ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                  isCurrent ? 'bg-primary/30' : 'bg-white/5'
                }`}>
                  {i + 1}
                </span>
              )}
              <span className="hidden sm:inline">{label(STEP_LABELS[stepId], language)}</span>
            </button>
          );
        })}
      </div>

      {/* Step title */}
      <div className="mb-5">
        <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">
          {label(STEP_TITLES[currentStep], language)}
        </h2>
      </div>

      {/* Back button */}
      {!isFirst && (
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {isRo ? 'Inapoi' : 'Back'}
        </button>
      )}

      {/* Step content */}
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
            {currentStep === 'project' && (
              <ProjectStep state={state} setField={setField} lang={language} businessTypes={options.businessTypes} siteTypes={options.siteTypes} />
            )}
            {currentStep === 'pages' && (
              <PagesStep state={state} toggleArray={toggleArray} addCustomPage={addCustomPage} removeCustomPage={removeCustomPage} lang={language} pageOptions={options.pages} />
            )}
            {currentStep === 'features' && (
              <FeaturesStep state={state} toggleArray={toggleArray} lang={language} featureOptions={options.features} />
            )}
            {currentStep === 'brand' && (
              <BrandStep state={state} setField={setField} toggleArray={toggleArray} lang={language} logoOptions={options.logoStatus} designStyles={options.designStyles} brandExtras={options.brandExtras} />
            )}
            {currentStep === 'content' && (
              <ContentStep state={state} setField={setField} toggleArray={toggleArray} lang={language} textOptions={options.textStatus} photoOptions={options.photoStatus} marketingOptions={options.marketing} />
            )}
            {currentStep === 'maintenance' && (
              <MaintenanceNewStep state={state} setField={setField} lang={language} plans={options.maintenance} />
            )}
            {currentStep === 'summary' && (
              <SummaryStep state={state} setField={setField} lang={language} whatsappUrl={buildWhatsAppUrl(language, options)} budgetOptions={options.budget} timelineOptions={options.timeline} options={options} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next button (not on summary step) */}
      {!isLast && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={goNext}
            disabled={!canProceed[currentStep]}
            className={`inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-2xl text-sm transition-all ${
              canProceed[currentStep]
                ? 'btn-primary hover:opacity-90'
                : 'bg-white/10 text-muted-foreground cursor-not-allowed'
            }`}
          >
            {isRo ? 'Continua' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hint for required */}
      {currentStep === 'project' && !canProceed.project && (
        <p className="mt-3 text-xs text-muted-foreground text-right">
          {isRo ? 'Selecteaza tipul de site pentru a continua' : 'Select a site type to continue'}
        </p>
      )}
      {currentStep === 'maintenance' && !canProceed.maintenance && (
        <p className="mt-3 text-xs text-muted-foreground text-right">
          {isRo ? 'Alege un plan de mentenanta' : 'Choose a maintenance plan'}
        </p>
      )}
    </div>
  );
}

export default ConfiguratorStepper;
