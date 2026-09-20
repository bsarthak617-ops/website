import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ isDark, setIsDark, onOpenSpecs, onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Industries', href: '#industries' },
    { name: 'Manufacturing', href: '#manufacturing' },
    { name: 'Request a Quote', href: '#quote' },
  ];

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    if (href === '#quote' && onOpenQuote) {
      onOpenQuote();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-brand-bg-light/95 dark:bg-brand-bg-dark/95 backdrop-blur-md py-3 border-b border-brand-border-light dark:border-brand-border-dark shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group z-10">
          <Logo dropClassName="h-9 sm:h-10" textClassName="h-6 sm:h-7" />
        </a>

        {/* Desktop Navigation - Perfectly Centered */}
        <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
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

        {/* Desktop Right Actions: Theme Toggle + Quote Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full border border-brand-border-light dark:border-brand-border-dark text-brand-text-light dark:text-brand-text-dark hover:bg-brand-bg-surface dark:hover:bg-brand-bg-dark-surface transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4 text-brand-charcoal" />}
          </button>
          <button
            onClick={onOpenQuote}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-brand-charcoal text-white hover:bg-brand-gold dark:bg-white dark:text-brand-charcoal dark:hover:bg-brand-gold transition-colors rounded-sm flex items-center gap-1.5"
          >
            <span>Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger & Quick Dark Mode */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full text-brand-text-light dark:text-brand-text-dark"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-brand-gold" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-text-light dark:text-brand-text-dark"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (visible on all screens < lg: 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-bg-light/98 dark:bg-brand-bg-dark/98 backdrop-blur-xl border-b border-brand-border-light dark:border-brand-border-dark px-6 py-6 space-y-5 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-65px)] overflow-y-auto shadow-2xl">
          <div className="flex flex-col space-y-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-base font-bold uppercase tracking-wider text-brand-text-light dark:text-brand-text-dark hover:text-brand-gold dark:hover:text-brand-gold transition-colors py-1.5 border-b border-brand-border-light/40 dark:border-brand-border-dark/40 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-brand-gold font-mono">→</span>
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenQuote) onOpenQuote();
              }}
              className="w-full py-3.5 bg-brand-charcoal text-white hover:bg-brand-gold dark:bg-white dark:text-brand-charcoal dark:hover:bg-brand-gold font-bold text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 shadow-md"
            >
              <span>Instant Commercial RFQ</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
