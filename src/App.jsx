import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroLanding from './components/HeroLanding';
import MetricsSection from './components/MetricsSection';
import ProductsSection from './components/ProductsSection';
import IndustriesSection from './components/IndustriesSection';
import ManufacturingSection from './components/ManufacturingSection';
import GlobalSection from './components/GlobalSection';
import QuotePortal from './components/QuotePortal';
import Footer from './components/Footer';
import TechnicalSpecsModal from './components/TechnicalSpecsModal';

export default function App() {
  // Default to Light Mode as per user preference (#EEECE3 base)
  const [isDark, setIsDark] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [selectedSpecsProduct, setSelectedSpecsProduct] = useState('batch-plant-fuel');
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState('Fuel for Batch Mix Plant');
  const [selectedQuoteIndustry, setSelectedQuoteIndustry] = useState('Hotmix Asphalt Plants');
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Initialize Lenis Momentum Smooth Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.__oilteq_lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global scroll progress tracking
    const onLenisScroll = (e) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, e.scroll / maxScroll)));
      }
    };
    lenis.on('scroll', onLenisScroll);

    // Smooth anchor navigation interceptor
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#') return;
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        lenis.scrollTo(targetElement, { offset: -25, duration: 1.3 });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // Auto-scroll to target if URL contains hash on mount
    if (window.location.hash) {
      setTimeout(() => {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          lenis.scrollTo(targetElement, { offset: -25, duration: 1.0 });
        }
      }, 400);
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      delete window.__oilteq_lenis;
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -25, duration: 1.3 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSpecs = (productIdOrName) => {
    if (productIdOrName) {
      setSelectedSpecsProduct(productIdOrName);
    }
    setIsSpecsOpen(true);
  };

  const handleOpenQuote = (productName, industryName) => {
    if (productName) setSelectedQuoteProduct(productName);
    if (industryName) setSelectedQuoteIndustry(industryName);
    scrollToSection('quote');
  };

  const handleSelectProductQuote = (productName) => {
    setSelectedQuoteProduct(productName);
    scrollToSection('quote');
  };

  const handleSelectIndustryQuote = (industryName) => {
    setSelectedQuoteIndustry(industryName);
    scrollToSection('quote');
  };

  return (
    <div className="min-h-screen bg-brand-bg-light text-brand-text-light dark:bg-brand-bg-dark dark:text-brand-text-dark selection:bg-brand-gold selection:text-white transition-colors duration-300">
      {/* Top Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] pointer-events-none bg-black/5 dark:bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold shadow-[0_0_10px_rgba(202,154,67,0.75)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Top Fixed Navbar */}
      <Navbar
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenSpecs={() => handleOpenSpecs('batch-plant-fuel')}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main Page Content */}
      <main>
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onOpenSpecs={() => handleOpenSpecs('batch-plant-fuel')}
        />

        <MetricsSection />

        <HeroLanding
          onOpenQuote={() => handleOpenQuote()}
          onOpenSpecs={() => handleOpenSpecs('batch-plant-fuel')}
        />

        <ProductsSection
          onOpenSpecs={handleOpenSpecs}
          onSelectProductQuote={handleSelectProductQuote}
        />

        <IndustriesSection
          onSelectIndustryQuote={handleSelectIndustryQuote}
        />

        <ManufacturingSection />

        <GlobalSection
          onOpenQuote={() => handleOpenQuote()}
        />

        <QuotePortal
          selectedProduct={selectedQuoteProduct}
          selectedIndustry={selectedQuoteIndustry}
          onOpenSpecs={handleOpenSpecs}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenSpecs={() => handleOpenSpecs('batch-plant-fuel')}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Technical Specifications Modal */}
      <TechnicalSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        initialProduct={selectedSpecsProduct}
        onSelectQuote={(prodName) => handleSelectProductQuote(prodName)}
      />
    </div>
  );
}
