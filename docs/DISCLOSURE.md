# Disclosure boundary

Internal decision record. Not published — `docs/` is excluded from the Jekyll build.
Governs what may appear on `lyimeng23.github.io` and in any public talk derived from it.

Rule of thumb: **published and camera-ready is public; anything in review is not; the agenda
(a question, a direction, a capability) is public even when the result behind it is not.**

## Public — safe to name, describe, link

| Work | Venue | Evidence |
|---|---|---|
| Hydra | ACM MobiCom '24 | Camera-ready PDF in repo |
| Adonis | IEEE INFOCOM '25 | Camera-ready PDF in repo |
| Proteus | ACM SenSys '25 | Camera-ready PDF in repo |
| Driving (AURA) | ACM MobiSys '26 | Camera-ready PDF in repo |
| Hydra-Bench | arXiv '25 | preprint |
| AeroEcho | IEEE INFOCOM '25 | published |
| mmLeaf | ACM MobiSys '23 | poster + published |
| Biomimetic sonar | 2022 | published |

### Important honesty caveat

**AURA / Driving (MobiSys '26) is a design-principles and research-opportunities paper.**
Its abstract ends "This paper outlines the design principles, challenges, and research
opportunities needed to build reliable, real-world monitoring systems." It proposes the
framework and its sensing/modelling/analysis design; it does **not** report a completed
end-to-end evaluation. On the site it must never be described as a shipped or evaluated
system, and must not carry performance numbers.

## Confidential — must not appear publicly

| Work | Status | Why |
|---|---|---|
| SPIRIT | ICLR '27 submission | double-blind under review |
| Mímir (Agent for Irrigation) | ICLR '27 submission | double-blind under review |
| Snotra (World Model for Irrigation) | ICLR '27 submission | double-blind under review |

Consequences for the public site:

- Do not name SPIRIT, Mímir, or Snotra.
- Do not describe their methods, architectures, datasets, ablations, or results.
- Do not reproduce their figures, numbers, or paper text.
- Do not link their PDFs or the arXiv/`ICLR27_*` filenames.
- The ICLR '27 papers also carry co-author and submission metadata that must not leak.

**Permitted substitute:** the *research questions* those papers answer. Questions are agenda,
not result, and are safe to state:

1. What can be known from physical evidence?
2. What can be known together?
3. When should intelligence change the world?

The site states these three questions and the capabilities they imply. It does not claim
results from the work behind them.

## Standing honesty rules

- No unpublished result may be presented as a result. Capability that is in progress is
  labelled in progress; capability that is open is labelled open.
- No performance number appears without its paper, and only within that paper's own
  evaluation scope.
- AURA's evaluation status must stay honest even as it becomes more central to the narrative.

## Retrospective-branding warning

Recorded from the job-talk planning notes, because it describes the failure mode this site
was originally built into:

> The worst thing to do is label Hydra, Adonis, Proteus, SPIRIT, AURA, Mímir and Snotra all
> "Spatial Intelligence" and then present them in chronological order. Senior faculty will
> recognise this as retrospective branding immediately.

Mitigation applied to the public site: work is presented as a **trajectory in which each
project forced a specific requirement**, and the aggregate agenda is described as something
that *emerged from* the work rather than a label applied to it. The six-stage chain is framed
as the problem being solved, not as a taxonomy retrofitted onto past papers.