import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import heroRefineryImg from '../assets/hero-refinery.jpg';

export default function HeroLanding({ onOpenQuote, onOpenSpecs }) {
  return (
    <section id="about" className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-bg-light dark:bg-brand-bg-dark">
      {/* Background Photo & Texture Layer (z-0) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-right lg:bg-center bg-no-repeat opacity-90 dark:opacity-80 filter contrast-125 brightness-90 saturate-110"
          style={{
            backgroundImage: `url(${heroRefineryImg})`
          }}
        />
        {/* Tuned Gradient Scrim for optimal text legibility while keeping photo details rich */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg-light/95 via-brand-bg-light/80 to-brand-bg-light/20 dark:from-brand-bg-dark/95 dark:via-brand-bg-dark/85 dark:to-brand-bg-dark/20 pointer-events-none" />
        {/* Top Feather Blend — creates seamless emergence from Hero section above */}
        <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-[1]" style={{ background: 'linear-gradient(to bottom, var(--bg-primary) 0%, var(--bg-primary) 20%, rgba(238,236,227,0.85) 45%, rgba(238,236,227,0.4) 70%, transparent 100%)' }} />
        <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-[1] hidden dark:block" style={{ background: 'linear-gradient(to bottom, #101212 0%, #101212 20%, rgba(16,18,18,0.85) 45%, rgba(16,18,18,0.4) 70%, transparent 100%)' }} />
        {/* Subtle Vignette and Grid */}
        <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg-light/40 via-transparent to-brand-bg-light dark:from-brand-bg-dark/50 dark:via-transparent dark:to-brand-bg-dark pointer-events-none" />
        
        {/* Giant subtle cropped brand lettering in background */}
        <div className="absolute bottom-10 right-0 text-[18vw] font-black text-black/[0.03] dark:text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter uppercase font-sans">
          OILTEQ
        </div>
      </div>

      {/* Main Hero Content (z-10) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8">
        <div className="max-w-4xl">
          {/* Main Headline (Line-by-line editorial reveal) */}
          <div className="space-y-1 mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[1.03] text-brand-text-light dark:text-brand-text-dark"
            >
              FUEL SOLUTIONS
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[1.03] text-brand-text-light dark:text-brand-text-dark"
            >
              BUILT AROUND YOUR
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest leading-[1.03] text-brand-gold dark:text-brand-gold-light"
            >
              OPERATION.
            </motion.h1>
          </div>

          {/* Supporting Narrative Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="space-y-4 max-w-3xl mb-10"
          >
            <p className="text-base sm:text-lg lg:text-xl text-brand-text-light dark:text-brand-text-dark font-medium leading-relaxed">
              Oilteq Industries is an Indian industrial energy enterprise engaged in manufacturing and importing high-performance industrial fuels for energy-intensive applications across infrastructure, metallurgy, and processing industries.
            </p>
            <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted font-normal leading-relaxed">
              With three dedicated manufacturing units in Jharsuguda, Odisha and robust import terminal operations across Maharashtra and Gujarat ports, our operations are engineered to eliminate fuel supply uncertainty for procurement heads and plant managers.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-brand-charcoal text-white hover:bg-brand-gold font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-md group rounded-sm"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-brand-border-light dark:border-brand-border-dark hover:border-brand-text-light dark:hover:border-brand-text-dark text-brand-text-light dark:text-brand-text-dark font-semibold text-xs uppercase tracking-widest transition-colors duration-200 rounded-sm"
            >
              <span>Explore Products</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Information Ribbon & Scroll Prompt (z-10) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-brand-border-light dark:border-brand-border-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Core Operational Focus Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-3xl">
          <div className="space-y-1">
            <p className="text-sm font-bold text-brand-text-light dark:text-brand-text-dark flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0" />
              <span>Accurate Composition</span>
            </p>
            <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
              Strict distillation and blending controls ensure viscosity and density match burner specifications precisely.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-brand-text-light dark:text-brand-text-dark flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
              <span>Minimal Impurities</span>
            </p>
            <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
              Multi-stage filtration and low moisture content protect burner nozzles and refractory linings from fouling.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#products"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text-light-muted hover:text-brand-text-light dark:text-brand-text-dark-muted dark:hover:text-brand-text-dark transition-colors group self-start md:self-center shrink-0"
        >
          <span className="tech-label">Explore Products</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
