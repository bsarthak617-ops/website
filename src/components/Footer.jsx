import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, ShieldCheck, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export default function Footer({ onOpenSpecs, onOpenQuote }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-border-light dark:border-brand-border-dark">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="inline-block">
              <img
                src="/oilteq-logo.png"
                alt="OILTEQ INDUSTRIES"
                className="h-10 w-auto object-contain"
              />
            </a>

            <p className="text-xs sm:text-sm text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed max-w-md">
              Oilteq Industries is a dedicated industrial fuel manufacturer and importer supplying LDO substitutes, Furnace Oil substitutes, and imported fuels with 6,000 MT/month manufacturing capacity and nationwide tanker delivery.
            </p>

            <div className="space-y-2 text-xs font-mono text-brand-text-light-muted dark:text-brand-text-dark-muted">
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

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <span className="tech-label text-brand-gold block">NAVIGATION</span>
            <ul className="space-y-2 text-xs font-medium uppercase tracking-wider text-brand-text-light-muted dark:text-brand-text-dark-muted">
              <li><a href="#about" className="hover:text-brand-text-light dark:hover:text-brand-text-dark transition-colors">01 / About Oilteq</a></li>
              <li><a href="#products" className="hover:text-brand-text-light dark:hover:text-brand-text-dark transition-colors">02 / Products & Substitutes</a></li>
              <li><a href="#industries" className="hover:text-brand-text-light dark:hover:text-brand-text-dark transition-colors">03 / Industry Sectors</a></li>
              <li><a href="#manufacturing" className="hover:text-brand-text-light dark:hover:text-brand-text-dark transition-colors">04 / Manufacturing Process</a></li>
              <li><a href="#quality" className="hover:text-brand-text-light dark:hover:text-brand-text-dark transition-colors">05 / Quality & Labs</a></li>
              <li><a href="#infrastructure" className="hover:text-brand-text-light dark:hover:text-brand-text-dark transition-colors">06 / Infrastructure Map</a></li>
              <li><a href="#logistics" className="hover:text-brand-text-light dark:hover:text-brand-text-dark transition-colors">07 / Logistics & Supply Chain</a></li>
            </ul>
          </div>

          {/* Sourcing & Commercial Contact */}
          <div className="lg:col-span-4 space-y-4">
            <span className="tech-label text-brand-gold block">COMMERCIAL INQUIRIES</span>
            <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
              Procurement heads, plant engineers, and fuel buyers can connect directly with our commercial desk for contract pricing and sample batch COAs.
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 px-4 bg-brand-charcoal text-white hover:bg-brand-gold text-xs font-bold uppercase tracking-widest transition-colors rounded-sm text-center"
              >
                Request Fuel Quote
              </button>

              <button
                onClick={onOpenSpecs}
                className="w-full py-2 px-4 border border-brand-border-light dark:border-brand-border-dark hover:border-brand-gold text-brand-text-light dark:text-brand-text-dark text-xs font-medium uppercase tracking-wider transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-brand-gold" />
                <span>Laboratory Test Specifications</span>
              </button>
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
