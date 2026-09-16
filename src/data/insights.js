export const insightsIntro = {
  label: 'Insights',
  title: 'Things Worth Thinking About.',
  body: [
    'Ideas, observations, research, and practical lessons from branding, business, marketing, technology, and the industries we work with.',
  ],
}

export const featuredInsights = [
  {
    slug: 'your-logo-isnt-your-brand',
    title: "Your Logo Isn't Your Brand",
    excerpt: 'A logo is something people see. A brand is what they remember.',
    category: 'Branding',
  },
  {
    slug: 'more-marketing-doesnt-always-mean-more-growth',
    title: "More Marketing Doesn't Always Mean More Growth",
    excerpt: "Before spending more, understand what's actually holding your marketing back.",
    category: 'Marketing',
  },
  {
    slug: 'when-should-a-business-rebrand',
    title: 'When Should a Business Rebrand?',
    excerpt: "Sometimes the problem isn't your logo. Sometimes the business has simply changed.",
    category: 'Branding',
  },
  {
    slug: 'when-does-a-business-need-custom-software',
    title: 'When Does a Business Actually Need Custom Software?',
    excerpt: 'Not every problem needs a new application. Sometimes a better process is enough.',
    category: 'Technology',
  },
]

export const insightCategories = [
  {
    slug: 'branding',
    name: 'Branding',
    description: 'Ideas about how businesses build identities, position themselves, communicate, and become recognisable.',
    topics: ['Brand Strategy', 'Brand Positioning', 'Brand Identity', 'Naming', 'Rebranding', 'Packaging', 'Brand Communication', 'Creative Direction', 'Digital Branding'],
  },
  {
    slug: 'business',
    name: 'Business',
    description: 'Practical thinking around strategy, markets, customers, competition, growth, and business decisions.',
    topics: ['Business Strategy', 'Market Research', 'Competitive Analysis', 'Business Models', 'Growth Strategy', 'Go-to-Market', 'Product Strategy', 'Customer Strategy', 'Expansion', 'Business Planning'],
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    description: 'Ideas about reaching customers, building demand, communicating value, and understanding what actually works.',
    topics: ['Marketing Strategy', 'Digital Marketing', 'Social Media', 'Content', 'SEO', 'Performance Marketing', 'Advertising', 'Influencer Marketing', 'Lead Generation', 'Marketing Analytics'],
  },
  {
    slug: 'technology',
    name: 'Technology',
    description: 'Practical perspectives on technology and its role in modern businesses.',
    topics: ['IT Strategy', 'Digital Transformation', 'Software', 'Product Development', 'Technology Selection', 'Automation', 'Business Systems', 'Data', 'Digital Platforms', 'Technology Planning'],
  },
  {
    slug: 'industry',
    name: 'Industry',
    description: 'Industry insights look at changes, challenges, customer behaviour, competition, technology, and opportunities across the markets we work with.',
    topics: ['FMCG', 'Hospitality', 'Education', 'Healthcare', 'Manufacturing', 'Agriculture', 'Retail', 'Real Estate', 'Technology', 'Startups', 'Gaming', 'Entertainment'],
  },
]

// Accent rotation drawn from the Trinova violet/indigo system (see
// DESIGN.md) — the same palette used across Solutions and Industries.
const ACCENTS = ['#a855f7', '#8b5cf6', '#818cf8', '#c084fc', '#6366f1', '#a078ff']

export const featuredArticles = [
  {
    slug: 'your-logo-isnt-your-brand',
    category: 'branding',
    readTime: '4 min read',
    title: "Your Logo Isn't Your Brand",
    excerpt: 'A logo identifies a business. A brand gives people a reason to remember it. We look at the difference between visual identity and the larger system that shapes how a business is perceived.',
  },
  {
    slug: 'why-positioning-comes-before-design',
    category: 'branding',
    readTime: '5 min read',
    title: 'Why Positioning Comes Before Design',
    excerpt: 'Design can make a business look different. Positioning helps determine why it should be different. Before choosing colours, fonts, or layouts, businesses need to understand where they want to compete.',
  },
  {
    slug: 'more-marketing-doesnt-always-mean-more-growth',
    category: 'marketing',
    readTime: '6 min read',
    title: "More Marketing Doesn't Always Mean More Growth",
    excerpt: "More posts. More ads. More campaigns. More channels. None of these automatically mean more customers. Sometimes the answer is better positioning, a clearer offer, a better customer journey, or simply understanding what isn't working.",
  },
  {
    slug: 'when-should-a-business-rebrand',
    category: 'business',
    readTime: '5 min read',
    title: 'When Should a Business Rebrand?',
    excerpt: "Not every outdated logo needs replacing. A rebrand should have a reason. We look at the situations where changing the identity makes sense—and when a business should leave its brand alone.",
  },
  {
    slug: 'when-does-a-business-need-custom-software',
    category: 'technology',
    readTime: '7 min read',
    title: 'When Does a Business Actually Need Custom Software?',
    excerpt: "Custom software sounds attractive. But building something from scratch isn't always the right answer. We look at the situations where custom software makes sense, when existing tools are enough, and what businesses should consider before making the investment.",
  },
  {
    slug: 'why-packaging-is-part-of-your-marketing',
    category: 'marketing',
    readTime: '4 min read',
    title: 'Why Packaging Is Part of Your Marketing',
    excerpt: 'For many consumer products, the package is the first marketing message a customer sees. It has to communicate the product, brand, category, value, and difference—often within seconds.',
  },
  {
    slug: 'what-makes-a-hotel-brand-memorable',
    category: 'industry',
    readTime: '6 min read',
    title: 'What Makes a Hotel Brand Memorable?',
    excerpt: "A hotel isn't just a room. The brand begins before the booking and continues through the entire customer experience. We look at how positioning, visual identity, service, communication, reviews, and digital experience come together.",
  },
].map((article, i) => ({ ...article, accent: ACCENTS[i % ACCENTS.length] }))

export const resources = [
  { name: 'Brand Checklist', description: 'Questions to ask before building or changing your brand.' },
  { name: 'Rebranding Guide', description: 'A practical framework for deciding whether your business actually needs a rebrand.' },
  { name: 'Marketing Planning Guide', description: 'A starting point for building a marketing strategy around business objectives.' },
  { name: 'Website Planning Checklist', description: 'The questions businesses should answer before building a new website.' },
  { name: 'Digital Transformation Checklist', description: 'A practical starting point for businesses considering new technology or digital systems.' },
  { name: 'Go-to-Market Checklist', description: 'Questions to consider before launching a new product or service.' },
]

export const contentPrinciples = {
  willPublish: [
    'Practical ideas',
    'Original observations',
    'Industry perspectives',
    'Research',
    'Case studies',
    'Useful guides',
    'Lessons from projects',
    'Thoughtful opinions',
    'Technology perspectives',
    'Business analysis',
  ],
  wontPublish: [
    'Generic filler',
    'Artificially inflated thought leadership',
    'Unverified statistics',
    'Made-up case studies',
    'Fake client results',
    'Industry buzzwords for the sake of sounding intelligent',
    'Articles written only to target a keyword',
    'Opinions presented as facts',
  ],
}

export const articlePageSections = [
  'Category',
  'Title',
  'Introduction',
  'Author',
  'Published',
  'Reading Time',
  'Article',
  'Key Takeaways',
  'Related Insights',
  'Related Solution',
  'Related Industry',
  'Final CTA',
]
