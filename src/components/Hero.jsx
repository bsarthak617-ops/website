import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ShieldCheck, Gauge, ChevronRight } from 'lucide-react';

const TOTAL_FRAMES = 240;

export default function Hero({ onOpenQuote, onOpenSpecs }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload frames in background while ensuring frame 0 is rendered immediately
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

  // Frame drawer onto HTML5 Canvas preserving exact 16:9 aspect ratio without distortion
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

    // Natural background fill matching video boundaries (#E7E6DF)
    const isDarkMode = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDarkMode ? '#111314' : '#E7E6DF';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Find requested frame or nearest loaded frame
    let img = framesRef.current[frameIndex];
    if (!img || !img.complete) {
      // Find nearest loaded frame
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
      // Exact aspect ratio (1280x720 -> 16:9) preservation without cropping or stretching
      const videoRatio = 1280 / 720;
      const canvasRatio = displayWidth / displayHeight;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > videoRatio) {
        drawH = displayHeight;
        drawW = drawH * videoRatio;
        drawX = (displayWidth - drawW) / 2;
        drawY = 0;
      } else {
        drawW = displayWidth;
        drawH = drawW / videoRatio;
        drawX = 0;
        drawY = (displayHeight - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    ctx.restore();
  };

  // Scroll listener and RAF-based smooth lerp animation loop
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
      // Smooth lerp physics for premium, controlled inertia (no jerky jumps or frame skipping)
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0003) {
        currentProgress += diff * 0.14;
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

  // Text Reveal Calculations:
  // Begins at progress 0.65, fully locks in by 0.85, stays present through 1.0
  const textProgress = Math.min(1, Math.max(0, (scrollPercent - 0.65) / 0.20));
  const textOpacity = textProgress;
  const textTranslateY = (1 - textProgress) * 35; // Eases smoothly upward into place

  // Initial scroll prompt fadeout early in the scroll (0% -> 15%)
  const promptOpacity = Math.max(0, 1 - scrollPercent * 6);

  return (
    <div ref={containerRef} className="relative w-full h-[320vh]">
      {/* Sticky Fullscreen Pinned Animation Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#E7E6DF] dark:bg-[#111314]">
        {/* Hardware-Accelerated Canvas for Smooth 60fps Scrubbing */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain block"
        />

        {/* Subtle Edge Gradients for Inconspicuous Seamless Page Blending */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-brand-bg-light/80 via-transparent to-brand-bg-light/40 dark:from-brand-bg-dark/80 dark:via-transparent dark:to-brand-bg-dark/40" />

        {/* Initial Scroll Prompt (Fades out as user scrolls) */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300 z-10"
          style={{ opacity: promptOpacity }}
        >
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-brand-text-light-muted dark:text-brand-text-dark-muted uppercase">
            SCROLL TO EXPLORE
          </span>
          <div className="w-6 h-10 border border-brand-text-light-muted/40 dark:border-brand-text-dark-muted/40 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-brand-gold"
            />
          </div>
        </div>

        {/* Final Text Reveal: POWERING INDUSTRY RELIABLY */}
        <div
          className="absolute inset-x-0 bottom-12 sm:bottom-16 md:bottom-20 max-w-6xl mx-auto px-6 lg:px-8 text-center pointer-events-none z-10"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 border border-brand-charcoal/20 dark:border-white/20 bg-brand-bg-light/90 dark:bg-brand-bg-dark/90 backdrop-blur-md rounded-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="tech-label text-brand-gold dark:text-brand-gold-light text-[10px] tracking-widest font-mono">
              OILTEQ INDUSTRIES • RELIABLE BULK ENERGY
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tightest leading-[1.02] text-brand-charcoal dark:text-white uppercase font-sans drop-shadow-md">
            POWERING INDUSTRY RELIABLY
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-3 max-w-2xl mx-auto font-mono leading-relaxed">
            Engineered industrial fuel solutions, direct import logistics, and continuous bulk supply pipelines serving high-heat manufacturing across India.
          </p>
        </div>
      </div>

      {/* Continuation of Website Content (Seamless Uninterrupted Flow) */}
      <section className="relative z-20 bg-brand-bg-light dark:bg-brand-bg-dark pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-t border-brand-border-light dark:border-brand-border-dark shadow-md">
        <div className="max-w-7xl mx-auto">
          {/* Top Operational Scale Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 mb-12 border-b border-brand-border-light dark:border-brand-border-dark">
            <div className="space-y-1">
              <span className="tech-label text-brand-gold">01 / MANUFACTURING SCALE</span>
              <p className="text-base font-bold text-brand-text-light dark:text-brand-text-dark">6,000 MT / Month Capacity</p>
              <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted">3 Manufacturing Plants in Jharsuguda, Odisha</p>
            </div>

            <div className="space-y-1">
              <span className="tech-label text-brand-gold">02 / IMPORT TERMINALS</span>
              <p className="text-base font-bold text-brand-text-light dark:text-brand-text-dark">~6,000 MT / Month Sourcing</p>
              <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted">Direct Port Dispatches across Western & Eastern Corridors</p>
            </div>

            <div className="space-y-1">
              <span className="tech-label text-brand-gold">03 / QUALITY ASSURANCE</span>
              <p className="text-base font-bold text-brand-text-light dark:text-brand-text-dark flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-forest" />
                Batch-Certified COA Delivery
              </p>
              <p className="text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted">In-House ASTM & ISO Analytical Testing Laboratories</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-brand-charcoal text-white hover:bg-brand-gold font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-md group rounded-sm"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-brand-border-light dark:border-brand-border-dark hover:border-brand-text-light dark:hover:border-brand-text-dark text-brand-text-light dark:text-brand-text-dark font-semibold text-xs uppercase tracking-widest transition-colors duration-200 rounded-sm"
              >
                <span>Explore Products</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenSpecs}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-brand-text-light-muted hover:text-brand-text-light dark:text-brand-text-dark-muted dark:hover:text-brand-text-dark transition-colors"
              >
                <Gauge className="w-4 h-4 text-brand-teal" />
                <span>Laboratory Specs</span>
              </button>
            </div>

            <a
              href="#about"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-text-light-muted hover:text-brand-text-light dark:text-brand-text-dark-muted dark:hover:text-brand-text-dark transition-colors group font-mono"
            >
              <span>Explore Industrial Operations</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
