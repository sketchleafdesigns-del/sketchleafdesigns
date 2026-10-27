import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  STUDIO_SERVICES,
  WEBSITE_PACKAGES,
  ServiceItem,
  WebsitePackage,
  Currency
} from '../utils/projectData';
import { ArrowUpRight, Check, Star, AlertCircle, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesAndPricingProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onSelectProjectType?: (type: string, pkgName?: string) => void;
}

export const ServicesAndPricing: React.FC<ServicesAndPricingProps> = ({
  currency,
  onCurrencyChange,
  onSelectProjectType
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Service discipline cards
      gsap.fromTo(
        '.service-card',
        { y: 24, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.service-card',
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true
          }
        }
      );

      // 2. Website package cards
      gsap.fromTo(
        '.website-pkg-card',
        { y: 28, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.website-pkg-card',
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [currency]);

  const handleSelectService = (service: ServiceItem) => {
    onSelectProjectType?.(service.serviceCategory);
    const contactElem = document.getElementById('contact');
    contactElem?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPackage = (pkg: WebsitePackage) => {
    onSelectProjectType?.('Website', pkg.name);
    const contactElem = document.getElementById('contact');
    contactElem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="services" className="scroll-mt-24 py-24 px-4 sm:px-6 md:px-12 bg-[#0a0c0e] border-b border-white/10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#b4ff39] uppercase mb-3">
              <span>//</span>
              <span>STUDIO DISCIPLINES & PACKAGES</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#ede8dd] uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              WHAT SKETCHLEAF DOES.
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl mt-3 font-normal">
              High-velocity design, motion engineering, and AI-assisted build services for modern brands and ambitious entrepreneurs.
            </p>
          </div>

          <a
            href="#pricing"
            className="text-xs font-mono text-white/50 hover:text-white underline underline-offset-4"
          >
            Jump to Website Packages ↓
          </a>
        </div>

        {/* 5 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {STUDIO_SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="service-card group rounded-2xl bg-[#0f1114] border border-white/10 hover:border-white/25 p-6 sm:p-7 flex flex-col justify-between transition-[border-color,translate] duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-4">
                  <span>0{idx + 1} / 05</span>
                  <span className="text-[#b4ff39] font-bold">
                    From {service.startingPrice[currency]}
                  </span>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-bold text-[#ede8dd] tracking-tight group-hover:text-[#b4ff39] transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/65 mt-3 leading-relaxed font-light">
                  {service.summary}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-6 pt-5 border-t border-white/5">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-3">
                    Deliverables:
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((deliv) => (
                      <li key={deliv} className="flex items-start gap-2 text-xs text-white/75">
                        <Check className="w-3.5 h-3.5 text-[#b4ff39] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleSelectService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#b4ff39] transition-colors focus-visible:ring-2 focus-visible:ring-[#b4ff39] rounded"
                >
                  <span>{service.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {/* Bespoke Engagements Card */}
          <div className="rounded-2xl bg-gradient-to-br from-[#121815] to-[#0f1114] border border-[#b4ff39]/20 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#b4ff39] uppercase tracking-wider">
                BESPOKE ENGAGEMENTS
              </span>
              <h3
                className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Custom Digital Architecture
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                Have a specialized web application, full brand redesign, or ongoing creative direction retainer? We build custom scoped sprints.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10">
              <button
                onClick={() => {
                  onSelectProjectType?.('Other');
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold text-black bg-[#b4ff39] hover:bg-[#c6ff4d] rounded-xl transition-all"
              >
                <span>Request Custom Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* PHASE 5: Website Packages with Currency Selector */}
        <div id="pricing" className="scroll-mt-24 mt-20 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#b4ff39] uppercase mb-2">
                <span>//</span>
                <span>TRANSPARENT REGIONAL PRICING</span>
              </div>
              <h3
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#ede8dd] tracking-tight uppercase"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                WEBSITE PACKAGES.
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl">
                Choose the right velocity for your brand. Clear tiers with dedicated scopes and zero hidden fees.
              </p>
            </div>

            {/* Currency Selector Controls */}
            <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-xs font-mono text-white/50 px-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#b4ff39]" />
                <span className="hidden sm:inline">Region:</span>
              </span>
              <button
                onClick={() => onCurrencyChange('INR')}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  currency === 'INR'
                    ? 'bg-[#b4ff39] text-black font-bold shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
                aria-pressed={currency === 'INR'}
              >
                ₹ India (INR)
              </button>
              <button
                onClick={() => onCurrencyChange('USD')}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  currency === 'USD'
                    ? 'bg-[#b4ff39] text-black font-bold shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
                aria-pressed={currency === 'USD'}
              >
                $ International (USD)
              </button>
            </div>
          </div>

          {/* 3 Website Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WEBSITE_PACKAGES.map((pkg) => {
              const currentPrice = pkg.price[currency];
              const isRecommended = pkg.recommended;

              return (
                <div
                  key={pkg.id}
                  className={`website-pkg-card relative p-7 sm:p-8 rounded-3xl border flex flex-col justify-between transition-[border-color,box-shadow] duration-300 ${
                    isRecommended
                      ? 'bg-gradient-to-b from-[#111914] to-[#0f1114] border-[#b4ff39]/50 shadow-2xl shadow-[#b4ff39]/10'
                      : 'bg-[#0f1114] border-white/10 hover:border-white/20'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#b4ff39] text-black text-[11px] font-mono font-bold tracking-wider uppercase shadow-md">
                      <Star className="w-3 h-3 fill-current" />
                      <span>RECOMMENDED</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-2">
                      <span>PACKAGE</span>
                      <span>{currency} TIER</span>
                    </div>

                    <h4
                      className="text-2xl font-bold text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {pkg.name}
                    </h4>

                    <p className="text-xs text-white/50 mt-1 font-light min-h-[32px]">
                      {pkg.tagline}
                    </p>

                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#b4ff39] mt-4 tabular-nums">
                      {currentPrice}
                    </div>

                    <div className="text-xs text-white/60 font-mono mt-1">
                      Best for: {pkg.suitableFor}
                    </div>

                    {/* Includes List */}
                    <div className="mt-6 pt-5 border-t border-white/10">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-3">
                        Included:
                      </div>
                      <ul className="space-y-2.5">
                        {pkg.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-xs text-white/80">
                            <Check className="w-3.5 h-3.5 text-[#b4ff39] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-5 border-t border-white/10">
                    <button
                      onClick={() => handleSelectPackage(pkg)}
                      className={`inline-flex items-center justify-center gap-2 w-full py-3.5 text-xs font-semibold rounded-xl transition-all ${
                        isRecommended
                          ? 'bg-[#b4ff39] text-black hover:bg-[#c6ff4d] shadow-lg shadow-[#b4ff39]/20'
                          : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
                      }`}
                    >
                      <span>Enquire for {pkg.name}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Scope Terms & Fair Play Caveat */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5 text-xs text-white/65">
            <AlertCircle className="w-4 h-4 text-[#b4ff39] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-white font-medium">Scope Transparency:</strong> Final pricing depends on project scope, asset readiness, 3rd-party integrations, and interaction complexity. Every project includes structured review sprints; we do not offer open-ended or unlimited revision loops to protect timeline integrity.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
