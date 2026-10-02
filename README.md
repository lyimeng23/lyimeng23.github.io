# lyimeng23.github.io

Personal academic site for **Yimeng Liu** — Ph.D. candidate in Computer Science and
Engineering at Michigan State University.

The site is organised around an intellectual thesis rather than around a paper list:

> **Spatial Intelligence** — from incomplete observation to grounded action.

Everything on the homepage is an instance of that thesis: sensing that survives the loss of a
modality, representation that survives the loss of a frame, and a chain that runs from what is
observed to what is done.

## Structure

| Path | Purpose |
|---|---|
| `index.md` | Homepage entry point (layout: `homepage`) |
| `_data/agenda.yml` | **Single source of truth** for the six-stage chain — used by the hero, the instrument and the step list |
| `_data/thesis.yml` | Hero statement, footer signature, and the three working beliefs |
| `_data/system.yml` | The Research System: five capability layers with honest maturity and evidence |
| `_data/work.yml` | Selected Work, one entry per project (Problem / Insight / Built / Evidence / Why) |
| `_data/ideas.yml` | Open questions and standing notes — explicitly *not* results |
| `_data/publications.yml` | Publication record with topic tracks (used by the filter) |
| `_data/record.yml` | Education, positions, service, talks |
| `_data/news.yml` | Timeline entries |
| `_data/nav.yml` | Primary navigation |

Includes live in `_includes/`; the visual system is in `_sass/` (`_tokens` → `_base` →
`_layout` → `_components` → `_motion`).

## The signature interaction

`_includes/instrument.html` renders one inline SVG scene — a plan-view intersection with an
observer, a field-of-view wedge, millimetre-wave returns, persistent entities, temporal trails,
an uncertainty cone and a committed action. Scrolling the six step cards advances the scene
through **Physical World → Sense → Represent → Model → Reason → Act**, accumulating layers
rather than swapping them. Hovering the panel shows a crosshair with a metric readout.

The panel drifts 16px across the section — a depth cue that says the scene is a different plane
from the text beside it. It is transform-only, rAF-throttled, active only while the section is on
screen, and disabled under `prefers-reduced-motion`.

Progressive enhancement: without JavaScript the scene renders its base state and every stage is
still fully described in the adjacent text.

## Local development

The `github-pages` gem stack pins Jekyll 3.9, which needs Docker (system Ruby is too old).

```bash
./build.sh          # serve on http://localhost:4000 with live reload
docker run --rm -v "jekyll_gems:/usr/local/bundle" -v "$PWD":/srv/jekyll \
  -e JEKYLL_ENV=production -w /srv/jekyll jekyll/jekyll:4 \
  bundle exec jekyll build
```

`theme: null` in `_config.yml` is deliberate: the `github-pages` gem otherwise injects
`jekyll-theme-primer`, which silently publishes an unused `assets/css/style.css`.

## Fonts

`assets/fonts/` contains self-hosted, latin-subset woff2 files for **Instrument Serif**
(display), **Newsreader** (text) and **IBM Plex Mono** (labels, data, navigation) — all under
the SIL Open Font License, with licence texts alongside. Only the weights used above the fold are
loaded, and metric-matched local fallbacks prevent layout shift on swap.

## Regenerating the OpenGraph card

`docs/og-preview.html` is the source for `assets/img/og.png` (1200×630). Serve the built site
over HTTP, open that file, and screenshot it at 1200×630.

## House rules

- No claim, number, venue, award or date that is not in a paper, the CV or `_data/`.
- `project/caspianpost/` is excluded from the build: it is an unrelated product page and is not
  part of the research narrative.
- Planning notes and past audits live in `docs/` and are excluded from the published site.

## Licence

Code and content © Yimeng Liu. See [LICENSE](LICENSE). Third-party fonts are OFL-licensed.
