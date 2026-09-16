export const SITE_NAME = 'Trinova Business'
export const SITE_STRAPLINE = 'Branding. Consultancy. Marketing. IT Consultancy.'
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173'

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
}

export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || ''
export const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT || ''
export const FMCG_BOOKING_ENDPOINT = import.meta.env.VITE_FMCG_BOOKING_ENDPOINT || CONTACT_FORM_ENDPOINT
