import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, MessageCircle, ArrowUpRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroMotionProps {
  onOpenProject?: (id: string) => void;
}

export const HeroMotion: React.FC<HeroMotionProps> = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardGroupRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial quick fluid entrance with subtle transform (elements stay fully visible)
      gsap.fromTo(
        '.hero-line',
        { y: 18, opacity: 0.7 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out'
        }
      );

      // 2. Scroll-controlled transformation with unified scrub smoothing
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          fastScrollEnd: true,
          invalidateOnRefresh: true
        },
        y: -75,
        scale: 0.95,
        opacity: 0.45,
        ease: 'none'
      });

      // Smooth background parallax
      gsap.to(backdropRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          fastScrollEnd: true,
          invalidateOnRefresh: true
        },
        scale: 1.08,
        yPercent: 12,
        opacity: 0.35,
        ease: 'none'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden bg-[#070809]"
    >
      {/* Background Cinematic Visual with 3D Depth & Vignette */}
      <div
        ref={backdropRef}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
      >
        <img
          fetchPriority="high"
          decoding="async"
          src="/images/hero_cinematic_motion_1792955282104.webp"
          alt="Sketchleaf Creative Motion Production Studio"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.15] saturate-[0.85]"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070809]/90 via-transparent to-[#070809]/90" />
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-40" />
      </div>

      {/* Top Studio Metadata Indicator */}
      <div ref={badgeRef} className="relative z-10 max-w-7xl mx-auto w-full pt-3 sm:pt-4 md:pt-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-[10px] sm:text-xs font-mono tracking-wider text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#b4ff39]"></span>
          <span className="text-[#ede8dd] font-medium">SKETCHLEAF DESIGN STUDIO</span>
          <span className="text-white/30">/</span>
          <span>KOCHI, KERALA</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span>WORKING WORLDWIDE</span>
          <span className="text-white/30">·</span>
          <span className="text-[#d4af37]">14+ YRS EXPERIENCE</span>
        </div>
      </div>

      {/* Signature Headline 1 & 2: WE MAKE BRANDS MOVE */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 md:py-8">
        <div className="max-w-5xl">
          <p className="hero-line text-xs font-mono tracking-widest text-[#b4ff39] uppercase mb-3 flex items-center gap-2">
            <span>//</span>
            <span>NEXT-GEN KINETIC WEB & COMMERCIAL PRODUCTION</span>
          </p>

          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-extrabold tracking-tight leading-[0.94] text-[#ede8dd] uppercase select-none preserve-3d"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="block text-[#ede8dd]">
              WE MAKE
            </span>
            <span className="block text-[#b4ff39] drop-shadow-[0_4px_32px_rgba(180,255,57,0.25)]">
              BRANDS MOVE.
            </span>
          </h1>

          <p className="hero-line text-sm sm:text-base md:text-lg text-white/75 max-w-2xl mt-5 leading-relaxed font-normal">
            AI-assisted websites, digital products, UI/UX and cinematic commercial content — built with senior design direction to help ambitious businesses move 10x faster.
          </p>

          {/* Action Row */}
          <div className="hero-line flex flex-wrap items-center gap-3.5 mt-7">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-black bg-[#b4ff39] hover:bg-[#c6ff4d] rounded-lg transition-all shadow-lg shadow-[#b4ff39]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#ede8dd] bg-white/10 hover:bg-white/15 rounded-lg border border-white/15 transition-all hover:border-white/30"
            >
              <span>Explore Selected Work</span>
            </a>

            <a
              href="#commercial-lab"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-medium text-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37]/20 rounded-lg border border-[#d4af37]/30 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>AI Commercial Lab</span>
            </a>

            <a
              href="https://wa.me/919742655618?text=Hi%20Sketchleaf%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Bottom Strip: Live Projects Mini Index & Scroll Cue */}
      <div ref={cardGroupRef} className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-xs text-white/60">
          <ArrowDown className="w-4 h-4 text-[#b4ff39] animate-bounce" />
          <span className="tracking-wider uppercase font-mono">SCROLL TO EXPERIENCE MOTION</span>
        </div>

        {/* Rapid Capability Highlights (Unboxed clean metadata) */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-white/50 font-mono">
          <span>Landing Pages</span>
          <span aria-hidden="true" className="text-white/20">/</span>
          <span>Business Websites</span>
          <span aria-hidden="true" className="text-white/20">/</span>
          <span>AI Commercial Ads</span>
          <span aria-hidden="true" className="text-white/20">/</span>
          <span>UI/UX & Product Design</span>
          <span aria-hidden="true" className="text-white/20">/</span>
          <span>AI-Assisted Web Apps</span>
        </div>
      </div>
    </section>
  );
};
