// Content for the FMCG Biz Connect Expo 2026 / Stall F32 campaign page.
// Copy here follows the approved "Trinova Business — FMCG Expo Page Copy"
// content pack. Do not add unverified claims, client names, statistics, or
// case studies that aren't in that pack — the audit tool's scoring and the
// "why Trinova" section are deliberately generic for that reason.

export const expoEvent = {
  name: 'FMCG Biz Connect Expo 2026',
  dateRange: '26–28 September 2026',
  startISO: '2026-09-26T00:00:00+05:30',
  endISO: '2026-09-29T00:00:00+05:30', // exclusive — end of 28 Sept IST
  venue: 'Hotel Babylon Capital, Raipur',
  venueFull: 'Hotel Babylon Capital, G.E. Road, Raipur',
  stall: 'Stall F32',
  city: 'Raipur',
  region: 'Chhattisgarh',
}

export const heroCopy = {
  eyebrow: `${expoEvent.name} · ${expoEvent.stall}`,
  title: "Chhattisgarh's FMCG Growth Partner.",
  subtitle: 'From local presence to bigger markets.',
  body: 'Trinova Business helps FMCG brands build stronger brands, sharper positioning, better digital presence and the systems needed to grow beyond their current market.',
  primaryCTA: 'Book a Slot at Stall F32',
  secondaryCTA: 'About the Stall',
}

export const quickActions = [
  { label: 'Book a Slot', href: '#booking', description: 'Reserve a time to meet the team at Stall F32.' },
  { label: 'About the Stall', href: '#about-the-stall', description: 'See what actually happens when you visit.' },
  { label: 'Free Brand Audit', href: '#brand-audit', description: 'Get a 5-minute FMCG brand check.' },
]

export const aboutStall = {
  eyebrow: 'At the Expo',
  title: 'What Happens at Stall F32?',
  lead: "Bring your brand. We'll take it from there.",
  paragraphs: [
    "Tell us what you sell, where you're currently selling and where you want to go.",
    "We'll look at the bigger picture — your brand, packaging, digital presence, marketing and growth opportunity.",
    "Then we'll talk through what could make the biggest difference.",
    'No complicated brief. No pressure. Just a useful conversation.',
  ],
  note: "Pre-booking a time means you get a guaranteed meeting, rather than trying to catch the team on the expo floor.",
  cta: 'Book My Slot',
}

export const opportunity = {
  eyebrow: 'The Opportunity',
  title: 'Your Product Is Ready. Is Your Brand?',
  lines: [
    'A good product can get you onto the shelf.',
    'A strong brand can help you move beyond it.',
  ],
  body: 'We work with FMCG businesses on the things that shape growth — from brand and packaging to digital presence, marketing and market expansion.',
  journey: ['Product', 'Brand', 'Digital', 'Marketing', 'Expansion', 'Scale'],
  journeyDescriptions: {
    Product: 'What you sell, and what it does.',
    Brand: 'How it looks, and what it stands for.',
    Digital: 'Where people find it, and what they see.',
    Marketing: 'How people hear about it, and why they remember it.',
    Expansion: 'Where it can go next.',
    Scale: 'What it takes to get there and stay there.',
  },
  positioning: 'Shelf-ready to scale-ready.',
}

export const whatWeDo = {
  eyebrow: 'What We Do',
  title: 'We Help FMCG Brands Grow Beyond Their Current Market.',
  pillars: [
    {
      number: '01',
      name: 'Brand & Packaging',
      body: 'Clear positioning, stronger identity and packaging designed to compete for attention.',
    },
    {
      number: '02',
      name: 'Digital & E-commerce',
      body: 'Websites, e-commerce experiences and catalogues that make your brand easier to discover, understand and choose.',
    },
    {
      number: '03',
      name: 'Content & Growth',
      body: 'Content, campaigns and marketing built around your product, audience and growth goals.',
    },
  ],
}

export const whyTrinova = {
  eyebrow: 'Why Trinova',
  title: 'Built for Businesses That Want to Grow.',
  paragraphs: [
    "FMCG growth isn't just about running more advertisements.",
    'It is about getting the brand, product, packaging, digital presence, marketing and market strategy working together.',
    "That's where we come in.",
  ],
  closing: 'We look at the business, not just the brief.',
  disciplines: ['Branding', 'Business Strategy', 'Marketing & Growth', 'Technology'],
}

export const chhattisgarh = {
  eyebrow: 'Chhattisgarh',
  title: 'From Chhattisgarh. Thinking Beyond Chhattisgarh.',
  paragraphs: [
    'Regional brands already have something many larger brands spend years trying to build — a connection with their market.',
    'The opportunity is turning that local strength into a brand that can compete in larger markets.',
    'We help build that bridge.',
    'From understanding your current market to strengthening the brand and preparing for expansion, the focus is simple:',
  ],
  closing: 'Make the brand ready for the next market.',
  path: ['Local Presence', 'Stronger Brand', 'Market Readiness', 'Bigger Markets'],
}

export const experience = {
  eyebrow: 'Experience & Approach',
  title: 'Local Understanding. Big-Market Thinking.',
  paragraphs: [
    'We bring together business thinking, branding, marketing and technology to help businesses solve growth problems as a connected system.',
    'Our approach is built around understanding where the business is today, what is holding it back, and what needs to change before investing in more activity.',
  ],
  closing: 'The right strategy first. The right execution after.',
}

export const brandAudit = {
  eyebrow: 'Free Brand Audit',
  title: 'Is Your FMCG Brand Ready to Grow?',
  subtitle: 'Get a free 5-minute FMCG Brand Check.',
  intro: 'A brand audit simply means looking at your brand from the outside — the way your customer sees it.',
  disclaimer: 'This is a quick self-assessment to help you spot the gaps worth discussing at Stall F32 — not a substitute for a full audit.',
  areas: [
    {
      key: 'brand',
      label: 'Brand',
      question: 'Is your identity clear and consistent?',
      options: [
        { label: 'Not really — it changes across places customers see it', score: 1 },
        { label: 'Somewhat — the basics exist but feel inconsistent', score: 2 },
        { label: 'Mostly — consistent, but could be sharper', score: 3 },
        { label: 'Yes — clear, consistent, and recognisable', score: 4 },
      ],
    },
    {
      key: 'packaging',
      label: 'Packaging',
      question: 'Does your product stand out and communicate quickly?',
      options: [
        { label: 'It blends in next to competitors on the shelf', score: 1 },
        { label: 'It stands out a little, but the message is slow to land', score: 2 },
        { label: 'It communicates well, but could stand out more', score: 3 },
        { label: 'It stands out and communicates in seconds', score: 4 },
      ],
    },
    {
      key: 'digital',
      label: 'Digital',
      question: 'Can customers easily find and understand your brand online?',
      options: [
        { label: "We don't have much of a digital presence", score: 1 },
        { label: 'We have one, but it needs work', score: 2 },
        { label: "It's decent, but not built for how customers search today", score: 3 },
        { label: "Yes — easy to find, clear, and up to date", score: 4 },
      ],
    },
    {
      key: 'marketing',
      label: 'Marketing',
      question: 'Are your content and communication reaching the right people?',
      options: [
        { label: "We're mostly guessing at this stage", score: 1 },
        { label: 'Some activity, but no clear strategy', score: 2 },
        { label: "We're reaching people, but not consistently", score: 3 },
        { label: 'Yes — a clear plan reaching the right audience', score: 4 },
      ],
    },
    {
      key: 'expansion',
      label: 'Expansion',
      question: 'Is your brand ready for bigger markets and channels?',
      options: [
        { label: "Honestly, we haven't thought about it yet", score: 1 },
        { label: "We want to, but aren't sure what needs to change", score: 2 },
        { label: 'We have a rough plan, but gaps remain', score: 3 },
        { label: 'Yes — we know what a new market would need', score: 4 },
      ],
    },
  ],
  cta: 'Get My Free Brand Score',
  resultCTA: 'Get My Full Score at Stall F32',
}

export const whoShouldVisit = {
  eyebrow: 'Who Should Visit Stall F32?',
  title: 'Where Is Your Brand Right Now?',
  segments: [
    { label: "I'm launching a new FMCG brand.", response: "Let's build the foundation properly." },
    { label: 'I have a local brand and want to grow.', response: "Let's look at what's holding the brand back from its next market." },
    { label: 'I want to enter new markets.', response: "Let's make sure the brand is ready for the move." },
    { label: 'My business is growing but has reached a point where it feels stuck.', response: "Let's find the gaps." },
    { label: 'I need stronger branding or packaging.', response: "Let's rethink how customers see you." },
    { label: 'I need better digital presence and marketing.', response: "Let's connect the pieces." },
  ],
  closing: "Let's Talk at Stall F32.",
}

export const bigIdea = {
  eyebrow: 'The Big Idea',
  title: "Your Brand Doesn't Have to Stay Local.",
  paragraphs: [
    'You may have started in one city.',
    'You may have built your business in one state.',
    "That doesn't have to define where the brand ends.",
  ],
  positioning: 'Local roots. Bigger ambition.',
  closing: 'Trinova Business helps FMCG brands build the brand, digital presence and growth system needed to move toward larger markets.',
}

// Field labels and option text below are kept in exact sync with the live
// Google Form ("Book a Meeting — Trinova at FMCG Biz Connect Expo 2026") —
// Google validates radio/checkbox submissions against its own option list,
// so an option's text here must match the form's wording exactly or the
// value is silently dropped.
export const booking = {
  eyebrow: 'Book Your Meeting',
  title: 'Meet Us at Stall F32.',
  subtitle: "We're at FMCG Biz Connect Expo 2026 for all three days.",
  body: "If there's something you're trying to solve, bring it with you.",
  supporting: "Pick a time. We'll be ready for you.",
  cta: 'Reserve My Slot',
  days: ['26 September — Opening Day', '27 September — Full Day', '28 September — Closing Day'],
  slots: ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:00 PM'],
  alternateTimeOptions: [
    'Yes, any nearby time works',
    'Yes, but only morning',
    'Yes, but only afternoon',
    'No, only the slot I picked',
  ],
  categories: ['Food & Beverages', 'Personal Care & Beauty', 'Home Care', 'Nutraceuticals & Wellness', 'Specialty / Artisanal FMCG'],
  stageOptions: [
    'Idea stage — not launched yet',
    'Just launched (under 1 year)',
    'Growing (1–3 years)',
    'Established (3+ years)',
    'Established, looking to reposition',
  ],
  sellingChannelOptions: [
    'Own website / D2C',
    'Amazon / Flipkart',
    'Quick commerce (Blinkit, Zepto, Instamart)',
    'Modern trade / retail chains',
    'General trade / distributors',
    'Exports',
    'Not selling yet',
  ],
}

export const cantAttend = {
  eyebrow: "Can't Attend?",
  title: "Can't Make It to the Expo? Let's Talk Anyway.",
  body: "Tell us a little about your brand and what you're looking for. We'll follow up directly — expo or not.",
  cta: 'Get in Touch',
}

export const eventStatus = {
  before: {
    label: 'Before the Expo',
    title: 'Days to Go.',
    body: `We'll be at ${expoEvent.stall}.`,
    cta: 'Book Your Slot',
  },
  during: {
    label: 'During the Expo',
    title: "We're Live.",
    body: `Come say hello at ${expoEvent.stall}.`,
    cta: 'Book a Time',
  },
  after: {
    label: 'After the Expo',
    title: 'Thank You for Visiting Us.',
    body: "The conversation doesn't have to end here.",
    cta: 'Talk to Trinova',
  },
}

export const finalClosing = {
  title: 'Your Product Is Ready.',
  subtitle: "Is Your Brand Ready for What's Next?",
  body: "Let's find out.",
  primaryCTA: 'Get My Free Brand Score',
  secondaryCTA: 'Book a Slot at F32',
}

export const fmcgIndustryLink = { label: 'Explore Our FMCG Work →', href: '/industries/fmcg' }
export const fmcgExpoBackLink = { label: 'Meet Us at FMCG Biz Connect Expo 2026 → Stall F32', href: '/fmcg/expo-2026' }

export const seo = {
  title: 'FMCG Biz Connect Expo 2026 — Meet Trinova at Stall F32, Raipur',
  description:
    "Trinova Business at FMCG Biz Connect Expo 2026, 26–28 September, Hotel Babylon Capital, Raipur — Stall F32. Chhattisgarh's FMCG growth partner for brand, packaging, digital presence and marketing. Book a slot or get a free FMCG brand audit.",
  keywords: [
    'FMCG Biz Connect Expo 2026',
    'FMCG Biz Connect Expo',
    'FMCG BizConnect Expo 2026',
    'FMCG BizConnect Expo',
    'FMCG Expo Raipur',
    'FMCG Expo Chhattisgarh',
    'Trinova Business',
    'Trinova Business FMCG',
    'FMCG branding agency Chhattisgarh',
    'FMCG brand audit',
    'Stall F32',
  ],
  path: '/fmcg/expo-2026',
}
