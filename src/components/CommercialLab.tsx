import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  COMMERCIAL_LAB_ASSETS,
  AI_COMMERCIAL_PACKAGES,
  CommercialAsset,
  AICommercialPackage,
  Currency
} from '../utils/projectData';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Clock,
  ArrowRight,
  Check,
  Film,
  AlertCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CommercialLabProps {
  currency: Currency;
  onSelectProjectType?: (type: string, pkgName?: string) => void;
}

export const CommercialLab: React.FC<CommercialLabProps> = ({
  currency,
  onSelectProjectType
}) => {
  const [selectedAsset, setSelectedAsset] = useState<CommercialAsset>(COMMERCIAL_LAB_ASSETS[0]);
  const [isAudioSimulated, setIsAudioSimulated] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const labRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !labRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.commercial-pkg-card',
        { y: 24, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.commercial-pkg-card',
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true
          }
        }
      );
    }, labRef);

    return () => ctx.revert();
  }, [currency]);

  const handleSelectPackage = (pkg: AICommercialPackage) => {
    onSelectProjectType?.('AI Commercial', pkg.name);
    const contactElem = document.getElementById('contact');
    contactElem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={labRef} id="commercial-lab" className="scroll-mt-24 py-24 px-4 sm:px-6 md:px-12 bg-[#0a0c0e] border-t border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SKETCHLEAF MOTION LAB // SIGNATURE AI PRODUCTION</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#ede8dd] uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AI COMMERCIAL LAB.
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-3 font-normal leading-relaxed">
              Replace static product photos with cinematic 4K advertising stills, atmospheric motion grading, and multi-format commercial assets for luxury perfumes, cafés, beauty, real estate, and automotive brands.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
            <span className="text-xs font-mono text-white/50">ENTRY PRODUCTION</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-[#d4af37]">
              {currency === 'INR' ? '₹5,000–₹10,000' : '$150–$300'}
            </span>
          </div>
        </div>

        {/* Studio Interactive Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          {/* Left Column: Curated Production Presets */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="rounded-2xl bg-[#0f1114] border border-white/10 p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">
                    Curated Productions
                  </h3>
                  <span className="text-xs text-white/40 mt-0.5 block">Select a commercial case study</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#b4ff39]/10 text-[#b4ff39] border border-[#b4ff39]/20 font-semibold">
                  {COMMERCIAL_LAB_ASSETS.length} PRESETS
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {COMMERCIAL_LAB_ASSETS.map((asset) => {
                  const isSelected = selectedAsset.id === asset.id;
                  return (
                    <button
                      key={asset.id}
                      onClick={() => {
                        setSelectedAsset(asset);
                        setImageLoadError(false);
                      }}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 relative group overflow-hidden ${
                        isSelected
                          ? 'bg-gradient-to-r from-white/10 to-white/5 border-[#d4af37]/70 text-white shadow-lg shadow-black/40 ring-1 ring-[#d4af37]/30'
                          : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/15'
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37]" />
                      )}

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-semibold text-[#ede8dd] group-hover:text-white transition-colors">
                            {asset.title}
                          </div>
                          <div className="text-xs text-white/50 font-mono mt-1">
                            Concept for: {asset.client}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#d4af37] border border-[#d4af37]/30 whitespace-nowrap">
                          {asset.category}
                        </span>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#b4ff39]" />
                          <span>Sample concept visual</span>
                        </span>
                        <span className="text-[#b4ff39] opacity-0 group-hover:opacity-100 transition-opacity">
                          View Asset →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Studio Cinematic Viewport & Production Specs */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Viewport Frame (Cinema Master Display) */}
            <div className="rounded-2xl bg-black border border-white/15 p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
              {/* Aspect Ratio Sizing Wrapper - Clean 16:9 Cinema Master */}
              <div className="w-full relative rounded-xl overflow-hidden bg-black flex items-center justify-center aspect-video max-w-full">
                {!imageLoadError ? (
                  <img loading="lazy" decoding="async"
                    key={selectedAsset.id}
                    src={selectedAsset.image}
                    alt={selectedAsset.title}
                    referrerPolicy="no-referrer"
                    onError={() => setImageLoadError(true)}
                    className="w-full h-full object-cover transition-opacity duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#14181c] text-center">
                    <Film className="w-12 h-12 text-[#d4af37] mb-2 opacity-80" />
                    <span className="text-sm font-semibold text-white">Visual Stream Standby</span>
                    <span className="text-xs text-white/50 mt-1">Select a production preset above</span>
                  </div>
                )}

                {/* Simulated Anamorphic Letterbox Bars */}
                <div className="absolute top-0 left-0 right-0 h-4 sm:h-6 bg-black z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 bg-black z-20 pointer-events-none" />

                {/* Viewport HUD Overlays */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-30 pointer-events-none text-[10px] sm:text-[11px] font-mono text-white/80">
                  <div className="px-2.5 py-1 rounded bg-black/75 border border-white/15 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span>AI REC 4K</span>
                    <span>·</span>
                    <span>24.000 FPS</span>
                  </div>

                  <div className="px-2.5 py-1 rounded bg-black/75 border border-white/15 font-semibold text-[#d4af37]">
                    16:9 CINEMA MASTER
                  </div>
                </div>

                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-30 pointer-events-none text-[10px] sm:text-[11px] font-mono text-white/80">
                  <div className="px-2.5 py-1 rounded bg-black/75 border border-white/15">
                    {selectedAsset.title}
                  </div>

                  <button
                    onClick={() => setIsAudioSimulated(!isAudioSimulated)}
                    className="pointer-events-auto px-2.5 py-1 rounded bg-black/75 border border-white/15 hover:border-white/40 flex items-center gap-1.5 transition-colors"
                  >
                    {isAudioSimulated ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#b4ff39]" />
                        <span>AUDIO SYNTH ACTIVE</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-white/50" />
                        <span>SOUND CUE OFF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Production Breakdown Deck */}
            <div className="rounded-2xl bg-[#0f1114] border border-white/10 p-6 flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="flex-grow">
                <div className="flex items-center gap-3 text-xs font-mono text-[#d4af37] mb-2">
                  <span>DIRECTOR NOTES</span>
                  <span>·</span>
                  <span className="text-white/40">{selectedAsset.category}</span>
                </div>
                <h4
                  className="text-xl font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {selectedAsset.title}
                </h4>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">
                  {selectedAsset.directorNotes}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/50 mt-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#b4ff39]" />
                    <span>Sample concept visual</span>
                  </div>
                  <span>·</span>
                  <div>Audio Style: {selectedAsset.soundTrack}</div>
                </div>
              </div>

              {/* Commission CTA button */}
              <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
                <button
                  onClick={() => handleSelectPackage(AI_COMMERCIAL_PACKAGES[0])}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e5c365] rounded-xl transition-all shadow-lg shadow-[#d4af37]/20 whitespace-nowrap"
                >
                  <span>Order Commercial ({currency === 'INR' ? 'From ₹5,000' : 'From $150'})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href="https://sketchleafdesignstudio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-xs text-white/60 hover:text-white underline underline-offset-4"
                >
                  Watch Commercial Showreel ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 6: AI Commercial Production Packages Grid */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-wider">
                COMMERCIAL PRODUCTION PACKAGES
              </span>
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#ede8dd] tracking-tight uppercase mt-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Commercial Video Production Packages
              </h3>
              <p className="text-sm text-white/60 mt-1 max-w-xl">
                Clear deliverables for short-form commercials, multi-video campaigns, and high-fashion brand advertising.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AI_COMMERCIAL_PACKAGES.map((pkg, idx) => {
              const currentPrice = pkg.price[currency];
              return (
                <div
                  key={pkg.id}
                  className="commercial-pkg-card p-7 rounded-2xl bg-[#0f1114] border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-3">
                      <span>PACKAGE 0{idx + 1}</span>
                      <span className="text-[#d4af37] font-bold">{pkg.durationOrVolume}</span>
                    </div>

                    <h4
                      className="text-2xl font-bold text-[#ede8dd] tracking-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {pkg.name}
                    </h4>

                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#d4af37] mt-3">
                      {currentPrice}
                    </div>

                    <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                      {pkg.summary}
                    </p>

                    <div className="mt-6 pt-5 border-t border-white/5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-3">
                        Included:
                      </div>
                      <ul className="space-y-2">
                        {pkg.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-white/75">
                            <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10">
                    <button
                      onClick={() => handleSelectPackage(pkg)}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e5c365] rounded-xl transition-all"
                    >
                      <span>Enquire for {pkg.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mandatory Proposal Terms Caveat */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-white/60">
            <AlertCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              *Note: Final deliverables, video duration, specific aspect ratios, revision rounds, voiceover talent, bespoke sound cues, and commercial usage rights are individually agreed and confirmed in your formal proposal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
