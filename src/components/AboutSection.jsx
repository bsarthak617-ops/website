import React from 'react';
import { motion } from 'framer-motion';
import { GROUP_BUSINESSES } from '../data/companyData';
import { Layers, Fuel, Truck, Compass, Shield, CheckCircle2, Factory } from 'lucide-react';

const iconMap = {
  Layers: Layers,
  Fuel: Fuel,
  Truck: Truck,
  Compass: Compass,
  Shield: Shield
};

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-brand-bg-light dark:bg-brand-bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark gap-4">
          <div>
            <span className="tech-label text-brand-gold dark:text-brand-gold-light">01 / ABOUT OILTEQ</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark mt-2">
              FUEL SOLUTIONS BUILT AROUND YOUR OPERATION.
            </h2>
          </div>
          <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle self-start md:self-end">
            ESTABLISHED INDUSTRIAL CAPACITY
          </span>
        </div>

        {/* 2-Column Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-lg sm:text-xl font-medium text-brand-text-light dark:text-brand-text-dark leading-relaxed">
              Oilteq Industries is an Indian industrial energy enterprise engaged in manufacturing and importing high-performance industrial fuels for energy-intensive applications across infrastructure, metallurgy, and processing industries.
            </p>
            <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
              With three dedicated manufacturing units in Jharsuguda, Odisha and robust import terminal operations across Maharashtra and Gujarat ports, our operations are engineered to eliminate fuel supply uncertainty for procurement heads and plant managers.
            </p>
            
            {/* Core Operational Focus Callouts */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface rounded-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-forest" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark">Accurate Composition</h4>
                </div>
                <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted">
                  Strict distillation and blending controls ensure viscosity and density match burner specifications precisely.
                </p>
              </div>

              <div className="p-4 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface rounded-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark">Minimal Impurities</h4>
                </div>
                <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted">
                  Multi-stage filtration and low moisture content protect burner nozzles and refractory linings from fouling.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Industrial Image & Technical Spec Box */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-sm border border-brand-border-light dark:border-brand-border-dark group">
              <img
                src="/images/jharsuguda-plant.jpg"
                alt="Jharsuguda Industrial Processing Facility"
                className="w-full h-80 object-cover filter contrast-110 grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/30 to-transparent flex flex-col justify-end p-6">
                <span className="tech-label text-brand-gold-light">JHARSUGUDA MANUFACTURING CLUSTER</span>
                <p className="text-white text-sm font-semibold mt-1">
                  3 Industrial Facilities • Automated Processing • Dedicated QA Labs
                </p>
              </div>
            </div>

            {/* Architectural Linework Marker */}
            <div className="mt-4 flex items-center justify-between text-xs text-brand-text-light-subtle dark:text-brand-text-dark-subtle font-mono">
              <span>LAT/LONG: 21.8554° N, 84.0062° E</span>
              <span>STATE: ODISHA, INDIA</span>
            </div>
          </div>
        </div>

        {/* Group Strength & Allied Capabilities */}
        <div className="pt-12 border-t border-brand-border-light dark:border-brand-border-dark">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
            <div>
              <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle">INTEGRATED ECOSYSTEM</span>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-text-light dark:text-brand-text-dark mt-1">
                Allied Group Capabilities
              </h3>
            </div>
            <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted max-w-md">
              Oilteq is supported by a comprehensive energy and infrastructure group with multi-sector assets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {GROUP_BUSINESSES.map((group, idx) => {
              const IconComp = iconMap[group.icon] || Factory;
              return (
                <div
                  key={idx}
                  className="p-5 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface hover:border-brand-gold dark:hover:border-brand-gold transition-colors duration-200 rounded-sm"
                >
                  <div className="w-8 h-8 rounded-sm bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-border-dark flex items-center justify-center mb-3">
                    <IconComp className="w-4 h-4 text-brand-gold" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark mb-1.5">
                    {group.title}
                  </h4>
                  <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
                    {group.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
