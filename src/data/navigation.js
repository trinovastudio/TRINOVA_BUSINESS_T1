// `mega` marks the flyout content type rendered by <MegaMenu/>. Items with no
// `mega` field render as a plain nav link with no dropdown. Home, About,
// Careers, and Contact stay as direct visible links — only the five
// content-heavy sections use a dropdown, and those dropdowns are compact
// (anchored under their trigger), not full-screen.
export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions', mega: 'solutions' },
  { label: 'Industries', href: '/industries', mega: 'industries' },
  { label: 'Capabilities', href: '/capabilities', mega: 'capabilities' },
  { label: 'How We Work', href: '/how-we-work', mega: 'how-we-work' },
  { label: 'Insights', href: '/insights', mega: 'insights' },
  { label: 'FMCG Expo', href: '/fmcg/expo-2026' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

// Anchor ids exposed by the How We Work page (src/pages/HowWeWork/HowWeWork.jsx)
// for each process step, used by the "How We Work" mega menu.
export const howWeWorkSteps = [
  { slug: 'understand', label: 'Understand' },
  { slug: 'research', label: 'Research' },
  { slug: 'define', label: 'Define' },
  { slug: 'build', label: 'Build' },
  { slug: 'launch', label: 'Launch' },
  { slug: 'measure', label: 'Measure' },
  { slug: 'improve', label: 'Improve' },
]

export const footerNav = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'FMCG Expo 2026', href: '/fmcg/expo-2026' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  solutions: [
    { label: 'Branding', href: '/solutions/branding' },
    { label: 'Business Consultancy', href: '/solutions/business-consultancy' },
    { label: 'Marketing', href: '/solutions/marketing' },
    { label: 'IT Consultancy', href: '/solutions/it-consultancy' },
  ],
  insights: [
    { label: 'Articles', href: '/insights#featured-articles' },
    { label: 'Case Studies', href: '/insights' },
    { label: 'Research', href: '/insights' },
    { label: 'Guides', href: '/insights#resources' },
    { label: 'News', href: '/insights' },
  ],
  // Sister sites under the Trinova umbrella — separate domains, not routes
  // within this app, so the footer renders these as plain external links.
  trinova: [
    { label: 'Trinova Business', href: 'https://trinova.org.in' },
    { label: 'Trinova Studio', href: 'https://trinovastudio.in' },
    { label: 'Trinova Production', href: 'https://trinovaproduction.in' },
  ],
}

export const footerCopy = {
  name: 'TRINOVA BUSINESS',
  tagline: 'A Trinova Company',
  strapline: 'Branding. Consultancy. Marketing. IT Consultancy.',
  description:
    'We help businesses build stronger brands, make better decisions, and move forward with confidence.',
  locations: ['Raipur', 'Hyderabad', 'Chandigarh'],
  parentCompany: 'Trinova Private Limited',
  copyright: '© 2026 Trinova Private Limited. All rights reserved.',
}

export const heroCTA = { label: 'Start a Conversation', href: '/contact' }
export const talkCTA = { label: "Let's Talk", href: '/contact' }
