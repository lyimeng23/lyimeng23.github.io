# Phase 9 — Final Faculty Test

Audit date: 2026-09-06

Tested against the local production Jekyll page after the final implementation, at
1440px with reduced motion enabled.

## 10-second test — identity

Pass. The first screen combines the portrait, `Yimeng Liu`, `Ph.D. Candidate`, Michigan
State University, and the H1 `Building Spatial Intelligence for the Physical World.`
The first CTA is `About me`, and About remains the second major section in the DOM.

## 30-second test — fundamental problem

Pass. The Research Vision introduction states that the physical world is only partially
observed and distinguishes persistent spatial understanding from one-time detection.

## 60-second test — complete research line

Pass. The page exposes the sequence:

```text
incomplete multimodal observations
  -> PERCEIVE
  -> REPRESENT
  -> MODEL
  -> REASON & PREDICT
  -> ACT
```

The unified scene keeps the same ego vehicle, pedestrian, other vehicle, traffic light,
road, and environment while adding each layer. The six adjacent step descriptions make
the same argument without motion.

## Evidence test

Pass. The page distinguishes:

- **Published foundations:** Hydra, Proteus, and Adonis with capability labels and
  quantitative key results.
- **Current research:** Cognitive Driving / Senior Driving Safety, explicitly ongoing and
  without a claim of a published spatial-reasoning model or closed-loop policy.
- **Future agenda:** persistent state, dynamic world models, prediction, interaction,
  and embodied decision/action.

## Counter-interpretation test

Pass. The rendered homepage contains no `CaspianPost`, no `LLM-grounded`, and no `CARLA`.
It does not present leaf wetness as the identity-level research question, does not claim
that world modeling or reasoning is complete, and does not turn unrelated applications
into artificial pipeline stages.

## Identity test

Pass. The final interpretation supported by the page is:

> Yimeng Liu studies Spatial Intelligence: how AI can move from incomplete multimodal
> observations to persistent representations of dynamic physical spaces, understand
> relationships and change, predict what happens next, and ultimately support grounded
> action. His previous multimodal sensing and physical representation work establishes
> the foundations; his current and future research extends those foundations toward
> dynamic world models, spatial reasoning, and embodied intelligence.

## Automated rendered-page checks

All passed:

- section order: Hero → About → Research Vision → Featured Research → Research Trajectory
  → Publications → Highlights;
- About is section index 2;
- six spatial story steps and four flagship projects are present;
- published/current/future labels and key-result rows are present;
- no CaspianPost or unsupported LLM/CARLA copy appears on the homepage.

The site is complete when this test remains true on the deployed URL after the final
GitHub Pages build.
