# Design Doc — Spatial Intelligence Research Narrative (`2026-09-06`)

## 1. Summary

Refine the rebuilt Yimeng Liu homepage from the broad **"Physical AI for the Real World"**
positioning into a sharper, long-horizon **Spatial Intelligence** agenda. No large-scale UI
teardown; this phase is **research-narrative finalization + visual articulation**.

Core scientific question (unifying framing for the site):

> **How can AI build and continuously update an understanding of a dynamic physical space
> from incomplete multimodal observations, and use that understanding to reason, predict,
> and act?**

This doc is a **content + narrative** design. It changes `_data/vision.yml`, `_data/featured.yml`,
`_includes/hero.html`, `_includes/vision.html`, `_includes/featured.html` and their
`_sass/_components.scss` styles. It does **not** touch layouts, config, or other sections.

## 2. Narrative architecture — three layers, never four equal stages

The Research Vision section must present **exactly** three layers that are also the
page's visual maturity gradient:

### Layer A — Published Foundations (what I have demonstrated)
Strong published evidence, highest maturity. The first three stages below each carry
**one honest** flagship as evidence.

### Layer B — Current Research (what I am building now)
Ongoing, lower maturity, clearly labeled `Ongoing`. The fourth stage (Embodied
Intelligence / driving) sits here — **never** presented as published Stage-4 capability.

### Layer C — Future Research Agenda (where the research is going)
A single closing block, **no** project cards. `SPIRIT` / sparse reconstruction /
dynamic world modeling / spatial reasoning-prediction appear **only here** as future
directions, not as demonstrated results.

The chain is a **capability evolution** — early stages proven, later stages in progress —
never "we solved four problems in sequence."

## 3. Shared definition — "Spatial Intelligence" by five questions

Spatial Intelligence is defined operationally (not as branding) by a question sequence,
which becomes the animation / info-design basis:

| Question | Capability stage |
|---|---|
| **What is there?** | Perception |
| **Where is it and how is it related?** | Spatial Representation |
| **How is the world changing?** | World Modeling |
| **Why is it changing, and what happens next?** | Spatial Reasoning & Prediction |
| **What should the agent do?** | Embodied Intelligence |

This five-question ladder replaces the current four-key chain in the Research Vision.
Because the user's five-stage chain (Multimodal Perception → Cross-modal Representation →
Physical/Spatial Modeling → Spatial Reasoning → Embodied Intelligence) is **five** stages,
**not** four, the current `vision.yml` (Sense/Model/Reason/Act) data model must grow to
five entries and the SCSS grid must adapt accordingly.

## 4. Research Vision — stage definitions (with honest evidence mapping)

Five stages (reading order = maturity shaping):

1. **Multimodal Perception** — observe people, objects, and environment via vision,
   mmWave/RF, human/vehicle sensing. Complementarity across modalities on the same
   physical state. **Evidence: Hydra** (complementary multimodal perception under
   adverse physical conditions — NOT "leaf wetness detection" as the headline).
2. **Cross-modal & Spatial Representation** — transform and fuse information across
   modalities into a more stable physical/spatial representation.
   **Evidence: Proteus** — must be stated as *cross-modality knowledge transfer*
   (when one modality is unreliable/unavailable), **not** as a complete unified 3D
   spatial world representation.
3. **Physical / Spatial Modeling** — recover physical structure, geometry, state, or
   fine-grained spatial information from sparse/noisy observations.
   **Evidence: Adonis** — efficient mmWave imaging recovering fine-grained physical
   state; **do not** describe Adonis as "World Model + Reasoning."
4. **Spatial Reasoning** — on an evolving spatial state, understand object–object,
   human–object, agent–environment relationships, track change, predict next.
   **Status: no published evidence yet → Future agenda** (this is where dynamic world
   modeling, spatial reasoning & prediction live).
5. **Embodied Intelligence** — grounded decision and action in real systems: driving,
   robotics, smart spaces, agriculture.
   **Evidence: Cognitive Driving project — labeled `Ongoing / Current Research`,
   never implied as a proven Stage-5 capability.**

Visual design rule: with five stages, use a **continuous spatial-information evolution
flow** (real-world people/objects/environment → multimodal observations → structured
spatial state → evolving world model → reasoning/prediction → action). Scroll reveals
"the AI knowing progressively more about space." Do **not** render four equal-width
SaaS cards.

## 5. Motivation (precision over rhetoric)

Do **not** say "LLMs only understand 2D." Accurate framing:

> Today's foundation models are strong on static vision and language, but stable
> understanding of *continuously changing, partially observable, multi-entity*
> real environments — maintaining spatial state over time, obeying physical
> constraints, predicting, and acting grounded in that state — remains hard.

Used as a one-line `lede` in the Research Vision section.

## 6. Hero (unchanged text, confirmed)

- H1: **"Building Spatial Intelligence for the Physical World"**
- Keep existing identity line (name, Ph.D. candidate, MSU) and action links.
- No keyword stacking.

## 7. Featured Research — capability labels, not stage numbers

Keep the four representative slots but relabel as **capability labels** (not
Stage 1/2/3/4, which would imply a designed pipeline the papers don't form):

- **MULTIMODAL PERCEPTION — Hydra**
- **CROSS-MODAL LEARNING — Proteus**
- **PHYSICAL REPRESENTATION — Adonis**
- **SPATIAL REASONING & ACTION — Driving · Ongoing**

Copy rule for Hydra/Proteus/Adonis: foreground the **generalizable scientific
capability** (above), not the leaf-wetness application. Every generalization must be
grounded in the paper's real method/experiments; no claim beyond the evidence.

## 8. Where this is leading (closing block, no project cards)

> From isolated sensing → persistent spatial state → dynamic world models → spatial
> reasoning and prediction → embodied decision and action.

Expresses 5–10 year agenda, not publication evidence. `SPIRIT` is intentionally
**excluded** from homepage flagship narrative (per prior decision).

## 9. What must change per file

| File | Change |
|---|---|
| `_data/vision.yml` | Replace 4 keys with the 5-stage ladder; add per-stage: key, title, question, blurb, evidence label, status (foundation/current/future) |
| `_includes/vision.html` | New 5-stage continuous flow with scroll-reveal; motivation lede; evidence line per stage; closing "Where this is leading" block; question as the visible definition |
| `_includes/hero.html` | H1 copy → "Building Spatial Intelligence for the Physical World" |
| `_data/featured.yml` | Add `capability` label field per card (MULTIMODAL PERCEPTION / CROSS-MODAL LEARNING / PHYSICAL REPRESENTATION / SPATIAL REASONING & ACTION · Ongoing) |
| `_includes/featured.html` | Render capability label as small eyebrow above each card title |
| `_sass/_components.scss` | Vision section: 5-stage continuous flow styles, revealed-maturity treatment (visual fade from strong to lighter across stages), question typography; featured card capability-label styling (reuse `eyebrow` token) |

Note on images: research/section imagery for the Vision stages reuses existing
published figure assets (`hydra/proteus/adonis/driving_bg` .webp) already in repo —
no new asset procurement in this phase.

## 10. Constraints & non-goals

- **No** large-scale UI rebuild; design system tokens unchanged.
- **No** new sections beyond the Vision rework; no new layouts or pages.
- **No** SPIRIT insertion.
- No fabrication: every stage/paper link must match the evidence table in §4.
- Reduced-motion + a11y guarantees from the rebuild remain intact (all additions are
  CSS/Liquid only, consistent with existing reveal system).

## 11. Acceptance criteria (how a faculty visitor reads it)

After ~60s, a faculty who does not know Yimeng can accurately restate:

> **Yimeng Liu studies Spatial Intelligence: how AI can move from incomplete multimodal
> observations to structured and persistent representations of the physical world, then
> reason about how that world evolves and ultimately support grounded action. His
> published sensing work provides the foundations, while his current and future research
> pushes toward dynamic world models, spatial reasoning, and embodied intelligence.**

Verification checklist after implementation:
1. Production build: 0 errors/warnings.
2. Vision section renders 5 stages with correct Q/A mapping, evidence labels grounded
   in published papers, and maturity visual gradient.
3. Featured cards show capability eyebrows; Driving marked Ongoing.
4. No 2D-LLM overclaim; motivation lede matches §5.
5. `prefers-reduced-motion` + keyboard nav still pass Lighthouse a11y checks.
6. No regressions in other sections (links/build/Lighthouse).