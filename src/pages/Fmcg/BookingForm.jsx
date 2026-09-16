import { bookingFormConfig } from '../../data/googleFormConfig'

const viewformUrl = bookingFormConfig.viewformEmbedUrl.replace('?embedded=true', '')

/**
 * Embeds the real Google Form rather than posting to it via JS. Slightly
 * less on-brand visually (it's Google's own plain form UI inside the box
 * below), but it's Google's real submission flow — no entry-id mapping to
 * keep in sync, and no silent-failure risk the way a no-cors JS post has.
 */
export default function BookingForm() {
  return (
    <div className="fmcg-booking__embed">
      <div className="fmcg-booking__embed-bar">
        <div className="fmcg-booking__embed-dots" aria-hidden="true">
          <span className="fmcg-booking__embed-dot fmcg-booking__embed-dot--red" />
          <span className="fmcg-booking__embed-dot fmcg-booking__embed-dot--yellow" />
          <span className="fmcg-booking__embed-dot fmcg-booking__embed-dot--green" />
        </div>
        <span className="fmcg-booking__embed-label">Official Booking Engine</span>
        <a
          className="fmcg-booking__embed-link"
          href={viewformUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Form in New Tab ↗
        </a>
      </div>
      <iframe
        src={bookingFormConfig.viewformEmbedUrl}
        title="Book a meeting at Stall F32"
        loading="lazy"
      >
        Loading…
      </iframe>
    </div>
  )
}
