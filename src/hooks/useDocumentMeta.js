import { useEffect } from 'react'
import { SITE_URL } from '../utils/constants'

function upsertMeta(attr, key, content) {
  if (!content) return null
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  const created = !el
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return created ? el : null
}

/**
 * Sets this page's <title>, meta description/keywords, canonical link,
 * Open Graph / Twitter tags, and an optional JSON-LD block — then restores
 * the previous document title and removes anything it added when the page
 * unmounts. The site has no SSR/head-management library, so this is a
 * deliberately small, dependency-free stand-in scoped to the one page
 * (the FMCG Expo page) that needs unique per-page SEO right now.
 */
export function useDocumentMeta({ title, description, keywords, path, jsonLd, image }) {
  useEffect(() => {
    const previousTitle = document.title
    const createdEls = []
    const canonicalUrl = path ? `${SITE_URL.replace(/\/$/, '')}${path}` : undefined

    if (title) document.title = title

    const track = (el) => {
      if (el) createdEls.push(el)
    }

    track(upsertMeta('name', 'description', description))
    track(upsertMeta('name', 'keywords', keywords?.join(', ')))
    track(upsertMeta('property', 'og:title', title))
    track(upsertMeta('property', 'og:description', description))
    track(upsertMeta('property', 'og:url', canonicalUrl))
    track(upsertMeta('property', 'og:type', 'website'))
    if (image) track(upsertMeta('property', 'og:image', image))
    track(upsertMeta('name', 'twitter:card', 'summary_large_image'))
    track(upsertMeta('name', 'twitter:title', title))
    track(upsertMeta('name', 'twitter:description', description))

    let canonicalEl = null
    let canonicalCreated = false
    if (canonicalUrl) {
      canonicalEl = document.head.querySelector('link[rel="canonical"]')
      canonicalCreated = !canonicalEl
      if (!canonicalEl) {
        canonicalEl = document.createElement('link')
        canonicalEl.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalEl)
      }
      canonicalEl.setAttribute('href', canonicalUrl)
    }

    let jsonLdEl = null
    if (jsonLd) {
      jsonLdEl = document.createElement('script')
      jsonLdEl.type = 'application/ld+json'
      jsonLdEl.text = JSON.stringify(jsonLd)
      document.head.appendChild(jsonLdEl)
    }

    return () => {
      document.title = previousTitle
      createdEls.forEach((el) => el.remove())
      if (canonicalCreated && canonicalEl) canonicalEl.remove()
      if (jsonLdEl) jsonLdEl.remove()
    }
  }, [title, description, keywords, path, jsonLd, image])
}
