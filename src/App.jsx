import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import MetricsSection from './components/MetricsSection';
import ProductsSection from './components/ProductsSection';
import IndustriesSection from './components/IndustriesSection';
import ManufacturingSection from './components/ManufacturingSection';
import InfrastructureSection from './components/InfrastructureSection';
import LogisticsSection from './components/LogisticsSection';
import GlobalSection from './components/GlobalSection';
import QuotePortal from './components/QuotePortal';
import Footer from './components/Footer';
import TechnicalSpecsModal from './components/TechnicalSpecsModal';

export default function App() {
  // Default to Light Mode as per user preference (#EEECE3 base)
  const [isDark, setIsDark] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState('Tyre Pyrolysis Oil — TPO');
  const [selectedQuoteIndustry, setSelectedQuoteIndustry] = useState('Hotmix Asphalt Plants');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

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
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main Page Content */}
      <main>
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onOpenSpecs={() => setIsSpecsOpen(true)}
        />

        <AboutSection />

        <MetricsSection />

        <ProductsSection
          onOpenSpecs={() => setIsSpecsOpen(true)}
          onSelectProductQuote={handleSelectProductQuote}
        />

        <IndustriesSection
          onSelectIndustryQuote={handleSelectIndustryQuote}
        />

        <ManufacturingSection />

        <InfrastructureSection />

        <LogisticsSection />

        <GlobalSection
          onOpenQuote={() => handleOpenQuote()}
        />

        <QuotePortal
          selectedProduct={selectedQuoteProduct}
          selectedIndustry={selectedQuoteIndustry}
          onOpenSpecs={() => setIsSpecsOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Technical Specifications Modal */}
      <TechnicalSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        onSelectQuote={(prodName) => handleSelectProductQuote(prodName)}
      />
    </div>
  );
}
