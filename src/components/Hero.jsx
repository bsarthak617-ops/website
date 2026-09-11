import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 240;

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload frames in background with immediate frame 0 render
  useEffect(() => {
    let active = true;
    const frames = new Array(TOTAL_FRAMES);
    framesRef.current = frames;

    // Load first frame immediately for instant visual display
    const firstImg = new Image();
    firstImg.src = '/hero-sequence/frame_000.webp';
    firstImg.onload = () => {
      if (!active) return;
      frames[0] = firstImg;
      setIsLoaded(true);
      drawFrame(0);
    };

    // Preload remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/hero-sequence/frame_${String(i).padStart(3, '0')}.webp`;
      img.onload = () => {
        if (!active) return;
        frames[i] = img;
      };
    }

    return () => {
      active = false;
    };
  }, []);

  // Frame drawer onto HTML5 Canvas preserving exact cover ratio without distortion
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI support
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Natural background fill matching website background (#EEECE3 light, #101212 dark)
    const isDarkMode = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDarkMode ? '#101212' : '#EEECE3';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Find requested frame or nearest loaded frame
    let img = framesRef.current[frameIndex];
    if (!img || !img.complete) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        if (frameIndex - offset >= 0 && framesRef.current[frameIndex - offset]?.complete) {
          img = framesRef.current[frameIndex - offset];
          break;
        }
        if (frameIndex + offset < TOTAL_FRAMES && framesRef.current[frameIndex + offset]?.complete) {
          img = framesRef.current[frameIndex + offset];
          break;
        }
      }
    }

    if (img && img.complete) {
      // Fullscreen Cover: scale to fill 100% of display width and height without blank borders
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.filter = 'brightness(1.03) contrast(1.02)';

      const videoRatio = 1920 / 1080;
      const canvasRatio = displayWidth / displayHeight;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > videoRatio) {
        // Wider screen: scale by width
        drawW = displayWidth;
        drawH = drawW / videoRatio;
        drawX = 0;
        drawY = (displayHeight - drawH) / 2;
      } else {
        // Taller screen: scale by height
        drawH = displayHeight;
        drawW = drawH * videoRatio;
        drawX = (displayWidth - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    ctx.restore();
  };

  // Scroll listener and RAF-based smooth lerp animation loop for best motion effect
  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const rawProgress = -rect.top / totalScroll;
      targetProgress = Math.min(1, Math.max(0, rawProgress));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    const animateLoop = () => {
      // Smooth lerp physics for premium, controlled inertia (silk-smooth motion)
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0002) {
        currentProgress += diff * 0.12;
      } else {
        currentProgress = targetProgress;
      }

      setScrollPercent(currentProgress);
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
      drawFrame(frameIdx);

      rafId = requestAnimationFrame(animateLoop);
    };

    rafId = requestAnimationFrame(animateLoop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Subtle scroll prompt fades out quickly as user scrolls (0% -> 12%)
  const promptOpacity = Math.max(0, 1 - scrollPercent * 8);

  // End-of-scroll title reveal ("POWERING INDUSTRY. RELIABLY.")
  // Smoothly fades in as the street particles settle into circuitry (progress 0.70 -> 0.88)
  // Fully locks in and stays solid through the transition to the next section
  const textProgress = Math.min(1, Math.max(0, (scrollPercent - 0.70) / 0.18));
  const textOpacity = textProgress;
  const textTranslateY = (1 - textProgress) * 24;

  const scrollToNext = () => {
    if (!containerRef.current) return;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: window.scrollY + totalScroll * 0.5,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-[280vh]">
      {/* Sticky Fullscreen Pinned Animation Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-brand-bg-light dark:bg-brand-bg-dark">
        {/* Hardware-Accelerated High-DPI Canvas for Crisp Fullscreen Scrubbing */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block filter brightness-[1.03] contrast-[1.02]"
        />

        {/* Seamless Edge Blends: Natural top and bottom color feather for uninterrupted flow */}
        <div className="absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b from-brand-bg-light/70 via-brand-bg-light/20 to-transparent dark:from-brand-bg-dark/70 dark:via-brand-bg-dark/20 dark:to-transparent z-[2]" />
        
        {/* Bottom feather blend flowing directly into HeroLanding */}
        <div 
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-[2]" 
          style={{ 
            background: 'linear-gradient(to top, var(--bg-primary) 0%, var(--bg-primary) 22%, rgba(238,236,227,0.88) 50%, rgba(238,236,227,0.3) 80%, transparent 100%)' 
          }} 
        />
        <div 
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-[2] hidden dark:block" 
          style={{ 
            background: 'linear-gradient(to top, #101212 0%, #101212 22%, rgba(16,18,18,0.88) 50%, rgba(16,18,18,0.3) 80%, transparent 100%)' 
          }} 
        />

        {/* Minimal Dispatch Indicator (Top-Right, Unobtrusive) */}
        <div className="absolute top-24 right-5 sm:top-28 sm:right-8 z-10 pointer-events-none transition-opacity duration-300" style={{ opacity: promptOpacity }}>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/15 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/90 uppercase font-semibold">
              Fleet Operations
            </span>
          </div>
        </div>

        {/* Minimalist Scroll Indicator (Fades out immediately as user scrolls) */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto transition-opacity duration-300 z-10"
          style={{ opacity: promptOpacity }}
        >
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            aria-label="Scroll to explore"
          >
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-brand-text-light-muted dark:text-brand-text-dark-muted uppercase font-bold group-hover:text-brand-gold transition-colors">
              SCROLL TO EXPLORE
            </span>
            <div className="w-5 h-9 border border-brand-text-light-muted/40 dark:border-brand-text-dark-muted/40 rounded-full flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-brand-gold"
              />
            </div>
          </button>
        </div>

        {/* User-Requested Transition Reveal: POWERING INDUSTRY RELIABILITY in one line in bold black */}
        <div
          className="absolute inset-x-0 bottom-10 sm:bottom-14 md:bottom-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none z-10"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tightest leading-none text-black dark:text-white uppercase font-sans whitespace-nowrap drop-shadow-sm">
            POWERING INDUSTRY RELIABILITY
          </h2>
        </div>
      </div>
    </div>
  );
}
