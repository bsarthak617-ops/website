import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function CounterNumber({ target, isNumeric }) {
  const [displayValue, setDisplayValue] = useState(isNumeric ? 0 : target);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    const num = parseInt(target.replace(/,/g, ''), 10);
    const duration = 1600; // ms
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * num);

      setDisplayValue(current.toLocaleString('en-US'));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, isNumeric]);

  return (
    <span ref={ref}>
      {isNumeric ? displayValue : target}
    </span>
  );
}

export default function MetricsSection() {
  const metrics = [
    {
      value: "12,000",
      isNumeric: true,
      unit: "MT",
      label: (
        <>
          MONTHLY MANUFACTURING
          <br />
          & IMPORT VOLUME
        </>
      )
    },
    {
      value: "3",
      isNumeric: true,
      unit: "UNITS",
      label: "MANUFACTURING FACILITIES"
    },
    {
      value: "2",
      isNumeric: true,
      unit: "QA LABS",
      label: "IN-HOUSE TESTING LABORATORIES"
    },
    {
      value: "24/7",
      isNumeric: false,
      unit: "AVAILABILITY",
      label: "WAREHOUSING & LOGISTICS SUPPORT"
    }
  ];

  return (
    <section className="border-y border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:divide-x divide-brand-border-light dark:divide-brand-border-dark">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-4 sm:p-5 lg:py-2 lg:px-6 rounded-sm border lg:border-none border-brand-border-light/60 dark:border-brand-border-dark/60 bg-brand-bg-light/40 dark:bg-brand-bg-dark/40 lg:bg-transparent lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tightest text-brand-text-light dark:text-brand-text-dark font-sans tabular-nums">
                  <CounterNumber target={item.value} isNumeric={item.isNumeric} />
                </span>
                <span className="text-xs font-mono font-bold text-brand-gold">
                  {item.unit}
                </span>
              </div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark leading-tight">
                {item.label}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
