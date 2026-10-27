import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_TIMELINE } from '../utils/projectData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-step-btn',
        { y: 20, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.process-step-btn',
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true
          }
        }
      );

      gsap.fromTo(
        '.process-spotlight-deck',
        { y: 24, opacity: 0.4 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.process-spotlight-deck',
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="scroll-mt-24 py-24 px-4 sm:px-6 md:px-12 bg-[#070809] border-b border-white/10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#b4ff39] uppercase mb-3">
              <span>//</span>
              <span>METHODOLOGY & EXECUTION</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#ede8dd] uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              FROM BRIEF TO LAUNCH.
            </h2>
            <p className="text-white/60 text-base max-w-xl mt-3 font-normal">
              A streamlined 6-stage engineering sprint designed to compress months of conventional agency bureaucracy into fast, precise execution.
            </p>
          </div>

          <div className="text-xs font-mono text-white/40">
            PHASE {PROCESS_TIMELINE[activeStep].step} OF 06 SELECTED
          </div>
        </div>

        {/* Interactive Progress Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-12">
          {PROCESS_TIMELINE.map((item, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`process-step-btn p-4 rounded-xl border text-left transition-[background-color,border-color,opacity,color] relative overflow-hidden group ${
                  isSelected
                    ? 'bg-white/10 border-[#b4ff39] shadow-lg shadow-[#b4ff39]/10'
                    : 'bg-[#0f1114] border-white/10 hover:border-white/20'
                }`}
                aria-label={`Select process step ${item.step}: ${item.phase}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isSelected ? 'text-[#b4ff39]' : 'text-white/40'
                    }`}
                  >
                    {item.step}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b4ff39]" />
                  )}
                </div>

                <div
                  className="text-base font-bold text-[#ede8dd] tracking-tight group-hover:text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.phase}
                </div>
                <div className="text-xs text-white/50 mt-1 line-clamp-1">{item.tagline}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Spotlight Deck */}
        <div className="process-spotlight-deck mt-8 rounded-3xl bg-[#0e1013] border border-white/15 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 text-xs font-mono text-[#b4ff39] mb-3">
                <span>STAGE {PROCESS_TIMELINE[activeStep].step}</span>
                <span>/</span>
                <span>{PROCESS_TIMELINE[activeStep].tagline}</span>
              </div>

              <h3
                className="text-3xl sm:text-4xl font-extrabold text-[#ede8dd] uppercase tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {PROCESS_TIMELINE[activeStep].phase}
              </h3>

              <p className="text-base sm:text-lg text-white/80 mt-4 leading-relaxed max-w-2xl font-light">
                {PROCESS_TIMELINE[activeStep].description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-[#b4ff39]" />
                  <span>No bureaucratic committees</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-[#b4ff39]" />
                  <span>Senior designer-led execution</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-black bg-[#b4ff39] hover:bg-[#c6ff4d] rounded-xl transition-transform hover:scale-[1.02] shadow-lg shadow-[#b4ff39]/20"
              >
                <span>Initiate Sprint With Us</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
