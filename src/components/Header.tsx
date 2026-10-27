import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle, Globe } from 'lucide-react';
import { Currency } from '../utils/projectData';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onSelectProjectType?: (type: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  onSelectProjectType
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Selected Work', href: '#work' },
    { label: 'AI Commercial Lab', href: '#commercial-lab' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090a]/92 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/60'
          : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display font) */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#ede8dd] whitespace-nowrap shrink-0 hover:text-[#b4ff39] transition-colors focus-visible:ring-2 focus-visible:ring-[#b4ff39] rounded"
          style={{ fontFamily: 'var(--font-display)' }}
          aria-label="Sketchleaf Design Studio home"
        >
          <span className="w-2.5 h-2.5 bg-[#b4ff39] rounded-sm transform rotate-45 group-hover:rotate-90 transition-transform duration-300"></span>
          <span>SKETCHLEAF</span>
          <span className="text-[11px] font-mono text-white/40 tracking-widest hidden sm:inline">STUDIO</span>
        </a>

        {/* Zone 2: Navigation Links (Clean single-line text links with subtle hover underlines) */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-white/75 tracking-wide"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#ede8dd] hover:text-[#b4ff39] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#b4ff39] hover:after:w-full after:transition-all after:duration-200 focus-visible:ring-2 focus-visible:ring-[#b4ff39] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions & Currency Selector */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Currency Selector (India INR vs International USD) */}
          <div
            className="flex items-center p-0.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono"
            role="group"
            aria-label="Select currency region"
          >
            <button
              onClick={() => onCurrencyChange('INR')}
              className={`px-1.5 sm:px-2 py-1 rounded transition-all text-[11px] sm:text-xs ${
                currency === 'INR'
                  ? 'bg-[#b4ff39] text-black font-bold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="India Pricing (INR ₹)"
              aria-pressed={currency === 'INR'}
            >
              ₹ INR
            </button>
            <button
              onClick={() => onCurrencyChange('USD')}
              className={`px-1.5 sm:px-2 py-1 rounded transition-all text-[11px] sm:text-xs ${
                currency === 'USD'
                  ? 'bg-[#b4ff39] text-black font-bold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="International Pricing (USD $)"
              aria-pressed={currency === 'USD'}
            >
              $ USD
            </button>
          </div>

          <a
            href="https://wa.me/919742655618?text=Hi%20Sketchleaf%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Quick WhatsApp enquiry"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-[#b4ff39] bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/10 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-black bg-[#b4ff39] hover:bg-[#c6ff4d] rounded-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-md shadow-[#b4ff39]/15"
            onClick={() => onSelectProjectType?.('Website')}
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-white/80 hover:text-white bg-white/5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b4ff39]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden bg-[#0a0c0e]/98 backdrop-blur-xl border-b border-white/10 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          {/* Mobile Currency Switcher */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <span className="text-xs font-mono text-white/60 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#b4ff39]" />
              <span>Currency region:</span>
            </span>
            <div className="flex items-center p-0.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono">
              <button
                onClick={() => onCurrencyChange('INR')}
                className={`px-3 py-1 rounded transition-all ${
                  currency === 'INR'
                    ? 'bg-[#b4ff39] text-black font-bold'
                    : 'text-white/60'
                }`}
              >
                ₹ India (INR)
              </button>
              <button
                onClick={() => onCurrencyChange('USD')}
                className={`px-3 py-1 rounded transition-all ${
                  currency === 'USD'
                    ? 'bg-[#b4ff39] text-black font-bold'
                    : 'text-white/60'
                }`}
              >
                $ Global (USD)
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-3 text-sm font-medium text-white/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-base hover:text-[#b4ff39] transition-colors border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSelectProjectType?.('Website');
                }}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-black bg-[#b4ff39] rounded-md text-center"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919742655618?text=Hi%20Sketchleaf%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
