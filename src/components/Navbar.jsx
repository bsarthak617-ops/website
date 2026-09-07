import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X, FileText, ShieldCheck } from 'lucide-react';

export default function Navbar({ isDark, setIsDark, onOpenSpecs, onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Industries', href: '#industries' },
    { name: 'Process', href: '#manufacturing' },
    { name: 'Quality', href: '#quality' },
    { name: 'Infrastructure', href: '#infrastructure' },
    { name: 'Logistics', href: '#logistics' },
    { name: 'Clients', href: '#clients' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-bg-light/95 dark:bg-brand-bg-dark/95 backdrop-blur-md py-3 border-b border-brand-border-light dark:border-brand-border-dark shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/oilteq-logo.png"
            alt="OILTEQ INDUSTRIES Logo"
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-brand-text-light-muted hover:text-brand-text-light dark:text-brand-text-dark-muted dark:hover:text-brand-text-dark transition-colors duration-150"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions & Theme Toggle */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Spec Datasheet Button */}
          <button
            onClick={onOpenSpecs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark border border-brand-border-light dark:border-brand-border-dark hover:border-brand-gold dark:hover:border-brand-gold transition-colors rounded-sm"
          >
            <FileText className="w-3.5 h-3.5 text-brand-gold" />
            <span>Tech Specs</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className="p-2 text-brand-text-light dark:text-brand-text-dark hover:bg-black/5 dark:hover:bg-white/10 rounded-sm transition-colors border border-transparent hover:border-brand-border-light dark:hover:border-brand-border-dark"
            title={isDark ? "Switch to Architectural Light Mode" : "Switch to Industrial Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-brand-gold" />
            ) : (
              <Moon className="w-4 h-4 text-brand-teal" />
            )}
          </button>

          {/* Request Quote Button */}
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest bg-brand-charcoal text-white hover:bg-brand-gold transition-all duration-200 shadow-sm rounded-sm group"
          >
            <span>Request a Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-2 sm:hidden">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-brand-text-light dark:text-brand-text-dark"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4 text-brand-teal" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-text-light dark:text-brand-text-dark"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-brand-bg-light dark:bg-brand-bg-dark border-b border-brand-border-light dark:border-brand-border-dark px-6 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-wider text-brand-text-light-muted dark:text-brand-text-dark-muted hover:text-brand-text-light dark:hover:text-brand-text-dark"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-brand-border-light dark:border-brand-border-dark flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSpecs();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold uppercase tracking-wider border border-brand-border-light dark:border-brand-border-dark"
            >
              <FileText className="w-4 h-4 text-brand-gold" />
              <span>Technical Data Sheets</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold uppercase tracking-widest bg-brand-charcoal text-white hover:bg-brand-gold"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
