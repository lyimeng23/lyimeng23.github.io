# Audit — pre-redesign baseline and disposition

Audit date: 2026-09-06. This is the inventory the rebuild was based on. Every claim below was
checked against the repository and the rendered site, not inferred.

## Verdict on the previous state

Accurate, but structurally a paper list with a research diagram attached. The thesis was spread
across four sections; the identity lived in a separate portrait block; the record (publications,
CV, activities, news) occupied the same visual weight as the argument. It read as a competent
personal homepage, not as a research identity.

## Disposition table

### Keep (verified accurate, carried forward)

| Asset | Note |
|---|---|
| `_data/publications.yml` — 7 entries | Titles, authors, venues, years verified against the PDFs |
| Hydra (MobiCom '24) | 96% across scenarios, ~90% in farm deployment — from the paper abstract |
| Proteus (SenSys '25) | 96.3% across varied scenarios — from the paper abstract |
| Adonis (INFOCOM '25) | MAE 4.43 controlled / 6.49 farm vs 11.84 / 14.32 — from the paper abstract |
| mmLeaf (MobiSys '23), AeroEcho (INFOCOM '25), Biomimetic sonar (2022) | Used as layer-1 evidence |
| `_data/news.yml` | No entry invented; nothing after Jul 2025 |
| Education, advisor, positions, service | Unchanged |
| `project/senior-driving/` | Content unchanged; images re-oriented |
| PDF / slides / BibTeX artifacts | All links verified to resolve |
| Google Scholar, GitHub, LinkedIn, CV, address | Verified |

### Compress

| Was | Now |
|---|---|
| `spatial_story.yml` + `vision.yml` + `featured.yml` (three overlapping models of the same arc) | One `agenda.yml`; `work.yml`; `system.yml` |
| Hero: 6 CTAs, subtitle, lede, portrait | Name + thesis + chain strip + 3 CTAs, no portrait |
| Publications split into "highlighted" and "all" | One list with a topic filter |
| Four separate research sections | Three: Thesis, The chain, Research system |

### Delete

| Removed | Why |
|---|---|
| `_data/vision.yml`, `spatial_story.yml`, `featured.yml`, `services.yml` | Duplicated by the new model |
| `_includes/{vision,featured,publications,about,highlights,personal-intro}.html` | Replaced |
| ~300 lines of `.vision*` CSS | Styled markup that no longer existed |
| `assets/css/nav.css`, `pub.css` | Dead |
| `assets/img/{NSFSC,mobicom24,sensys25}.webp`, `files/biodetection.webp` | Unreferenced, 544 KB |
| `assets/img/favicon_lyimeng.webp` | Photo favicon replaced by a designed mark |
| All `.DS_Store` | Noise |
| 8 root-level audit/planning `.md` files from the published site | Moved to `docs/archive/`; they were being **published as HTML** |

### Fix (found during the audit)

| Problem | Evidence |
|---|---|
| `jekyll-theme-primer` injected by the `github-pages` gem | `jekyll build --verbose` rendered `assets/css/style.scss` that does not exist in the repo → 76 KB of unused CSS shipped |
| Project-page prose had no width limit and no list styling | Content was raw markdown outside `.prose` |
| Project page used the removed `btn--primary` class | Button rendered as plain text |
| Five gallery images were rotated 90° | Source frames stored landscape, portrait content |
| `_layouts/project.html` asked for `layout: none` | No `_layouts/none.html` exists |
| Activities page used styles deleted in the rebuild | List items ran together |
| `build.sh` did not clean `_site` | Removed assets could linger |

### Missing (added)

Ideas / working-notes layer · Research System by capability · signature instrument ·
scroll-spy navigation · publication filter · section rail · designed favicon and OG card ·
`prefers-reduced-motion` handling for every animation · no-JS parity.

## Post-implementation review — issues found and fixed

| Found by | Issue | Fix |
|---|---|---|
| DOM inspection | `<p class="hero__chain">` contained an `<ol>`; the parser auto-closed the `<p>` and orphaned the chain and its link | `<div>` |
| `jekyll build --verbose` | `jekyll-theme-primer` shipped 76 KB of unused `assets/css/style.css` | `theme: null` |
| `_site` listing | Eight audit/planning `.md` files published as live HTML pages | moved to `docs/archive/` |
| axe-core | Tertiary ink was 3.88:1, failing 30+ nodes | re-derived to 5.4:1 from source |
| axe-core | Dimming past instrument layers with group opacity pushed their own labels below the contrast floor | dim `stroke-opacity` only |
| axe-core | `<aside>` nested inside a section | `<div>` / labelled `<section>` |
| axe-core | `404.html` had no `main` landmark | wrapped |
| Screenshot at 1280 | Project-page prose at ~200 characters per line, lists unstyled | wrapped in `.prose` |
| Screenshot at 1280 | Five gallery images rotated 90° | re-oriented and re-encoded |
| Rendered output | `btn--primary` no longer existed; the button rendered as plain text | `btn--solid` |
| Screenshot at 320 | Identity line wrapped raggedly; "Read the thesis" split across two lines | atomic parts with a non-breaking separator; single-column full-width targets |
| Screenshot at 1440 | Section rail read as stray ticks over the hero | rail appears only after 70% of a viewport of scroll |

## Verification method note

Lighthouse's bundled Chrome began reporting `NO_FCP` on every page — including a trivial test page —
so it could not be re-run at the end. Core Web Vitals were measured directly with
`PerformanceObserver` under a 4× CPU throttle and Slow 4G network emulation, and accessibility was
measured with axe-core 4.10.2 over the full scroll of every page. An earlier Lighthouse run on this
build scored 100/100/100/100 (desktop) and 97/100/100/100 (mobile).

## Second-pass correction — the page was about the thesis, not the person

Self-review after the first deploy found a structural fault, not a cosmetic one. The objective
specifies a hero of *name + thesis statement + minimal identity*, and the build had inverted it:
`Spatial Intelligence` was the `h1` and the largest element on the page, the visitor's name was a
12px grey metadata line above it, the portrait was 4,000px down in the record section, and the
standfirst was a research question whose subject was "AI" rather than "I". Every section heading
was meta — *Organised by capability, not by year*, *For the people who check it* — so the page
spent its budget explaining how it was arranged instead of describing a researcher.

Worse, the job-talk planning notes had already named the failure mode:

> The worst thing to do is label Hydra, Adonis, Proteus, SPIRIT, AURA, Mímir and Snotra all
> "Spatial Intelligence" and then present them in chronological order. Senior faculty will
> recognise this as retrospective branding immediately.

The first build was exactly that: one label over a chronological pile of papers.

### What changed

| Before | After |
|---|---|
| `h1` = `Spatial Intelligence` | `h1` = **Yimeng Liu**, `clamp(2.4rem, 9.6vw, 9.5rem)` |
| Name in a 12px grey `<p>` above the title | Portrait plate beside the name, bottom-aligned |
| Portrait buried in the record section | Portrait in the hero, 84–200px, the page's only chromatic moment |
| Standfirst subject: "AI" | Standfirst subject: "I work on AI that has to know where it is" |
| "What I believe" — three axioms | "What the work convinced me of" — conclusions drawn from Hydra / Proteus / Adonis |
| Six sections, all meta-headed | Seven sections, each named after one of the person's threads |
| No forward-looking layer | New **05 — Where this goes**: three research questions, each with capability and honest status |
| "Organised by capability, not by year" | "Five things a system has to be able to do" |
| "For the people who check it" | "The record, in full" |
| Nav: Thesis / System / Work / Ideas / Publications | Nav: Position / Agenda / Work / Next / Record |
| OG card: "Spatial Intelligence" dominant | OG card: portrait + **Yimeng Liu** dominant, field as eyebrow |

The 0.55-opacity rail key measured **4.03:1** against the active item's ink — under AA at 11px.
Raised to 0.68 (≈6:1). It was only caught because axe was run *after* letting the scroll-spy's
colour transition settle; sampling mid-transition had reported a colour that never occurs in
steady state, and sampling the settled state is what proved the real number.

### A boundary that had to be drawn first

`~/Downloads/jobtalk` contains camera-ready papers plus three ICLR '27 submissions. SPIRIT, Mímir
and Snotra are all **double-blind under review**, so none may be named, described, quantified or
linked publicly. `docs/DISCLOSURE.md` records the decision; the site states only the *questions*
those papers answer, because a question is agenda and an answer is a result. Verified: 0
occurrences of SPIRIT / Mímir / Snotra / "under review" / "Agent for Irrigation" anywhere in
`_site`.

The MobiSys 2026 driving PDF could **not** be claimed as published: it carries no ACM
camera-ready block and its LaTeX still holds the *Hydra* MobiCom '24 DOI, and it has ten authors
across two institutions. The site therefore still describes that work as ongoing.
