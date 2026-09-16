/**
 * Wiring for collecting FMCG Expo enquiries into a Google Form (Responses
 * tab / linked Sheet) instead of a real backend — a quick stand-in until
 * one exists. Both `formActionUrl` and every `entries` value below start
 * empty; the two forms on the FMCG Expo page fall back to a local
 * "thanks, we'll be in touch" confirmation (no submission happens anywhere)
 * until this file is filled in.
 *
 * HOW TO CONNECT A GOOGLE FORM:
 *
 * 1. Create a Google Form with one field per row below. Use "Short answer"
 *    or "Dropdown" for all of them — NOT the built-in Date/Time question
 *    types, which split into multiple entry ids (_month/_day/_year, etc.)
 *    and won't match the single value this site sends.
 *
 * 2. Open the live form, click the ⋮ (three-dot) menu → "Get pre-filled
 *    link", type any placeholder text into every field, click "Get Link",
 *    and copy the long URL it gives you.
 *
 * 3. That URL contains one `entry.XXXXXXXXX=...` per field, in the same
 *    order you added them. Copy each number (just the digits after
 *    "entry.") into the matching slot below.
 *
 * 4. Take the form's own URL (ends in `/viewform`, from the "Send" button
 *    or the address bar) and change the ending from `viewform` to
 *    `formResponse` — that full URL goes into `formActionUrl`.
 *
 * 5. Submit a real test entry from the live site and check the Form's
 *    "Responses" tab — a no-cors submission can't be confirmed from the
 *    browser, so this is the only way to know the mapping is correct.
 */

// "Book a Meeting — Trinova at FMCG Biz Connect Expo 2026"
// https://docs.google.com/forms/d/e/1FAIpQLSdD2cONUWU1X1zYJECN5Nt9QQK8XvHqzq9L1isDDMkirxs6CQ/viewform
export const bookingFormConfig = {
  formActionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdD2cONUWU1X1zYJECN5Nt9QQK8XvHqzq9L1isDDMkirxs6CQ/formResponse',
  entries: {
    day: 'entry.487410539', // Select expo day
    slot: 'entry.103670558', // Preferred time
    alternateTimeOk: 'entry.671060788', // Alternate time on the same day okay?
    name: 'entry.1654632747', // Name
    company: 'entry.776625366', // Company / Brand
    phone: 'entry.2067492628', // Phone / WhatsApp
    role: 'entry.1408865965', // Your role / designation
    city: 'entry.406474850', // City
    website: 'entry.391610692', // Website or Instagram handle (optional)
    category: 'entry.713838444', // FMCG category
    stage: 'entry.1260934616', // Where is your brand right now?
    sellingChannels: 'entry.1104842101', // Where do you currently sell? (checkbox — repeatable)
    message: 'entry.282481435', // What would you like to discuss? (optional)
    prepare: 'entry.1946879321', // Anything we should bring or prepare? (optional)
  },
}

export const cantAttendFormConfig = {
  formActionUrl: '',
  entries: {
    name: '', // Name
    company: '', // Company
    phone: '', // Phone / WhatsApp
    message: '', // What do you need help with?
  },
}

export function isGoogleFormConfigured(config) {
  return Boolean(config.formActionUrl) && Object.values(config.entries).some(Boolean)
}
