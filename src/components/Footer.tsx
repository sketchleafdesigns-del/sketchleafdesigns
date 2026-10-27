import React, { useState } from 'react';
import {
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Download,
  Terminal,
  X,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <footer className="bg-[#050607] border-t border-white/10 pt-16 pb-28 sm:pb-16 px-6 md:px-12 text-white/70">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Studio Statement */}
          <div className="lg:col-span-5">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:text-[#b4ff39] transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="w-2.5 h-2.5 bg-[#b4ff39] rounded-sm transform rotate-45"></span>
              <span>SKETCHLEAF DESIGN STUDIO</span>
            </a>

            <p className="text-sm text-white/60 mt-4 max-w-sm leading-relaxed">
              Premium interactive motion website and commercial advertising studio. Combining 14+ years of UI/UX craft with accelerated generative intelligence.
            </p>

            <div className="mt-6 flex flex-col gap-1 text-xs font-mono text-white/50">
              <p>Kochi, Kerala, India. Working worldwide.</p>
              <p>© 2026 Sketchleaf Design Studio. All rights reserved.</p>
            </div>
          </div>

          {/* Quick Site Directory */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#b4ff39] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Selected Work (10 Projects)
                </a>
              </li>
              <li>
                <a href="#commercial-lab" className="hover:text-white transition-colors">
                  AI Commercial Lab
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services & Capabilities
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Process: Brief to Launch
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing & Packages
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Vikas Kamath
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Questions & Answers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Start a Project
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Direct Studio Reach */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#b4ff39] mb-4">
              Direct Channels
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/919742655618"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#25D366]" />
                  <span>+91 97426 55618 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:sketchleafdesigns@gmail.com"
                  className="flex items-center gap-2 hover:text-[#b4ff39] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>sketchleafdesigns@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/sketchleaf.design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#b4ff39] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram (@sketchleaf.design)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/sketchleaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#b4ff39] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Behance (sketchleaf)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/sketch-leaf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#b4ff39] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn (Sketchleaf)</span>
                </a>
              </li>
            </ul>

            {/* Download Project & Local Testing Guide Modal Trigger */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => setDownloadModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/15 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5 text-[#b4ff39]" />
                <span>Local Testing & Deployment Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            Built with React, GSAP ScrollTrigger, and Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#b4ff39]">● PRODUCTION READY</span>
            <span>VERCEL EDGE OPTIMIZED</span>
          </div>
        </div>
      </div>

      {/* Local Testing & Deployment Modal */}
      {downloadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0f1114] border border-white/15 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setDownloadModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white bg-white/5 rounded-lg border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#b4ff39] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>ISOLATED DEVELOPMENT & DEPLOYMENT</span>
            </div>

            <h3
              className="text-2xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Testing & Safe Deployment Instructions
            </h3>

            <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
              This application has been crafted to redesign Sketchleaf without touching or overwriting the existing production website (<code className="text-[#b4ff39]">sketchleafdesigns.vercel.app</code>).
            </p>

            <div className="mt-6 space-y-4">
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                <div className="text-xs font-mono text-white/40 mb-1">1. Run Locally</div>
                <div className="flex items-center justify-between text-xs font-mono text-[#b4ff39]">
                  <code>npm install && npm run dev</code>
                  <button
                    onClick={() => copyToClipboard('npm install && npm run dev')}
                    className="p-1 text-white/50 hover:text-white"
                  >
                    {copiedCmd === 'npm install && npm run dev' ? (
                      <Check className="w-3.5 h-3.5 text-[#b4ff39]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                <div className="text-xs font-mono text-white/40 mb-1">2. Run Deterministic Logic Tests</div>
                <div className="flex items-center justify-between text-xs font-mono text-[#b4ff39]">
                  <code>npx --yes tsx --test src/utils/projectData.test.ts</code>
                  <button
                    onClick={() =>
                      copyToClipboard('npx --yes tsx --test src/utils/projectData.test.ts')
                    }
                    className="p-1 text-white/50 hover:text-white"
                  >
                    {copiedCmd === 'npx --yes tsx --test src/utils/projectData.test.ts' ? (
                      <Check className="w-3.5 h-3.5 text-[#b4ff39]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                <div className="text-xs font-mono text-white/40 mb-1">3. Production Build & Deployment</div>
                <div className="flex items-center justify-between text-xs font-mono text-[#b4ff39]">
                  <code>npm run build</code>
                  <button
                    onClick={() => copyToClipboard('npm run build')}
                    className="p-1 text-white/50 hover:text-white"
                  >
                    {copiedCmd === 'npm run build' ? (
                      <Check className="w-3.5 h-3.5 text-[#b4ff39]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-white/50 mt-2">
                  Deploy to a staging domain on Vercel or Netlify (e.g. <code>sketchleaf-v2.vercel.app</code>) to preserve the original live site intact.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setDownloadModalOpen(false)}
                className="px-5 py-2.5 text-xs font-semibold text-black bg-[#b4ff39] hover:bg-[#c6ff4d] rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
