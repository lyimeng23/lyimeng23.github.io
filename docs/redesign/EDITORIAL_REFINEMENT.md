# Editorial refinement audit

## Evaluation before changes

Problem: display and body use different serif families; H1/H2 reach 107/69px; the methodology section shares space with a prominent essay card; principles still focus on measurement; vision starts with past work and repeats a topic label rather than defining future capability. The core-record introduction counts papers instead of explaining their role.

Baseline: main at 21b3b29a, clean tree. Homepage order is person → citations → community → methodology → vision → contact. Display uses Times New Roman, body Newsreader, metadata system sans. Existing self-hosted Newsreader supports variable weights. The supplied review's claim that the deployment is stale is checked independently rather than accepted as fact.

Success: preserve the section order and factual record; unify English narrative/display typography around self-hosted Newsreader, retain a deliberate system Chinese fallback and system sans for metadata; cap main name/H2 sizes at 80/54px; broaden principles to question/evidence/failure; make future capability the starting point of vision; make its three questions the primary headings; replace the essay card with further reading. No unsupported achievements or results. No unnecessary font preload on Home. All bilingual pages, themes, widths, accessibility, no-JS, reduced motion, links and publication boundaries pass.

Verification: current Pages API and actual hosted HTML; Docker production build; whole-site browser matrix, mandatory audit with authorized naming exception, real section and phone screenshots, interaction checks and Lighthouse cold-load measurement; push and verify exact deployed commit after checks.

## Decisions and checklist

The latest explicit user request supersedes the repository's earlier Times font preference. Use the existing Newsreader asset; add no font or frontend dependency. Keep evidence and publication status unchanged. Metadata stays legible and quiet; methodology has one reading column; vision keeps open space and its distinct surface.

- [x] Verify review assertions against deployed and local state.
- [x] Refine bilingual text, type system and methodology/vision hierarchy.
- [x] Review real layouts and complete regression/performance checks.
- [x] Establish the authorized publication target and deployed-page verification procedure.

The hosted baseline was already current: Pages reported a successful build at 21b3b29a and both plain homepage URLs contained the citation revision. The first 88-combination matrix passed. Visual review then removed the methodology heading width limit, aligned Chinese agenda descriptions, and reduced secondary-page title caps from 88/128px to 80px. The current-focus and research-page wording now use persistent understanding consistently. Social-card typography and its factual description were updated from the same source assets. These final adjustments are verified separately below.

## Content and audience review

The unchanged person-first sequence answers visitor questions in order: name and affiliation, original citations and resources, academic participation, research principles, then future capability. Faculty evaluators can reach CV and papers immediately; researchers and collaborators can follow the evidence and roadmap; technical leaders can inspect systems and public artifacts; prospective students can understand the research approach and contact the researcher. No hiring or recruitment claim was added.

The core record retains full titles, verified authors, original venues/status and attachments. Current manuscripts remain distinct from published evidence. Future understanding, uncertainty and action are stated as goals/questions, not established system capabilities. News, service and conference records were retained rather than supplemented with invented activity. The final visual review also aligned the service lists with conference metadata using the same system sans treatment on Home and Activities; this small change receives a targeted 16-combination rerun.

## Validation

- Quiet production builds succeeded without warnings at 0.781s and 1.362s. One earlier build overlapped browser validation and took 2.271s; no build configuration or dependency changed.
- The final whole-site matrix passed 88 axe combinations across 22 bilingual routes, two themes and desktop/phone widths; 56 internal routes/fragments, eight homepage widths, 22 no-JS documents, reduced motion, headings, image dimensions/reachability, SEO metadata and browser console checks passed.
- The repository-required audit passed: no overflow or inaccessible headings/landmarks, zero axe violations, broken images or internal links, and no internal-document exposure. Its warm throttled measurements were 124ms/144ms LCP and CLS 0. One 60ms mobile long task occurred during concurrent validation; cold-load results are reported separately.
- Publication filters returned 8 published papers, 2 preprints and 12 total entries. The phone menu opened and Escape closed it with focus restored. The Chinese identity and single real portrait remained intact.
- Authorized manuscript names were confined to the four allowed home/archive HTML files. Other restricted content and review metadata were absent, and no private PDF, figure or research result was added.
- Real screenshots covered the opening, citation record, service/community, principles, vision, secondary-page title, writing and tablet archive/roadmap. Phone review included 320px and 390px layouts; light/dark and both languages were inspected. The 1200 × 630 social card was regenerated and visually reviewed.
- The actual runtime file `assets/js/main.js` passed syntax validation. The old instruction referencing `vision.js` is obsolete because that file was previously removed. Whitespace validation passed.

- The targeted Home/Activities rerun passed all 16 bilingual/theme/viewport axe combinations, 37 links/fragments, four no-JS documents, eight homepage widths and reduced-motion checks.
- Independent cold-load Lighthouse: Chinese mobile and English desktop both scored 100 performance / accessibility / best practices / SEO. Mobile LCP 1.5s; desktop LCP 0.4s; both CLS 0 and TBT 0ms. These are local simulated-load results, not deployed-network measurements.

## Publication

The latest request explicitly authorizes committing and pushing this verified revision to main. The release target is the existing GitHub Pages site. Deployment verification requires a successful Pages build for the exact pushed commit, newly rendered English and Chinese homepage/methodology/vision content, the updated stylesheet, and reachable public attachment URLs. Local validation alone does not establish publication. The release outcome is reported after those live checks.
