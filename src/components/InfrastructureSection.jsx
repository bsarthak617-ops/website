import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INFRASTRUCTURE_HOTSPOTS } from '../data/companyData';
import { MapPin, Building2, FlaskConical, Anchor, Truck, Warehouse, ArrowRight, ShieldCheck } from 'lucide-react';

const hotspotIcons = {
  'manufacturing-odisha': Building2,
  'qa-labs': FlaskConical,
  'import-terminals': Anchor,
  'tanker-fleet': Truck,
  'warehousing': Warehouse
};

export default function InfrastructureSection() {
  const [selectedSpot, setSelectedSpot] = useState(INFRASTRUCTURE_HOTSPOTS[0]);

  return (
    <section id="infrastructure" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark gap-4">
          <div>
            <span className="tech-label text-brand-gold dark:text-brand-gold-light">06 / PHYSICAL ASSETS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark mt-2">
              INFRASTRUCTURE DESIGNED FOR RELIABLE SUPPLY.
            </h2>
            <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
              Strategic manufacturing, port terminal access, and bulk transport networks connecting resource nodes directly to industrial consumption centers.
            </p>
          </div>
          <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle self-start md:self-end font-mono">
            INTERACTIVE ASSET MAP
          </span>
        </div>

        {/* Hotspots Grid / Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Facility Hotspot Schematic */}
          <div className="lg:col-span-7 relative bg-brand-bg-surface dark:bg-brand-bg-dark-surface border border-brand-border-light dark:border-brand-border-dark rounded-sm p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[420px]">
            {/* Background Grid Linework */}
            <div className="absolute inset-0 technical-grid opacity-60 pointer-events-none" />
            
            {/* India Industrial Corridor Schematic Map (Stylized SVG Vector) */}
            <div className="relative w-full h-72 sm:h-80 my-auto flex items-center justify-center">
              <svg viewBox="0 0 500 400" className="w-full h-full stroke-brand-border-strong/50 dark:stroke-brand-border-subtle/70 fill-none">
                {/* Stylized Geographic Corridor & Transit Routes */}
                <path d="M120,180 L220,160 L330,190 L380,240 L310,290 L180,260 Z" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M140,210 Q240,180 340,200" strokeWidth="1.5" className="stroke-brand-gold/60" />
                <path d="M140,240 Q250,220 340,200" strokeWidth="1.5" className="stroke-brand-teal/60" />
                
                {/* Port Nodes */}
                <circle cx="140" cy="210" r="4" className="fill-brand-teal" />
                <text x="100" y="200" className="text-[9px] fill-current text-brand-text-light-muted dark:text-brand-text-dark-muted font-mono">GUJARAT PORTS</text>
                
                <circle cx="140" cy="250" r="4" className="fill-brand-teal" />
                <text x="75" y="265" className="text-[9px] fill-current text-brand-text-light-muted dark:text-brand-text-dark-muted font-mono">MAHARASHTRA PORTS</text>

                {/* Odisha Manufacturing Center */}
                <circle cx="340" cy="200" r="6" className="fill-brand-gold animate-pulse" />
                <text x="320" y="180" className="text-[10px] font-bold fill-current text-brand-text-light dark:text-brand-text-dark font-mono">JHARSUGUDA (ODISHA)</text>
              </svg>

              {/* Clickable Hotspot Pins */}
              {INFRASTRUCTURE_HOTSPOTS.map((spot) => {
                const Icon = hotspotIcons[spot.id] || MapPin;
                const isSelected = selectedSpot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border transition-all duration-300 group z-10 ${
                      isSelected
                        ? 'bg-brand-charcoal text-white border-brand-gold scale-125 shadow-lg'
                        : 'bg-brand-bg-light dark:bg-brand-bg-dark text-brand-text-light dark:text-brand-text-dark border-brand-border-light dark:border-brand-border-dark hover:border-brand-gold'
                    }`}
                    title={spot.title}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Map Note */}
            <div className="relative z-10 pt-4 border-t border-brand-border-light dark:border-brand-border-dark flex items-center justify-between text-xs font-mono text-brand-text-light-subtle dark:text-brand-text-dark-subtle">
              <span>SELECT A NODE TO INSPECT ASSETS</span>
              <span className="text-brand-gold">5 ACTIVE STRATEGIC NODES</span>
            </div>
          </div>

          {/* Right: Selected Node Detail Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface rounded-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSpot.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                    <span className="tech-label text-brand-gold">INFRASTRUCTURE ASSET</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text-light dark:text-brand-text-dark tracking-tight">
                    {selectedSpot.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-teal mt-1">
                    LOCATION: {selectedSpot.location}
                  </p>
                </div>

                {/* Photo Preview Container */}
                {selectedSpot.image && (
                  <div className="relative h-44 overflow-hidden rounded-sm border border-brand-border-light dark:border-brand-border-dark group">
                    <img
                      src={selectedSpot.image}
                      alt={selectedSpot.title}
                      className="w-full h-full object-cover filter contrast-110 grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                      <span>{selectedSpot.location}</span>
                      <span className="text-brand-gold-light font-bold">{selectedSpot.capacity}</span>
                    </div>
                  </div>
                )}

                {/* Capacity Metric Pill */}
                <div className="p-4 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark rounded-sm">
                  <span className="text-[10px] font-mono uppercase text-brand-text-light-subtle dark:text-brand-text-dark-subtle block mb-1">
                    OPERATIONAL SCALE
                  </span>
                  <span className="text-lg font-bold text-brand-text-light dark:text-brand-text-dark font-sans">
                    {selectedSpot.capacity}
                  </span>
                </div>

                {/* Narrative Details */}
                <div>
                  <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle block mb-1">
                    ENGINEERING OVERVIEW:
                  </span>
                  <p className="text-sm text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
                    {selectedSpot.details}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Switch Buttons */}
            <div className="pt-6 border-t border-brand-border-light dark:border-brand-border-dark mt-6">
              <span className="text-[10px] font-mono uppercase text-brand-text-light-subtle block mb-2">
                ALL INFRASTRUCTURE ASSETS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {INFRASTRUCTURE_HOTSPOTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSpot(s)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-sm border transition-colors ${
                      selectedSpot.id === s.id
                        ? 'bg-brand-charcoal text-white border-brand-charcoal'
                        : 'bg-brand-bg-light dark:bg-brand-bg-dark text-brand-text-light dark:text-brand-text-dark border-brand-border-light dark:border-brand-border-dark hover:border-brand-gold'
                    }`}
                  >
                    {s.title.split(' ')[0]} {s.title.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
