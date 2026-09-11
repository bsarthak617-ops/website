import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/companyData';
import { FileText, ArrowUpRight } from 'lucide-react';

export default function ProductsSection({ onOpenSpecs, onSelectProductQuote }) {

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark">
            OUR PRODUCTS
          </h2>
          <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
            Industrial fuel solutions matched to demanding thermal and mechanical applications.
          </p>
        </div>

        {/* Product Grid / Terminal-Inspired Clean Rounded Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group flex flex-col justify-between rounded-[28px] bg-[#F5F4EE] dark:bg-[#181B1A] border border-black/[0.05] dark:border-white/[0.07] p-7 sm:p-8 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/40 transition-all duration-300"
            >
              {/* 1. Top Section: Big Clean Headline & Concise Editorial Description */}
              <div className="mb-6 md:min-h-[160px] lg:min-h-[145px] flex flex-col justify-start">
                {/* Big Clean Headline */}
                <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark mb-3 leading-snug">
                  {product.name}
                </h3>

                {/* Concise Editorial Description */}
                <p className="text-sm sm:text-[15px] text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed font-normal">
                  {product.description}
                </p>
              </div>

              {/* 2. Middle Section: Framed Rounded Photo with Smooth Zoom */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.08] mb-6 sm:mb-8 bg-black/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-md text-white/90 rounded-md border border-white/15">
                  {product.code}
                </div>
              </div>

              {/* 3. Bottom Section: Full-Width Action Button & Specifications CTA */}
              <div className="space-y-2">
                <button
                  onClick={() => onSelectProductQuote(product.name)}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#E6E4DD] hover:bg-brand-charcoal hover:text-white dark:bg-white/10 dark:hover:bg-brand-gold dark:hover:text-brand-charcoal font-mono text-xs font-bold tracking-[0.2em] uppercase text-brand-text-light dark:text-brand-text-dark transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-xs"
                >
                  <span>REQUEST QUOTE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>

                <button
                  onClick={() => onOpenSpecs(product.id)}
                  className="w-full text-center font-mono text-[11px] font-semibold text-brand-text-light-subtle hover:text-brand-gold dark:text-brand-text-dark-subtle dark:hover:text-brand-gold tracking-widest uppercase transition-colors py-1.5 flex items-center justify-center gap-1.5 group/specs"
                >
                  <FileText className="w-3.5 h-3.5 text-brand-gold group-hover/specs:scale-110 transition-transform" />
                  <span>View Laboratory COA Specs</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
