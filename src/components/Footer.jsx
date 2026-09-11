import React from 'react';
import { ArrowUp, MapPin, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onOpenSpecs, onOpenQuote }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface pt-14 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-brand-border-light dark:border-brand-border-dark">
          {/* Brand Info */}
          <div className="space-y-4 max-w-xl">
            <a href="#" className="inline-block group">
              <Logo dropClassName="h-10 sm:h-11" textClassName="h-7" />
            </a>

            <p className="text-xs sm:text-sm text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
              Oilteq Industries is a dedicated industrial fuel manufacturer and supplier delivering Batch Plant Fuel, Blended Fuel Oil, and high-heat industrial energy solutions with reliable nationwide tanker dispatch.
            </p>
          </div>

          {/* Operational Facilities Footprint */}
          <div className="space-y-2.5 text-xs font-mono text-brand-text-light-muted dark:text-brand-text-dark-muted shrink-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>Manufacturing Units: Jharsuguda, Odisha 768201</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
              <span>Import Operations: Maharashtra & Gujarat Port Terminals</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-forest shrink-0" />
              <span>In-House QA Testing Laboratories: Odisha & Maharashtra</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-text-light-subtle dark:text-brand-text-dark-subtle">
          <p>© {new Date().getFullYear()} OILTEQ INDUSTRIES. All rights reserved. Industrial Fuel Solutions.</p>
          
          <div className="flex items-center gap-6">
            <span>ODISHA • MAHARASHTRA • GUJARAT</span>
            <button
              onClick={scrollToTop}
              className="p-2 border border-brand-border-light dark:border-brand-border-dark hover:border-brand-gold text-brand-text-light dark:text-brand-text-dark rounded-sm transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
