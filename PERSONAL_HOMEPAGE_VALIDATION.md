# Personal Homepage Calibration — Validation

Validation date: 2026-09-06

## Final information order

```text
Hero / Person
  -> Personal Introduction
  -> Research / Spatial Intelligence
  -> Selected Work
  -> Publications
  -> Updates
  -> About / Activities
```

The final rendered DOM matches this order at desktop, tablet, and mobile widths.

## Identity checks

- H1: `Yimeng Liu`
- Visible identity: `Ph.D. Candidate`, Computer Science & Engineering, Michigan State University
- Portrait is in the hero.
- Hero links: `CV`, `Google Scholar`, `GitHub`, `Email`, `Research`, `Publications`.
- Email target: `mailto:liuyime2@msu.edu`.
- The first content after the hero is a short personal introduction, not another research diagram.

## Research checks

- Spatial Intelligence remains the central research positioning.
- The five capability questions remain available inside one compact visual rather than
  a separate full-page trajectory display.
- Published foundations, current research, and future interests remain textually distinct.
- The homepage contains no unsupported `LLM-grounded` or `CARLA` claim.

## Responsive and interaction checks

| Viewport | Result |
|---|---|
| 1440px | pass; no horizontal overflow |
| 1280px | pass; no horizontal overflow |
| 768px | pass; compact scene and evidence stack cleanly |
| 390px | pass; identity, direct links, scene, work, publications, updates, and About remain readable |

Additional checks: all six images have alt text and explicit dimensions; mobile navigation
closes on Escape and restores focus; reduced motion reduces scene transitions to near zero;
no console or page errors were observed.

## Lighthouse on local production server

| Category | Score |
|---|---:|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

CLS is `0`; LCP is `1.51s` in the final run.

## Calibration conclusion

The page now presents a concrete researcher first, then the research positioning and
evidence. Spatial Intelligence is still the most important research sentence, but it no
longer defines the entire first screen or the whole site architecture.
