# Phase 8 — Responsive, Accessibility, and Performance Audit

Audit date: 2026-09-06

## Viewport evidence

| Viewport | Full-page screenshot | Result |
|---|---|---|
| 1440px desktop | `docs/baseline/phase-8-desktop-1440.png` | No horizontal overflow; scene and editorial grid render correctly |
| 1280px desktop | `docs/baseline/phase-8-desktop-1280.png` | No horizontal overflow; long research titles remain readable |
| 768px tablet | `docs/baseline/phase-8-tablet-768.png` | Scene switches from sticky two-column layout to stacked layout |
| 390px mobile | `docs/baseline/phase-8-mobile-390.png` | Navigation collapses; scene, evidence, publications, and links remain readable |

The browser audit reported equal `scrollWidth` and `clientWidth` at all four widths,
with no page errors or console errors.

## Accessibility checks

- Semantic `header`, `nav`, `main`, `section`, `figure`, `ol`, `article`, and `footer`
  landmarks are retained.
- Skip link, visible `:focus-visible` states, keyboard-focusable links/buttons, and
  mobile-menu Escape close/focus return are implemented.
- All six homepage images have alt text and explicit width/height attributes; the
  decorative scene context image has an intentionally empty alt.
- The unified SVG includes a title and description; the adjacent six-step text remains
  the primary readable explanation.
- The scene buttons expose `aria-pressed`, and the mobile navigation exposes
  `aria-expanded` / `aria-controls`.
- `prefers-reduced-motion: reduce` removes reveal transforms and scene transitions.

## Lighthouse (local production build)

Run against the local Jekyll production server on 2026-09-06:

| Category | Score |
|---|---:|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Observed metrics: CLS `0`, LCP `1.58s`. The page uses one small native JS file, no
frontend framework, local system fonts, lazy-loaded non-hero images, and explicit image
dimensions.

## Phase 8 acceptance

All required viewport and accessibility checks pass locally. No score-driven content
removal was required.
