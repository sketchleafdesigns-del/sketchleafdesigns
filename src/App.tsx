/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { HeroMotion } from './components/HeroMotion';
import { PinnedStorytelling } from './components/PinnedStorytelling';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { CommercialLab } from './components/CommercialLab';
import { ExpressOffer } from './components/ExpressOffer';
import { ProcessTimeline } from './components/ProcessTimeline';
import { ServicesAndPricing } from './components/ServicesAndPricing';
import { AboutStudio } from './components/AboutStudio';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Currency } from './utils/projectData';
import { MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Website');
  const [selectedPackageName, setSelectedPackageName] = useState<string>('');

  // Global ScrollTrigger stability and layout recalculation coordinator
  useEffect(() => {
    // 1. Configure ScrollTrigger for maximum stability and performance
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true
    });

    // 2. Refresh ScrollTrigger once Google Fonts are completely loaded to prevent height jumps
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // 3. Refresh on full window load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    // 4. Debounced window resize handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener('resize', handleResize);

    // In-page anchors: smooth scroll without relying on CSS scroll-behavior
    // (CSS smooth scrolling fights ScrollTrigger pinning/scrubbing).
    const handleAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const id = link?.getAttribute('href')?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!link || !target) return;
      e.preventDefault();
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: calm ? 'auto' : 'smooth' });
      history.replaceState(null, '', `#${id}`);
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const handleSelectProjectType = (type: string, pkgName?: string) => {
    setSelectedProjectType(type);
    if (pkgName) {
      setSelectedPackageName(pkgName);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070809] text-[#ede8dd] flex flex-col selection:bg-[#b4ff39] selection:text-black">
      {/* Primary Top Bar Contract with Currency Selector */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        onSelectProjectType={handleSelectProjectType}
      />

      {/* Main Content Assembly */}
      <main className="flex-grow">
        {/* 1. Full-screen Hero with WE MAKE BRANDS MOVE & Scroll Transformation */}
        <HeroMotion />

        {/* 2. Pinned Cinematic Storytelling Sequence */}
        <PinnedStorytelling
          currency={currency}
          onSelectProjectType={handleSelectProjectType}
        />

        {/* 3. Immersive Portfolio with All 10 Projects & Live Links */}
        <PortfolioShowcase onSelectProjectType={handleSelectProjectType} />

        {/* 4. AI Commercial Lab with Curated Production Studio & Phase 6 Packages */}
        <CommercialLab
          currency={currency}
          onSelectProjectType={handleSelectProjectType}
        />

        {/* 5. Express 24-Hour Website Offer & 10 Deliverables */}
        <ExpressOffer
          currency={currency}
          onSelectProjectType={handleSelectProjectType}
        />

        {/* 6. Animated Process Timeline: Brief to Launch */}
        <ProcessTimeline />

        {/* 7. Services & Phase 5 Website Packages with Dual-Currency Selector */}
        <ServicesAndPricing
          currency={currency}
          onCurrencyChange={setCurrency}
          onSelectProjectType={handleSelectProjectType}
        />

        {/* 8. Studio Identity & Founder Vikas Kamath Spotlight */}
        <AboutStudio />

        {/* 9. FAQ Accordions */}
        <FaqSection />

        {/* 10. Contact Section & Preserved WhatsApp Enquiry Flow */}
        <ContactSection
          currency={currency}
          selectedProjectType={selectedProjectType}
          selectedPackageName={selectedPackageName}
          onClearProjectType={() => {
            setSelectedProjectType('Website');
            setSelectedPackageName('');
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Quick Action CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/919742655618?text=Hi%20Sketchleaf%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp conversation with Sketchleaf Design Studio"
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-[#14281d] hover:bg-[#1a3828] text-white font-medium text-xs border border-[#25D366]/40 shadow-2xl transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#25D366]"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span className="font-sans">WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
}
