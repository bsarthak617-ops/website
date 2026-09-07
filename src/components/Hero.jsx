import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ShieldCheck, Factory, Gauge, ChevronRight } from 'lucide-react';
import heroRefineryImg from '../assets/hero-refinery.jpg';

export default function Hero({ onOpenQuote, onOpenSpecs }) {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-bg-light dark:bg-brand-bg-dark">
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
          {/* Micro-label with droplet accent marker */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 mb-6 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light/80 dark:bg-brand-bg-dark/80 backdrop-blur-sm rounded-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="tech-label text-brand-text-light-muted dark:text-brand-text-dark-muted">
              INDUSTRIAL FUEL SOLUTIONS • BATCH-TESTED BULK SUPPLY
            </span>
          </motion.div>

          {/* Main Headline (Line-by-line editorial reveal) */}
          <div className="space-y-1 mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tightest leading-[1.02] text-brand-text-light dark:text-brand-text-dark"
            >
              POWERING
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tightest leading-[1.02] text-brand-text-light dark:text-brand-text-dark"
            >
              INDUSTRY.
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tightest leading-[1.02] text-brand-gold dark:text-brand-gold-light"
            >
              RELIABLY.
            </motion.h1>
          </div>

          {/* Supporting Copy */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-base sm:text-lg lg:text-xl text-brand-text-light-muted dark:text-brand-text-dark-muted font-normal leading-relaxed max-w-2xl mb-10"
          >
            Oilteq Industries manufactures, imports and supplies high-performance industrial fuels engineered for consistent combustion, minimal impurities, and dependable bulk delivery to energy-intensive operations.
          </motion.p>

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

            <button
              onClick={onOpenSpecs}
              className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-brand-text-light-muted hover:text-brand-text-light dark:text-brand-text-dark-muted dark:hover:text-brand-text-dark transition-colors"
            >
              <Gauge className="w-4 h-4 text-brand-teal" />
              <span>Laboratory Specs</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Information Ribbon & Scroll Prompt (z-10) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-brand-border-light dark:border-brand-border-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Key Operational Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10">
          <div className="space-y-1">
            <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle">MANUFACTURING</span>
            <p className="text-sm font-bold text-brand-text-light dark:text-brand-text-dark">6,000 MT / Month Capacity</p>
            <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted">3 Facilities in Jharsuguda, Odisha</p>
          </div>

          <div className="space-y-1">
            <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle">IMPORT SOURCING</span>
            <p className="text-sm font-bold text-brand-text-light dark:text-brand-text-dark">~6,000 MT / Month Imports</p>
            <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted">MH & GJ Port Terminals</p>
          </div>

          <div className="col-span-2 sm:col-span-1 space-y-1">
            <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle">ASSURANCE</span>
            <p className="text-sm font-bold text-brand-text-light dark:text-brand-text-dark flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-forest" />
              In-House QA Labs
            </p>
            <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted">Odisha & Maharashtra Facilities</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text-light-muted hover:text-brand-text-light dark:text-brand-text-dark-muted dark:hover:text-brand-text-dark transition-colors group"
        >
          <span className="tech-label">Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
