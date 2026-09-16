# Trinova Business

Marketing website for Trinova Business — the branding, business consultancy, marketing, and IT consultancy division of Trinova Private Limited.

## Stack

- React 18 + Vite
- React Router
- `motion` (Framer Motion) for animation
- `three` + `@react-three/fiber` + `@react-three/drei` for 3D scenes

## Getting started

```bash
npm install
npm run dev
```

## Structure

- `src/data` — all site copy (navigation, solutions, industries, capabilities, insights, ecosystem) sourced from TRINOVA BUSINESS WEBSITE INFORMATION.pdf
- `src/components/sections` — one folder per homepage section
- `src/components/3d` — shared R3F scene, camera, lighting, and parallax controllers
- `src/pages` — routed pages (Home, Solutions, Industries, Capabilities, How We Work, Insights, About, Contact)

## Content source

All copy is sourced from `TRINOVA BUSINESS WEBSITE INFORMATION.pdf` in the project root.
