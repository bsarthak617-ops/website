import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '../data/companyData';
import { ArrowUpRight, Flame, Shield, Activity, Compass, Cpu, Layers } from 'lucide-react';

export default function IndustriesSection({ onSelectIndustryQuote }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="industries" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark gap-4">
          <div>
            <span className="tech-label text-brand-gold dark:text-brand-gold-light">03 / APPLICATION SECTORS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark mt-2">
              BUILT FOR ENERGY-INTENSIVE INDUSTRIES.
            </h2>
            <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
              Engineered fuels formulated to sustain critical continuous combustion environments without flame fluctuations.
            </p>
          </div>
          <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle self-start md:self-end font-mono">
            SECTORS SERVED: 08+
          </span>
        </div>

        {/* Interactive Industry Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind, idx) => {
            const isHovered = hoveredId === ind.id;
            return (
              <motion.div
                key={ind.id}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative p-7 border transition-all duration-300 rounded-sm overflow-hidden group flex flex-col justify-between min-h-[320px] ${
                  isHovered
                    ? 'border-brand-gold shadow-xl scale-[1.02]'
                    : 'border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark'
                }`}
              >
                {/* Background image reveal on hover */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-500 pointer-events-none ${
                    isHovered ? 'opacity-100 scale-105 filter contrast-115 brightness-90' : 'opacity-0'
                  }`}
                  style={{ backgroundImage: `url('${ind.image}')` }}
                />

                {/* Dark gradient scrim on hover to guarantee text contrast */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                    isHovered
                      ? 'bg-gradient-to-t from-brand-charcoal/95 via-brand-charcoal/80 to-brand-charcoal/60 opacity-100'
                      : 'opacity-0'
                  }`}
                />

                {/* Card Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`tech-label font-mono ${
                      isHovered ? 'text-brand-gold-light' : 'text-brand-text-light-subtle dark:text-brand-text-dark-subtle'
                    }`}>
                      SECTOR 0{idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-mono border rounded-sm ${
                      isHovered
                        ? 'bg-black/60 border-brand-gold/50 text-brand-gold-light'
                        : 'bg-brand-bg-surface dark:bg-brand-bg-dark-surface border-brand-border-light dark:border-brand-border-dark text-brand-gold'
                    }`}>
                      {ind.stats}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold tracking-tight transition-colors duration-200 ${
                    isHovered ? 'text-white' : 'text-brand-text-light dark:text-brand-text-dark'
                  }`}>
                    {ind.name}
                  </h3>

                  <p className={`text-xs mt-3 leading-relaxed transition-colors duration-200 ${
                    isHovered ? 'text-brand-text-dark-muted font-medium' : 'text-brand-text-light-muted dark:text-brand-text-dark-muted'
                  }`}>
                    {ind.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className={`relative z-10 pt-6 border-t mt-6 flex items-center justify-between transition-colors duration-200 ${
                  isHovered ? 'border-white/20' : 'border-brand-border-light dark:border-brand-border-dark'
                }`}>
                  <div>
                    <span className={`text-[10px] font-mono uppercase block ${
                      isHovered ? 'text-white/70' : 'text-brand-text-light-subtle dark:text-brand-text-dark-subtle'
                    }`}>
                      RECOMMENDED FUEL:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {ind.keyProducts.map((p, i) => (
                        <span key={i} className={`text-[11px] font-semibold ${
                          isHovered ? 'text-brand-gold-light' : 'text-brand-teal dark:text-brand-teal-light'
                        }`}>
                          {p}{i < ind.keyProducts.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectIndustryQuote(ind.name)}
                    className={`p-2 border transition-all rounded-sm ${
                      isHovered
                        ? 'bg-brand-gold text-brand-charcoal border-brand-gold shadow-md'
                        : 'border-brand-border-light dark:border-brand-border-dark text-brand-text-light dark:text-brand-text-dark hover:border-brand-gold'
                    }`}
                    title="Configure RFQ for this industry"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
