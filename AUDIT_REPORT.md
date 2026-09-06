# Phase 1 — Audit & Design Plan
## Yimeng Liu Academic Homepage · First-Principles Rebuild

> Status: Phase 1 complete (audit-only, no code changes). Produced locally via Docker `jekyll/jekyll:4` + `github-pages` gem (Jekyll 3.9.3), screenshots captured at 1440/1280/768/390. Live site verified at `https://lyimeng23.github.io`.

---

## A. Current site problems (verified, not guessed)

### A.1 Identity / configuration errors
| # | Issue | Evidence | Severity |
|---|-------|----------|----------|
| 1 | **CNAME points to `songchen.science`** — the ORIGINAL author's (Song Chen) domain | git: CNAME created Oct 2023 by "Song Chen"; live site actually serves at `lyimeng23.github.io`. `songchen.science` DNS → GH Pages but is Song Chen's site | Critical |
| 2 | **canonical + og:url = `https://minimal-light-theme.yliu.me/`** — upstream template demo domain | rendered `<link rel="canonical">` and `<meta og:url>` | High |
| 3 | **Google Analytics & ClustrMaps set to `${{ secrets.X }}`** placeholders (never substituted on GH Pages) | `_config.yml` lines 44, 48 | Medium (broken) |
| 4 | **Google Scholar crawler uses the WRONG profile** `sf-0AGoAAAAJ` = **Song Chen** (spintronics, ~124 citations). Yimeng's is `U0Py5sAAAAAJ` | live scholar pages | High |
| 5 | **robots.txt malformed**: `Sitemap: https://https://www.cs.jhu.edu/~yyliu/sitemap.xml` (double `https://`, wrong domain — jhu.edu original-author), references non-existent `/mpii_files/`, `/images/`, `/git-update.sh` | file content | Medium |
| 6 | **sitemap.xml empty** (`<loc></loc>`) | file content | High |

### A.2 Content / data errors
| # | Issue | Evidence | Severity |
|---|-------|----------|----------|
| 7 | **publications.yml entry 1 is corrupted**: title & authors = Proteus, but badge/files/arxiv link = **Hydra-Bench** (2507.22685). Two near-identical rows render | rendered DOM shows "arxiv" badge row then "SenSys'25" row, both titled Proteus | Critical |
| 8 | **News contains old generic entries** (2020–2023 career milestones) competing with high-value ones; a large commented block of original author (Song Chen, French mag-ionics) residue | `_includes/news.md` | Medium |
| 9 | **Empty "Last Update"** in footer | rendered footer `Last Update:` empty | Low |
| 10 | **Publications use `conference_short` inconsistently** (`arxiv` used as a venue badge, `SenSys'25`, etc.); no selected/featured vs full distinction; all equal visual weight | `publications.yml` + DOM | Medium |

### A.3 Dead template / third-party residue
| # | Item | Notes |
|---|------|-------|
| 11 | **`js/` directory** (algolia, animation, back_to_top, column, friend, google_cse, hbe, hbe.style.css, imaegoo/, index.js, insight.js, live2d/, toc.js) | Hexo/Next blog assets from original author; NOT referenced by the Jekyll layout. Deletable |
| 12 | **`assets/js/google-citation.js`** | unreferenced |
| 13 | **Backups**: `assets/css/nav-ori.css`, `pub-ori.css`, `_sass/minimal-light copy.scss`, `minimal-light-ori.scss`, `README copy.md` | unreferenced, deletable |
| 14 | **`contact/` PHP form + `_data/contact.yml` (French placeholders)** | contact section commented out of index; unused |
| 15 | **`_data/projects.yml`** all commented (Song Chen's I-V/AHEMS/AutoVA) | dead |
| 16 | **Commented template blocks** in `news.md`, `services.md`, `publications.md` (organizing committee / BMVC / French text) | dead, deletable |
| 17 | `404.html` references `javascripts/scale.fix.js` (wrong path, harmless) | cleanup |

### A.4 Design / UX problems
- **Classic "minimal-light" sidebar template**: fixed 232px left sidebar + 650px content in 960px wrapper; dark-green fixed topnav; Crimson Pro serif + demo-grey body text.
- **Vertical CV stacking**: Bio → News → Publications → Conferences → Services all linear, equal weight. No hero, no research vision, no information hierarchy.
- **Not mobile-first**; breakpoints bolted on; publication "cards" are uniform small teaser+links, indistinguishable strength.
- **2 external font families + Font Awesome + academicons** all over CDN; `user-scalable=no` on viewport (accessibility issue); no keyboard/reduced-motion considerations.

### A.5 Project subpages
- **`project/project_driving.html`** — standalone non-Jekyll page ("Senior Driving Safety & Cognitive Health"), inline CSS, references `driving_bg.jpg` via raw.githubusercontent. No site chrome, not linked from home.
- **`project/caspianpost/`** — separate SaaS product landing page ("CaspianPost · AI-powered TikTok Publishing Assistant", Inter/Plus Jakarta, lucide, glow bg). Non-academic commercial product; placement unclear.
- These are **outside the unified Jekyll design system** and need decisions (B/D below).

---

## B. Keep / Delete / Merge classification

### Keep (real, in use, re-purpose)
- `_config.yml` core identity fields (title/position/affiliation/email/address/cv/scholar/linkedin)
- `_data/publications.yml` — data-driven pub model (normalize schema: add `selected`, `featured`, `year`, `venue_short`, consistent fields)
- `_includes/publications.md` concept — rebuild
- Paper assets in `assets/files/` (all verified present): proteus, adonis, aeroecho, hydra, mmleaf, biodetection, HydraBench, slides, bibs
- `_data/conferences.yml` content (NSF workshop, MobiCom'24, SenSys'25) — relocate to a secondary "Talks & Activities" page
- `Services` content (reviewer/PC) — relocate to About/Secondary
- `.github/workflows/google_scholar_crawler.yaml` — **fix the Scholar ID** and keep (infrastructure)
- `_layouts/homepage.html` base (HTML scaffold) — rewrite design
- Project imagery: `assets/img/` (avatar, favicon, conference photos)

### Delete (dead / wrong residue — pending user confirm)
- `CNAME` (Song Chen's domain) — or set to correct production domain
- `_config` canonical/ga/clustrmaps broken values
- `robots.txt` rewritten; `sitemap.xml` regenerated
- `js/` blog dir; `assets/js/google-citation.js`; all `-ori` / `copy` backups; `README copy.md`
- `contact/` php form + `_data/contact.yml`; `_data/projects.yml` (empty)
- Commented template blocks in news/services/publications
- `_data/navigation.yml` stale entries (Contact → hidden) — rebuild nav in layout

### Merge / relocate
- Conferences & Events + Services + Contact → single secondary "Activities & Service" page (or About), off the home core tier
- News (real subset) → compact "Recent Highlights" on home, full timeline optional secondary
- Senior-driving & CaspianPost → decide (D)

### Keep as infrastructure (fix)
- Google Scholar crawler workflow (fix ID)
- GitHub Pages + Jekyll + `jekyll-remote-theme` (keep — but consider vendoring the theme to stop upstream drift; see code refactor)
- authormeta / verification files (Bing, Google) — keep, re-declare

---

## C. New Information Architecture (Homepage)

```
NAV (sticky, minimal):  Research · Publications · Projects · About  (+ CV / Scholar / GitHub icons)
─────────────────────────────────────────────────────────────────────────
HERO
  Name · Ph.D. Candidate, CSE @ Michigan State University
  One-line research vision: "I build intelligent systems that perceive,
  model, reason about, and act in the physical world."
  Primary actions: Research ↓ · Publications · CV · Scholar · GitHub
  10s: who I am + what I do
─────────────────────────────────────────────────────────────────────────
RESEARCH VISION  ("Physical AI for the Real World")
  Scroll-revealed chain:  SENSE → MODEL → REASON → ACT
     SENSE   multimodal sensing · vision · mmWave/RF · sparse sensing
     MODEL   physical world modeling · physics-informed learning · reconstruction
     REASON  multimodal reasoning · agents · LLM · adaptive intelligence
     ACT     driving · human-centered systems · agriculture · closed-loop
  30s: what's my research agenda
─────────────────────────────────────────────────────────────────────────
FEATURED RESEARCH  (3–4 signature projects w/ real visuals)
  each: project image + name + one-line problem + one-line contribution + venue/status + Learn More
  60s: my research trajectory / what I've done
─────────────────────────────────────────────────────────────────────────
PUBLICATIONS
  Selected Publications (featured) → Full list (grow from publications.yml)
  consistent typography, venue badge, author highlight, PDF/Project/Code/BibTeX/Slides
─────────────────────────────────────────────────────────────────────────
RECENT HIGHLIGHTS (4–6 true milestones: acceptance, award, fellowship, talk)
  "View full timeline" → secondary
─────────────────────────────────────────────────────────────────────────
ABOUT (compact)
  education · advisor (Dr. Zhichao Cao) · affiliation · interests · CV link
  also links to Activities/Service, Talks
FOOTER (minimal)
  Email · Scholar · GitHub · LinkedIn · CV · affiliation · last-updated
```

**Secondary pages** (same design system): `research` detail, `publications`, `projects/<name>` (mini story template), `about`/`cv`, `activities`.

---

## D. Research narrative

**Core vision (hero):**
> **Physical AI for the Real World** — I build intelligent systems that perceive, model, reason about, and act in the physical world.

**Unifying chain: SENSE → MODEL → REASON → ACT**

Mapping of current work (verified real papers):
- **SENSE** (perceive the physical world): `Hydra` (MobiCom'24, mmWave+RGB fusion), `mmLeaf` (MobiSys'23 poster), `Adonis` (INFOCOM'25, mmWave imaging), `Hydra-Bench` (arXiv/benchmark dataset), `Proteus` (SenSys'25, cross-modality knowledge transfer). *Note: Hydra/Adonis/Proteus fit `SENSE → MODEL` (they are sensing+reconstruction/learning), not the "driving/ACT" narrative.*
- **MODEL**: physics-informed learning for mmWave/SAR imaging, sparse reconstruction, world modeling.
- **REASON**: LLM-driven cognitive perception & decision-making for driving (CARLA) — from `project_driving` research direction.
- **ACT**: closed-loop AIoT for human-centered & agricultural systems; driving assistance; AeroEcho (INFOCOM'25, low-power backscatter for agriculture).

**Honest gap check (do NOT force-wrap):**
- The **leaf-wetness/mmWave sensing series** (Hydra, mmLeaf, Adonis, Proteus) is genuinely a **SENSE→MODEL** story about robust physically-informed multimodal perception — it fits the front half of the chain well and forms a coherent **trajectory** (poster → MobiCom system → INFOCOM imaging → SenSys knowledge transfer → dataset). 
- The **driving/LLM** work and the **agriculture/AeroEcho** work are *aspirational/future* directions (driving is a project page, not yet published to a top venue; AeroEcho is a systems paper). These map to **REASON** and **ACT**.
- **Recommendation:** Present the chain as the *research agenda* (SENSE→MODEL now, REASON→ACT as current/future focus), so the page is honest: the strong published core is perception/modeling; the reasoning/acting direction is where it's heading. This supports a Faculty search "research trajectory" narrative without overclaiming.

---

## E. Homepage wireframe

```
┌────────────────────────────────────────────────────────────┐
│  [Yimeng Liu]        · lo-fi sticky nav                     │
│   Research  Publications  Projects  About   [CV][Sch][GH]  │
├────────────────────────────────────────────────────────────┤
│  (large whitespace, centered/left)                         │
│  H E R O                                                 │
│   Yimeng Liu                                             │
│   Ph.D. Candidate · CSE @ Michigan State University      │
│   "I build intelligent systems that perceive, model,     │
│    reason about, and act in the physical world."         │
│   [Research ↓] [Publications] [CV] [Google Scholar] [GitHub]│
├────────────────────────────────────────────────────────────┤
│  RESEARCH VISION — "Physical AI for the Real World"       │
│  (scroll reveal) SENSE → MODEL → REASON → ACT             │
│    SENSE  ▮▮▮  MODEL  ▮▮▮  REASON  ▮▮▮  ACT               │
│    each: icon/visual + 1-line tag                         │
├────────────────────────────────────────────────────────────┤
│  FEATURED RESEARCH (3–4 visuals)                          │
│  [img] [img] [img]                                       │
│  Project cards: image | name | problem? | contribution |  │
│                 venue/status | more →                    │
├────────────────────────────────────────────────────────────┤
│  PUBLICATIONS (Selected → Full)                           │
├────────────────────────────────────────────────────────────┤
│  RECENT HIGHLIGHTS (4–6)   [Full timeline]                │
├────────────────────────────────────────────────────────────┤
│  ABOUT (compact)  · Activities/Service links              │
├────────────────────────────────────────────────────────────┤
│  FOOTER: email scholar github linkedin cv · last update   │
└────────────────────────────────────────────────────────────┘
```

---

## F. Design system

- **Content width** ~1140–1200px desktop; generous vertical rhythm (e.g., 8pt grid, section padding 96–128px desktop / 64–80px mobile).
- **Typography**: system stack first (e.g., `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui`), crisp high-contrast. Hero title ~56px; body 17–18px; use weight/spacing/contrast for hierarchy, not runaway font size.
- **Color**: white / warm-gray backgrounds; near-black text (#1a1a1a); **one** MSU-green research accent (`#18453B` family) used sparingly; grays for meta.
- **Surfaces**: flat; rounded corners/shadows only where functional (cards, images); avoid gradients/glass-glow except where informative.
- **Imagery is primary**: real project/paper figures as the main visual element; minimal decorative icons.
- **Avoid**: purple template gradients, neon, particles, full-bleed glassmorphism, AI-startup tropes.

---

## G. Motion system (info-bearing only, reduced-motion friendly)

- Section enter: subtle `opacity 0→1` + `translateY(8–16px)`, ~400–600ms, once per viewport (IntersectionObserver).
- **Sense→Model→Reason→Act**: items activate sequentially as they scroll into view (draws the chain).
- Featured project visual: gentle scale/parallax on hover/scroll.
- Sticky nav: natural "tighten" (bg + shadow) after threshold.
- Buttons/links: restrained hover (color/underline).
- `@media (prefers-reduced-motion: reduce)` → disable all transitions/transforms. No loading spinners, particles, cursor-follow, WebGL.

---

## H. Code refactor plan

- **Keep Jekyll + GitHub Pages + YAML data-driven** (no React/Next). Extend with SCSS/Sass + a single small `main.js` (IntersectionObserver only) — no jQuery, no Font Awesome unless needed, no third-party widget scripts.
- **Vendor the theme**: replace `remote_theme: yaoyao-liu/minimal-light` with a local `/_sass` + `assets` implementation we fully control. This kills upstream drift and the crawler/analytics residue, and is required anyway since we're redesigning (the remote theme's sidebar layout is being replaced). *(Note: vendoring is a bigger step — confirm it's desired, vs. overriding remote theme via local `_sass`/`_layouts` which Jekyll remote-theme also supports. Recommend full local theme to own the design.)*
- **Normalize `publications.yml` schema**: fields `title, authors, venue, venue_short, year, type(selected|full), image, pdf, code, page, bibtex, slides, dataset, notes, featured, abstract`.
- **Components as includes**: `_includes/sections/*.html` or layout-partials; a `_data/nav.yml`.
- **One `main.js`**: IO reveal + sticky nav + reduced-motion guard; remove all other scripts.
- **Performance**: single lean CSS build; lazy-load below-fold images (`loading="lazy"`), serve WebP/AVIF where possible (keep PNG/JPG fallback), preconnect CDNs, no render-blocking JS; `width/height` on images to prevent CLS.

---

## I. File-level modification plan

| File | Action |
|------|--------|
| `_config.yml` | fix canonical, ga/clustrmaps (remove or set real), add `url`, `locale`, site.title meta; keep identity |
| `CNAME` | remove (or set to confirmed production domain) |
| `_layouts/homepage.html` | rewrite to new IA/semantic HTML; remove sidebar; add header/footer partial |
| `_sass/` | new design-system SCSS (tokens, layout, typography, sections); delete copy/ori |
| `assets/css/*` | rebuild `pub.css`→component styles; delete ori/copy |
| `assets/js/` | keep favicon-switcher (+scale.fix if needed); delete google-citation; add `main.js` |
| `js/` (root) | delete entire Hexo/Next blog dir |
| `index.md` | new hero/vision/featured wiring to includes |
| `_includes/` | rewrite news→highlights, publications, add hero/vision/featured/about; delete commented blocks |
| `_data/publications.yml` | normalize schema; fix Proteus/Hydra-Bench; mark selected/featured |
| `_data/conferences.yml`, `contact.yml`, `projects.yml` | relocate/dead-delete to Activities page |
| `robots.txt`, `sitemap.xml`, `404.html` | rewrite |
| `google_scholar_crawler/main.py` | fix Scholar ID → U0Py5sAAAAAJ; cleanup `&hl` |
| `project/` | driving page → unified project template; decide CaspianPost |
| new files | `project/_layouts`, `_includes/sections/*`, `_data/nav.yml`, assets/img processing |

---

## J. Risks & items needing your confirmation (Phase 1 gate)

> Several fixes are factually certain and safe to apply during Phase 2 (Scholar crawler ID, Proteus/Hydra-Bench data, robots/sitemap, analytics removal, dead-code deletion). **Two require YOUR input because they change public identity/deployment: the domain and the narrative.**

1. **Production/canonical domain** — live site is `lyimeng23.github.io`. CNAME `songchen.science` is the original author's and should be removed. Do you have a real custom domain (e.g., `yimengliu.me`), or should canonical be `https://lyimeng23.github.io/`? (I will not change CNAME/canonical until you answer.)
2. **Research narrative** — approve the "Physical AI for the Real World" + `SENSE→MODEL→REASON→ACT` framing, **with the honesty caveat** that the strong published core is SENSE→MODEL (leaf-wetness/mmWave sensing series) while REASON→ACT (driving/LLM, agriculture/AeroEcho) are current/future directions. OK to present the chain as agenda-with-trajectory?
3. **CaspianPost** (commercial TikTok SaaS) — keep as a separate `/project` link, or remove from the academic site?
4. **Senior-driving standalone page** — migrate into the unified project template (recommended), or keep standalone?
5. **Module placement** — OK to move Conferences & Events + Services + Contact off the home core into an "Activities & Service" secondary page (and compact About)?
6. **Featured selection** — which 3–4 should be "Featured" (my suggestion: Hydra MobiCom'24, Proteus SenSys'25, Adonis INFOCOM'25, driving project; alternative: include Hydra-Bench dataset)?
7. **Theme vendoring** — OK to replace `remote_theme` upstream with a fully local theme (own the design, stop upstream drift)?

Please answer these (especially 1, 2, 3, 4) and I'll proceed into Phase 2 implementation, building and screenshotting each section as I go.
