import { useState } from 'react'
import { FMCG_BOOKING_ENDPOINT } from '../../utils/constants'
import { cantAttendFormConfig, isGoogleFormConfigured } from '../../data/googleFormConfig'
import { submitToGoogleForm } from '../../utils/googleForm'

const initialForm = { name: '', company: '', phone: '', message: '' }

export default function CantAttendForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    try {
      if (isGoogleFormConfigured(cantAttendFormConfig)) {
        await submitToGoogleForm(cantAttendFormConfig.formActionUrl, cantAttendFormConfig.entries, form)
      } else if (FMCG_BOOKING_ENDPOINT) {
        await fetch(FMCG_BOOKING_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, source: 'fmcg-expo-2026-cant-attend' }),
        })
      }
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div className="fmcg-cant-attend__confirm">
        <h3>Thanks — we&rsquo;ll be in touch.</h3>
        <p>Expo or not, we&rsquo;ll follow up directly.</p>
      </div>
    )
  }

  return (
    <form className="fmcg-cant-attend__form" onSubmit={handleSubmit}>
      <div className="fmcg-cant-attend__grid">
        <label className="fmcg-booking__label">
          <span className="eyebrow">Name *</span>
          <input
            className="fmcg-booking__input"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </label>
        <label className="fmcg-booking__label">
          <span className="eyebrow">Company *</span>
          <input
            className="fmcg-booking__input"
            required
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
          />
        </label>
        <label className="fmcg-booking__label">
          <span className="eyebrow">Phone / WhatsApp *</span>
          <input
            className="fmcg-booking__input"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </label>
      </div>
      <label className="fmcg-booking__label">
        <span className="eyebrow">What do you need help with?</span>
        <textarea
          className="fmcg-booking__input"
          rows={3}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Get in Touch'}
      </button>
      {status === 'error' && <p className="fmcg-booking__error">Something went wrong — please try again.</p>}
    </form>
  )
}
