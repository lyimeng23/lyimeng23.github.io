# Person before research proposition

## Evaluation before changes

Problem: the opening portrait is 48 × 64, affiliation is 12px, and a research proposition plus two scientific images dominate the introduction. The substantial biography, education and advisor are in the last section. The current record also combines bibliography and biography, although they answer different visitor questions. Thus first contact foregrounds an idea before the person who holds it.

Baseline: main@139afad5, clean working tree. Order: hero → why → journey → work → future → thinking → publications → about. English main text measured 811 words in the previous verified build. Baseline DOM at desktop: biography/about begins at y=8,560px, portrait width 48px, role font 12px. The screenshot is retained in external temporary QA output. Existing public paper metadata, source assets and academic facts remain the evidence base.

Success: the first section explicitly states name, current PhD role/institution/advisor, current work, mathematics/sonar background and CV/Scholar/code/contact. A meaningful portrait participates in the identity. Personal introduction and a concise public record precede the research proposition. The later reading sequence answers what I study, how I work, how the questions evolved, how I think and what I want to pursue. Clear headings, short paragraphs, responsive line lengths; no duplicate biography or citation-list wall. English/Chinese and light/dark must remain consistent. Zero axe violations, broken internal links, disclosure hits and overflow across the required widths; no-JS and reduced-motion remain complete.

Verification: Docker build, DOM section order and first-screen information, real browser screenshots 1440/834/390/320, keyboard/theme/language/observation controls, existing audit.js with actual SITE_ROOT, bilingual home/theme regression, cold-load Lighthouse and disclosure/source scans. This turn does not authorize a new commit/push: retain the reviewable local changes under the repository contract.

## Audience and reading tasks

These are design hypotheses based on visitor roles, not a claimed user study.

| Audience | First questions | Deeper questions | Routes |
|---|---|---|---|
| Faculty search committee / research hiring | Who is this person, current position, training, contributions? | Is there a coherent trajectory and credible independent program? | Bio → selected record → journey → agenda → CV/full publications |
| Senior researcher / peer collaborator | Which problem does this person actually work on? | What evidence, representations, evaluation boundaries and shared question? | Bio/current work → question → projects/papers → contact |
| CTO / research director / technical leader | What can this person build and reason about? | What is demonstrated, what fails, what remains a proposal? | Bio → systems → evidence/resources → thinking |
| Domain collaborator | Can this researcher understand my physical measurement problem? | What modality, quantity and real setting; how to connect? | Bio → concrete projects → question → email |
| Prospective student / early-career reader | What is this person's background and path? | How do they choose questions and test assumptions? | Bio → journey → thinking/writing → talks/contact |
| Technical visitor / science reader | What do they do, in understandable terms? | Why is it useful, where can I learn more? | Bio → visual explanation → case studies/writing |

The homepage must serve the common first questions without making people choose an audience label. Do not invent faculty status, a lab, supervision openings, teaching, employment availability or consulting offers.

## Reference research (direct official pages)

- [Chelsea Finn](https://ai.stanford.edu/~cbfinn/): opening identifies role, institution, lab, interests and prior training; direct CV/Bio/Scholar links. Use a compact factual introduction before detailed material.
- [Martin Kleppmann](https://martin.kleppmann.com/): concise first-person current role, specific research and open-source work, then prior experience; writing, talks and publications are distinct routes. Prefer concrete work over a grand slogan.
- [Werner Vogels](https://www.allthingsdistributed.com/about.html): official and personal biography are separately recognizable. Distinguish verifiable background from opinions and philosophy; do not borrow the seniority or persona.
- [Andrej Karpathy](https://karpathy.ai/): chronological work, education, teaching, writing and projects make the person legible through activities. Borrow legible trajectory and artifact links, not reputation-dependent brevity or playful claims.
- [Fei-Fei Li / Stanford](https://profiles.stanford.edu/fei-fei-li): biography and academic record have explicit navigation and factual institutional grounding. Adapt the information hierarchy to a PhD candidate, without an awards/impact wall.

Inference from these examples: identity is a combination of a person, present work, background, public contributions and a way of thinking. It cannot be established by enlarging a thesis slogan. This is a content strategy inference, not evidence that one layout improves hiring outcomes.

## Design decision

Preserve the existing paper/ink/green palette, Times/Newsreader typography, native CSS/JS and real assets. Spend prominence on the researcher: name, portrait and factual bio. Move the paired observation visual into the actual research question section. Separate biography, public record and contact so moving the introduction cannot drag an entire bibliography to the top. Use a compact three-work record with full record/resources available on their dedicated page. Navigation mirrors the visitor questions: About, Publications, Research, Thinking.

Wording: headings name their topic instead of selling a metaphor. Remove “one level deeper,” “beyond a good snapshot,” and vague “different kind of question.” Explain sensing, transfer, calibration and driving assessment concretely. State future work as questions; maintain public-preprint status. Personal tone stays first person and specific in both languages.

## Todo

- [x] Review current implementation and repository boundaries.
- [x] Research direct personal sites and define audience tasks.
- [x] Write measurable baseline/success/verification before implementation.
- [x] Move factual introduction and record before research proposition.
- [x] Refine wording and typography/spacing in both languages.
- [x] Review real screenshots and correct weaknesses.
- [x] Complete regression, accessibility, performance and disclosure checks.
- [x] Record results and leave a local preview; no commit/push this turn.

## Verified local result

Final order: personal introduction → selected publications → research question → research path → selected research → research thinking → future agenda → contact. The opening contains the factual role, institution, advisor, mathematical and sonar background, current research, portrait and five direct academic/contact routes. Biography begins around y=289px in the final desktop browser capture, instead of y=8,560px near the end. The portrait is 260px wide instead of 48px. At 390 × 844 the introductory links end at y=746px, within the opening viewport. Measurements reflect the actual captured browser; font availability and viewport affect exact line breaks.

The publications preview uses three short venue/project/summary/PDF rows. The full bibliography, datasets, code, talks and service remain accessible on their dedicated routes. The paired real RGB/SAR observation now explains the research question, rather than competing with the personal introduction. Research titles describe the task directly; current work and future questions retain their evidence boundaries. No academic status or capability was invented.

Visual review covered all eight changed homepage sections, 320px and 390px phone layouts, tablet, both languages and both themes. Corrections included the unnecessary desktop publication-heading wrap, narrow-screen profile composition, restrained record density and removal of unused biography/hero styles. Native section navigation reaches the intended section after smooth scrolling settles; the contact section is visible at the document end. Observation switching, language links, theme persistence, mobile menu and keyboard Escape were exercised in the real browser. The footer institution was checked after data cleanup.

Validation artifacts are retained in external temporary QA storage, not published with the site:

- `person-first-matrix.json`: 20 routes × two themes × desktop/mobile = 80 axe checks; 52 internal routes/fragments, 20 no-JS pages, eight home widths and reduced motion; all passed.
- `person-first-release.json`: 10 affected bilingual home/project routes, 40 axe checks, 36 internal routes/fragments and no-JS/reduced-motion checks; all passed after wording and layout refinement.
- `person-first-home-final.log`: final homepage checks after the last build, eight axe combinations, both homepages at eight widths, 30 links, no-JS and reduced motion; all passed, no console errors.
- `person-first-final-audit.log`: mandatory repository regression passed: zero disclosure hits, internal-document exposure, overflow, axe violations, heading/landmark defects, broken images or internal links. Warm local measurements under 4× CPU/Slow 4G were desktop LCP 92ms and mobile 76ms, CLS 0 and no long tasks. These warm observations are not cold-network estimates.
- `person-first-lighthouse-mobile.json`: simulated mobile cold-load performance 97, accessibility 100, best practices 100, SEO 100; LCP 1.9s, CLS 0, TBT 170ms.
- Production Docker build succeeded without warnings; latest Jekyll generation was 1.242s. Quiet runs were under two seconds; concurrent host load produced slower runs, so the timing is not an unconditional machine-independent guarantee.
- JavaScript syntax and `git diff --check` passed. The final manual built-output sweep found zero matches for restricted terms and no internal audit/disclosure/agent documents.

The social preview now opens with name, portrait and factual role. Its provenance is recorded in `ASSETS.md`. Build/runtime architecture and dependencies are unchanged. This revision is available in the local preview; it has not been committed or pushed under this turn's authorization.

## Spatial intelligence roadmap revision

Problem: the direction is implicit in the observation question, the research path stops at current work, and future questions appear separately without an explicit shared roadmap. A reader cannot immediately distinguish contributions already established from capabilities still being pursued.

Baseline: the verified local homepage has four chronological journey entries, no explicit spatial-intelligence heading, and three future questions. The personal introduction precedes research and must remain there.

Success: name spatial intelligence as the long-term direction and explain its meaning in physical-world terms; show five roadmap stages with explicit published/current/future status; connect public sensing contributions to the direction as foundations, without claiming they already constitute general spatial intelligence; close with a clear vision and three open research thrusts. Preserve bilingual content, themes, links and evidence boundaries.

Verification: production Docker build; required audit.js; bilingual home/theme/width/no-JS/reduced-motion regression; desktop/mobile roadmap and direction screenshots; inspect visible status labels, links, disclosure and syntax. No new dependencies or publication authorization.

- [x] Revise direction, roadmap and vision in both languages.
- [x] Verify rendered content, responsive layout and regression.
- [x] Record this revision's results.

Result: the research direction explicitly names spatial intelligence and defines the intended physical-world understanding. A three-phase overview links directly to published foundations, current research and future goals. Five detailed stages retain dates and public evidence: early sensing, multimodal fusion, physical representation, temporal/contextual assessment, and persistent understanding for reasoning/action. The final vision explains the research program through three open questions. These describe research priorities, not a quantitative completion estimate or a claim that task-specific sensing systems already solve general spatial intelligence.

Visual review corrected the Chinese heading that split the phrase for spatial intelligence. A short direction label and “Research roadmap” heading now separate direction from section function. Desktop English/dark and Chinese/light, phone overview/vision, and screenshots of all three changed sections were inspected. Clicking the current-phase overview link reached its target at y=100px below the fixed navigation. Bilingual/theme regression passed eight axe combinations, eight viewport widths for both homepages, 32 links/fragments, no-JS and reduced-motion checks, with no console errors. JavaScript syntax, whitespace and manual disclosure checks passed. Production Docker generation took 0.646s when rerun without concurrent audits; builds during parallel browser checks were slower. Full mandatory regression results are retained in `roadmap-final-audit.log`, with homepage results in `roadmap-final-home.log`, outside the repository. No commit or push was performed.
