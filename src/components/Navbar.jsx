import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

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
    { name: 'Request a Quote', href: '#quote' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
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

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-2 lg:hidden">
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
        </div>
      )}
    </header>
  );
}
