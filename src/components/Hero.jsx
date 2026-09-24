import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 240;

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const lastFrameIdxRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Framerate-independent animation loop and progressive preloader
  useEffect(() => {
    let active = true;
    const frames = new Array(TOTAL_FRAMES);
    framesRef.current = frames;
    const requested = new Set();

    // Helper to safely load a frame index
    const loadFrame = (idx) => {
      if (idx < 0 || idx >= TOTAL_FRAMES || requested.has(idx)) return;
      requested.add(idx);
      const img = new Image();
      img.src = `/hero-sequence/frame_${String(idx).padStart(3, '0')}.webp?v=clean-v2`;
      img.onload = () => {
        if (!active) return;
        frames[idx] = img;
        if (lastFrameIdxRef.current === idx) {
          drawFrame(idx);
        }
      };
    };

    // 1. Immediately load frame 0 for instant First Contentful Paint (<50ms)
    const firstImg = new Image();
    firstImg.src = '/hero-sequence/frame_000.webp?v=clean-v2';
    firstImg.onload = () => {
      if (!active) return;
      frames[0] = firstImg;
      requested.add(0);
      setIsLoaded(true);
      drawFrame(0);
    };

    // 2. Preload the initial interactive window (frames 1 to 30)
    for (let i = 1; i <= 30; i++) {
      loadFrame(i);
    }

    // 3. Progressive batch streaming: load remaining frames in small non-blocking intervals
    let batchTimeout = null;
    let nextBatchFrame = 31;
    const loadNextBatch = () => {
      if (!active || nextBatchFrame >= TOTAL_FRAMES) return;
      const end = Math.min(TOTAL_FRAMES, nextBatchFrame + 15);
      for (let i = nextBatchFrame; i < end; i++) {
        loadFrame(i);
      }
      nextBatchFrame = end;
      if (nextBatchFrame < TOTAL_FRAMES) {
        batchTimeout = setTimeout(loadNextBatch, 25);
      }
    };
    batchTimeout = setTimeout(loadNextBatch, 80);

    // Dynamic preloading window around user's current scrub position
    const preloadAhead = (currentIdx) => {
      for (let i = Math.max(0, currentIdx - 10); i <= Math.min(TOTAL_FRAMES - 1, currentIdx + 30); i++) {
        loadFrame(i);
      }
    };

    // Connect preloader to RAF loop
    window.__oilteq_preloadAhead = preloadAhead;

    return () => {
      active = false;
      if (batchTimeout) clearTimeout(batchTimeout);
      delete window.__oilteq_preloadAhead;
    };
  }, []);

  // Frame drawer onto HTML5 Canvas preserving exact cover ratio without distortion
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // High-DPI & 4K support: scale canvas buffer to device pixel ratio (capped at 3 for mobile GPU safety)
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Natural background fill matching website theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDarkMode ? '#101212' : '#EEECE3';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Find requested frame or fallback to nearest loaded frame
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
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const videoRatio = 1920 / 1080;
      const canvasRatio = displayWidth / displayHeight;
      let drawW, drawH, drawX, drawY;

      // Fit to screen size on mobile phones & portrait viewports (no distortion, no cropping)
      const isMobile = displayWidth < 768 || canvasRatio < 1.0;

      if (isMobile) {
        // Uniform fit-to-screen (contain) so the entire 16:9 industrial animation fits inside the phone display
        const scale = Math.min(displayWidth / 1920, displayHeight / 1080);
        drawW = Math.round(1920 * scale);
        drawH = Math.round(1080 * scale);
        drawX = Math.round((displayWidth - drawW) / 2);

        // Remove gap above video on mobile: bring video up directly below top header
        if (canvasRatio < 1.0) {
          const mobileHeaderOffset = Math.min(76, Math.max(64, Math.round(displayHeight * 0.085)));
          drawY = mobileHeaderOffset;
        } else {
          drawY = Math.round((displayHeight - drawH) / 2);
        }
      } else {
        // Desktop / widescreen viewports: Cover the stage seamlessly
        if (canvasRatio > videoRatio) {
          drawW = displayWidth;
          drawH = drawW / videoRatio;
          drawX = 0;
          drawY = (displayHeight - drawH) / 2;
        } else {
          drawH = displayHeight;
          drawW = drawH * videoRatio;
          drawX = (displayWidth - drawW) / 2;
          drawY = 0;
        }
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // On mobile screens, add seamless feather gradients at top & bottom edges to melt into page theme
      if (isMobile) {
        const topFeatherH = 12;
        const botFeatherH = Math.min(28, Math.max(14, Math.round(drawH * 0.11)));

        const topGrad = ctx.createLinearGradient(0, drawY, 0, drawY + topFeatherH);
        topGrad.addColorStop(0, isDarkMode ? 'rgba(16, 18, 18, 1)' : 'rgba(238, 236, 227, 1)');
        topGrad.addColorStop(1, isDarkMode ? 'rgba(16, 18, 18, 0)' : 'rgba(238, 236, 227, 0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(drawX, drawY, drawW, topFeatherH);

        const botGrad = ctx.createLinearGradient(0, drawY + drawH - botFeatherH, 0, drawY + drawH);
        botGrad.addColorStop(0, isDarkMode ? 'rgba(16, 18, 18, 0)' : 'rgba(238, 236, 227, 0)');
        botGrad.addColorStop(1, isDarkMode ? 'rgba(16, 18, 18, 1)' : 'rgba(238, 236, 227, 1)');
        ctx.fillStyle = botGrad;
        ctx.fillRect(drawX, drawY + drawH - botFeatherH, drawW, botFeatherH);
      }
    }

    ctx.restore();
  };

  // Delta-time Framerate-Independent RAF Physics Engine (90Hz / 120Hz / 144Hz+ compatible)
  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;
    let lastTime = performance.now();

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
    if (window.__oilteq_lenis) {
      window.__oilteq_lenis.on('scroll', onScroll);
    }
    onScroll();

    const animateLoop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1); // clamped delta-time in seconds
      lastTime = now;

      const diff = targetProgress - currentProgress;
      const speed = Math.abs(diff);

      // Responsive RAF damping: smooth inertia when fast, direct locking when slow
      const adaptiveLambda = speed > 0.02 ? 14.0 : 18.0;
      const alpha = 1 - Math.exp(-adaptiveLambda * dt);

      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * alpha;
      } else {
        currentProgress = targetProgress;
      }

      setScrollPercent(currentProgress);
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));

      if (frameIdx !== lastFrameIdxRef.current) {
        lastFrameIdxRef.current = frameIdx;
        setCurrentFrameIndex(frameIdx);
      }

      // Demand-paged window preloading ahead of scrub velocity
      if (window.__oilteq_preloadAhead) {
        window.__oilteq_preloadAhead(frameIdx);
      }

      drawFrame(frameIdx);

      rafId = requestAnimationFrame(animateLoop);
    };

    rafId = requestAnimationFrame(animateLoop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (window.__oilteq_lenis) {
        window.__oilteq_lenis.off('scroll', onScroll);
      }
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
    <div ref={containerRef} className="relative w-full h-[190vh] sm:h-[280vh]">
      {/* Sticky Fullscreen Pinned Animation Stage */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-brand-bg-light dark:bg-brand-bg-dark">
        {/* Hardware-Accelerated High-DPI Canvas for Crisp Fullscreen Scrubbing */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block filter brightness-[1.03] contrast-[1.02]"
        />

        {/* Seamless Edge Blends: Natural top and bottom color feather for uninterrupted flow */}
        <div className="absolute inset-x-0 top-0 h-16 sm:h-28 pointer-events-none bg-gradient-to-b from-brand-bg-light/70 via-brand-bg-light/20 to-transparent dark:from-brand-bg-dark/70 dark:via-brand-bg-dark/20 dark:to-transparent z-[2]" />
        
        {/* Bottom feather blend flowing directly into HeroLanding */}
        <div 
          className="absolute inset-x-0 bottom-0 h-28 sm:h-48 pointer-events-none z-[2]" 
          style={{ 
            background: 'linear-gradient(to top, var(--bg-primary) 0%, var(--bg-primary) 22%, rgba(238,236,227,0.88) 50%, rgba(238,236,227,0.3) 80%, transparent 100%)' 
          }} 
        />
        <div 
          className="absolute inset-x-0 bottom-0 h-28 sm:h-48 pointer-events-none z-[2] hidden dark:block" 
          style={{ 
            background: 'linear-gradient(to top, #101212 0%, #101212 22%, rgba(16,18,18,0.88) 50%, rgba(16,18,18,0.3) 80%, transparent 100%)' 
          }} 
        />

        {/* Dynamic Atmospheric Flare & Radial Depth */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% ${35 + scrollPercent * 35}%, rgba(202, 154, 67, ${0.05 + Math.sin(scrollPercent * Math.PI) * 0.08}) 0%, transparent 70%)`
          }}
        />


        {/* Real-time Technical Scrub Metrics (Bottom-Left, Desktop) */}
        <div 
          className="absolute bottom-8 left-6 sm:bottom-10 sm:left-10 z-10 pointer-events-none transition-opacity duration-300 hidden md:flex items-center gap-3"
          style={{ opacity: Math.max(0, 1 - textProgress * 1.5) }}
        >
          <div className="w-9 h-9 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center relative shadow-sm">
            <svg className="w-9 h-9 -rotate-90">
              <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2.5" className="text-white/15" fill="none" />
              <circle
                cx="18" cy="18" r="14"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-brand-gold transition-all duration-75"
                fill="none"
                strokeDasharray={2 * Math.PI * 14}
                strokeDashoffset={2 * Math.PI * 14 * (1 - scrollPercent)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[8px] font-mono font-bold text-white">
              {Math.round(scrollPercent * 100)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-white/50 tracking-wider uppercase">SUPPLY READINESS</span>
            <span className="text-xs font-mono font-bold text-white/90">
              {scrollPercent < 0.35 ? 'INSPECTION // ACTIVE' : scrollPercent < 0.70 ? 'VISCOSITY // 180 CST' : 'GRID SYNCHRONIZED'}
            </span>
          </div>
        </div>

        {/* Minimalist Scroll Indicator (Fades out smoothly as user scrolls) */}
        <div
          className="absolute top-[calc(76px+56.25vw+1.75rem)] sm:top-auto sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto transition-opacity duration-300 z-10"
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
          className="absolute inset-x-0 top-[calc(76px+56.25vw+1.25rem)] sm:top-auto sm:bottom-14 md:bottom-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none z-10"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          <h2 className="font-black tracking-tightest uppercase font-sans drop-shadow-sm text-center leading-[1.08]">
            <span className="hidden sm:inline text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-black dark:text-white whitespace-nowrap">
              POWERING INDUSTRY RELIABILITY
            </span>
            <span className="sm:hidden block text-2xl font-black text-black dark:text-white">
              POWERING INDUSTRY<br />
              <span className="text-brand-gold dark:text-brand-gold-light">RELIABILITY</span>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
