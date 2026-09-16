/**
 * Submits data to a Google Form's own response endpoint, so a Google Form
 * (Responses tab / linked Sheet) can act as a zero-backend inbox for a form
 * on the site. Google Forms doesn't send CORS headers back, so the request
 * has to run in `no-cors` mode — the browser blocks us from reading the
 * response, meaning a genuine validation failure on Google's side (a wrong
 * entry id, for example) looks identical to a success from here. Always do
 * a real test submission and check the Form's Responses tab after wiring
 * up a new entry-id mapping, rather than trusting the UI's "sent" state.
 */
export async function submitToGoogleForm(formActionUrl, entries, data) {
  if (!formActionUrl) return false

  const params = new URLSearchParams()
  Object.entries(entries).forEach(([field, entryId]) => {
    if (!entryId) return
    const value = data[field]
    if (Array.isArray(value)) {
      // Checkbox questions accept one entry.X per selected option.
      value.forEach((v) => v && params.append(entryId, v))
    } else if (value !== undefined && value !== null && value !== '') {
      params.append(entryId, value)
    }
  })

  await fetch(formActionUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  return true
}
