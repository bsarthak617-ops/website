import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, CheckCircle2, ArrowRight, Gauge, Anchor, Building2 } from 'lucide-react';

export default function LogisticsSection() {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      step: "01",
      title: "SOURCE / PORT INTAKE",
      tag: "Import & Domestic Stock",
      detail: "Feedstock intake at Gujarat/Maharashtra terminals or raw stock arrival at Jharsuguda.",
      icon: Anchor
    },
    {
      step: "02",
      title: "PROCESSING & REFINING",
      tag: "Composition Control",
      detail: "Automated blending and distillation to target viscosity and flash specifications.",
      icon: Building2
    },
    {
      step: "03",
      title: "LAB COA VERIFICATION",
      tag: "Batch Purity Check",
      detail: "In-house lab tests density, viscosity, calorific value, and moisture. COA issued.",
      icon: ShieldCheck
    },
    {
      step: "04",
      title: "SEALED TANKER LOADING",
      tag: "Tamper-Evident Dispatch",
      detail: "Top/bottom gantry loading into dedicated road tankers with calibrated electronic weighment.",
      icon: Truck
    },
    {
      step: "05",
      title: "PLANT-FLOOR DELIVERY",
      tag: "Direct Discharge",
      detail: "Prompt arrival at customer hotmix, boiler, or furnace site with complete dispatch documentation.",
      icon: CheckCircle2
    }
  ];

  return (
    <section id="logistics" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark gap-4">
          <div>
            <span className="tech-label text-brand-gold dark:text-brand-gold-light">07 / SUPPLY CHAIN RELIABILITY</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark mt-2">
              FROM SOURCE TO PLANT FLOOR.
            </h2>
            <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
              End-to-end custody and quality control ensuring the fuel loaded at our terminal arrives with unchanged specifications at your facility.
            </p>
          </div>
          <div className="text-right self-start md:self-end">
            <span className="tech-label text-brand-forest block">ZERO TRANSIT ADULTERATION</span>
            <span className="text-xs font-mono text-brand-text-light dark:text-brand-text-dark font-bold">
              SEALED DISPATCH PROTOCOLS
            </span>
          </div>
        </div>

        {/* Dynamic Route Pipeline Timeline */}
        <div className="relative mb-12">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-brand-border-light dark:bg-brand-border-dark -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isCurrent = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 border transition-all duration-300 rounded-sm cursor-pointer ${
                    isCurrent
                      ? 'border-brand-gold bg-brand-bg-light dark:bg-brand-bg-dark shadow-md scale-102'
                      : 'border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface hover:border-brand-gold/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="tech-label text-brand-gold font-mono">{item.step}</span>
                    <div className={`p-2 rounded-sm border ${
                      isCurrent ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-brand-border-light dark:border-brand-border-dark text-brand-text-light-muted'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-brand-text-light dark:text-brand-text-dark uppercase tracking-wider mb-1">
                    {item.title}
                  </h3>

                  <span className="text-[11px] font-mono text-brand-teal block mb-2">
                    {item.tag}
                  </span>

                  <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logistics Assurances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-brand-border-light dark:border-brand-border-dark">
          <div className="p-5 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark rounded-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark mb-1">
              Dedicated Tanker Fleet
            </h4>
            <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
              Company-associated and dedicated petroleum road tankers prevent product mixing and ensure schedule dependability.
            </p>
          </div>

          <div className="p-5 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark rounded-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark mb-1">
              Certified Electronic Weighment
            </h4>
            <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
              Calibrated computerized weighbridges at loading terminals guarantee accurate tare and gross billing weights.
            </p>
          </div>

          <div className="p-5 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark rounded-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark mb-1">
              Batch Certificate of Analysis (COA)
            </h4>
            <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
              Every dispatched tanker is accompanied by laboratory-verified test certificate verifying GCV, viscosity, and moisture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
