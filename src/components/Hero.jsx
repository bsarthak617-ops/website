import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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

    // Natural background fill matching website background (#EEECE3 in light mode, #101212 in dark mode)
    const isDarkMode = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDarkMode ? '#101212' : '#EEECE3';
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
      // Fullscreen Cover: scale to fill 100% of display width and height without any blank sidebars
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.filter = 'brightness(1.08) contrast(1.02)';

      const videoRatio = 1920 / 1080;
      const canvasRatio = displayWidth / displayHeight;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > videoRatio) {
        // Wider screen: scale by width to cover full width
        drawW = displayWidth;
        drawH = drawW / videoRatio;
        drawX = 0;
        drawY = (displayHeight - drawH) / 2;
      } else {
        // Taller screen: scale by height to cover full height
        drawH = displayHeight;
        drawW = drawH * videoRatio;
        drawX = (displayWidth - drawW) / 2;
        drawY = 0;
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
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-brand-bg-light dark:bg-brand-bg-dark">
        {/* Hardware-Accelerated High-DPI Canvas for Crisp Fullscreen Scrubbing */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block filter brightness-[1.08] contrast-[1.02]"
        />

        {/* Seamless Edge Blends: Natural top and bottom color feather for uninterrupted flow */}
        <div className="absolute inset-x-0 top-0 h-32 pointer-events-none bg-gradient-to-b from-brand-bg-light/80 via-brand-bg-light/20 to-transparent dark:from-brand-bg-dark/80 dark:via-brand-bg-dark/20 dark:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 pointer-events-none bg-gradient-to-t from-brand-bg-light via-brand-bg-light/70 to-transparent dark:from-brand-bg-dark dark:via-brand-bg-dark/70 dark:to-transparent" />

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

        {/* Headline Text Reveal: OILTEQ INDUSTRIES & POWERING INDUSTRY RELIABLY */}
        <div
          className="absolute inset-x-0 bottom-16 sm:bottom-20 md:bottom-24 max-w-6xl mx-auto px-6 lg:px-8 text-center pointer-events-none z-10"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          {/* Company Brand Title */}
          <div className="mb-2 sm:mb-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-black dark:text-white uppercase font-sans drop-shadow-sm">
              OILTEQ INDUSTRIES
            </h2>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tightest leading-[1.02] text-brand-charcoal dark:text-white uppercase font-sans drop-shadow-md">
            POWERING INDUSTRY RELIABLY
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-3 max-w-2xl mx-auto font-mono leading-relaxed">
            Engineered industrial fuel solutions, direct import logistics, and continuous bulk supply pipelines serving high-heat manufacturing across India.
          </p>
        </div>
      </div>
    </div>
  );
}
