import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_ROSTER } from '../data/companyData';
import { ShieldCheck, CheckCircle2, Award, Clock, DollarSign, Building } from 'lucide-react';

export default function TrustSection() {
  const trustPillars = [
    {
      title: "Timely Bulk Delivery",
      description: "Direct gantry dispatch and dedicated tanker scheduling prevent plant downtime in continuous-heat operations.",
      icon: Clock
    },
    {
      title: "Consistent Fuel Composition",
      description: "Engineered alternative fuels formulated with accurate viscosity and calorific value for burner efficiency.",
      icon: ShieldCheck
    },
    {
      title: "Ethical & Transparent Practices",
      description: "Direct weighbridge chits, certified batch COAs, and transparent industrial contract pricing without hidden markups.",
      icon: CheckCircle2
    },
    {
      title: "Robust Infrastructure Backbone",
      description: "6,000 MT/mo manufacturing capacity across 3 Odisha plants paired with 6,000 MT/mo coastal import capability.",
      icon: Building
    }
  ];

  return (
    <section id="clients" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark gap-4">
          <div>
            <span className="tech-label text-brand-gold dark:text-brand-gold-light">08 / PROVEN TRACK RECORD</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark mt-2">
              BUILT ON INDUSTRIAL RELIABILITY.
            </h2>
            <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
              Trusted by leading infrastructure builders, forging units, steel mills, and process manufacturers across India.
            </p>
          </div>
          <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle self-start md:self-end font-mono">
            VERIFIED PROCUREMENT RELATIONSHIPS
          </span>
        </div>

        {/* Client Roster (Editorial Typographic Grid - No Fake Logos) */}
        <div className="mb-16">
          <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle block mb-4 font-mono">
            ENTERPRISE CLIENT RELATIONSHIPS:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLIENT_ROSTER.map((client, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-5 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface hover:border-brand-gold/80 transition-colors rounded-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-brand-gold block mb-1">CLIENT 0{idx + 1}</span>
                  <h4 className="text-sm font-bold text-brand-text-light dark:text-brand-text-dark tracking-tight">
                    {client.name}
                  </h4>
                </div>
                <p className="text-[11px] text-brand-text-light-muted dark:text-brand-text-dark-muted font-mono mt-3 pt-2 border-t border-brand-border-light/60 dark:border-brand-border-dark/60">
                  {client.sector}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Four Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-brand-border-light dark:border-brand-border-dark">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="space-y-3">
                <div className="w-10 h-10 rounded-sm bg-brand-bg-surface dark:bg-brand-bg-dark-surface border border-brand-border-light dark:border-brand-border-dark flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-teal" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark">
                  {pillar.title}
                </h4>
                <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
