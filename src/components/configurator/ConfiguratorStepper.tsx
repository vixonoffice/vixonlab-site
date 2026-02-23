import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConfigurator } from './useConfigurator';
import { PackageStep } from './PackageStep';
import { ExtraPagesStep } from './ExtraPagesStep';
import { AddOnsStep } from './AddOnsStep';
import { MaintenanceStep } from './MaintenanceStep';
import { ConfigSummary } from './ConfigSummary';
import { Check, ChevronDown, Package, FileText, Puzzle, Shield, Sparkles } from 'lucide-react';
import type { PricingPlanRow } from '@/hooks/useSupabaseData';

// ---------------------------------------------------------------------------
// Step definitions
// ---------------------------------------------------------------------------

interface StepDef {
  id: string;
  icon: typeof Package;
  getLabel: (lang: string) => string;
  getCompletedSummary: (state: any, lang: string) => string | null;
  isAvailable: (state: any) => boolean;
}

function getStepDefs(
  selectedPkg: PricingPlanRow | null,
  packageMeta: any,
  addons: any[],
  selectedMaintenance: PricingPlanRow | null,
  maintenancePlans: PricingPlanRow[],
  extraPages: number,
  selectedAddons: string[],
): StepDef[] {
  return [
    {
      id: 'package',
      icon: Package,
      getLabel: (lang) => lang === 'ro' ? 'Alege pachetul' : 'Choose package',
      getCompletedSummary: (_state, lang) => {
        if (!selectedPkg) return null;
        const name = lang === 'en' ? selectedPkg.name_en : selectedPkg.name_ro;
        const price = lang === 'en' ? selectedPkg.price_label_en : selectedPkg.price_label_ro;
        return `${name} — ${price}`;
      },
      isAvailable: () => true,
    },
    {
      id: 'pages',
      icon: FileText,
      getLabel: (lang) => lang === 'ro' ? 'Pagini suplimentare' : 'Extra pages',
      getCompletedSummary: (_state, lang) => {
        if (extraPages === 0) return lang === 'ro' ? 'Fără pagini extra' : 'No extra pages';
        return lang === 'ro' ? `${extraPages} pagini extra (+${extraPages * 100}€)` : `${extraPages} extra pages (+${extraPages * 100}€)`;
      },
      isAvailable: () => !!selectedPkg && !!packageMeta?.extra_pages,
    },
    {
      id: 'addons',
      icon: Puzzle,
      getLabel: (lang) => lang === 'ro' ? 'Funcționalități extra' : 'Extra features',
      getCompletedSummary: (_state, lang) => {
        if (selectedAddons.length === 0) return lang === 'ro' ? 'Niciun add-on selectat' : 'No add-ons selected';
        const count = selectedAddons.length;
        const included = addons.filter(a => selectedAddons.includes(a.slug) && a.included).length;
        const paid = count - included;
        if (paid === 0) return lang === 'ro' ? `${count} add-on-uri (toate incluse)` : `${count} add-ons (all included)`;
        return lang === 'ro' ? `${count} add-on-uri selectate` : `${count} add-ons selected`;
      },
      isAvailable: () => !!selectedPkg && addons.length > 0,
    },
    {
      id: 'maintenance',
      icon: Shield,
      getLabel: (lang) => lang === 'ro' ? 'Mentenanță & Hosting' : 'Maintenance & Hosting',
      getCompletedSummary: (_state, lang) => {
        if (!selectedMaintenance) return lang === 'ro' ? 'Nicio selecție' : 'No selection';
        const name = lang === 'en' ? selectedMaintenance.name_en : selectedMaintenance.name_ro;
        const price = lang === 'en' ? selectedMaintenance.price_label_en : selectedMaintenance.price_label_ro;
        return price === '0€' ? name : `${name} — ${price}`;
      },
      isAvailable: () => !!selectedPkg && maintenancePlans.length > 0,
    },
    {
      id: 'summary',
      icon: Sparkles,
      getLabel: (lang) => lang === 'ro' ? 'Sumar & Trimite' : 'Summary & Send',
      getCompletedSummary: () => null,
      isAvailable: () => !!selectedPkg,
    },
  ];
}

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------

const contentVariants = {
  collapsed: { height: 0, opacity: 0, overflow: 'hidden' as const },
  expanded: { height: 'auto', opacity: 1, overflow: 'visible' as const },
};

const contentTransition = {
  height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  opacity: { duration: 0.3, delay: 0.1 },
};

const collapseTransition = {
  height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  opacity: { duration: 0.15 },
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

  const [activeStep, setActiveStep] = useState('package');
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const steps = getStepDefs(
    selectedPkg, packageMeta, addons, selectedMaintenance,
    maintenancePlans, state.extraPages, state.selectedAddons,
  );

  // Auto-advance to next step
  const advanceToNext = useCallback((currentId: string) => {
    const available = steps.filter(s => s.isAvailable());
    const idx = available.findIndex(s => s.id === currentId);
    if (idx >= 0 && idx < available.length - 1) {
      const nextId = available[idx + 1].id;
      setActiveStep(nextId);
      // Smooth scroll to next step after animation
      setTimeout(() => {
        stepRefs.current[nextId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [steps]);

  // When package is selected, auto-advance
  const handlePackageSelect = useCallback((id: string) => {
    dispatch({ type: 'SET_PACKAGE', id });
    // Small delay so the state updates and next steps become available
    setTimeout(() => advanceToNext('package'), 100);
  }, [dispatch, advanceToNext]);

  // Extra pages — user can manually advance via "Continuă" button
  const handleExtraPagesNext = useCallback(() => {
    advanceToNext('pages');
  }, [advanceToNext]);

  // Addons — user advances via "Continuă"
  const handleAddonsNext = useCallback(() => {
    advanceToNext('addons');
  }, [advanceToNext]);

  // Maintenance selection auto-advances
  const handleMaintenanceSelect = useCallback((id: string) => {
    dispatch({ type: 'SET_MAINTENANCE', id });
    setTimeout(() => advanceToNext('maintenance'), 100);
  }, [dispatch, advanceToNext]);

  if (loading) return null;

  const availableSteps = steps.filter(s => s.isAvailable());

  // Step is "completed" if it's before the active step in the available list
  const activeIdx = availableSteps.findIndex(s => s.id === activeStep);
  const isCompleted = (stepId: string) => {
    const idx = availableSteps.findIndex(s => s.id === stepId);
    return idx >= 0 && idx < activeIdx;
  };

  return (
    <div className="space-y-3">
      {availableSteps.map((step, i) => {
        const isActive = step.id === activeStep;
        const completed = isCompleted(step.id);
        const Icon = step.icon;
        const summary = step.getCompletedSummary(state, language);

        return (
          <div
            key={step.id}
            ref={(el) => { stepRefs.current[step.id] = el; }}
            className="scroll-mt-28"
          >
            {/* Step header — always visible */}
            <button
              onClick={() => {
                if (step.id === 'summary' && !completed) return; // Can't click summary header
                setActiveStep(step.id);
                setTimeout(() => {
                  stepRefs.current[step.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
              }}
              className={`w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'glass-card border-primary/30'
                  : completed
                    ? 'glass-card hover:border-white/20 cursor-pointer'
                    : 'bg-white/[0.02] border border-white/5 cursor-default'
              }`}
            >
              {/* Step number / check */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                isActive
                  ? 'gradient-primary'
                  : completed
                    ? 'bg-green-500/20'
                    : 'bg-white/5'
              }`}>
                {completed ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                )}
              </div>

              {/* Label + summary */}
              <div className="flex-1 text-left min-w-0">
                <p className={`font-heading font-semibold text-sm ${
                  isActive ? 'text-foreground' : completed ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.getLabel(language)}
                </p>
                {completed && summary && (
                  <p className="text-xs text-primary-light mt-0.5 truncate">{summary}</p>
                )}
              </div>

              {/* Expand indicator */}
              {completed && (
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                  isActive ? 'rotate-180' : ''
                }`} />
              )}

              {/* Step badge */}
              {!isActive && !completed && step.id !== 'summary' && (
                <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider shrink-0">
                  {language === 'ro' ? `Pas ${i + 1}` : `Step ${i + 1}`}
                </span>
              )}
            </button>

            {/* Step content — animated expand/collapse */}
            <AnimatePresence initial={false}>
              {isActive && step.id !== 'summary' && (
                <motion.div
                  key={`content-${step.id}`}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={contentVariants}
                  transition={isActive ? contentTransition : collapseTransition}
                >
                  <div className="pt-5 pb-2">
                    {step.id === 'package' && (
                      <PackageStep
                        packages={packages}
                        selectedId={state.packageId}
                        onSelect={handlePackageSelect}
                      />
                    )}
                    {step.id === 'pages' && packageMeta && (
                      <>
                        <ExtraPagesStep
                          extraPages={state.extraPages}
                          maxPages={packageMeta.max_pages}
                          onChange={(count) => dispatch({ type: 'SET_EXTRA_PAGES', count })}
                        />
                        <ContinueButton
                          onClick={handleExtraPagesNext}
                          label={language === 'ro' ? 'Continuă' : 'Continue'}
                        />
                      </>
                    )}
                    {step.id === 'addons' && (
                      <>
                        <AddOnsStep
                          addons={addons}
                          selectedSlugs={state.selectedAddons}
                          onToggle={(slug) => dispatch({ type: 'TOGGLE_ADDON', slug })}
                        />
                        <ContinueButton
                          onClick={handleAddonsNext}
                          label={language === 'ro' ? 'Continuă' : 'Continue'}
                        />
                      </>
                    )}
                    {step.id === 'maintenance' && (
                      <MaintenanceStep
                        plans={maintenancePlans}
                        selectedId={state.maintenanceId}
                        onSelect={handleMaintenanceSelect}
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary step — inline, not in accordion */}
            {isActive && step.id === 'summary' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="pt-5">
                  <ConfigSummary
                    summaryLines={summaryLines}
                    totalPrice={totalPrice}
                    monthlyPrice={monthlyPrice}
                    whatsappUrl={whatsappUrl}
                    hasSelection={!!selectedPkg}
                  />
                </div>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Continue button
// ---------------------------------------------------------------------------

function ContinueButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 gradient-primary text-white font-semibold px-6 py-3 rounded-2xl text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
      >
        {label}
        <ChevronDown className="w-4 h-4 -rotate-90" />
      </button>
    </div>
  );
}
