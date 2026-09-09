import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/companyData';
import { FileText, ArrowUpRight, CheckCircle2, ChevronRight, Sliders } from 'lucide-react';

export default function ProductsSection({ onOpenSpecs, onSelectProductQuote }) {
  const [activeTab, setActiveTab] = useState(PRODUCTS[0].id);

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark gap-4">
          <div>
            <span className="tech-label text-brand-gold dark:text-brand-gold-light">02 / PRODUCTS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark mt-2">
              OUR PRODUCTS
            </h2>
            <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
              Industrial fuel solutions matched to demanding thermal and mechanical applications.
            </p>
          </div>

          {/* Quick Technical Datasheet CTA */}
          <button
            onClick={onOpenSpecs}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-brand-border-light dark:border-brand-border-dark hover:border-brand-gold dark:hover:border-brand-gold text-brand-text-light dark:text-brand-text-dark transition-colors self-start md:self-end rounded-sm"
          >
            <FileText className="w-4 h-4 text-brand-gold" />
            <span>Compare Technical Parameters</span>
          </button>
        </div>

        {/* Product Grid / 2-Column Balanced Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group flex flex-col justify-between border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface hover:border-brand-gold/70 dark:hover:border-brand-gold/70 transition-all duration-300 rounded-sm overflow-hidden shadow-sm hover:shadow-md"
            >
              {/* Product Header & Visual */}
              <div>
                {/* Image with Dark Architectural Overlay */}
                <div className="relative h-64 overflow-hidden border-b border-brand-border-light dark:border-brand-border-dark">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/85 via-brand-charcoal/25 to-transparent" />
                  
                  {/* Badge & Code */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-brand-charcoal/90 text-brand-gold-light border border-white/10 backdrop-blur-sm rounded-sm">
                      {product.badge}
                    </span>
                    <span className="text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded-sm">
                      {product.code}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="tech-label text-brand-gold-light block">PRODUCT 0{idx + 1}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 space-y-6">
                  <p className="text-xs font-semibold text-brand-teal dark:text-brand-teal-light uppercase tracking-wider">
                    {product.subtitle}
                  </p>
                  
                  <p className="text-xs sm:text-sm text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
                    {product.description}
                  </p>

                  {/* Primary Applications in Checklist Format */}
                  <div className="pt-2 border-t border-brand-border-light/60 dark:border-brand-border-dark/60">
                    <span className="tech-label text-brand-gold dark:text-brand-gold-light block mb-3 font-mono">
                      APPLICATIONS:
                    </span>
                    <ul className="space-y-2.5">
                      {product.applications.map((app, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text-light dark:text-brand-text-dark font-medium leading-snug"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-7 pt-0 border-t border-brand-border-light/60 dark:border-brand-border-dark/60 mt-4 flex items-center gap-3">
                <button
                  onClick={() => onSelectProductQuote(product.name)}
                  className="flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider bg-brand-charcoal text-white hover:bg-brand-gold transition-colors flex items-center justify-center gap-2 rounded-sm shadow-sm"
                >
                  <span>Request Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenSpecs}
                  className="p-3 border border-brand-border-light dark:border-brand-border-dark hover:border-brand-teal text-brand-text-light dark:text-brand-text-dark transition-colors rounded-sm"
                  title="View Full Test COA Specifications"
                >
                  <FileText className="w-4 h-4 text-brand-teal" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
