# Research identity redesign

## Evaluation before implementation

Problem: the first screen uses most of its height on a portrait/name and a 60-word question; direct actions fall below a 1,000px viewport. The homepage contains 4,193 words; journey/work repeat 1,756 words of technical explanation. Driving is described as changing a car's actions, although the public preprint proposes driving assessment. No Chinese version or dark theme exists. Representative papers have no dedicated case-study pages.

Baseline: main@741e7b5d, clean working tree. Seven homepage sections. Existing eight-width overflow and ten axe page/viewport checks pass. Docker Jekyll generation 1.34s; upstream Ruby/Faraday startup warnings exist. Current production content verified in browser. Scholar could not be fetched; keep user-provided record, remove citation counters rather than present unverified live impact. Original CV and talk downloads remain unchanged.

Success: identity, affiliation, research question and CV/Scholar/GitHub/email visible on desktop first screen; <=1,100 narrative English words before the record. One trajectory connecting published sensing work to explicitly labelled current questions and three future thrusts. Four bilingual case studies, bilingual homepage/record/service/news/404/writing. Real public-paper assets with source-bound captions. Light/dark modes, persistent manual theme, accessible mobile menu, complete no-JS and reduced-motion reading. Zero disclosure hits, broken internal links, missing image attributes, duplicate IDs, heading skips or axe violations. No overflow at 320/360/390/430/768/834/1280/1440. Target LCP <2.5s and CLS <0.1 under the existing audit's throttle; record real results, not forecasts. Attempt Lighthouse and distinguish tool failure from a site score.

Verification: production Docker build, existing audit.js with explicit SITE_ROOT, expanded temporary bilingual/theme/page audit, browser screenshots per section and breakpoints, keyboard/theme/navigation interactions, JS syntax, source/asset/disclosure scans, actual GitHub Pages deployment after authorized commit/push.

## Art direction

Reading this as: a researcher identity for committees, collaborators and technical readers, with precise editorial storytelling grounded in actual sensing observations.

Taste dials: variance 7 / motion 4 / density 3. Anthropic frontend-design sets subject-led art direction; Taste and Redesign provide critique; UI/UX Pro Max editorial-grid result and reduced-motion guidance inform implementation. Reject its generic SaaS conversion structure, blue palette and font substitutions: repository palette/type and the scientific audience govern.

Palette: paper #faf9f5, ink #16150f, secondary #4a473f, muted #6b6659, green #17503f. Amber #d8a24a only for uncertainty. Dark: #111813, #eaece5, #b3bcaf, #86b99c. Times display, self-hosted Newsreader prose, Plex Mono only for measurement labels. Native system sans for controls; CJK system serif/sans fallbacks.

Composition: identity-led split hero with real paired RGB/SAR observations; one broad statement about partial observability; compact chronological journey; image-led research essays; three spatially staggered agenda rows; brief research principles and an actual essay; compact record and personal contact. Avoid identical cards, ornamental charts, numbered eyebrows, slogans and repeated section explanations. No scroll hijacking. One observation switch explains modality differences; CSS image reveals establish rhythm; sticky project/journey headings sustain context.

Minimum system: existing Jekyll/Liquid, data-driven bilingual content, the existing five Sass modules and a small native JS module. No runtime dependency or framework migration.

## Source boundaries

Use only named camera-ready Hydra/Proteus/Adonis PDFs and ZIPs from jobtalk, the public driving preprint, public figures, existing public photos, verified bibliography and CV education/service. Do not open confidential manuscripts or mixed jobtalk decks. Retain paper titles/authors in their source language. mmLeaf is a poster. Driving is arXiv, never a conference publication or clinical result. Future work is questions, not implementation or results. Remove the old speculative technical descriptions rather than republish them.

## Todo

- [x] Inspect repository, live page, safe asset inventory and install design skills.
- [x] Record baseline, success criteria, art direction and evidence boundaries.
- [x] Rebuild bilingual narrative and real-paper asset provenance.
- [x] Implement homepage, case studies, writing and academic record design.
- [x] Verify theme, language, mobile, keyboard, reduced-motion and no-JS behavior.
- [x] Critique screenshots and iterate; run all regression/performance/disclosure checks.
- [ ] Commit, push and verify the deployed pages.
