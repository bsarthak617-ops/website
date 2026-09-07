import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TEST_PARAMETERS } from '../data/companyData';
import { ShieldCheck, FileText, CheckCircle, Activity, Flame, Layers, Sliders, Droplets, Gauge } from 'lucide-react';

const paramIcons = {
  Layers: Layers,
  Activity: Activity,
  Flame: Flame,
  ShieldAlert: ShieldCheck,
  Sliders: Sliders,
  Droplets: Droplets,
  Gauge: Gauge
};

export default function QualitySection({ onOpenSpecs }) {
  const [selectedParam, setSelectedParam] = useState(0);

  return (
    <section id="quality" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark gap-4">
          <div>
            <span className="tech-label text-brand-gold dark:text-brand-gold-light">05 / QUALITY ASSURANCE & LABS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark mt-2">
              CONSISTENCY IS PART OF THE PRODUCT.
            </h2>
            <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
              Every production and import batch is quality tested in our in-house laboratories in Odisha and Maharashtra before dispatch.
            </p>
          </div>

          <button
            onClick={onOpenSpecs}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-brand-charcoal text-white hover:bg-brand-gold transition-colors self-start md:self-end rounded-sm"
          >
            <FileText className="w-4 h-4 text-brand-gold" />
            <span>Open Technical COA Viewer</span>
          </button>
        </div>

        {/* Quality Lab Hub & Test Parameter Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Parameter Selector List */}
          <div className="lg:col-span-5 space-y-2">
            <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle block mb-3 font-mono">
              CERTIFIED TESTING PARAMETERS:
            </span>

            {TEST_PARAMETERS.map((param, idx) => {
              const Icon = paramIcons[param.icon] || ShieldCheck;
              const isSelected = selectedParam === idx;
              return (
                <button
                  key={param.name}
                  onClick={() => setSelectedParam(idx)}
                  className={`w-full text-left p-3.5 border transition-all duration-200 rounded-sm flex items-center justify-between ${
                    isSelected
                      ? 'border-brand-gold bg-brand-bg-light dark:bg-brand-bg-dark shadow-sm'
                      : 'border-brand-border-light dark:border-brand-border-dark hover:border-brand-border-light/80 bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-sm border ${isSelected ? 'border-brand-gold text-brand-gold' : 'border-brand-border-light dark:border-brand-border-dark text-brand-text-light-muted'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brand-text-light dark:text-brand-text-dark uppercase tracking-wider">
                        {param.name}
                      </h4>
                      <span className="text-[11px] font-mono text-brand-text-light-subtle dark:text-brand-text-dark-subtle">
                        {param.unit}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm border ${
                    isSelected
                      ? 'border-brand-gold/40 text-brand-gold bg-brand-gold/10'
                      : 'border-transparent text-brand-text-light-subtle'
                  }`}>
                    {param.testMethod.split('/')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Parameter Analysis & Dual Laboratory Infrastructure */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Parameter Detail Box */}
            <div className="p-7 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark rounded-sm">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border-light dark:border-brand-border-dark mb-4">
                <div>
                  <span className="tech-label text-brand-gold">ACTIVE TEST PROTOCOL</span>
                  <h3 className="text-xl font-bold text-brand-text-light dark:text-brand-text-dark mt-1">
                    {TEST_PARAMETERS[selectedParam].name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="tech-label text-brand-teal block">TEST METHOD</span>
                  <span className="text-xs font-mono font-bold text-brand-text-light dark:text-brand-text-dark">
                    {TEST_PARAMETERS[selectedParam].testMethod}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle block mb-1">
                    OPERATIONAL SIGNIFICANCE FOR BUYERS:
                  </span>
                  <p className="text-sm text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
                    {TEST_PARAMETERS[selectedParam].significance}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-brand-border-light dark:border-brand-border-dark">
                  <div className="p-3 bg-brand-bg-surface dark:bg-brand-bg-dark-surface border border-brand-border-light dark:border-brand-border-dark rounded-sm">
                    <span className="text-[10px] font-mono uppercase text-brand-text-light-subtle block">
                      MEASUREMENT UNIT
                    </span>
                    <span className="text-xs font-mono font-bold text-brand-text-light dark:text-brand-text-dark">
                      {TEST_PARAMETERS[selectedParam].unit}
                    </span>
                  </div>

                  <div className="p-3 bg-brand-bg-surface dark:bg-brand-bg-dark-surface border border-brand-border-light dark:border-brand-border-dark rounded-sm">
                    <span className="text-[10px] font-mono uppercase text-brand-text-light-subtle block">
                      BATCH CLEARANCE
                    </span>
                    <span className="text-xs font-mono font-bold text-brand-forest flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      100% Pre-Dispatch
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-House Laboratories Banner */}
            <div className="p-6 border border-brand-border-light dark:border-brand-border-dark bg-brand-charcoal text-white rounded-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="tech-label text-brand-gold-light">DUAL TESTING INFRASTRUCTURE</span>
                  <h4 className="text-base font-bold">
                    In-House QA Labs in Odisha & Maharashtra
                  </h4>
                  <p className="text-xs text-brand-text-dark-muted leading-relaxed max-w-md">
                    Dedicated technicians test every batch against rigorous calibration benchmarks before tankers are released from our terminals.
                  </p>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <span className="px-3 py-1 text-xs font-mono bg-white/10 border border-white/10 rounded-sm">
                    Jharsuguda QA Lab
                  </span>
                  <span className="px-3 py-1 text-xs font-mono bg-white/10 border border-white/10 rounded-sm">
                    Maharashtra Port Lab
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
