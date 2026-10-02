# Personal Homepage Calibration Audit

Audit date: 2026-09-06

This audit precedes the next implementation phase. It evaluates the deployed
Spatial Intelligence redesign as a personal academic homepage, not as a code or
visual regression audit.

## Current visitor impression

The page is accurate and polished, but the first impression is still closer to a
research statement / job-talk opening than to a personal academic homepage. The
hero makes the research positioning visually dominant, while the person is reduced
to an eyebrow, a portrait, and a long title. The unified scene is a strong
explanation of Spatial Intelligence, but its size and the subsequent trajectory
section make the site feel like a research program microsite.

## Current structure and measured proportion

Current DOM order:

```text
Hero -> About -> Research Vision -> Featured Research -> Research Trajectory
      -> Publications -> Highlights
```

Local production browser measurements with reduced motion enabled:

| Section | 1440px height | 390px height | Diagnosis |
|---|---:|---:|---|
| Hero | 806px | 1,201px | Identity is present, but the research H1 and long lede dominate; mobile is too tall |
| About | 657px | 1,289px | Useful identity content, but it arrives after an oversized hero |
| Research Vision | 1,744px | 2,227px | Correct but oversized for a personal homepage; six-step scene reads like the site’s main product |
| Featured Research | 1,913px | 3,224px | Strong evidence, but the volume exceeds the personal introduction |
| Research Trajectory | 781px | 1,560px | Repeats part of the vision and increases research-statement feel |
| Publications | 1,827px | 2,475px | Appropriate as a scholarly record, but should follow a shorter research explanation |
| Highlights | 860px | 1,128px | Real timeline, but currently appears too late and is visually underweighted |

The page contains approximately 8,913 characters of main content. Research Vision,
Featured Research, and Research Trajectory together account for about 4,438px at
1440px, compared with 1,463px for Hero + About. This ratio is the primary calibration
problem.

## Identity findings

- Positive: the hero already includes Yimeng Liu, Ph.D. Candidate, Michigan State
  University, portrait, CV, and a concise Spatial Intelligence positioning.
- Needs improvement: the H1 is a three-line research-program statement at desktop
  and consumes most of the mobile first screen; the person’s name is only an eyebrow.
- Needs improvement: email is plain footer text, not a direct `mailto:` entry; Scholar,
  GitHub, and CV are mostly icon or lower-page actions rather than a clear identity
  rail in the hero.
- Needs improvement: About is structurally second, but its personal context is not
  visible until after the oversized research hero.

## Research findings

- The Spatial Intelligence definition is accurate, but the page currently presents
  the full five-part framework, six-step scene, four evidence cards, and a separate
  past/present/future timeline. Together they over-explain the same research arc.
- The dynamic scene should remain as one concise visual proof, but it should occupy
  less vertical attention and be introduced after a short personal introduction.
- The distinction between published foundations, current research, and future agenda
  is already honest and should be preserved while shortened.

## Required target structure

```text
Person
  -> short personal introduction / identity rail
Research
  -> concise Spatial Intelligence positioning and one visual
Selected Work
  -> Hydra, Proteus, Adonis, Driving as evidence of accumulated capability
Publications
  -> complete data-driven scholarly record
Updates
  -> personal academic milestones and current activity
About / Activities
  -> advisor, education, service, talks, collaboration, contact
```

About remains available as a direct section and in the global navigation, but the
first content after the hero should feel like meeting Yimeng before entering the
research explanation. A compact About / identity block may remain second to preserve
the existing personal-homepage decision.

## Phase boundary

This audit makes no source changes to the page. The next implementation phase should
first resize and rewrite the identity surface, move meaningful updates earlier, and
compress the Research Vision / trajectory copy. It should not introduce another
visual system or another research framework.

## Audit acceptance

- The current page is measurable as research-heavy rather than merely described as such.
- The personal identity gaps are explicit: hero hierarchy, direct contact links, and
  introduction placement.
- The existing research truth and Spatial Intelligence mainline are preserved as the
  research layer, not removed.
