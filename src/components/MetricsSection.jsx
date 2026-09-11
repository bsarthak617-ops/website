import React from 'react';
import { motion } from 'framer-motion';

export default function MetricsSection() {
  const metrics = [
    {
      value: "6,000",
      unit: "MT",
      label: "MONTHLY MANUFACTURING CAPACITY"
    },
    {
      value: "3",
      unit: "UNITS",
      label: "MANUFACTURING FACILITIES"
    },
    {
      value: "6,000",
      unit: "MT",
      label: "MONTHLY IMPORT VOLUME"
    },
    {
      value: "2",
      unit: "QA LABS",
      label: "IN-HOUSE TESTING LABORATORIES"
    },
    {
      value: "24/7",
      unit: "AVAILABILITY",
      label: "WAREHOUSING & LOGISTICS SUPPORT"
    }
  ];

  return (
    <section className="border-y border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-brand-border-light dark:divide-brand-border-dark">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="py-6 sm:py-2 px-4 sm:px-6 first:pl-0 last:pr-0"
            >
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-4xl lg:text-5xl font-extrabold tracking-tightest text-brand-text-light dark:text-brand-text-dark font-sans">
                  {item.value}
                </span>
                <span className="text-xs font-mono font-bold text-brand-gold">
                  {item.unit}
                </span>
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark">
                {item.label}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
