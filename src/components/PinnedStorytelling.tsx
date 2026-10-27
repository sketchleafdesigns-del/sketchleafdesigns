import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Film, Target, ArrowRight } from 'lucide-react';
import { Currency } from '../utils/projectData';

gsap.registerPlugin(ScrollTrigger);

interface PinnedStorytellingProps {
  currency: Currency;
  onSelectProjectType?: (type: string) => void;
}

export const PinnedStorytelling: React.FC<PinnedStorytellingProps> = ({
  currency,
  onSelectProjectType
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const stories = [
    {
      step: '01',
      title: 'SPEED WITHOUT SACRIFICE',
      subtitle: 'The 24-Hour Velocity Paradox',
      body: 'Traditional agencies take months of endless billable hours. We harness AI-assisted workflows guided by 14+ years of senior design expertise to deliver premium digital flagships in 24 to 48 hours.',
      metric: '24-HOUR LAUNCH',
      metricSub: 'For qualifying one-page sites',
      accent: '#b4ff39',
      icon: Zap,
      image: '/images/hero_cinematic_motion_1792955282104.webp',
      category: 'Website'
    },
    {
      step: '02',
      title: 'CINEMATIC COMMERCIAL LAB',
      subtitle: 'From Product Still to Broadcast Film',
      body: 'Transform static perfumes, beverages, fashion items, and tech products into breathtaking commercials with volumetric lighting, liquid physics, and bespoke audio styling. AI accelerates. Human design directs.',
      metric: currency === 'INR' ? 'FROM ₹5,000' : 'FROM $150',
      metricSub: '16:9 Cinema & 9:16 Vertical Reels',
      accent: '#d4af37',
      icon: Film,
      image: '/images/commercial_lab_perfume_1792955282370.webp',
      category: 'AI Commercial'
    },
    {
      step: '03',
      title: 'CONVERSION BY ARCHITECTURE',
      subtitle: 'Zero-Friction Conversion Funnels',
      body: 'Every visual decision serves commercial conversion. From automated WhatsApp consultation triggers to edge-deployed sub-second response times, we build experiences that generate real qualified leads.',
      metric: 'INSTANT TRIAGE',
      metricSub: 'WhatsApp conversion architecture',
      accent: '#10b981',
      icon: Target,
      image: '/images/project_techavlon_1792955284658.webp',
      category: 'Website'
    }
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current || !pinTargetRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop: Smooth pinning & scroll scrubbing with zero hitch
    mm.add('(min-width: 768px)', () => {
      // 1. Scrubbed visual progress bar
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=160%',
              scrub: 0.5,
              invalidateOnRefresh: true
            }
          }
        );
      }

      // 2. Pinning ScrollTrigger with anticipatePin to prevent jump
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=160%',
        pin: pinTargetRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.33) {
            setActiveStage(0);
          } else if (progress < 0.66) {
            setActiveStage(1);
          } else {
            setActiveStage(2);
          }
        }
      });
    });

    // Mobile: Unpinned, responsive scroll without pin traps
    mm.add('(max-width: 767px)', () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 70%',
        invalidateOnRefresh: true,
        onEnter: () => setActiveStage(0)
      });
    });

    return () => mm.revert();
  }, []);

  const current = stories[activeStage];

  const handleCommissionClick = (category: string) => {
    onSelectProjectType?.(category);
    const contactElem = document.getElementById('contact');
    contactElem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative bg-[#0a0c0e] border-t border-b border-white/10">
      {/* Continuous Scrubbed Progress Line on Desktop */}
      <div className="hidden md:block absolute top-0 left-0 right-0 h-[2px] bg-white/10 z-30 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-gradient-to-r from-[#b4ff39] via-[#d4af37] to-[#10b981] origin-left transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Pinned Screen Container on Desktop, Fluid on Mobile */}
      <div
        ref={pinTargetRef}
        className="min-h-[100svh] w-full flex flex-col justify-center px-4 sm:px-6 md:px-12 py-16 md:py-20 overflow-hidden relative"
      >
        {/* Subtle Ambient Backdrop Layer */}
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out opacity-15">
          {!imageError[current.image] && (
            <img loading="lazy" decoding="async"
              src={current.image}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setImageError((prev) => ({ ...prev, [current.image]: true }))}
              className="w-full h-full object-cover scale-105"
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Section Kicker */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 md:pb-8 border-b border-white/10 mb-8 md:mb-12">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full transition-colors duration-500" style={{ backgroundColor: current.accent }}></span>
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                CINEMATIC STORYTELLING / THE SKETCHLEAF ADVANTAGE
              </span>
            </div>

            {/* Stepper indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Story stages">
              {stories.map((s, idx) => (
                <button
                  key={s.step}
                  role="tab"
                  aria-selected={activeStage === idx}
                  onClick={() => setActiveStage(idx)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-[#b4ff39] ${
                    activeStage === idx
                      ? 'bg-white/15 text-white font-bold border border-white/20 shadow-sm'
                      : 'text-white/40 hover:text-white/70 bg-white/5'
                  }`}
                  aria-label={`Jump to stage ${s.step}: ${s.title}`}
                >
                  <span>{s.step}</span>
                  <span className="hidden sm:inline ml-1.5 text-[10px] text-white/40">
                    {s.title.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main 2-Column Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center transition-all duration-500 ease-out">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-[#b4ff39] px-2.5 py-0.5 bg-[#b4ff39]/10 rounded border border-[#b4ff39]/20">
                  PHASE {current.step}
                </span>
                <span className="text-xs sm:text-sm font-medium text-white/60">{current.subtitle}</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#ede8dd] uppercase leading-[1.05] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {current.title}
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-white/75 mt-4 sm:mt-6 leading-relaxed max-w-2xl font-light">
                {current.body}
              </p>

              {/* Key Proof Strip */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8">
                <div>
                  <div
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono tabular-nums transition-colors duration-500"
                    style={{ color: current.accent }}
                  >
                    {current.metric}
                  </div>
                  <div className="text-xs text-white/50 font-mono mt-0.5">{current.metricSub}</div>
                </div>

                <div className="hidden sm:block w-[1px] h-10 bg-white/10"></div>

                <button
                  onClick={() => handleCommissionClick(current.category)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-[#b4ff39] transition-colors group focus-visible:ring-2 focus-visible:ring-[#b4ff39] rounded py-1"
                >
                  <span>Commission This Phase</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Media Portal Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#111316] shadow-2xl shadow-black/80 aspect-[4/3] group">
                {!imageError[current.image] ? (
                  <img loading="lazy" decoding="async"
                    key={current.step}
                    src={current.image}
                    alt={current.title}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError((prev) => ({ ...prev, [current.image]: true }))}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#121815] to-[#0a0c0e] text-center">
                    <current.icon className="w-12 h-12 text-[#b4ff39] mb-3 opacity-80" />
                    <span className="text-sm font-semibold text-white">{current.title}</span>
                    <span className="text-xs text-white/50 mt-1">{current.subtitle}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80 backdrop-blur-md bg-black/50 p-3 rounded-xl border border-white/10">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: current.accent }}></span>
                    <span>ACTIVE SEQUENCE {current.step}/03</span>
                  </span>
                  <span className="text-white/60">SKETCHLEAF MOTION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
