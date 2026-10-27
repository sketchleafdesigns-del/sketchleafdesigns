import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ALL_PROJECTS,
  filterProjects,
  buildWhatsAppEnquiryUrl,
  WEBSITE_PACKAGES,
  AI_COMMERCIAL_PACKAGES,
  STUDIO_SERVICES
} from './projectData.ts';

test('ALL_PROJECTS contains all 10 verified portfolio projects', () => {
  assert.equal(ALL_PROJECTS.length, 10);
  const titles = ALL_PROJECTS.map(p => p.title);
  assert.ok(titles.includes('Techavlon'));
  assert.ok(titles.includes('LoyaltyLoop'));
  assert.ok(titles.includes('ReachMate AI'));
  assert.ok(titles.includes('Perfume 4 Ever'));
});

test('filterProjects filters accurately by tag and respects All', () => {
  const allResult = filterProjects(ALL_PROJECTS, 'All');
  assert.equal(allResult.length, 10);

  const websiteResult = filterProjects(ALL_PROJECTS, 'Websites');
  assert.ok(websiteResult.length > 0);
  assert.ok(websiteResult.every(p => p.tags.includes('Websites')));

  const aiCommercials = filterProjects(ALL_PROJECTS, 'AI Commercials');
  assert.ok(aiCommercials.some(p => p.title.includes('AI Commercial')));
});

test('buildWhatsAppEnquiryUrl correctly formats and encodes message payload with currency and package', () => {
  const sample = {
    name: 'Sarah Connor',
    company: 'Cyberdyne LLC',
    email: 'sarah@example.com',
    whatsapp: '+919876543210',
    website: 'https://example.com',
    type: 'Website',
    packageSelected: 'Signature Website',
    currency: 'USD' as const,
    budget: '$1,000–$1,800',
    timeline: 'Within 2 weeks',
    description: 'Looking to launch our brand teaser.'
  };

  const url = buildWhatsAppEnquiryUrl(sample);
  assert.ok(url.startsWith('https://wa.me/919742655618?text='));
  assert.ok(url.includes(encodeURIComponent('Name: Sarah Connor')));
  assert.ok(url.includes(encodeURIComponent('Package: Signature Website')));
  assert.ok(url.includes(encodeURIComponent('Currency Preference: USD')));
  assert.ok(url.includes(encodeURIComponent('Timeline: Within 2 weeks')));
});

test('WEBSITE_PACKAGES contains Launch, Signature (recommended), and Motion Experience with exact INR/USD rates', () => {
  assert.equal(WEBSITE_PACKAGES.length, 3);
  const launch = WEBSITE_PACKAGES.find(p => p.name === 'LAUNCH');
  assert.ok(launch);
  assert.equal(launch?.price.INR, '₹15,000–₹25,000');
  assert.equal(launch?.price.USD, '$400–$700');

  const signature = WEBSITE_PACKAGES.find(p => p.name === 'SIGNATURE');
  assert.ok(signature);
  assert.equal(signature?.recommended, true);
  assert.equal(signature?.price.INR, '₹35,000–₹60,000');
  assert.equal(signature?.price.USD, '$1,000–$1,800');

  const motion = WEBSITE_PACKAGES.find(p => p.name === 'MOTION EXPERIENCE');
  assert.ok(motion);
  assert.equal(motion?.price.INR, '₹75,000–₹1,50,000+');
  assert.equal(motion?.price.USD, '$2,000–$4,500+');
});

test('AI_COMMERCIAL_PACKAGES contains Single, Campaign, and Premium Campaign with exact INR/USD rates', () => {
  assert.equal(AI_COMMERCIAL_PACKAGES.length, 3);
  const single = AI_COMMERCIAL_PACKAGES.find(p => p.name === 'SINGLE COMMERCIAL');
  assert.ok(single);
  assert.equal(single?.price.INR, '₹5,000–₹10,000');
  assert.equal(single?.price.USD, '$150–$300');

  const campaign = AI_COMMERCIAL_PACKAGES.find(p => p.name === 'CAMPAIGN');
  assert.ok(campaign);
  assert.equal(campaign?.price.INR, '₹15,000–₹30,000');
  assert.equal(campaign?.price.USD, '$400–$900');

  const premium = AI_COMMERCIAL_PACKAGES.find(p => p.name === 'PREMIUM CAMPAIGN');
  assert.ok(premium);
  assert.equal(premium?.price.INR, '₹30,000–₹60,000+');
  assert.equal(premium?.price.USD, '$900–$1,800+');
});
