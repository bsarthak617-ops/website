import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { INFRASTRUCTURE_HOTSPOTS } from '../data/companyData';

export default function GlobalSection({ onOpenQuote }) {
  const sectionRef = useRef(null);
  const [selectedSpot, setSelectedSpot] = useState(INFRASTRUCTURE_HOTSPOTS[0]);

  // Normalized mouse coordinates for 3D map tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.65 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotations for the map
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-24 px-4 sm:px-6 lg:px-8 border-t border-brand-border-light dark:border-brand-border-dark bg-brand-charcoal text-white relative overflow-hidden"
    >
      {/* Background Industrial Image & Pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity filter contrast-125 pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=2000&q=80')` }}
      />
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/90 to-brand-charcoal/70 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 3D Interactive Motion Map (Enlarged to fit space) */}
          <div className="lg:col-span-7 flex items-center justify-center [perspective:1400px] w-full py-4 order-2 lg:order-1">
            <motion.div
              style={{
                rotateX,
                rotateY,
                translateX,
                translateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[760px] lg:scale-110 xl:scale-115 origin-center"
            >
              {/* Map Image */}
              <div className="relative w-full [transform:translateZ(0px)] filter drop-shadow-[0_30px_45px_rgba(0,0,0,0.92)] drop-shadow-[0_0_55px_rgba(202,154,67,0.25)] transition-all duration-300">
                <img
                  src="/india-supply-corridor-transparent.png"
                  alt="India Supply Corridor Capability - 3D Logistics Map"
                  className="w-full h-auto object-contain pointer-events-none select-none"
                />
              </div>

              {/* Dynamic Hub Pulse Beacon Synchronized with Selected Asset */}
              <motion.div
                className="absolute pointer-events-none flex items-center justify-center [transform:translateZ(35px)]"
                animate={{
                  left: `${selectedSpot.x}%`,
                  top: `${selectedSpot.y}%`,
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <span className="relative flex h-7 w-7 -translate-x-1/2 -translate-y-1/2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-85" />
                  <span className="relative inline-flex rounded-full h-7 w-7 bg-brand-gold/30 border-2 border-brand-gold shadow-[0_0_20px_rgba(202,154,67,0.95)]" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-md" />
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Infrastructure Asset Panel (Dark Industrial Luxury Aesthetic) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 lg:p-8 rounded-[24px] bg-[#121514]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 hover:border-white/20 transition-all duration-300 relative overflow-hidden order-1 lg:order-2">
            {/* Subtle top edge gold highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSpot.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {selectedSpot.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-teal-light mt-1.5 uppercase tracking-wider font-medium flex items-center gap-1.5">
                    <span className="text-white/40">LOCATION:</span>
                    <span className="text-brand-teal-light font-semibold">{selectedSpot.location}</span>
                  </p>
                </div>

                {/* Photo Preview Container with Location & Capacity Overlays */}
                {selectedSpot.image && (
                  <div className="relative h-44 sm:h-48 overflow-hidden rounded-xl border border-white/10 group shadow-lg bg-black/40">
                    <img
                      src={selectedSpot.image}
                      alt={selectedSpot.title}
                      className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs font-mono text-white/95">
                      <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-white/90">
                        {selectedSpot.location}
                      </span>
                      <span className="text-brand-gold-light font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-brand-gold/30">
                        {selectedSpot.capacity}
                      </span>
                    </div>
                  </div>
                )}

                {/* Operational Scale Metric Box */}
                <div className="p-4 border border-white/10 bg-white/[0.04] rounded-xl backdrop-blur-sm">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">
                    OPERATIONAL SCALE
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                    {selectedSpot.capacity}
                  </span>
                </div>

                {/* Engineering Overview Narrative */}
                <div>
                  <span className="tech-label text-white/45 block mb-1.5 font-mono text-xs tracking-wider">
                    ENGINEERING OVERVIEW:
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed font-normal">
                    {selectedSpot.details}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Switch Buttons for All Assets */}
            <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/45 block">
                ALL INFRASTRUCTURE ASSETS:
              </span>
              <div className="flex flex-wrap gap-2">
                {INFRASTRUCTURE_HOTSPOTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSpot(s)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      selectedSpot.id === s.id
                        ? 'bg-brand-gold text-brand-charcoal font-bold border-brand-gold shadow-md shadow-brand-gold/20'
                        : 'bg-white/[0.05] text-white/70 hover:text-white border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
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
