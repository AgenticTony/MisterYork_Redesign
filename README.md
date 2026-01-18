# Mister York - Website Redesign

This is a redesign of the Mister York website.

**Original Website:** https://www.misteryork.se/

## About This Project

This is a modern redesign of the Mister York burger chain website, featuring:

- **Hero Section**: Scroll-linked burger animation showing the burger-building process
- **Menu Sections**: Burgers, Milkshakes, and Coffee & Dessert showcases
- **Quality Story**: Highlights the ingredients and craft behind the food
- **Testimonials**: Customer reviews with imagery
- **Responsive Design**: Fully responsive across all devices

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Language:** TypeScript

## Getting Started

```bash
npm install
npm run dev
```

## Development

The project uses a frame-based burger animation. Due to memory constraints during development:
- Frames are reduced to 48 (every 4th frame from original 192)
- Node.js memory is increased to 8GB via `NODE_OPTIONS`

For production (Vercel), the full 192 frames can be used as memory constraints differ.

## Build

```bash
npm run build
npm start
```
