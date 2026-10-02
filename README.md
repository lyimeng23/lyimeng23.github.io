# lyimeng23.github.io

Personal academic site for **Yimeng Liu** — Ph.D. candidate in Computer Science and
Engineering at Michigan State University.

**The site is organised around the person, not around a thesis and not around a paper list.**
Five threads carry it, and every section is one of them:

| Thread | Section | Question it answers |
|---|---|---|
| Who I am | Hero | Yimeng Liu — name, portrait, minimal identity, first-person statement |
| What I work on | The chain (instrument) | The problem I keep coming back to |
| What I think | Beliefs | What my own systems forced me to conclude |
| What I have built | Research System → Selected work | The work, as evidence rather than as bibliography |
| Where this goes | Roadmap | Three questions, honestly labelled in progress / early / open |

`Spatial Intelligence` is kept as the memorable label for the field, but it sits *with* the
person as a quiet eyebrow rather than replacing them as the headline. The thesis is what the
work adds up to, not what the page is about.

### Disclosure boundary

`docs/DISCLOSURE.md` records what may and may not appear publicly. In short: camera-ready work
is public; **SPIRIT, Mímir and Snotra are ICLR '27 submissions under double-blind review and
must never be named or described**; the research questions they answer are public because a
question is agenda, not result. `docs/` is excluded from the Jekyll build.

## Structure

| Path | Purpose |
|---|---|
| `index.md` | Homepage entry point (layout: `homepage`) |
| `_data/agenda.yml` | **Single source of truth** for the six-stage chain — used by the hero, the instrument and the step list |
| `_data/thesis.yml` | Hero standfirst (first person), field label, and the three convictions |
| `_data/roadmap.yml` | The three research questions, their capability, and their honest status |
| `_includes/roadmap.html` | "Where this goes" — the forward-looking section |
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

The display face is **Times New Roman** — a system font on Windows and macOS, so the page gets
the classical academic voice with **zero bytes of webfont payload**. The stack falls back through
Times, Liberation Serif and Nimbus Roman for Linux.

`assets/fonts/` therefore carries only two self-hosted, latin-subset woff2 files: **Newsreader**
(text) and **IBM Plex Mono** (labels, data, navigation), both under the SIL Open Font License with
licence texts alongside. Both are preloaded, and metric-matched local fallbacks prevent layout
shift on swap. Instrument Serif was the previous display face and was removed along with its
15 KB woff2 when the face changed.

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
