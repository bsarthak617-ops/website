import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export default function InteractiveQRCode({ 
  url = 'https://oilteqindustries.com/#',
  className = ''
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to center of the card (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Absolute mouse position for specular glare (0% to 100%)
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  // Responsive spring configurations for smooth physical feel
  const springConfig = { damping: 22, stiffness: 240, mass: 0.6 };
  
  // 3D Tilt angles
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-16, 16]), springConfig);

  // Subtle magnetic translation towards the cursor
  const transX = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), springConfig);
  const transY = useSpring(useTransform(mouseY, [-1, 1], [-6, 6]), springConfig);

  // Scale spring
  const scale = useSpring(isHovered ? 1.05 : 1, springConfig);

  // Dynamic holographic light reflection template
  const glareBackground = useMotionTemplate`radial-gradient(circle 140px at ${glareX}% ${glareY}%, rgba(202, 154, 67, 0.45) 0%, rgba(255, 255, 255, 0.22) 25%, transparent 75%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized from -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    mouseX.set(normX);
    mouseY.set(normY);

    // Percentage coordinates for the glare effect
    glareX.set((x / rect.width) * 100);
    glareY.set((y / rect.height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <div 
      className={`relative inline-block select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.96 }}
        style={{
          rotateX,
          rotateY,
          x: transX,
          y: transY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-2xl p-2.5 cursor-pointer
                   bg-[#F4F1EA] dark:bg-[#151D18] 
                   border border-[#DCD6C8] dark:border-brand-border-dark
                   shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]
                   hover:shadow-[0_20px_40px_rgba(202,154,67,0.22)] dark:hover:shadow-[0_20px_45px_rgba(202,154,67,0.3)]
                   transition-shadow duration-300"
      >
        {/* Layer 1: Holographic Specular Glare reacting to cursor motion */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: glareBackground,
            opacity: isHovered ? 1 : 0,
            transform: 'translateZ(20px)',
          }}
        />

        {/* Layer 2: Scannable Master QR Code Image */}
        <div 
          style={{ transform: 'translateZ(14px)' }}
          className="relative w-full h-full rounded-xl overflow-hidden bg-[#F4F1EA] dark:bg-[#151D18] flex items-center justify-center"
        >
          <img
            src="/oilteq-qr.png"
            alt="Oilteq Industries Scannable QR Code"
            className="w-full h-full object-contain filter contrast-[1.02]"
            draggable="false"
          />

          {/* Layer 3: Interactive Laser Scan Beam on hover */}
          {isHovered && (
            <motion.div
              className="absolute left-0 right-0 pointer-events-none z-20"
              initial={{ top: '0%', opacity: 0 }}
              animate={{ 
                top: ['0%', '100%'],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent shadow-[0_0_12px_rgba(202,154,67,1)]" />
              <div className="h-6 w-full -mt-3 bg-gradient-to-b from-brand-gold/15 to-transparent blur-xs" />
            </motion.div>
          )}
        </div>

        {/* Layer 4: Interactive Floating 3D Central Teardrop Badge */}
        <motion.div
          style={{ transform: 'translateZ(38px)' }}
          animate={isHovered ? { y: [0, -2, 0] } : { y: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 m-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full 
                     bg-[#F4F1EA] dark:bg-[#17201B] border-2 border-brand-gold 
                     shadow-[0_4px_14px_rgba(0,0,0,0.22)] dark:shadow-[0_4px_16px_rgba(202,154,67,0.35)] 
                     flex items-center justify-center pointer-events-none z-40"
        >
          <img
            src="/oilteq-drop-animated.webp"
            alt="Oilteq Teardrop Emblem"
            className="w-7 h-7 sm:w-7.5 sm:h-7.5 object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
            draggable="false"
          />
        </motion.div>

        {/* Layer 5: Dynamic 3D Corner Reticle Accents */}
        <div 
          style={{ transform: 'translateZ(26px)' }} 
          className="absolute inset-2 pointer-events-none transition-all duration-300 z-35"
        >
          {/* Top-Left */}
          <span className={`absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-brand-gold transition-all duration-300 ${isHovered ? '-translate-x-1 -translate-y-1 shadow-[0_0_8px_rgba(202,154,67,0.6)]' : ''}`} />
          {/* Top-Right */}
          <span className={`absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-brand-gold transition-all duration-300 ${isHovered ? 'translate-x-1 -translate-y-1 shadow-[0_0_8px_rgba(202,154,67,0.6)]' : ''}`} />
          {/* Bottom-Left */}
          <span className={`absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-brand-gold transition-all duration-300 ${isHovered ? '-translate-x-1 translate-y-1 shadow-[0_0_8px_rgba(202,154,67,0.6)]' : ''}`} />
          {/* Bottom-Right */}
          <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-brand-gold transition-all duration-300 ${isHovered ? 'translate-x-1 translate-y-1 shadow-[0_0_8px_rgba(202,154,67,0.6)]' : ''}`} />
        </div>
      </motion.div>
    </div>
  );
}
