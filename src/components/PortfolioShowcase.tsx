import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ALL_PROJECTS,
  PROJECT_FILTER_TAGS,
  filterProjects,
  ProjectItem
} from '../utils/projectData';
import { ArrowUpRight, ExternalLink, X, Globe, Sparkles, Layout } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioShowcaseProps {
  onSelectProjectType?: (type: string) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onSelectProjectType }) => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProjects = filterProjects(ALL_PROJECTS, selectedTag);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewProject(null);
      }
    };
    if (previewProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewProject]);

  // Smooth scroll reveals for portfolio cards
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 28, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
              invalidateOnRefresh: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedTag]);

  return (
    <section ref={sectionRef} id="work" className="scroll-mt-24 py-24 px-4 sm:px-6 md:px-12 bg-[#070809] relative">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header with Editorial Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#b4ff39] uppercase mb-3">
              <span>//</span>
              <span>CURATED ARCHIVE</span>
              <span>·</span>
              <span>10 PROJECTS &amp; CONCEPTS</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#ede8dd] uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              SELECTED WORK.
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl mt-3 font-normal">
              Real projects, deployed web applications, and digital concepts created through Sketchleaf. Click any project card to open the live site.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl" role="group" aria-label="Project filter">
            {PROJECT_FILTER_TAGS.map((tag) => {
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#b4ff39] ${
                    isActive
                      ? 'bg-[#b4ff39] text-black font-semibold shadow-md shadow-[#b4ff39]/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  aria-pressed={isActive}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Bento Box Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-12">
          {filteredProjects.map((project, idx) => {
            const colSpan =
              project.layoutSize === 'large'
                ? 'lg:col-span-8'
                : project.layoutSize === 'wide'
                ? 'lg:col-span-7'
                : 'lg:col-span-5';

            const hasError = imageErrors[project.id];

            return (
              <div
                key={project.id}
                className={`${colSpan} portfolio-card group relative rounded-2xl bg-[#0f1114] border border-white/10 hover:border-white/25 overflow-hidden transition-[border-color] duration-300 flex flex-col justify-between`}
              >
                {/* Visual Media Container with Image Mask Reveal & Hover Depth */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  {!hasError ? (
                    <img loading="lazy" decoding="async"
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      onError={() => setImageErrors((prev) => ({ ...prev, [project.id]: true }))}
                      className="w-full h-full object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#121815] to-[#0a0c0e] text-center">
                      <Layout className="w-10 h-10 text-[#b4ff39] mb-2 opacity-80" />
                      <span className="text-sm font-semibold text-white">{project.title}</span>
                      <span className="text-xs text-white/50 mt-1">{project.subtitle}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1114] via-[#0f1114]/30 to-transparent pointer-events-none" />

                  {/* Top Floating Badge & Action */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-black/80 text-white/90 border border-white/15">
                      {project.badge}
                    </span>

                    <button
                      onClick={() => setPreviewProject(project)}
                      className="p-2 rounded-lg bg-black/80 text-white/70 hover:text-[#b4ff39] border border-white/15 transition-colors focus-visible:ring-2 focus-visible:ring-[#b4ff39]"
                      title="Quick details"
                      aria-label={`View details for ${project.title}`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Unboxed Metadata with Typographic Separator */}
                    <div className="flex items-center gap-2 text-xs font-mono text-[#b4ff39] mb-2">
                      <span>{project.tags.join(' · ')}</span>
                    </div>

                    <h3
                      className="text-xl sm:text-2xl font-bold text-[#ede8dd] tracking-tight group-hover:text-[#b4ff39] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-white/50 mt-1">{project.subtitle}</p>
                    <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 group-hover:text-[#b4ff39] transition-colors focus-visible:ring-2 focus-visible:ring-[#b4ff39] rounded"
                    >
                      <span>Open Live Project</span>
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <span className="text-xs font-mono text-white/30">
                      {String(idx + 1).padStart(2, '0')} / {filteredProjects.length}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick View Modal */}
        {previewProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <div className="relative w-full max-w-2xl rounded-2xl bg-[#0f1114] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden">
              <button
                onClick={() => setPreviewProject(null)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white bg-white/5 rounded-lg border border-white/10 focus-visible:ring-2 focus-visible:ring-[#b4ff39]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 border border-white/10 bg-black">
                <img loading="lazy" decoding="async"
                  src={previewProject.image}
                  alt={previewProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#b4ff39] mb-2">
                <span>{previewProject.badge}</span>
                <span>·</span>
                <span>{previewProject.tags.join(' / ')}</span>
              </div>

              <h3
                id="modal-project-title"
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {previewProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/50 font-medium mt-1">{previewProject.subtitle}</p>

              <p className="text-white/80 text-xs sm:text-sm mt-4 leading-relaxed">
                {previewProject.description}
              </p>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={previewProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-[#b4ff39] hover:bg-[#c6ff4d] rounded-lg transition-transform hover:scale-[1.02]"
                >
                  <Globe className="w-4 h-4" />
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    const tag = previewProject.tags[0] || 'Website';
                    setPreviewProject(null);
                    onSelectProjectType?.(tag);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs text-white/70 hover:text-[#b4ff39] underline underline-offset-4"
                >
                  Commission a similar build →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
