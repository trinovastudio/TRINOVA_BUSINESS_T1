import { useState } from 'react'
import Container from '../../components/common/Container'
import SectionLabel from '../../components/common/SectionLabel'
import Button from '../../components/common/Button'
import { CONTACT_FORM_ENDPOINT } from '../../utils/constants'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    if (!CONTACT_FORM_ENDPOINT) {
      setStatus('submitted')
      return
    }

    try {
      await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="section">
      <Container style={{ maxWidth: '62ch' }}>
        <SectionLabel>Contact</SectionLabel>
        <h1 style={{ marginTop: '1rem' }}>Have a Business to Build?</h1>
        <p style={{ marginTop: '1.25rem' }}>
          Tell us where you are, where you want to go, and what's getting in the way.
          We'll start there.
        </p>

        {status === 'submitted' ? (
          <p style={{ marginTop: '2.5rem', fontSize: '1.1rem' }}>
            Thanks for reaching out — we'll be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <Field label="Company" name="company" value={form.company} onChange={handleChange} />
            <Field label="What are you trying to build?" name="message" as="textarea" value={form.message} onChange={handleChange} required />

            <Button type="submit" variant="primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
              {status === 'submitting' ? 'Sending…' : "Let's Talk"}
            </Button>

            {status === 'error' && (
              <p style={{ color: '#ff8a8a' }}>Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </Container>
    </div>
  )
}

function Field({ label, name, type = 'text', as = 'input', ...props }) {
  const Tag = as
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span className="eyebrow">{label}</span>
      <Tag
        name={name}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? 5 : undefined}
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 10,
          padding: '0.85rem 1rem',
          color: 'var(--color-text)',
          font: 'inherit',
          resize: 'vertical',
        }}
        {...props}
      />
    </label>
  )
}
