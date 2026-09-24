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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark">
            FROM PROCESSING TO DISPATCH.
          </h2>
          <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
            Systematic 5-stage manufacturing lifecycle engineered across 3 facilities in Jharsuguda, Odisha.
          </p>
        </motion.div>

        {/* Mobile 5-Box Grid (Zero Side-Scroll on phone) */}
        <div className="grid grid-cols-5 gap-1.5 sm:hidden mb-6">
          {MANUFACTURING_STAGES.map((stage, idx) => (
            <motion.button
              key={stage.step}
              onClick={() => setActiveStage(idx)}
              whileTap={{ scale: 0.93 }}
              className={`py-2 px-1 text-center border rounded-sm transition-all duration-200 relative flex flex-col items-center justify-center ${
                activeStage === idx
                  ? 'border-brand-gold bg-brand-gold/15 text-brand-gold shadow-sm ring-1 ring-brand-gold/60'
                  : 'border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface/50 dark:bg-brand-bg-dark-surface/50 text-brand-text-light-muted dark:text-brand-text-dark-muted hover:border-brand-border-light'
              }`}
            >
              <span className={`text-xs font-mono font-bold leading-none ${activeStage === idx ? 'text-brand-gold' : ''}`}>
                {stage.number}
              </span>
              <span className="text-[8px] font-extrabold uppercase tracking-tight truncate max-w-full mt-1 text-brand-text-light dark:text-brand-text-dark">
                {stage.step === 'QUALITY TEST' ? 'QUALITY' : stage.step}
              </span>
              {activeStage === idx && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-gold ring-2 ring-brand-bg-light dark:ring-brand-bg-dark" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Desktop & Tablet 5-Col Grid (Unchanged on sm+) */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-3 mb-12">
          {MANUFACTURING_STAGES.map((stage, idx) => (
            <motion.button
              key={stage.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setActiveStage(idx)}
              className={`p-4 text-left border transition-all duration-200 rounded-sm relative ${
                activeStage === idx
                  ? 'border-brand-gold bg-brand-bg-surface dark:bg-brand-bg-dark-surface shadow-sm'
                  : 'border-brand-border-light dark:border-brand-border-dark hover:border-brand-border-light/80 bg-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
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
            </motion.button>
          ))}
        </div>

        {/* Interactive Active Stage Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface p-4 sm:p-8 lg:p-10 rounded-sm"
          >
            {/* Realistic Industrial Photo (Order 1 on mobile, Order 2 on desktop) */}
            <motion.div
              className="lg:col-span-6 relative order-1 lg:order-2"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="relative h-52 sm:h-72 lg:h-96 overflow-hidden rounded-sm border border-brand-border-light dark:border-brand-border-dark group">
                <img
                  src={MANUFACTURING_STAGES[activeStage].image}
                  alt={MANUFACTURING_STAGES[activeStage].title}
                  className="w-full h-full object-cover filter contrast-110 grayscale-[15%] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-[10px] sm:text-xs font-mono">
                  <span>FACILITY: JHARSUGUDA UNIT</span>
                  <span>STAGE {MANUFACTURING_STAGES[activeStage].number} // ACTIVE</span>
                </div>
              </div>
            </motion.div>

            {/* Detail Narrative (Order 2 on mobile, Order 1 on desktop) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-5 lg:space-y-6 order-2 lg:order-1">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-brand-gold px-2 py-0.5 rounded-sm bg-brand-gold/10 border border-brand-gold/20">
                    STAGE {MANUFACTURING_STAGES[activeStage].number}
                  </span>
                  <span className="text-xs font-mono text-brand-text-light-muted dark:text-brand-text-dark-muted uppercase">
                    {MANUFACTURING_STAGES[activeStage].step}
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold text-brand-text-light dark:text-brand-text-dark tracking-tight mb-3 sm:mb-4">
                  {MANUFACTURING_STAGES[activeStage].title}
                </h3>

                <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed mb-5 sm:mb-6">
                  {MANUFACTURING_STAGES[activeStage].description}
                </p>

                {/* Equipment Breakdown */}
                <div className="p-3.5 sm:p-4 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-brand-teal shrink-0" />
                    <span className="tech-label text-brand-text-light dark:text-brand-text-dark text-[11px] sm:text-xs">
                      ACTIVE INDUSTRIAL EQUIPMENT
                    </span>
                  </div>
                  <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted font-mono leading-relaxed">
                    {MANUFACTURING_STAGES[activeStage].equipment}
                  </p>
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="pt-5 sm:pt-6 border-t border-brand-border-light dark:border-brand-border-dark flex items-center justify-between">
                <button
                  disabled={activeStage === 0}
                  onClick={() => setActiveStage(prev => Math.max(0, prev - 1))}
                  className="text-xs font-semibold uppercase tracking-wider disabled:opacity-30 text-brand-text-light-muted hover:text-brand-text-light dark:text-brand-text-dark-muted dark:hover:text-brand-text-dark transition-colors py-1.5 px-2 rounded-sm"
                >
                  ← Prev
                </button>

                <div className="flex gap-1.5 items-center">
                  {MANUFACTURING_STAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStage(i)}
                      aria-label={`Go to stage ${i + 1}`}
                      className={`h-1.5 transition-all rounded-full ${
                        activeStage === i ? 'w-5 sm:w-6 bg-brand-gold' : 'w-1.5 sm:w-2 bg-brand-border-light dark:bg-brand-border-dark'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={activeStage === MANUFACTURING_STAGES.length - 1}
                  onClick={() => setActiveStage(prev => Math.min(MANUFACTURING_STAGES.length - 1, prev + 1))}
                  className="text-xs font-semibold uppercase tracking-wider disabled:opacity-30 text-brand-gold hover:text-brand-gold-light transition-colors py-1.5 px-2 rounded-sm"
                >
                  Next →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
