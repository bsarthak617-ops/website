import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MANUFACTURING_STAGES } from '../data/companyData';
import { ArrowRight, CheckCircle2, Cpu, Wrench, Gauge } from 'lucide-react';

export default function ManufacturingSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="manufacturing" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark">
            FROM PROCESSING TO DISPATCH.
          </h2>
          <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
            Systematic 5-stage manufacturing lifecycle engineered across 3 facilities in Jharsuguda, Odisha.
          </p>
        </div>

        {/* Process Steps Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-12">
          {MANUFACTURING_STAGES.map((stage, idx) => (
            <button
              key={stage.step}
              onClick={() => setActiveStage(idx)}
              className={`p-4 text-left border transition-all duration-200 rounded-sm relative ${
                activeStage === idx
                  ? 'border-brand-gold bg-brand-bg-surface dark:bg-brand-bg-dark-surface shadow-sm'
                  : 'border-brand-border-light dark:border-brand-border-dark hover:border-brand-border-light/80 bg-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono font-bold ${activeStage === idx ? 'text-brand-gold' : 'text-brand-text-light-subtle dark:text-brand-text-dark-subtle'}`}>
                  {stage.number}
                </span>
                {activeStage === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
                )}
              </div>
              <h4 className="text-xs font-extrabold tracking-wider uppercase text-brand-text-light dark:text-brand-text-dark">
                {stage.step}
              </h4>
            </button>
          ))}
        </div>

        {/* Interactive Active Stage Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface p-6 sm:p-10 rounded-sm"
          >
            {/* Left: Detail Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text-light dark:text-brand-text-dark tracking-tight mb-4">
                  {MANUFACTURING_STAGES[activeStage].title}
                </h3>

                <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed mb-6">
                  {MANUFACTURING_STAGES[activeStage].description}
                </p>

                {/* Equipment Breakdown */}
                <div className="p-4 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-brand-teal" />
                    <span className="tech-label text-brand-text-light dark:text-brand-text-dark">
                      ACTIVE INDUSTRIAL EQUIPMENT
                    </span>
                  </div>
                  <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted font-mono leading-relaxed">
                    {MANUFACTURING_STAGES[activeStage].equipment}
                  </p>
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="pt-6 border-t border-brand-border-light dark:border-brand-border-dark flex items-center justify-between">
                <button
                  disabled={activeStage === 0}
                  onClick={() => setActiveStage(prev => Math.max(0, prev - 1))}
                  className="text-xs font-semibold uppercase tracking-wider disabled:opacity-30 text-brand-text-light-muted hover:text-brand-text-light dark:text-brand-text-dark-muted dark:hover:text-brand-text-dark transition-colors"
                >
                  ← Previous Stage
                </button>

                <div className="flex gap-1">
                  {MANUFACTURING_STAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStage(i)}
                      className={`h-1.5 transition-all rounded-full ${
                        activeStage === i ? 'w-6 bg-brand-gold' : 'w-2 bg-brand-border-light dark:bg-brand-border-dark'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={activeStage === MANUFACTURING_STAGES.length - 1}
                  onClick={() => setActiveStage(prev => Math.min(MANUFACTURING_STAGES.length - 1, prev + 1))}
                  className="text-xs font-semibold uppercase tracking-wider disabled:opacity-30 text-brand-gold hover:text-brand-gold-light transition-colors"
                >
                  Next Stage →
                </button>
              </div>
            </div>

            {/* Right: Realistic Industrial Photo */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-72 sm:h-96 overflow-hidden rounded-sm border border-brand-border-light dark:border-brand-border-dark">
                <img
                  src={MANUFACTURING_STAGES[activeStage].image}
                  alt={MANUFACTURING_STAGES[activeStage].title}
                  className="w-full h-full object-cover filter contrast-110 grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                  <span>FACILITY: JHARSUGUDA UNIT</span>
                  <span>PROTOCOL: RIGID QC DISPATCH</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
