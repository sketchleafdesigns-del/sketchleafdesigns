import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Compass, Clock, UserCheck, MessageSquare, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutStudio: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Studio pillars stagger
      gsap.fromTo(
        '.about-pillar-card',
        { y: 24, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-pillar-card',
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true
          }
        }
      );

      // 2. Founder card reveal
      gsap.fromTo(
        '.founder-card',
        { y: 24, opacity: 0.4 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.founder-card',
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Award,
      title: '14+ Years of Design Experience',
      desc: 'Proven depth across UI/UX, product design, visual systems, and commercial art direction.'
    },
    {
      icon: Compass,
      title: 'Design + AI-Assisted Build',
      desc: 'Advanced generative workflows guided and refined with senior human design taste.'
    },
    {
      icon: Clock,
      title: '24-Hour Express Turnaround',
      desc: 'Qualifying one-page business websites live and taking orders within 24 hours.'
    },
    {
      icon: UserCheck,
      title: 'Direct Senior Collaboration',
      desc: 'You work directly with the lead designer and creator — no junior handoffs or account managers.'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="scroll-mt-24 py-24 px-4 sm:px-6 md:px-12 bg-[#070809] border-b border-white/10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#b4ff39] uppercase mb-3">
              <span>//</span>
              <span>STUDIO IDENTITY & PHILOSOPHY</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#ede8dd] uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              WHY SKETCHLEAF?
            </h2>
            <p className="text-white/60 text-base max-w-xl mt-3 font-normal">
              Based in Kochi, Kerala. Crafting high-converting digital flagships and motion content for ambitious clients worldwide.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <MapPin className="w-3.5 h-3.5 text-[#b4ff39]" />
            <span>Kochi, Kerala, India · Worldwide Delivery</span>
          </div>
        </div>

        {/* 4 Studio Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="about-pillar-card p-7 rounded-2xl bg-[#0f1114] border border-white/10 hover:border-white/20 transition-[border-color] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b4ff39] mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-xl font-bold text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Founder Spotlight Card */}
        <div className="founder-card mt-8 rounded-3xl bg-gradient-to-r from-[#0f1311] via-[#0f1114] to-[#0f1114] border border-[#b4ff39]/20 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 text-xs font-mono text-[#b4ff39] mb-2">
                <span>LEAD DESIGNER & FOUNDER</span>
                <span>·</span>
                <span className="text-white/40">14+ YEARS INDUSTRY LEADERSHIP</span>
              </div>

              <h3
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Vikas Kamath
              </h3>

              <p className="text-sm font-mono text-white/50 mt-1">
                Founder / UI/UX & Digital Designer
              </p>

              <p className="text-sm sm:text-base text-white/80 mt-4 leading-relaxed font-light max-w-3xl">
                14+ years across UI/UX, product design, visual communication and digital experiences, combining user-centred thinking with practical visual design and AI-assisted workflows. Core toolkit includes Adobe XD, Photoshop, Illustrator, modern responsive web design, AI-assisted development and creative advertising.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-white/50">
                <span>UI/UX Architecture</span>
                <span className="text-white/20">·</span>
                <span>Figma / Adobe XD</span>
                <span className="text-white/20">·</span>
                <span>AI Commercial Art Direction</span>
                <span className="text-white/20">·</span>
                <span>Kochi, Kerala</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
              <a
                href="https://wa.me/919742655618?text=Hi%20Vikas%2C%20I%27d%20like%20to%20discuss%20a%20project%20directly."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-black bg-[#b4ff39] hover:bg-[#c6ff4d] rounded-xl transition-all shadow-lg shadow-[#b4ff39]/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directly with Vikas</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
