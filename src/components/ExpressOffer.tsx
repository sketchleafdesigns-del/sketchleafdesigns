import React from 'react';
import { ArrowRight, Check, Zap } from 'lucide-react';
import { Currency } from '../utils/projectData';

interface ExpressOfferProps {
  currency: Currency;
  onSelectProjectType?: (type: string, pkgName?: string) => void;
}

export const ExpressOffer: React.FC<ExpressOfferProps> = ({
  currency,
  onSelectProjectType
}) => {
  const deliverables = [
    'Responsive design (Mobile + desktop)',
    'Business content structure',
    'Services / products showcase',
    'High-conversion clear CTAs',
    'WhatsApp integration & triage',
    'Location / Google Maps embed',
    'Basic search engine optimization (SEO)',
    'Fast global Vercel deployment',
    'One dedicated revision round',
    'Zero monthly platform lock-in'
  ];

  const priceLabel = currency === 'INR' ? 'From ₹15,000' : 'From $400';

  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#070809] via-[#0d1f14]/40 to-[#070809] border-b border-white/10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl bg-[#0e1711] border border-[#b4ff39]/20 p-6 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(180,255,57,0.14),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Offer Headline & Value */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b4ff39]/15 border border-[#b4ff39]/30 text-xs font-mono text-[#b4ff39] mb-5">
                <Zap className="w-3.5 h-3.5" />
                <span>EXPRESS LAUNCH SPRINT</span>
              </div>

              <h2
                className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#ede8dd] tracking-tight uppercase leading-[1.05]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Your business website can be live tomorrow.
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-white/70 mt-4 max-w-xl leading-relaxed">
                Professional one-page websites designed and deployed within 24 hours for qualifying projects. No endless waiting, no bloated agency bureaucracy.
              </p>

              {/* Price & Action */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-baseline gap-3 sm:gap-4">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#b4ff39] tabular-nums">
                  {priceLabel}
                </span>
                <span className="text-xs text-white/50 font-mono">
                  {currency} LAUNCH TIER · ALL-INCLUSIVE
                </span>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    onSelectProjectType?.('Website', 'LAUNCH (24-Hour Express)');
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-black bg-[#b4ff39] hover:bg-[#c6ff4d] rounded-xl transition-all shadow-lg shadow-[#b4ff39]/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Get My Website Live</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/919742655618?text=Hi%20Sketchleaf%2C%20I%20need%20a%20website%20live%20in%2024%20hours."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                >
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>

              <p className="text-xs text-white/40 mt-6 leading-relaxed max-w-lg font-mono">
                *24-hour delivery applies to qualifying one-page websites when required content, branding guidelines, and essential assets are provided on time.
              </p>
            </div>

            {/* Right Column: 10 Preserved Deliverables Checklist */}
            <div className="lg:col-span-5 bg-black/40 rounded-2xl p-6 sm:p-8 border border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#b4ff39] mb-4">
                10 Included Deliverables:
              </h3>

              <ul className="space-y-2.5 sm:space-y-3">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                    <span className="p-0.5 rounded bg-[#b4ff39]/20 text-[#b4ff39] shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
