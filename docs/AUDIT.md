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

---

## Third pass — a requirement audit that found three real gaps

After the rebuild was "complete" and verified, each clause of the brief was checked against the
built page rather than against my memory of what I had built. Three failed.

### Gap 1 — the hero had no visual of consequence

Measured, not judged: the largest visual in the hero was 4% of the viewport and the portrait was
268px. There was no scale to speak of.

The obvious fix — enlarge the portrait — was not available. Every image on disk was checked for
what can carry scale without resampling, and the portrait (299×400) is the only version that
exists anywhere: Downloads, Desktop, Documents, Pictures and the resume PDF were all searched.
At hero size it would have to upscale.

So the hero was scaled **typographically**: the name is resolution-independent, and the plate is
now sized `clamp(80px, min(26vh, 26vw), 300px)` — about 234px wide at desktop, which
*downscales* from the 299px source rather than stretching it.

Reusing the Hydra field photograph for the hero was considered and rejected: it carries figure
annotations ("Testbed", "Camera"), so at hero scale it reads as a paper figure, and it already
appears in the Evidence section.

### Gap 2 — a diagram that was deleted rather than shipped

The brief asks for abstract concepts to be explained visually. A "partial observability" figure
was composed for the Why section: a space, an obstruction, the thing to be known, two coverage
wedges, and a pocket labelled UNOBSERVED.

The first render was broken — a `clipPath` was declared and never referenced, so both wedges drew
straight out of the space, with sweeps over 60°. Both were fixed.

The second render exposed something worse. The box labelled UNOBSERVED was visibly covered by the
optical wedge. Rather than trust the eye, the geometry was computed: the box's top-left corner
lies at bearing 29.9° and distance 228 from the optical sensor, which is inside the 8–42° wedge.
Separating it from the target at 15.9° would require a 9° sliver, not a sensor field of view.

The geometry could not be made honest with a small fix, so the figure and its CSS were removed and
the built output verified to contain zero references. **A diagram that misstates its own claim is
worse than no diagram**, and the Why section already carries the argument in three premises.

### Gap 3 — the future agenda had no spatial close

Closed typographically rather than illustratively. The three thrusts are Open / In progress / Open,
so they sit on one horizontal axis at desktop: dashed beneath an open question, solid beneath the
one in progress, with the single filled dot on the page marking what is actually being worked on.

This restates a status the page has already committed to in the tag beside each thrust, so unlike
the coverage diagram it cannot assert anything new.

---

## Verification method problems worth recording

Three times this session, a check reported success while the thing it checked was still broken.
All three were caught by looking at the rendered output instead of trusting the instrument.

| Failure | How it presented | What actually happened |
|---|---|---|
| Silent text replacement | tool reported success | two `str.replace` calls matched nothing; only the screenshot revealed the old text |
| Class-selector mismatch | CSS looked correct | selectors were `.cp__wave path` while the markup put the class on the `<path>` itself, so **no rule matched** and elements fell back to `fill: black` |
| Stale build | source verified clean, build was not | the screenshot was served from a previous `_site`; the build still contained a rule the source no longer had |

The general lesson: `replace()` returning without error is not evidence, and a rule that appears
correct in the stylesheet is not evidence unless the selector matches the emitted markup.

Three genuine defects were also found only by measuring rather than looking:

- The section rail overlapped body text by **31px at 1440px**. Three fixes were attempted (gutter
  on `body`, on `main`, on `.container`); the first clipped the full-bleed nav, the second did not
  constrain the container, the third measured unchanged. The problem was removed instead: the rail
  is progressive enhancement and now renders only at ≥1600px, where there is real clearance.
- The `Fig. 01` badge sat in the figure's top-right corner, which is exactly where the fixed rail
  renders its active label.
- `26vh` sizes the portrait by viewport *height*; on a tall narrow phone it consumed 234px of a
  280px content column and pushed the page to 467px wide.

## Things that were verified rather than assumed

- **Alignment.** An automated check reported inconsistent left edges at 390px. Probing which
  elements sat at each edge showed 23/23 content elements sharing one edge, with the outliers
  being nav chrome. The alarm was a false positive.
- **Contrast.** Every distinct rendered text/background pair was measured rather than read off a
  token table; 12/12 pass AA, lowest 5.43:1 at 13px. Forcing OS dark mode confirmed the page does
  not invert — which required `color-scheme: light` in CSS, since the meta tag alone does not
  govern UA-rendered surfaces.
- **Keyboard.** All five pages tabbed programmatically: first stop is "Skip to content"
  everywhere, zero elements without a focus ring, Escape closes the mobile drawer, and 9/9 drawer
  links are visible and keyboard-reachable when it is open.
- **Reduced motion.** 0 of 19 reveals hidden and 0 stuck mid-fade.
- **Reachability.** Projects, papers (10 PDF), systems, datasets, code, talks, writing and the
  record are all reachable, and all seven named systems appear.

## Claims that were removed rather than softened

- The accuracy figures **96% / 96.3% / 90%** appear in no part of the source of the papers that
  claim them. Checked `main.tex` and every included `.tex` in all three archives. Removed.
- Hydra's own paper uses **both** 76–81 and 77–81 GHz for different radar configurations; the
  site printed one number without saying which.
- "Mild cognitive change **raises** driving risk" is a causal clinical claim. It appeared both in
  `_data/work.yml` and on `/project/senior-driving/`; both were corrected, so the two pages no
  longer contradict each other.
- "Surfaces early signs" and "flags early signals of decline" imply a detection capability the
  study does not have and has not evaluated.
- JSON-LD advertised **World modelling** and **Grounded action** as established expertise, and the
  meta description asserted "reasoning, predicting, and supporting safe action" as current.
