import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, TEST_PARAMETERS } from '../data/companyData';
import { X, FileText, Check, Download, ShieldCheck, Printer, ArrowUpRight } from 'lucide-react';

export default function TechnicalSpecsModal({ isOpen, onClose, onSelectQuote }) {
  const [activeProductTab, setActiveProductTab] = useState(PRODUCTS[0].id);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentProd = PRODUCTS.find(p => p.id === activeProductTab) || PRODUCTS[0];

  const handleCopy = () => {
    const text = `${currentProd.name} Specifications\n` + 
      currentProd.specifications.map(s => `${s.parameter}: ${s.standard}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-4xl bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-border-dark rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-brand-border-light dark:border-brand-border-dark flex items-center justify-between bg-brand-bg-surface dark:bg-brand-bg-dark-surface">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span className="tech-label text-brand-gold">OILTEQ LABORATORY TESTING COA</span>
              </div>
              <h3 className="text-xl font-extrabold text-brand-text-light dark:text-brand-text-dark tracking-tight mt-0.5">
                Certified Fuel Specifications & Test Standards
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-brand-text-light-muted hover:text-brand-text-light dark:text-brand-text-dark-muted dark:hover:text-brand-text-dark rounded-sm border border-transparent hover:border-brand-border-light dark:hover:border-brand-border-dark transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Tabs */}
          <div className="flex border-b border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface px-6 pt-2 gap-2 overflow-x-auto">
            {PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => setActiveProductTab(prod.id)}
                className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                  activeProductTab === prod.id
                    ? 'border-brand-gold text-brand-gold'
                    : 'border-transparent text-brand-text-light-muted dark:text-brand-text-dark-muted hover:text-brand-text-light dark:hover:text-brand-text-dark'
                }`}
              >
                {prod.name}
              </button>
            ))}
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Product Meta Overview */}
            <div className="p-4 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="tech-label text-brand-teal block">{currentProd.badge} • {currentProd.code}</span>
                <h4 className="text-base font-bold text-brand-text-light dark:text-brand-text-dark mt-0.5">
                  {currentProd.name}
                </h4>
                <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted mt-1 max-w-xl">
                  {currentProd.description}
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onSelectQuote(currentProd.name);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-charcoal text-white hover:bg-brand-gold text-xs font-bold uppercase tracking-wider rounded-sm shrink-0 transition-colors"
              >
                <span>Quote this Grade</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Specification Matrix Table */}
            <div>
              <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle block mb-3 font-mono">
                LABORATORY SPECIFICATION PARAMETERS:
              </span>

              <div className="border border-brand-border-light dark:border-brand-border-dark rounded-sm overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-brand-bg-surface dark:bg-brand-bg-dark-surface border-b border-brand-border-light dark:border-brand-border-dark text-brand-text-light-muted dark:text-brand-text-dark-muted">
                    <tr>
                      <th className="p-3 font-semibold">TEST PARAMETER</th>
                      <th className="p-3 font-semibold">STANDARD / RANGE</th>
                      <th className="p-3 font-semibold hidden sm:table-cell">UNIT</th>
                      <th className="p-3 font-semibold hidden md:table-cell">METHOD REFERENCE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border-light dark:divide-brand-border-dark text-brand-text-light dark:text-brand-text-dark">
                    {currentProd.specifications.map((spec, i) => (
                      <tr key={i} className="hover:bg-brand-bg-surface/50 dark:hover:bg-brand-bg-dark-surface/50">
                        <td className="p-3 font-medium">{spec.parameter}</td>
                        <td className="p-3 font-bold text-brand-gold">{spec.standard}</td>
                        <td className="p-3 text-brand-text-light-muted dark:text-brand-text-dark-muted hidden sm:table-cell">{spec.unit}</td>
                        <td className="p-3 text-brand-teal hidden md:table-cell">ASTM / ISO Verified</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Advantages */}
            <div>
              <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle block mb-2 font-mono">
                QUALITY & PERFORMANCE GUARANTEES:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentProd.advantages.map((adv, i) => (
                  <div key={i} className="p-3 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface rounded-sm flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" />
                    <span className="text-xs text-brand-text-light dark:text-brand-text-dark">{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted font-mono">
              Tested at In-House QA Labs in Odisha & Maharashtra
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-brand-border-light dark:border-brand-border-dark hover:border-brand-gold text-brand-text-light dark:text-brand-text-dark rounded-sm flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-brand-forest" /> : <FileText className="w-3.5 h-3.5 text-brand-gold" />}
                <span>{copied ? 'Copied Specs' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-brand-border-light dark:border-brand-border-dark hover:border-brand-teal text-brand-text-light dark:text-brand-text-dark rounded-sm flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-brand-teal" />
                <span>Print Datasheet</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
