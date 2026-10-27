export type Currency = 'INR' | 'USD';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  badge: string;
  tags: string[];
  layoutSize: 'large' | 'wide' | 'standard';
  image: string;
  accent: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
  startingPrice: {
    INR: string;
    USD: string;
  };
  ctaText: string;
  serviceCategory: string;
}

export interface WebsitePackage {
  id: string;
  name: string;
  tagline: string;
  recommended?: boolean;
  price: {
    INR: string;
    USD: string;
  };
  suitableFor: string;
  includes: string[];
}

export interface AICommercialPackage {
  id: string;
  name: string;
  durationOrVolume: string;
  price: {
    INR: string;
    USD: string;
  };
  summary: string;
  includes: string[];
}

export interface CommercialAsset {
  id: string;
  title: string;
  client: string;
  category: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  image: string;
  directorNotes: string;
  turnaround: string;
  soundTrack: string;
}

export const ALL_PROJECTS: ProjectItem[] = [
  {
    id: 'techavlon',
    title: 'Techavlon',
    subtitle: 'Business Website Design & Rebuild',
    description: 'Enterprise IT infrastructure and technology solutions website with high-performance responsive engineering.',
    url: 'https://techavlon.vercel.app/',
    badge: 'Live site',
    tags: ['Websites', 'UI/UX'],
    layoutSize: 'large',
    image: '/images/project_techavlon_1792955284658.webp',
    accent: '#b4ff39'
  },
  {
    id: 'loyaltyloop',
    title: 'LoyaltyLoop',
    subtitle: 'Customer Loyalty & Engagement Web App',
    description: 'QR loyalty and customer retention platform engineered for modern local commerce.',
    url: 'https://loyaltyloop.bolt.host/',
    badge: 'Live site',
    tags: ['Web Apps', 'UI/UX'],
    layoutSize: 'standard',
    image: '/images/hero_cinematic_motion_1792955282104.webp',
    accent: '#d4af37'
  },
  {
    id: 'reachmate-ai',
    title: 'ReachMate AI',
    subtitle: 'AI SaaS Concept & Web Architecture',
    description: 'High-conversion landing page concept for an AI WhatsApp automated receptionist for medical clinics.',
    url: 'https://reachmateai.netlify.app/',
    badge: 'AI Product Concept',
    tags: ['AI Products', 'Websites'],
    layoutSize: 'wide',
    image: '/images/commercial_lab_car_1792955284529.webp',
    accent: '#b4ff39'
  },
  {
    id: 'flash-promod',
    title: 'Flash Promod / Kochi Spark',
    subtitle: 'AI-Assisted Promotional Web Tool',
    description: 'Lightning-fast marketing asset and poster generation tool built for regional brands and creators.',
    url: 'https://flashpromod.vercel.app/',
    badge: 'Live tool',
    tags: ['Web Apps', 'AI Products', 'Marketing Design'],
    layoutSize: 'standard',
    image: '/images/commercial_lab_coffee_1792955283901.webp',
    accent: '#10b981'
  },
  {
    id: 'perfume-4-ever',
    title: 'Perfume 4 Ever',
    subtitle: 'Luxury E-commerce Boutique Concept',
    description: 'Fragrance boutique digital flagship located at MG Road, Ernakulam, with editorial product showcases.',
    url: 'https://perfume4ever.vercel.app/',
    badge: 'Concept',
    tags: ['Websites'],
    layoutSize: 'standard',
    image: '/images/commercial_lab_perfume_1792955282370.webp',
    accent: '#e5c365'
  },
  {
    id: 'portage-bakery',
    title: 'Portage Bakery',
    subtitle: 'Bakery Brand & Digital Experience',
    description: 'Artisanal culinary web experience showcasing fresh daily bakes and warm hospitality.',
    url: 'https://portagebakeryinc.vercel.app/',
    badge: 'Concept',
    tags: ['Websites'],
    layoutSize: 'standard',
    image: '/images/commercial_lab_coffee_1792955283901.webp',
    accent: '#d4af37'
  },
  {
    id: 'smile-point',
    title: 'Smile Point Dental Clinic',
    subtitle: 'Healthcare Clinical Presence',
    description: 'Specialised dental healthcare website with frictionless appointment booking and WhatsApp patient triage.',
    url: 'https://smilepointdentalclinic.netlify.app/',
    badge: 'Concept',
    tags: ['Websites'],
    layoutSize: 'standard',
    image: '/images/hero_cinematic_motion_1792955282104.webp',
    accent: '#10b981'
  },
  {
    id: 'roots-co',
    title: 'Roots & Co. Dentistry',
    subtitle: 'Premium Dental Studio Platform',
    description: 'High-end aesthetic clinical branding and digital presence with tranquil spatial typography.',
    url: 'https://roots-co-dentistry.vercel.app/',
    badge: 'Concept',
    tags: ['Websites'],
    layoutSize: 'wide',
    image: '/images/commercial_lab_perfume_1792955282370.webp',
    accent: '#b4ff39'
  },
  {
    id: 'sannans-homeo',
    title: "Sannan's Homeo Clinic",
    subtitle: 'Holistic Healthcare Patient Portal',
    description: 'Modern clinical website with patient education, therapy roadmaps, and immediate consultation CTAs.',
    url: 'https://sannanhomeoclinic.netlify.app/',
    badge: 'Concept',
    tags: ['Websites'],
    layoutSize: 'standard',
    image: '/images/project_techavlon_1792955284658.webp',
    accent: '#10b981'
  },
  {
    id: 'ai-commercial-ads',
    title: 'AI Commercial Ads & Brand Films',
    subtitle: 'Cinematic Commercial Advertising',
    description: 'Studio showreel, luxury perfume commercial and cinematic brand narrative film crafted with human creative direction and AI speed.',
    url: 'https://sketchleafdesignstudio.vercel.app/',
    badge: 'Internal project',
    tags: ['AI Commercials', 'Marketing Design'],
    layoutSize: 'large',
    image: '/images/hero_cinematic_motion_1792955282104.webp',
    accent: '#b4ff39'
  }
];

export const PROJECT_FILTER_TAGS = [
  'All',
  'Websites',
  'UI/UX',
  'Web Apps',
  'AI Products',
  'AI Commercials',
  'Marketing Design'
];

export function filterProjects(projects: ProjectItem[], tag: string): ProjectItem[] {
  if (!tag || tag === 'All') return projects;
  return projects.filter(p => p.tags.includes(tag));
}

export const COMMERCIAL_LAB_ASSETS: CommercialAsset[] = [
  {
    id: 'perfume-aura',
    title: 'Aura Obsidian Noir',
    client: 'Fragrance brand (concept)',
    category: 'Luxury Fragrance',
    aspectRatio: '16:9',
    image: '/images/commercial_lab_perfume_1792955282370.webp',
    directorNotes: 'High-contrast refractive glass physics with 24K gold foil floating on black mirror water.',
    turnaround: '48 hours',
    soundTrack: 'Deep bass pulse & crystalline chimes'
  },
  {
    id: 'nitro-craft',
    title: 'Artisan Cold Brew Macro',
    client: 'Beverage brand (concept)',
    category: 'Gourmet Food & Beverage',
    aspectRatio: '16:9',
    image: '/images/commercial_lab_coffee_1792955283901.webp',
    directorNotes: 'Ultra-slow motion milk bloom with zero-gravity roasted bean dispersion and volumetric backlight.',
    turnaround: '24 hours',
    soundTrack: 'Acoustic jazz groove & tactile espresso snap'
  },
  {
    id: 'hyperdrive-ev',
    title: 'Apex Hyperdrive Electric GT',
    client: 'Automotive brand (concept)',
    category: 'Automotive & Mobility',
    aspectRatio: '16:9',
    image: '/images/commercial_lab_car_1792955284529.webp',
    directorNotes: 'Nocturnal metropolis velocity with neon lime raytraced wet asphalt reflections and lens streak.',
    turnaround: '72 hours',
    soundTrack: 'Cyberpunk modular synthesizer & sub-bass rumble'
  },
  {
    id: 'techavlon-core',
    title: 'Quantum Cloud Infrastructure',
    client: 'Enterprise tech brand (concept)',
    category: 'Enterprise Tech',
    aspectRatio: '16:9',
    image: '/images/project_techavlon_1792955284658.webp',
    directorNotes: 'Monolithic data center corridors with pulsing optic threads and atmospheric industrial fog.',
    turnaround: '36 hours',
    soundTrack: 'Atmospheric ambient drone & binaural data ping'
  }
];

export const WEBSITE_PACKAGES: WebsitePackage[] = [
  {
    id: 'pkg-launch',
    name: 'LAUNCH',
    tagline: 'Fast, high-converting digital storefront',
    price: {
      INR: '₹15,000–₹25,000',
      USD: '$400–$700'
    },
    suitableFor: 'Cafés, local businesses, and modern service providers.',
    includes: [
      'One-page responsive business website',
      'Professional custom visual design',
      'Basic scroll animations',
      'Contact & WhatsApp conversion CTA',
      'Basic on-page SEO setup',
      'Vercel edge deployment assistance'
    ]
  },
  {
    id: 'pkg-signature',
    name: 'SIGNATURE',
    tagline: 'Comprehensive brand flagship with rich storytelling',
    recommended: true,
    price: {
      INR: '₹35,000–₹60,000',
      USD: '$1,000–$1,800'
    },
    suitableFor: 'Growing companies, premium clinics, and modern agencies.',
    includes: [
      'Up to five main pages or equivalent sections',
      'Custom bespoke visual direction',
      'Full responsive website design',
      'GSAP scroll-triggered animations',
      'Portfolio or product storytelling narrative',
      'Integrated contact and enquiry flow',
      'Basic SEO and analytics setup'
    ]
  },
  {
    id: 'pkg-motion',
    name: 'MOTION EXPERIENCE',
    tagline: 'Premium interactive motion flagship',
    price: {
      INR: '₹75,000–₹1,50,000+',
      USD: '$2,000–$4,500+'
    },
    suitableFor: 'Ambitious brands wanting standout industry presence.',
    includes: [
      'Bespoke creative direction',
      'Advanced scroll-driven storytelling',
      'Multiple cinematic pinned sequences',
      'Custom image and video integration',
      'Selective advanced motion graphics',
      'Responsive animation fallbacks',
      'Performance optimization',
      'Extended multi-device testing'
    ]
  }
];

export const AI_COMMERCIAL_PACKAGES: AICommercialPackage[] = [
  {
    id: 'ai-pkg-single',
    name: 'SINGLE COMMERCIAL',
    durationOrVolume: 'One 10–15 second commercial',
    price: {
      INR: '₹5,000–₹10,000',
      USD: '$150–$300'
    },
    summary: 'One 10–15 second AI-assisted commercial with professional color grading and sound design.',
    includes: [
      'One 10–15 second commercial',
      '16:9 widescreen or 9:16 vertical reel',
      'Cinematic lighting & physics direction',
      'Curated sound effects & music cue',
      'High-resolution final render'
    ]
  },
  {
    id: 'ai-pkg-campaign',
    name: 'CAMPAIGN',
    durationOrVolume: 'Three short commercial videos',
    price: {
      INR: '₹15,000–₹30,000',
      USD: '$400–$900'
    },
    summary: 'Three short commercial videos with a cohesive agreed visual and narrative creative direction.',
    includes: [
      'Three short commercial videos',
      'Consistent product / visual styling',
      'Multi-format delivery (16:9 + 9:16 reels)',
      'Soundtrack matching and audio mixing',
      'Social media launch ready'
    ]
  },
  {
    id: 'ai-pkg-premium',
    name: 'PREMIUM CAMPAIGN',
    durationOrVolume: 'Multi-scene campaign',
    price: {
      INR: '₹30,000–₹60,000+',
      USD: '$900–$1,800+'
    },
    summary: 'A more complex campaign with multiple scenes, product visuals, macro cinematography, and additional creative direction.',
    includes: [
      'Complex multi-scene campaign narrative',
      'Macro & atmospheric product cinematography',
      'Bespoke visual styling & artistic direction',
      'Full audio soundscape design',
      'Complete multi-platform asset bundle'
    ]
  }
];

export const STUDIO_SERVICES: ServiceItem[] = [
  {
    id: 'ai-websites',
    title: 'AI Websites & Landing Pages',
    summary: 'For businesses that need a striking, high-converting digital presence built and deployed rapidly.',
    deliverables: [
      'Custom responsive design',
      'Mobile & desktop parity',
      'Clear conversion journey',
      'WhatsApp CTA integration',
      'Fast turnaround options'
    ],
    startingPrice: {
      INR: '₹15,000',
      USD: '$400'
    },
    ctaText: 'Build My Website',
    serviceCategory: 'Website'
  },
  {
    id: 'ai-commercials',
    title: 'AI Commercial Ads',
    summary: 'Short-form cinematic advertising for products, food, cafes, beauty, real estate, and modern brands.',
    deliverables: [
      'Cinematic visual generation',
      'Motion grading & sound design',
      '16:9 widescreen + 9:16 reels',
      'Commercial license',
      'Prompt + art direction by human designers'
    ],
    startingPrice: {
      INR: '₹5,000',
      USD: '$150'
    },
    ctaText: 'Create My Ad',
    serviceCategory: 'AI Commercial'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Digital Product Design',
    summary: 'Intuitive user flows, wireframes, component design systems, and web application dashboards.',
    deliverables: [
      'Figma / Adobe XD layouts',
      'User journey mapping',
      'Design system & tokens',
      'Interactive prototypes',
      'Developer-ready specs'
    ],
    startingPrice: {
      INR: 'Custom quote',
      USD: 'Custom quote'
    },
    ctaText: 'Discuss My Product',
    serviceCategory: 'UI/UX'
  },
  {
    id: 'mvp-webapps',
    title: 'AI-Assisted MVPs & Web Apps',
    summary: 'Rapid interactive prototypes and functional business tools built using modern AI-assisted engineering.',
    deliverables: [
      'Working full-stack/SPA prototype',
      'Authentication & database flows',
      'Responsive UI frontend',
      'API integrations',
      'Vercel / Cloud deployment'
    ],
    startingPrice: {
      INR: 'Custom quote',
      USD: 'Custom quote'
    },
    ctaText: 'Build My MVP',
    serviceCategory: 'Web App / MVP'
  },
  {
    id: 'social-design',
    title: 'Social Media & Marketing Design',
    summary: 'High-impact promotional graphics, event campaign visuals, and launch teasers.',
    deliverables: [
      'Key campaign art',
      'Instagram / LinkedIn sets',
      'Vector & raster outputs',
      'Consistent brand identity',
      'Fast multi-format delivery'
    ],
    startingPrice: {
      INR: 'Custom quote',
      USD: 'Custom quote'
    },
    ctaText: 'Get a Quote',
    serviceCategory: 'Social Media Design'
  }
];

export const PROCESS_TIMELINE = [
  {
    step: '01',
    phase: 'Discover',
    tagline: 'Objective & Audience',
    description: 'We unpack your commercial goal, competitive landscape, and key customer trigger.'
  },
  {
    step: '02',
    phase: 'Plan',
    tagline: 'Architecture & Flow',
    description: 'Defining structural blueprints, messaging narrative, and high-impact conversion touchpoints.'
  },
  {
    step: '03',
    phase: 'Design',
    tagline: 'Visual Direction',
    description: 'Crafting bespoke typography, dark aesthetic palettes, and kinetic UI motion compositions.'
  },
  {
    step: '04',
    phase: 'Build',
    tagline: 'Accelerated Craft',
    description: 'Using modern AI-accelerated frameworks while maintaining senior human artistic control.'
  },
  {
    step: '05',
    phase: 'Test',
    tagline: 'Rigorous Verification',
    description: 'Benchmarking mobile responsiveness, fluid frame rates, touch targets, and accessibility.'
  },
  {
    step: '06',
    phase: 'Launch',
    tagline: 'Global Deployment',
    description: 'One-click deployment to Vercel/Cloud edge with verified live WhatsApp conversion pathways.'
  }
];

export const FAQ_LIST = [
  {
    q: 'Can you build a website in 24 hours?',
    a: 'Qualifying one-page sites, yes! When required content, branding guidelines, and asset inputs are provided on time, we execute and deploy within 24 hours.'
  },
  {
    q: 'Can you work with businesses outside Kerala, or internationally?',
    a: 'Yes. We collaborate seamlessly with clients across India, the GCC, Europe, and the US via WhatsApp, video meetings, and structured async milestones. Pricing is offered in both INR and USD.'
  },
  {
    q: 'Do I need to provide website content?',
    a: 'You can bring your existing draft copy, or we can collaboratively structure and polish the commercial messaging for maximum conversion.'
  },
  {
    q: 'Can you redesign an existing website?',
    a: 'Absolutely. We review your legacy site, pinpoint friction points, and engineer a brand-new high-retention motion redesign.'
  },
  {
    q: 'Can you create AI commercial ads or build web apps?',
    a: 'Yes. See our commercial work, our dedicated AI Commercial Lab, and working products like LoyaltyLoop, ReachMate AI, and Flash Promod.'
  },
  {
    q: 'Do you provide ongoing maintenance?',
    a: 'Yes. Mention your maintenance requirements in your project enquiry and we will structure ongoing support into your scope.'
  },
  {
    q: 'How does the project start?',
    a: 'Submit the project enquiry form below. You will receive an immediate response on WhatsApp or email, followed by a concise discovery discussion.'
  }
];

export interface WhatsAppEnquiryData {
  name: string;
  company?: string;
  email: string;
  whatsapp?: string;
  website?: string;
  type: string;
  packageSelected?: string;
  currency?: Currency;
  budget?: string;
  timeline?: string;
  description?: string;
}

export function buildWhatsAppEnquiryUrl(data: WhatsAppEnquiryData, phone = '919742655618'): string {
  const parts = [
    'New project enquiry — Sketchleaf Design Studio',
    `Name: ${data.name || ''}`,
    `Company: ${data.company || ''}`,
    `Email: ${data.email || ''}`,
    `WhatsApp: ${data.whatsapp || ''}`,
    `Website/Instagram: ${data.website || ''}`,
    `Type: ${data.type || 'Website'}`,
    data.packageSelected ? `Package: ${data.packageSelected}` : '',
    data.currency ? `Currency Preference: ${data.currency}` : '',
    `Budget: ${data.budget || ''}`,
    `Timeline: ${data.timeline || ''}`,
    `Description: ${data.description || ''}`
  ].filter(Boolean);

  const text = encodeURIComponent(parts.join('\n'));
  return `https://wa.me/${phone}?text=${text}`;
}
