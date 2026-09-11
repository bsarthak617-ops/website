import React, { useState, useEffect } from 'react';
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
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState('Batch Plant Fuel');
  const [selectedQuoteIndustry, setSelectedQuoteIndustry] = useState('Hotmix Asphalt Plants');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleOpenSpecs = (productIdOrName) => {
    if (productIdOrName) {
      setSelectedSpecsProduct(productIdOrName);
    }
    setIsSpecsOpen(true);
  };

  const handleOpenQuote = (productName, industryName) => {
    if (productName) setSelectedQuoteProduct(productName);
    if (industryName) setSelectedQuoteIndustry(industryName);
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProductQuote = (productName) => {
    setSelectedQuoteProduct(productName);
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectIndustryQuote = (industryName) => {
    setSelectedQuoteIndustry(industryName);
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-light text-brand-text-light dark:bg-brand-bg-dark dark:text-brand-text-dark selection:bg-brand-gold selection:text-white transition-colors duration-300">
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
