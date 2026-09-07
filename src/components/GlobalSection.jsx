import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowUpRight, Anchor, ShieldCheck, FileCheck2, Zap } from 'lucide-react';

export default function GlobalSection({ onOpenQuote }) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-brand-border-light dark:border-brand-border-dark bg-brand-charcoal text-white relative overflow-hidden">
      {/* Background Industrial Image & Pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity filter contrast-125 pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=2000&q=80')` }}
      />
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/90 to-brand-charcoal/70 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <span className="tech-label text-brand-gold-light">09 / INDUSTRIAL PROCUREMENT READINESS</span>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tightest leading-[1.05]">
              INDUSTRIAL SUPPLY, WITHOUT THE FRICTION.
            </h2>

            <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-sm">
              <span className="tech-label text-brand-gold-light">
                BUILT IN INDIA. READY FOR GLOBAL INDUSTRIAL SUPPLY.
              </span>
            </div>

            <p className="text-sm sm:text-base text-brand-text-dark-muted leading-relaxed max-w-xl">
              From continuous domestic manufacturing and port sourcing to calibrated laboratory testing, dedicated storage, and nationwide bulk logistics, Oilteq is built to support dependable industrial fuel procurement for plant heads, EPC contractors, and international energy desks.
            </p>

            {/* Procurement Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <Anchor className="w-4 h-4 text-brand-teal-light mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1">Port Sourcing</h4>
                <p className="text-[11px] text-brand-text-dark-muted">Direct discharge capabilities at Western India port terminals.</p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <FileCheck2 className="w-4 h-4 text-brand-gold-light mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1">COA Transparency</h4>
                <p className="text-[11px] text-brand-text-dark-muted">Verified parameter certificates with every dispatch batch.</p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <Zap className="w-4 h-4 text-brand-forest-light mb-2" />
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1">Supply Continuity</h4>
                <p className="text-[11px] text-brand-text-dark-muted">12,000 MT combined monthly manufacturing and import throughput.</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-brand-gold text-brand-charcoal hover:bg-white font-bold text-xs uppercase tracking-widest transition-colors rounded-sm shadow-md"
              >
                <span>Initiate Sourcing Discussion</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Industrial Map Corridor & Port Routing */}
          <div className="lg:col-span-5 p-6 border border-white/10 bg-white/5 rounded-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="tech-label text-brand-gold-light">SUPPLY CORRIDOR CAPABILITY</span>
              <span className="text-xs font-mono text-white/60">INDIAN OCEAN & DOMESTIC HUBS</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider">Odisha Manufacturing Center</h4>
                  <p className="text-brand-text-dark-muted">Supplying Eastern, Central, and Northern industrial corridors directly by road tanker.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-teal mt-1.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider">Maharashtra & Gujarat Port Terminals</h4>
                  <p className="text-brand-text-dark-muted">Importing ~6,000 MT/month of heavy and light fuel oils for rapid regional distribution.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-forest mt-1.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider">Contracted Buffer Stock</h4>
                  <p className="text-brand-text-dark-muted">Long-term supply agreements with fixed delivery SLA commitments for volume buyers.</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-white/50 flex justify-between">
              <span>PROCUREMENT INQUIRY SLA: &lt; 24 HRS</span>
              <span>COMMERCIAL DESK: ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
