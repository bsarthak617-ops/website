import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INFRASTRUCTURE_HOTSPOTS } from '../data/companyData';
import { MapPin, Building2, FlaskConical, Anchor, Truck, Warehouse, ArrowRight, ShieldCheck } from 'lucide-react';

const hotspotIcons = {
  'manufacturing-odisha': Building2,
  'qa-labs': FlaskConical,
  'import-terminals': Anchor,
  'tanker-fleet': Truck,
  'warehousing': Warehouse
};

const SUPPLY_ROUTES = [
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    color: '#447381',
    path: 'M 1535,1975 Q 1120,1670 1029,1113',
    dx: 1029,
    dy: 1113,
    dur: 6.5
  },
  {
    id: 'haryana',
    name: 'Haryana',
    color: '#767D45',
    path: 'M 1535,1975 Q 1287,1453 787,1196',
    dx: 787,
    dy: 1196,
    dur: 6.0
  },
  {
    id: 'assam',
    name: 'Assam',
    color: '#4E7E8A',
    path: 'M 1535,1975 Q 1904,1831 2120,1460',
    dx: 2120,
    dy: 1460,
    dur: 5.5
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    color: '#B99343',
    path: 'M 1535,1975 Q 1581,1849 1532,1705',
    dx: 1532,
    dy: 1705,
    dur: 4.5
  },
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    color: '#44727F',
    path: 'M 1535,1975 Q 1287,1750 948,1718',
    dx: 948,
    dy: 1718,
    dur: 5.8
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    color: '#893F4F',
    path: 'M 1535,1975 Q 1669,1887 1717,1732',
    dx: 1717,
    dy: 1732,
    dur: 4.2
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    color: '#893E4E',
    path: 'M 1535,1975 Q 993,1708 409,1818',
    dx: 409,
    dy: 1818,
    dur: 7.0
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    color: '#767D45',
    path: 'M 1535,1975 Q 1120,1887 715,2073',
    dx: 715,
    dy: 2073,
    dur: 6.2
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    color: '#B99343',
    path: 'M 1535,1975 Q 1106,2286 956,2770',
    dx: 956,
    dy: 2770,
    dur: 6.8
  }
];

export default function InfrastructureSection() {
  const [selectedSpot, setSelectedSpot] = useState(INFRASTRUCTURE_HOTSPOTS[0]);

  return (
    <section id="infrastructure" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark gap-4">
          <div>
            <span className="tech-label text-brand-gold dark:text-brand-gold-light">06 / PHYSICAL ASSETS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark mt-2">
              INFRASTRUCTURE DESIGNED FOR RELIABLE SUPPLY.
            </h2>
            <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
              Strategic manufacturing, port terminal access, and bulk transport networks connecting resource nodes directly to industrial consumption centers.
            </p>
          </div>
          <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle self-start md:self-end font-mono">
            INTERACTIVE ASSET MAP
          </span>
        </div>

        {/* Hotspots Grid / Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: India Shipment Flow Map */}
          <div className="lg:col-span-7 relative bg-brand-bg-surface dark:bg-brand-bg-dark-surface border border-brand-border-light dark:border-brand-border-dark rounded-sm p-4 sm:p-6 flex flex-col justify-between overflow-hidden min-h-[500px]">
            {/* Background Grid Linework */}
            <div className="absolute inset-0 technical-grid opacity-60 pointer-events-none" />

            {/* India Shipment Flow Map Container */}
            <div className="relative w-full aspect-[2619/3504] max-h-[640px] mx-auto flex items-center justify-center rounded-sm overflow-hidden bg-[#ECEADD] dark:bg-[#181A1B] border border-brand-border-light/60 dark:border-brand-border-dark/60 my-auto shadow-sm">
              <img
                src="/india-shipment-flow-map.png"
                alt="India Shipment Flow & Regional Corridors"
                className="w-full h-full object-contain select-none pointer-events-none"
              />

              {/* Exact Overlay SVG aligned 1:1 with the 2619 x 3504 coordinate system */}
              <svg
                viewBox="0 0 2619 3504"
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Subtle Central Hub Radial Pulse */}
                  <radialGradient id="odishaGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#A78B45" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#A78B45" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Odisha Central Hub Pulse */}
                <circle cx="1535" cy="1975" r="46" fill="url(#odishaGlow)">
                  <animate attributeName="r" values="32;58;32" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0.15;0.7" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="1535" cy="1975" r="32" fill="none" stroke="#A78B45" strokeWidth="4" opacity="0.6">
                  <animate attributeName="r" values="24;44;24" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" repeatCount="indefinite" />
                </circle>

                {/* 9 Supply Corridor Route Animations */}
                {SUPPLY_ROUTES.map((route) => (
                  <g key={route.id}>
                    {/* Small dotted lines travelling from Odisha to destination state */}
                    <path
                      d={route.path}
                      fill="none"
                      stroke={route.color}
                      strokeWidth="8"
                      strokeDasharray="1 23"
                      strokeLinecap="round"
                      opacity="0.95"
                      className="animate-flow-outward"
                      style={{ animationDuration: `${route.dur + 4}s` }}
                    />

                    {/* Destination End Point (Big Dot) */}
                    <circle
                      cx={route.dx}
                      cy={route.dy}
                      r="16"
                      fill={route.color}
                      stroke="#EEECE3"
                      strokeWidth="2.5"
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Bottom Map Note */}
            <div className="relative z-10 pt-4 border-t border-brand-border-light dark:border-brand-border-dark flex items-center justify-between text-xs font-mono text-brand-text-light-subtle dark:text-brand-text-dark-subtle">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                ODISHA DISPATCH TO REGIONAL HUBS
              </span>
              <span className="text-brand-gold font-bold">9 ACTIVE SUPPLY CORRIDORS</span>
            </div>
          </div>

          {/* Right: Selected Node Detail Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface rounded-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSpot.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                    <span className="tech-label text-brand-gold">INFRASTRUCTURE ASSET</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text-light dark:text-brand-text-dark tracking-tight">
                    {selectedSpot.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-teal mt-1">
                    LOCATION: {selectedSpot.location}
                  </p>
                </div>

                {/* Photo Preview Container */}
                {selectedSpot.image && (
                  <div className="relative h-44 overflow-hidden rounded-sm border border-brand-border-light dark:border-brand-border-dark group">
                    <img
                      src={selectedSpot.image}
                      alt={selectedSpot.title}
                      className="w-full h-full object-cover filter contrast-110 grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                      <span>{selectedSpot.location}</span>
                      <span className="text-brand-gold-light font-bold">{selectedSpot.capacity}</span>
                    </div>
                  </div>
                )}

                {/* Capacity Metric Pill */}
                <div className="p-4 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark rounded-sm">
                  <span className="text-[10px] font-mono uppercase text-brand-text-light-subtle dark:text-brand-text-dark-subtle block mb-1">
                    OPERATIONAL SCALE
                  </span>
                  <span className="text-lg font-bold text-brand-text-light dark:text-brand-text-dark font-sans">
                    {selectedSpot.capacity}
                  </span>
                </div>

                {/* Narrative Details */}
                <div>
                  <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle block mb-1">
                    ENGINEERING OVERVIEW:
                  </span>
                  <p className="text-sm text-brand-text-light-muted dark:text-brand-text-dark-muted leading-relaxed">
                    {selectedSpot.details}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Switch Buttons */}
            <div className="pt-6 border-t border-brand-border-light dark:border-brand-border-dark mt-6">
              <span className="text-[10px] font-mono uppercase text-brand-text-light-subtle block mb-2">
                ALL INFRASTRUCTURE ASSETS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {INFRASTRUCTURE_HOTSPOTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSpot(s)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-sm border transition-colors ${
                      selectedSpot.id === s.id
                        ? 'bg-brand-charcoal text-white border-brand-charcoal'
                        : 'bg-brand-bg-light dark:bg-brand-bg-dark text-brand-text-light dark:text-brand-text-dark border-brand-border-light dark:border-brand-border-dark hover:border-brand-gold'
                    }`}
                  >
                    {s.title.split(' ')[0]} {s.title.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
