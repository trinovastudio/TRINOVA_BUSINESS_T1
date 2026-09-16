export const industriesIntro = {
  label: 'Industries',
  title: 'Different Industries. Different Problems.',
  body: [
    "A restaurant doesn't market like a manufacturer.",
    "A school doesn't build a brand like an FMCG company.",
    "A startup doesn't have the same challenges as an established business.",
    "That's why we don't use a fixed formula. We adapt our thinking to the industry, the business, the audience, and the problem in front of us.",
  ],
}

export const industryList = [
  { slug: 'fmcg', name: 'FMCG & Consumer Goods' },
  { slug: 'food-beverage', name: 'Food & Beverage' },
  { slug: 'hospitality', name: 'Hospitality & Tourism' },
  { slug: 'healthcare', name: 'Healthcare & Pharmaceuticals' },
  { slug: 'education', name: 'Education' },
  { slug: 'manufacturing', name: 'Manufacturing' },
  { slug: 'agriculture', name: 'Agriculture & Agribusiness' },
  { slug: 'retail', name: 'Retail & E-commerce' },
  { slug: 'real-estate', name: 'Real Estate & Construction' },
  { slug: 'automotive', name: 'Automotive & Mobility' },
  { slug: 'fashion', name: 'Fashion & Lifestyle' },
  { slug: 'beauty', name: 'Beauty & Personal Care' },
  { slug: 'technology', name: 'Technology & SaaS' },
  { slug: 'startups', name: 'Startups & New Ventures' },
  { slug: 'media', name: 'Media & Entertainment' },
  { slug: 'gaming', name: 'Gaming' },
  { slug: 'professional-services', name: 'Professional Services' },
  { slug: 'government', name: 'Government & Public Sector' },
  { slug: 'ngo', name: 'NGOs & Social Impact' },
]

export const industryPerspectives = [
  { slug: 'fmcg', name: 'FMCG', focus: 'Consumer behaviour, packaging, retail, brand positioning, and consumer marketing.' },
  { slug: 'hospitality', name: 'Hospitality', focus: 'Customer experience, digital presence, reputation, bookings, and hospitality branding.' },
  { slug: 'education', name: 'Education', focus: 'Trust, admissions, communication, digital presence, and student acquisition.' },
  { slug: 'healthcare', name: 'Healthcare', focus: 'Communication, trust, digital experiences, patient journeys, and market positioning.' },
  { slug: 'manufacturing', name: 'Manufacturing', focus: 'B2B positioning, corporate communication, digital transformation, and lead generation.' },
  { slug: 'technology', name: 'Technology', focus: 'Product positioning, SaaS marketing, technology brands, customer acquisition, and growth.' },
]

// Accent rotation drawn strictly from the Trinova violet/indigo system (see
// DESIGN.md) — cycled across all 19 industries rather than introducing new,
// off-brand hues.
const ACCENTS = ['#a855f7', '#8b5cf6', '#818cf8', '#c084fc', '#6366f1', '#a078ff']

export const industryCohorts = [
  { slug: 'consumer', label: 'Consumer & Retail' },
  { slug: 'deeptech', label: 'Technology & New Ventures' },
  { slug: 'wellbeing', label: 'Health & Education' },
  { slug: 'industrial', label: 'Industrial & Mobility' },
  { slug: 'institutional', label: 'Institutional & Public' },
]

const INDUSTRY_DETAILS = [
  {
    slug: 'fmcg',
    cohort: 'consumer',
    subtitle: 'Won or lost on the shelf',
    tension: 'Shelf space is won in seconds, and retailers control most of the relationship with the shopper.',
    focus: 'Consumer behaviour, packaging, retail, brand positioning, and consumer marketing.',
    deliverable: 'Packaging and positioning built to win the moment a shopper decides.',
  },
  {
    slug: 'food-beverage',
    cohort: 'consumer',
    subtitle: 'Trust in every bite',
    tension: 'Trust is built on taste, safety, and story — and lost the moment any of the three feels off.',
    focus: 'Product experience, packaging, sourcing story, distribution, and consumer marketing.',
    deliverable: 'A brand people choose again, not just once.',
  },
  {
    slug: 'hospitality',
    cohort: 'consumer',
    subtitle: 'Decided before arrival',
    tension: 'Guests decide before they arrive — the booking journey and the reviews matter as much as the stay itself.',
    focus: 'Customer experience, digital presence, reputation, bookings, and hospitality branding.',
    deliverable: 'A guest experience — and the story around it — worth returning for.',
  },
  {
    slug: 'retail',
    cohort: 'consumer',
    subtitle: 'A dozen tabs open',
    tension: 'Customers compare price, delivery, and experience across a dozen tabs before they choose one.',
    focus: 'Omnichannel experience, conversion, retention, and acquisition cost.',
    deliverable: 'A retail experience — online and offline — built to convert and keep customers coming back.',
  },
  {
    slug: 'fashion',
    cohort: 'consumer',
    subtitle: 'Consistent, not trend-chasing',
    tension: 'Trends move fast and taste is subjective, but the brand behind the product still has to be consistent.',
    focus: 'Brand identity, seasonal campaigns, retail and digital experience, and cultural relevance.',
    deliverable: "A brand with a clear point of view that doesn't chase every trend.",
  },
  {
    slug: 'beauty',
    cohort: 'consumer',
    subtitle: 'Word of mouth moves first',
    tension: "Claims are heavily scrutinised, and word of mouth moves faster than any campaign.",
    focus: 'Product positioning, formulation storytelling, community strategy, and retail presence.',
    deliverable: "Credibility and community that a campaign alone can't buy.",
  },
  {
    slug: 'technology',
    cohort: 'deeptech',
    subtitle: 'Everyone claims the same thing',
    tension: 'Every competitor claims to be the smartest, fastest, and easiest — so positioning has to do the real work.',
    focus: 'Product positioning, SaaS marketing, technology brands, customer acquisition, and growth.',
    deliverable: "A category story and growth engine that don't rely on being the loudest.",
  },
  {
    slug: 'startups',
    cohort: 'deeptech',
    subtitle: 'One shot, limited runway',
    tension: 'Limited runway means the brand, product, and go-to-market all need to be right the first time, not eventually.',
    focus: 'Founding narrative, early positioning, first growth channels, and investor-facing communication.',
    deliverable: "A foundation that can scale without a rebuild in eighteen months.",
  },
  {
    slug: 'media',
    cohort: 'deeptech',
    subtitle: 'Attention is the business',
    tension: "Attention is the entire business, and it's harder to hold than it's ever been.",
    focus: 'Audience strategy, content positioning, distribution, and monetisation.',
    deliverable: 'A clearer sense of who the audience is and why they stay.',
  },
  {
    slug: 'gaming',
    cohort: 'deeptech',
    subtitle: 'Loyal to the community',
    tension: 'Players are loyal to communities and experiences, not marketing — and churn fast when either feels off.',
    focus: 'Community strategy, launch marketing, live-ops communication, and player retention.',
    deliverable: 'A community and content plan built around why players actually stay.',
  },
  {
    slug: 'healthcare',
    cohort: 'wellbeing',
    subtitle: 'Trust takes longer to earn',
    tension: 'Every claim is scrutinised, and trust takes longer to build than in almost any other category.',
    focus: 'Communication, trust, digital experiences, patient journeys, and market positioning.',
    deliverable: 'Clear, credible communication that respects how high the stakes actually are.',
  },
  {
    slug: 'education',
    cohort: 'wellbeing',
    subtitle: 'A decision with a short window',
    tension: 'Parents and students are making a long-term decision on limited information and a short window.',
    focus: 'Trust, admissions, communication, digital presence, and student acquisition.',
    deliverable: 'Admissions and communication built around how families actually decide.',
  },
  {
    slug: 'manufacturing',
    cohort: 'industrial',
    subtitle: 'Long cycles, big committees',
    tension: "Buying committees are large, sales cycles are long, and most manufacturers still market like it's 2005.",
    focus: 'B2B positioning, corporate communication, digital transformation, and lead generation.',
    deliverable: 'A digital presence and pipeline that match how industrial buyers actually research and decide.',
  },
  {
    slug: 'agriculture',
    cohort: 'industrial',
    subtitle: 'Resilient through volatility',
    tension: 'Margins move with commodity prices and weather, so the business needs to be resilient, not just visible.',
    focus: 'Supply chain positioning, B2B and cooperative relationships, sustainability story, and market access.',
    deliverable: 'A business that can plan and communicate through volatility, not around it.',
  },
  {
    slug: 'real-estate',
    cohort: 'industrial',
    subtitle: 'A major, infrequent decision',
    tension: 'The purchase decision is huge, infrequent, and driven by trust in the developer as much as the property.',
    focus: 'Project positioning, sales enablement, digital presence, and buyer trust.',
    deliverable: 'A project brand and sales journey that make a major decision feel confident.',
  },
  {
    slug: 'automotive',
    cohort: 'industrial',
    subtitle: 'Won before the showroom',
    tension: 'Buyers research extensively online long before they ever speak to a dealer or a brand.',
    focus: 'Brand positioning, digital showrooms, dealer network communication, and demand generation.',
    deliverable: 'A presence that earns consideration long before the test drive.',
  },
  {
    slug: 'professional-services',
    cohort: 'institutional',
    subtitle: 'Expertise is hard to show',
    tension: 'The product is expertise and trust, both of which are hard to show on a website.',
    focus: 'Positioning, credibility, referral and pipeline generation, and thought leadership.',
    deliverable: 'A way to demonstrate expertise before the first conversation happens.',
  },
  {
    slug: 'government',
    cohort: 'institutional',
    subtitle: 'Public first, longer cycles',
    tension: 'Communication has to serve the public first, inside longer procurement and approval cycles.',
    focus: 'Public communication, digital services, transparency, and citizen engagement.',
    deliverable: 'Clearer public communication that works within the constraints that actually exist.',
  },
  {
    slug: 'ngo',
    cohort: 'institutional',
    subtitle: 'Impact people can believe in',
    tension: 'Impact is real but hard to communicate, and funding depends on people believing in it.',
    focus: 'Mission storytelling, donor and stakeholder communication, and impact reporting.',
    deliverable: 'A story that makes the impact as clear as the mission.',
  },
]

/**
 * Full industry records — id, cohort, accent, and detail copy — built on
 * top of `industryList` so both stay in sync. Used by the Industries
 * overview carousel and each industry detail page.
 */
export const industries = industryList.map((base, i) => {
  const detail = INDUSTRY_DETAILS.find((d) => d.slug === base.slug)
  return {
    ...base,
    id: `IND-${String(i + 1).padStart(2, '0')}`,
    accent: ACCENTS[i % ACCENTS.length],
    ...detail,
  }
})
