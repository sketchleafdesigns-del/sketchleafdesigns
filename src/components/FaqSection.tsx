import React, { useState } from 'react';
import { FAQ_LIST } from '../utils/projectData';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-24 py-24 px-4 sm:px-6 md:px-12 bg-[#0a0c0e] border-b border-white/10">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center pb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#b4ff39] uppercase mb-3">
            <span>//</span>
            <span>CLARITY & ENGAGEMENT</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#ede8dd] uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            FREQUENTLY ASKED QUESTIONS.
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto mt-3 font-normal">
            Everything you need to know about turnaround times, deliverables, international collaboration, and project workflows.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3 mt-4">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-[#0f1114] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b4ff39]"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base sm:text-lg font-bold text-[#ede8dd] tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/50 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#b4ff39]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-white/70 leading-relaxed border-t border-white/5 animate-in fade-in duration-200 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
