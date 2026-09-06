# Homepage Story Architecture

Phase 2 wireframe for the homepage redesign. This document fixes the visitor journey
before the Spatial Intelligence interaction is implemented.

## Visitor journey

The homepage keeps **About me as the second major section**, preserving the personal
homepage identity while making the research statement the spine of the rest of the page.

```text
Sticky navigation
    |
Hero — Who I am / what I study / 10-second orientation
    |
About me — personal identity, position, affiliation, direct links
    |
Research question — why incomplete observations are not enough
    |
Spatial Intelligence — one definition and one unified physical-space visualization
    |                    (Physical World -> Perceive -> Represent -> Model ->
    |                     Reason & Predict -> Act)
    |
Featured Research — evidence for capabilities already established
    |
Past -> Present -> Future — why the research trajectory is continuous
    |
Publications — primary scholarly record and research artifacts
    |
Highlights — low-weight current timeline, only when there is meaningful news
    |
Footer / secondary pages — CV, Activities, Projects, Other Builds
```

## Section contract

| Order | Section | The one question it answers | Heading / lede | Primary CTA |
|---|---|---|---|---|
| 1 | Hero | Who is Yimeng Liu and what is the research identity? | **Building Spatial Intelligence for the Physical World.** / “AI should move from incomplete multimodal observations to persistent understanding of dynamic physical spaces—and support grounded action.” | **About me** |
| 2 | About me | Who is the person behind the agenda? | **About me** / concise position, advisor, affiliation, and research interests | **Download CV** |
| 3 | Research question | What fundamental problem motivates the work? | **The physical world is only partially observed.** / static recognition is not persistent spatial understanding | **See the research framework** |
| 4 | Spatial Intelligence | What does Spatial Intelligence mean operationally? | **From observation to grounded action.** / the approved definition plus one visual system | Scroll through the unified scene |
| 5 | Featured Research | What capabilities has previous work demonstrated? | **Research capabilities, made concrete** / each flagship project uses Research Question → Core Idea → Evidence → Result | **Read project / paper** |
| 6 | Past → Present → Future | Why is the research trajectory continuous? | **From sensing the physical world to understanding and acting within it.** / foundations, current work, future agenda | **View the full research context** |
| 7 | Publications | Where is the scholarly record? | **Publication record** / selected papers first, then the complete list | **PDF / Paper / Code / Dataset / BibTeX** |
| 8 | Highlights | Is there meaningful recent news? | **Recent milestones** / low-weight timeline; no filler updates | **Full timeline** |

## Copy and content decisions

### Keep on the homepage

- Yimeng Liu, Ph.D. candidate, Michigan State University, and the Spatial Intelligence
  identity-level statement.
- The exact five-part research framework and the six-step visual sequence.
- Hydra, Proteus, and Adonis as published capability evidence.
- Cognitive Driving / Senior Driving Safety as an explicitly ongoing, human-centered
  bridge toward dynamic spatial reasoning and grounded action.
- The past → present → future transition and the publication record.

### Merge or shorten

- Merge the current vision’s long “definition” and “future research agenda” prose into
  the research-question introduction, the visual captions, and the Phase 5 transition.
- Replace repeated project “problem / contribution” paragraphs with compact evidence
  rows: question, idea, visual evidence, and result.
- Keep the About facts, but remove research claims that repeat the hero and vision.
- Keep Highlights only as a quiet factual timeline; it should not compete with the
  research statement.

### Move to secondary pages

- Full project descriptions, complete methods, extended experiment details, and all
  non-research builds belong on project pages.
- CaspianPost remains available as a secondary build but is removed from the core
  research narrative.
- Full service/activity history remains under Activities & service.

## Copy budget

The new homepage should reduce explanatory prose by approximately 25–35% by using one
shared visualization, short evidence labels, and links to details. Accuracy is not
reduced: published, current, and future claims remain explicitly labeled.

## Phase 2 acceptance

- About me remains the second major section.
- Every homepage section has one distinct visitor question.
- The visitor journey is Who I am → problem → definition → progressive understanding →
  evidence → trajectory → record.
- The unified visualization is reserved for Phase 3; no animation is required to accept
  this wireframe.
- Unsupported LLM/CARLA driving language is excluded from the approved architecture.
