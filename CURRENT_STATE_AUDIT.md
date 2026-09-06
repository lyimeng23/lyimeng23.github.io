# Current State Audit — Phase 0 Baseline

Date: 2026-09-06  
Production URL: https://lyimeng23.github.io/  
Repository: `lyimeng23/lyimeng23.github.io`  
Baseline commit: `eaa702ad` (`feat(homepage): center personal profile before research narrative`)

## Baseline status

- `git pull --ff-only origin main`: up to date.
- Working tree: clean before baseline capture.
- Production Jekyll build: passed with Jekyll 3.9.3 in `jekyll/jekyll:4`.
- Generated homepage: 6 content sections after the Hero.
- Full-page screenshots were captured at 1440px, 1280px, 768px, and 390px. The
  screenshot pass emulated `prefers-reduced-motion: reduce` so every reveal element
  is visible in the complete-page artifacts.
- No horizontal overflow was detected at any baseline viewport.

## Baseline screenshots

| Viewport | Page height | Scroll width | Screenshot |
|---|---:|---:|---|
| Desktop | 1440 × 1100 | 9,381px | [desktop-1440.png](baseline/phase-0/desktop-1440.png) |
| Desktop | 1280 × 1000 | 9,331px | [desktop-1280.png](baseline/phase-0/desktop-1280.png) |
| Tablet | 768 × 1024 | 9,522px | [tablet-768.png](baseline/phase-0/tablet-768.png) |
| Mobile | 390 × 844 | 13,980px | [mobile-390.png](baseline/phase-0/mobile-390.png) |

All four captures reported `scrollWidth == clientWidth`, 5 Vision stages, and zero
hidden reveal elements under reduced motion.

## Current homepage structure

The current reading order is:

1. Hero — identity, Ph.D. candidate / Michigan State University, Spatial Intelligence
   headline, portrait, and links to About, Research, Projects, Publications, and CV.
2. About — personal profile, advisor, education, research interests, affiliation, CV,
   activities, Google Scholar, and GitHub.
3. Research Vision — five stages with the current evidence labels:
   `Published foundation` ×3, `Future agenda` ×1, and `Current research` ×1.
4. Featured Research — Hydra, Proteus, Adonis, and Cognitive Driving as capability
   evidence.
5. Publications — four highlighted papers/artifacts and the complete seven-item record.
6. Highlights — six featured news items, currently latest from July 2025.

## Current source of truth

| Concern | Current files | Baseline behavior |
|---|---|---|
| Page entry and metadata | `index.md`, `_config.yml` | Homepage title/description, canonical URL, keywords, CV and profile links. |
| Layout | `_layouts/default.html`, `_layouts/homepage.html` | Shared document shell; homepage includes Hero → About → Vision → Featured → Publications → Highlights. |
| Navigation | `_includes/nav.html`, `_data/nav.yml` | Sticky desktop nav; keyboard-accessible mobile toggle; Research, Projects, Publications, Activities, About. |
| Identity | `_includes/hero.html`, `_includes/about.html` | Personal identity is present before research content. |
| Research definition | `_includes/vision.html`, `_data/vision.yml` | Five-stage Spatial Intelligence ladder with stage-specific evidence status and visual overlays. |
| Research evidence | `_includes/featured.html`, `_data/featured.yml` | Four capability-labeled studies with Problem / Contribution copy and links. |
| Publication record | `_includes/publications.html`, `_data/publications.yml` | Highlighted record plus all publications; links to PDFs, papers, code, slides, BibTeX, and dataset where available. |
| Milestones | `_includes/highlights.html`, `_data/news.yml`, `news.md` | Homepage teaser shows six featured entries; full timeline is `/news/`. |
| Styling | `assets/css/main.scss`, `_sass/_tokens.scss`, `_sass/_base.scss`, `_sass/_layout.scss`, `_sass/_components.scss`, `_sass/_motion.scss` | Tokenized SCSS, warm paper / MSU green palette, editorial spacing, responsive layout, reveal motion. |
| Runtime | `assets/js/main.js` | Native JS only: reveal-on-scroll, reduced-motion handling, IntersectionObserver fallback, mobile nav. |
| Build dependencies | `Gemfile`, `Gemfile.lock` | GitHub Pages / Jekyll 3.9 stack, `jekyll-sitemap`, Webrick, Ruby stdlib gems. |

## Current image and artifact inventory

- Identity: `assets/img/avatar3_lyimeng.webp`, favicon, and conference photos.
- Research visuals: `assets/files/hydra.webp`, `proteus.webp`, `Adonis.webp`,
  `hydrabench.webp`, `mmleaf.webp`, `AeroEcho.webp`, and `biodetection.webp`.
- Driving visuals: `project/senior-driving/images/*.webp`, including the road-scene
  `driving_bg.webp` and project gallery images.
- Publication artifacts: PDFs, PPTX slide decks, and BibTeX text files under
  `assets/files/`.
- Project pages: `/project/senior-driving/` uses the shared project layout; the
  independently authored `/project/caspianpost/` page includes its own privacy and
  terms pages.

## What is already established and must not regress

- The site remains a personal academic homepage: Yimeng Liu, role, affiliation,
  advisor, education, contact, CV, scholarly profile, and service links are visible.
- The Spatial Intelligence positioning is explicit and does not describe the work as
  only a publication list.
- Existing research artifacts remain local and linked; no new stock imagery or
  unverified project result is needed for the next phases.
- Published / Current / Future distinctions are represented in source data and must
  remain explicit.
- The current Jekyll architecture, shared layouts, WebP image assets, native JS,
  keyboard focus styles, and reduced-motion path should be preserved.
- The CaspianPost page was previously kept as a secondary non-research build; any next
  decision about it must be made deliberately rather than accidentally deleting it.

## Baseline issues reserved for later phases

- The Vision sequence is still five alternating stage panels; it is not yet one
  unified physical scene that progressively gains observations, objects, relations,
  temporal state, predictions, and actions.
- The current visual overlays are explanatory diagrams over separate research images,
  not a single coherent ego-vehicle / pedestrian / road / interaction scene.
- Featured cards communicate capability labels, but do not yet consistently expose the
  requested Research Question → Core Idea → Visual Evidence → Key Result → Link format
  or quantitative results.
- The past → present → future transition is distributed across the page rather than
  expressed as one explicit research leap.
- The homepage still spends attention on a six-item Highlights block whose newest
  source entry is July 2025; no 2026 research milestone is present in `_data/news.yml`.
- Publication, SEO, accessibility, performance, and external-link checks need to be
  rerun after each later phase; this file records the starting point, not final
  acceptance.

## Phase 0 acceptance

The baseline answers what currently exists, what must not break, and what remains to
change. No design or content source was modified in Phase 0; only this audit and the
four baseline screenshot artifacts were added.
