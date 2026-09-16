import { useState } from 'react'
import { booking } from '../../data/fmcgExpo'
import { FMCG_BOOKING_ENDPOINT } from '../../utils/constants'
import { bookingFormConfig, isGoogleFormConfigured } from '../../data/googleFormConfig'
import { submitToGoogleForm } from '../../utils/googleForm'

const initialForm = {
  day: booking.days[0],
  slot: booking.slots[1],
  alternateTimeOk: booking.alternateTimeOptions[0],
  name: '',
  company: '',
  phone: '',
  role: '',
  city: '',
  website: '',
  category: booking.categories[0],
  stage: booking.stageOptions[0],
  sellingChannels: [],
  message: '',
  prepare: '',
}

// "26 September — Opening Day" -> ["26 September", "Opening Day"], for a
// two-line pill; the full string is still what gets submitted.
function splitDayLabel(value) {
  const [date, note] = value.split(' — ')
  return { date, note }
}

export default function BookingForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleChannel(channel) {
    setForm((prev) => ({
      ...prev,
      sellingChannels: prev.sellingChannels.includes(channel)
        ? prev.sellingChannels.filter((c) => c !== channel)
        : [...prev.sellingChannels, channel],
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.sellingChannels.length === 0) return
    setStatus('submitting')

    try {
      if (isGoogleFormConfigured(bookingFormConfig)) {
        await submitToGoogleForm(bookingFormConfig.formActionUrl, bookingFormConfig.entries, form)
      } else if (FMCG_BOOKING_ENDPOINT) {
        await fetch(FMCG_BOOKING_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, source: 'fmcg-expo-2026-stall-booking' }),
        })
      }
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    const { date } = splitDayLabel(form.day)
    return (
      <div className="fmcg-booking__confirm">
        <span className="fmcg-booking__confirm-badge">Slot Requested</span>
        <h3>
          You&rsquo;re on the list for {date}, {form.slot}.
        </h3>
        <p>We&rsquo;ll confirm by phone or WhatsApp before the expo. See you at Stall F32.</p>
      </div>
    )
  }

  return (
    <form className="fmcg-booking__form" onSubmit={handleSubmit}>
      <div className="fmcg-booking__field-group">
        <span className="eyebrow">Select Expo Day *</span>
        <div className="fmcg-booking__pills">
          {booking.days.map((d) => {
            const { date, note } = splitDayLabel(d)
            return (
              <button
                type="button"
                key={d}
                className={`fmcg-booking__pill${form.day === d ? ' is-selected' : ''}`}
                onClick={() => update('day', d)}
              >
                <span>{date}</span>
                <span className="fmcg-booking__pill-note">{note}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="fmcg-booking__field-group">
        <span className="eyebrow">Preferred Time *</span>
        <div className="fmcg-booking__pills fmcg-booking__pills--slots">
          {booking.slots.map((slot) => (
            <button
              type="button"
              key={slot}
              className={`fmcg-booking__pill fmcg-booking__pill--slot${form.slot === slot ? ' is-selected' : ''}`}
              onClick={() => update('slot', slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="fmcg-booking__field-group">
        <span className="eyebrow">If that slot is full, is an alternate time the same day okay? *</span>
        <div className="fmcg-booking__pills">
          {booking.alternateTimeOptions.map((opt) => (
            <button
              type="button"
              key={opt}
              className={`fmcg-booking__pill${form.alternateTimeOk === opt ? ' is-selected' : ''}`}
              onClick={() => update('alternateTimeOk', opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="fmcg-booking__grid">
        <Field label="Name" required value={form.name} onChange={(v) => update('name', v)} placeholder="Your full name" />
        <Field label="Company / Brand" required value={form.company} onChange={(v) => update('company', v)} placeholder="Your brand name" />
        <Field label="Phone / WhatsApp" required type="tel" value={form.phone} onChange={(v) => update('phone', v)} placeholder="+91 XXXXX XXXXX" />
        <Field label="Your Role / Designation" required value={form.role} onChange={(v) => update('role', v)} placeholder="e.g. Founder, Marketing Head" />
        <Field label="City" required value={form.city} onChange={(v) => update('city', v)} placeholder="Your city" />
        <Field
          label="Website or Instagram Handle"
          value={form.website}
          onChange={(v) => update('website', v)}
          placeholder="Optional — helps us walk in already knowing your brand"
        />
      </div>

      <div className="fmcg-booking__field-group">
        <span className="eyebrow">FMCG Category *</span>
        <div className="fmcg-booking__pills">
          {booking.categories.map((c) => (
            <button
              type="button"
              key={c}
              className={`fmcg-booking__pill${form.category === c ? ' is-selected' : ''}`}
              onClick={() => update('category', c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="fmcg-booking__field-group">
        <span className="eyebrow">Where Is Your Brand Right Now? *</span>
        <div className="fmcg-booking__pills">
          {booking.stageOptions.map((s) => (
            <button
              type="button"
              key={s}
              className={`fmcg-booking__pill${form.stage === s ? ' is-selected' : ''}`}
              onClick={() => update('stage', s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="fmcg-booking__field-group">
        <span className="eyebrow">Where Do You Currently Sell? * (select all that apply)</span>
        <div className="fmcg-booking__pills">
          {booking.sellingChannelOptions.map((c) => (
            <button
              type="button"
              key={c}
              className={`fmcg-booking__pill${form.sellingChannels.includes(c) ? ' is-selected' : ''}`}
              onClick={() => toggleChannel(c)}
            >
              {c}
            </button>
          ))}
        </div>
        {form.sellingChannels.length === 0 && <p className="fmcg-booking__hint">Pick at least one.</p>}
      </div>

      <Field
        label="What Would You Like to Discuss?"
        as="textarea"
        value={form.message}
        onChange={(v) => update('message', v)}
        placeholder="Optional — e.g. repackaging for modern trade, building a D2C presence, entering a new state…"
      />

      <Field
        label="Anything We Should Bring or Prepare?"
        as="textarea"
        value={form.prepare}
        onChange={(v) => update('prepare', v)}
        placeholder="Optional"
      />

      <button
        type="submit"
        className="btn btn-primary fmcg-booking__submit"
        disabled={status === 'submitting' || form.sellingChannels.length === 0}
      >
        {status === 'submitting' ? 'Reserving…' : booking.cta}
      </button>

      {status === 'error' && <p className="fmcg-booking__error">Something went wrong — please try again, or reach us directly.</p>}
    </form>
  )
}

function Field({ label, required, type = 'text', as = 'input', value, onChange, placeholder }) {
  const Tag = as
  return (
    <label className="fmcg-booking__label">
      <span className="eyebrow">
        {label}
        {required ? ' *' : ''}
      </span>
      <Tag
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? 4 : undefined}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="fmcg-booking__input"
      />
    </label>
  )
}
