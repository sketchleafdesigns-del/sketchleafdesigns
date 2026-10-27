import React, { useState, useEffect } from 'react';
import {
  buildWhatsAppEnquiryUrl,
  WhatsAppEnquiryData,
  Currency,
  WEBSITE_PACKAGES,
  AI_COMMERCIAL_PACKAGES
} from '../utils/projectData';
import {
  Send,
  MessageCircle,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  CheckCircle,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  currency: Currency;
  selectedProjectType?: string;
  selectedPackageName?: string;
  onClearProjectType?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currency,
  selectedProjectType,
  selectedPackageName
}) => {
  const [formData, setFormData] = useState<WhatsAppEnquiryData>({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    website: '',
    type: 'Website',
    packageSelected: '',
    currency: currency,
    budget: '',
    timeline: '',
    description: ''
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      currency: currency
    }));
  }, [currency]);

  useEffect(() => {
    if (selectedProjectType) {
      setFormData((prev) => ({ ...prev, type: selectedProjectType }));
    }
    if (selectedPackageName) {
      setFormData((prev) => ({ ...prev, packageSelected: selectedPackageName }));
    }
  }, [selectedProjectType, selectedPackageName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleApplyBudgetSuggestion = (val: string) => {
    setFormData((prev) => ({ ...prev, budget: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const errors: { name?: string; email?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Please provide a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#b4ff39', '#d4af37', '#ffffff']
      });
    } catch {
      // ignore
    }

    const whatsappUrl = buildWhatsAppEnquiryUrl(formData);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  // Budget suggestions based on current currency
  const budgetSuggestions =
    currency === 'INR'
      ? ['₹15,000–₹25,000', '₹35,000–₹60,000', '₹75,000–₹1,50,000+', 'Custom / Flexible']
      : ['$400–$700', '$1,000–$1,800', '$2,000–$4,500+', 'Custom / Flexible'];

  return (
    <section id="contact" className="scroll-mt-24 py-24 px-4 sm:px-6 md:px-12 bg-[#070809] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#b4ff39] uppercase mb-3">
              <span>//</span>
              <span>COMMISSION A SPRINT</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#ede8dd] uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              HAVE AN IDEA? LET'S BUILD IT.
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl mt-3 font-normal">
              Tell us about your brand, product, or required launch date. We reply rapidly on WhatsApp or email with clear timelines and next steps.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#b4ff39] bg-[#b4ff39]/10 px-3.5 py-2 rounded-xl border border-[#b4ff39]/20">
            <span className="w-2 h-2 rounded-full bg-[#b4ff39]"></span>
            <span>ACCEPTING NEW CLIENT COMMISSIONS</span>
          </div>
        </div>

        {/* 2-Column Contact Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
          {/* Left Column: Direct Studio Channels & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <h3
                className="text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Direct Studio Channels
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                Prefer an immediate quick conversation before specifying project parameters? Reach out directly to our lead designer:
              </p>

              <div className="mt-6 space-y-3.5">
                <a
                  href="https://wa.me/919742655618?text=Hi%20Sketchleaf%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-[#0f1114] border border-white/10 hover:border-[#25D366]/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-white/40">WHATSAPP OFFICIAL</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors">
                      +91 97426 55618
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:sketchleafdesigns@gmail.com"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-[#0f1114] border border-white/10 hover:border-white/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/70 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-white/40">PRIMARY EMAIL</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#b4ff39] transition-colors">
                      sketchleafdesigns@gmail.com
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#0f1114] border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/70 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-white/40">STUDIO BASE</div>
                    <div className="text-sm font-semibold text-white">
                      Kochi, Kerala, India (Worldwide Delivery)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links & Trust Markers */}
            <div className="p-6 rounded-2xl bg-[#0f1114] border border-white/10">
              <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
                Follow & Connect
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/70">
                <a
                  href="https://www.instagram.com/sketchleaf.design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#b4ff39] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <span className="text-white/20">·</span>
                <a
                  href="https://www.behance.net/sketchleaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#b4ff39] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Behance</span>
                </a>
                <span className="text-white/20">·</span>
                <a
                  href="https://www.linkedin.com/company/sketch-leaf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#b4ff39] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Preserved WhatsApp Enquiry Form with Accessible Labels */}
          <div className="lg:col-span-7 bg-[#0e1013] border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#b4ff39]/20 text-[#b4ff39] flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3
                  className="text-2xl font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Enquiry Prepared for WhatsApp!
                </h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-md mt-2 leading-relaxed">
                  We tried to open WhatsApp in a new tab with your details filled in. Your enquiry is only sent when you press Send there. If nothing opened, use the button below:
                </p>

                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <a
                    href={buildWhatsAppEnquiryUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-black bg-[#b4ff39] hover:bg-[#c6ff4d] rounded-xl"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Open WhatsApp Now</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-3 text-xs font-medium text-white/70 hover:text-white bg-white/5 rounded-xl border border-white/10"
                  >
                    Edit Specifications
                  </button>
                </div>
              </div>
            ) : (
              <form id="f" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                {/* Active Package Banner if preselected */}
                {formData.packageSelected && (
                  <div className="p-3 rounded-xl bg-[#b4ff39]/10 border border-[#b4ff39]/30 flex items-center justify-between text-xs font-mono text-[#b4ff39]">
                    <span>PRESELECTED: {formData.packageSelected} ({currency})</span>
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, packageSelected: '' }))}
                      className="text-white/60 hover:text-white text-[11px] underline"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="field-name" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Your Name <span className="text-[#b4ff39]">*</span>
                    </label>
                    <input
                      id="field-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-[#14171b] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                        formErrors.name
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-white/10 focus:border-[#b4ff39]'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="field-company" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Business / Company
                    </label>
                    <input
                      id="field-company"
                      name="company"
                      autoComplete="organization"
                      placeholder="e.g. Aurelia Studio"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-[#14171b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff39] transition-colors"
                    />
                  </div>
                </div>

                {/* Email & WhatsApp Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="field-email" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Email Address <span className="text-[#b4ff39]">*</span>
                    </label>
                    <input
                      id="field-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-[#14171b] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                        formErrors.email
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-white/10 focus:border-[#b4ff39]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="field-whatsapp" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      WhatsApp Phone
                    </label>
                    <input
                      id="field-whatsapp"
                      name="whatsapp"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full bg-[#14171b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff39] transition-colors"
                    />
                  </div>
                </div>

                {/* Website / Instagram */}
                <div>
                  <label htmlFor="field-website" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                    Current Website / Instagram URL
                  </label>
                  <input
                    id="field-website"
                    name="website"
                    placeholder="https://instagram.com/yourhandle or current site"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-[#14171b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff39] transition-colors"
                  />
                </div>

                {/* Project Type & Package Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="field-project-type" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Project Type <span className="text-[#b4ff39]">*</span>
                    </label>
                    <select
                      id="field-project-type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-[#14171b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b4ff39] transition-colors"
                    >
                      <option value="Website">Website Development</option>
                      <option value="Landing Page">Landing Page (Express Sprint)</option>
                      <option value="AI Commercial">AI Commercial Production</option>
                      <option value="UI/UX">UI/UX Product Design</option>
                      <option value="Web App / MVP">Web App / MVP Prototype</option>
                      <option value="Social Media Design">Social Media & Marketing Design</option>
                      <option value="Other">Other / Custom Scope</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="field-package" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Specific Package ({currency})
                    </label>
                    <select
                      id="field-package"
                      name="packageSelected"
                      value={formData.packageSelected}
                      onChange={handleChange}
                      className="w-full bg-[#14171b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b4ff39] transition-colors"
                    >
                      <option value="">Select Package (Optional)</option>
                      <optgroup label="Website Packages">
                        {WEBSITE_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.name}>
                            {pkg.name} ({pkg.price[currency]})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="AI Commercial Packages">
                        {AI_COMMERCIAL_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.name}>
                            {pkg.name} ({pkg.price[currency]})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Budget Range & Quick Presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="field-budget" className="text-xs font-mono uppercase tracking-wider text-white/60">
                      Budget Range ({currency})
                    </label>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40">
                      <span>Quick presets:</span>
                    </div>
                  </div>

                  <input
                    id="field-budget"
                    name="budget"
                    placeholder={`e.g. ${budgetSuggestions[1]}`}
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-[#14171b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff39] transition-colors mb-2"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    {budgetSuggestions.map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => handleApplyBudgetSuggestion(sug)}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-colors ${
                          formData.budget === sug
                            ? 'bg-[#b4ff39] text-black font-semibold border-[#b4ff39]'
                            : 'bg-white/5 text-white/60 border-white/10 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="field-timeline" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                    Required Timeline
                  </label>
                  <input
                    id="field-timeline"
                    name="timeline"
                    placeholder="e.g. 24 Hours / 1–2 Weeks / Flexible"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-[#14171b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff39] transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="field-desc" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                    Project Description & Requirements
                  </label>
                  <textarea
                    id="field-desc"
                    name="description"
                    rows={4}
                    placeholder="Share brief details regarding your brand, desired style, competitors, or specific deliverables..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-[#14171b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#b4ff39] transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-[#b4ff39] hover:bg-[#c6ff4d] rounded-xl transition-transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#b4ff39]/20"
                  >
                    <span>Start My Project →</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/919742655618?text=Hi%20Sketchleaf%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>
                </div>

                <p className="text-xs text-white/40 pt-2 font-mono">
                  *Submitting opens WhatsApp with your project parameters pre-compiled. Nothing is submitted without your direct confirmation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
