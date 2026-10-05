# Yimeng Liu — personal research site

Bilingual personal academic website, built with Jekyll and published on GitHub Pages.

The homepage opens with personal background, core papers, service, conferences and recent updates. It then explains research thinking and a concise vision. Detailed research figures, studies and the roadmap live on the bilingual Research page. Dedicated case studies, a research perspective, publications, activities and a timeline provide the second layer.

## Run

Docker is the build environment. No local Ruby, global Node package or frontend framework is required.

```sh
./build.sh install   # first run, or after Gemfile changes
./build.sh build     # production output in _site; Jekyll cleans stale outputs
python3 -m http.server 8811 --directory _site
```

`./build.sh serve` optionally runs Jekyll's own watch server on port 4000.

## Content and design

- `_data/identity.yml`: English/Chinese narrative and research agenda.
- `_data/work.yml`: source-bound public case studies.
- `_data/publications.yml`, `record.yml`, `news.yml`: formal academic record.
- `_data/locale.yml`: shared interface translations.
- `_includes/`: shared narrative, navigation and record components.
- `_layouts/`: homepage, case study, general page and site shell.
- `_sass/`: semantic theme tokens, typography, grid, components and motion.
- `assets/js/main.js`: theme selection, mobile menu, observation focus and publication filter.
- `zh/`: fully rendered Chinese routes. Language switching preserves the corresponding page.
- `docs/redesign/`: evaluation baseline, design decisions, asset provenance and final validation; excluded from publication.

All text and images are available without JavaScript. Theme follows the system by default; manual selection persists. Reduced motion disables movement and sticky reading effects. Motion has no continuous loop or scroll hijacking. Paper metadata retains its source language for citation.

## Evidence and publication boundaries

Read `AGENTS.md` and `docs/DISCLOSURE.md` before editing. Use public papers and verified records. Apparatus photographs are not results. Future questions are not completed capabilities. Do not import confidential manuscripts, unsupported numbers or unpublished technical descriptions.

Internal documents, build scripts and agent instructions are excluded in `_config.yml`. New root files must be considered for publication explicitly. Verify the rendered site and all bilingual/theme combinations before committing or publishing.

## Validation

See `docs/redesign/IDENTITY_LED.md` for the latest local revision and validation; `PERSON_FIRST.md` records earlier audience and roadmap decisions. `docs/redesign/VALIDATION.md` records the preceding published version. Repository-required browser audits remain external temporary tooling; no test scripts or browser dependencies are published with the site.
