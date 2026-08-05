# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Starflight Dynamics — Astro Site

Static Astro v5 site for www.starflight-dynamics.com, deployed to GitHub Pages.

## Commands

```bash
npm run dev      # local dev server → localhost:4321
npm run build    # production build → dist/  (also type-checks content collections)
npm run preview  # serve the built dist/ output
```

There is no separate lint or test command. `astro build` is the type-check step — it validates content collection frontmatter against the Zod schema in `src/content/config.ts` and will error on malformed posts. `playwright` is installed as a dependency but no test suite has been wired up yet.

## Architecture

**Routing** is file-based under `src/pages/`. All pages are static (`output: 'static'`, the Astro default). The site URL is set in `astro.config.mjs` (`site: 'https://www.starflight-dynamics.com'`) and controls canonical URLs and the GitHub Pages base.

**Content collections** power the news section. `src/content/config.ts` defines the `news` collection schema (title, date, summary, optional image). Each post is a Markdown file in `src/content/news/YYYY-MM-DD-slug.md`. The news grid (`pages/news/index.astro`) queries all entries and sorts newest-first; `pages/news/[slug].astro` renders individual articles. Astro infers the slug from the filename.

**Layout shell** (`src/layouts/Layout.astro`) loads Google Fonts (Space Grotesk + Inter), defines all CSS custom properties on `:root`, and sets the favicon. Every page wraps in this layout.

**Components** are small and page-specific — `Nav.astro` (fixed top bar, logo + links), `Footer.astro` (tagline, socials, legal nav, copyright), `NewsCard.astro` (used only in the /news grid).

## Pages

| Route | File | Notes |
|---|---|---|
| `/` | `index.astro` | Hero, newsletter signup, partners, earth section |
| `/news` | `news/index.astro` | 3-col card grid, newest-first |
| `/news/[slug]` | `news/[slug].astro` | Individual article |
| `/investors` | `investors.astro` | Contact page with newsletter |
| `/careers` | `careers.astro` | Open roles |
| `/imprint` | `imprint.astro` | German Impressum (§ 5 TMG) |
| `/privacy-policy` | `privacy-policy.astro` | GDPR privacy policy |
| `/terms-conditions` | `terms-conditions.astro` | Terms of service |

## Design tokens (defined in `Layout.astro :root`)

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#07080f` | page background |
| `--bg-card` | `#0d0f1c` | card / nav background |
| `--bg-nav` | `rgba(7,8,15,0.85)` | frosted-glass nav |
| `--accent` | `#3dffa0` | green CTA / highlights |
| `--accent-dim` | `rgba(61,255,160,0.12)` | hover fills |
| `--border` | `#1a1f35` | subtle borders |
| `--text` | `#e8ecff` | primary text |
| `--text-muted` | `#6b7496` | secondary text |
| `--radius` | `8px` | card border-radius |
| `--font-head` | Space Grotesk | headings + labels |
| `--font-body` | Inter | body copy |

Newsletter sections intentionally break from the dark theme: white background (`#ffffff`), black text, blue Sign Up button (`#384AD3`) — matching the live Wix site.

Partner logos in `public/images/partners/` are rendered with `filter: brightness(0) invert(1)` so white SVG/PNG assets show correctly on the dark background.

## Adding a news post

Create `src/content/news/YYYY-MM-DD-slug.md`:

```markdown
---
title: "Your Post Title"
date: YYYY-MM-DD
summary: "One-sentence teaser shown on the news grid card."
image: "/images/news/your-image.jpg"   # optional
---

Full article content in Markdown here.
```

Place the image in `public/images/news/`. The post appears automatically in `/news` and gets its own page at `/news/YYYY-MM-DD-slug`. Run `npm run build` to catch any frontmatter schema errors before committing.

## Deployment

GitHub Pages via `withastro/action`. Workflow goes in `.github/workflows/deploy.yml` — not yet created. The `site` field in `astro.config.mjs` is already set to the production domain.

## Newsletter form

The `action` URL in `index.astro` and `investors.astro` points to `https://formspree.io/f/placeholder`. Replace with a real Formspree endpoint once configured.

## Contact addresses

- General: mission-control@starflight-dynamics.com
- Investors: invest.in@starflight-dynamics.com
- Press: press@starflight-dynamics.com
