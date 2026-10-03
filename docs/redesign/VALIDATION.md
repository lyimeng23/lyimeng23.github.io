# Research identity redesign — verification

Reviewed 2 October 2026. Baseline: main@741e7b5d. This is a complete content/composition replacement using the existing Jekyll system, with no runtime frontend dependency.

## Outcome and evidence boundaries

The narrative introduces Yimeng Liu, the partial-observation problem, a chronological research journey, public systems, three future questions, scientific thinking, a compact record and contact. Past papers establish task-specific sensing evidence. The driving preprint proposes assessment opportunities. Persistent understanding and decision support remain a future program, not completed results.

The rendered English homepage main text measures 811 whitespace-delimited words, versus 4,193 on the previous homepage; 593 are in the narrative before the academic record (DOM textContent measurement). The homepage previews three recent publications; the independent publications page retains all ten records. Four bilingual case studies and an English/Chinese research perspective provide depth without turning the first screen into a research statement. Name, affiliation, thesis and direct CV/Scholar/GitHub/email links fit the 1440 × 1000 first screen; mobile reading order preserves identity first.

Scholar's automated fetch was unavailable. Existing user-provided bibliography was retained and reconciled against public papers where available; no live citation or h-index numbers are presented. Hydra/Proteus author spelling was verified through paper and Crossref metadata. Adonis values retain the exact metric/protocol. See ASSETS.md for figure provenance. No confidential source archive or mixed jobtalk deck was opened.

## Executed checks

| Check | Actual result |
|---|---|
| Docker production build | No error/warning; final generation 1.613s; an earlier quiet run was 0.789s. Under concurrent host/browser load earlier builds ranged up to 10.736s; the sub-2s target is a measured quiet-build result, not a host-load guarantee. |
| Repository audit.js | ALL CHECKS PASSED, explicit absolute SITE_ROOT; eight widths, desktop/mobile axe, images, headings, landmarks, internal links and disclosure. |
| Expanded axe matrix | 20 routes × 2 themes × 2 viewports = 80 checks, zero WCAG 2/2.1 A/AA and best-practice violations; zero console errors. |
| Final compact-home regression | Eight additional en/zh × light/dark × 390/1440 axe checks passed; both homes at 320/360/390/430/768/834/1280/1440 passed. |
| No JavaScript | All 20 routes render main content and navigation at 320px without overflow. Final compact homes also checked separately. |
| Reduced motion | Zero active animations; scroll behavior auto; journey heading position static. |
| Internal URLs | Expanded matrix fetched 50 distinct internal links and checked fragment IDs; zero broken. Final compact-home matrix fetched 30 links; zero broken. |
| Images | Every rendered image has alt and explicit dimensions; actual URLs fetched successfully. Lazy-image complete/naturalWidth timing was not used as reachability proof. |
| Metadata | 20 routes have canonical and reciprocal en/zh alternates, nonempty descriptions and valid Person JSON-LD. Case studies have specific descriptions. |
| Disclosure | Six required terms have zero matching built files; internal docs, AGENTS and excluded product page absent. |
| JavaScript / diff | node --check assets/js/main.js and git diff --check pass. No new credential or local machine path in publishable changes. |
| Keyboard | Tab reaches visible skip link; Enter moves to main. Mobile menu opens; Escape closes and returns focus. |
| UI state | en/zh counterpart navigation, light/dark selection and persistence, observation caption/pressed state, publications 2 preprints / 8 published / 10 all actually operated. |
| Screenshots | Eight homepage sections at 1440, mobile 390/320, Chinese mobile/tablet and dark mode; each case study's real figure/results visually inspected. |

Cold-load Lighthouse 13.5.0, local static server, default simulated throttling:

| View | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| Desktop | 99 | 100 | 100 | 100 | 0.5s | 0 | 0ms |
| Mobile release candidate | 98 | 100 | 100 | 100 | 2.2s | 0 | 90ms |

Repository CDP audit at 4× CPU / Slow 4G: desktop LCP 444ms, mobile 480ms, CLS 0, zero long tasks. Those warm-audit values are kept separate from Lighthouse cold-load metrics. Lighthouse is a synthetic run, not real-user field data, and scores can vary by host load.

## Critique and revisions

| Dimension | Review decision / revision |
|---|---|
| Text logic | Removed duplicate abstract explanations and unsupported capability language; each section has one job. |
| Research identity | One stable question about physical understanding; sensing evidence connects to explicitly future continuity/action questions. |
| Audience | Identity and contact first; concise route for committees, case studies for collaborators, formal record for citation. No timed comprehension study was conducted. |
| Information architecture | Bilingual counterpart routes; complete record separated from the three-paper homepage preview. |
| Typography | Times display, Newsreader prose, restrained mono labels and system sans controls; fixed Chinese ch-width wrapping and awkward English title split. |
| Whitespace / hierarchy | Four composition families rather than repeated cards; sticky journey holds context; about/contact no longer follows ten full publication entries. |
| Color / contrast | Semantic light/dark palette; settled-state axe zero violations. Instant theme screenshots can catch brief color transitions. |
| Image quality / provenance | Actual optical/radar observations and apparatus; full figure geometry preserved instead of forced 4:3 cropping. No fabricated charts or generated experiments. |
| Originality | Signature is a pair of complementary real observations with an explanatory focus switch. No particle/network scene. |
| Scroll rhythm | Broad observation claim → compact chronology → image essays → staggered future questions → thinking → brief record/contact. No scroll hijacking. |
| Motion | Native view-timeline photo entry, small hover feedback and observation focus only; fallback has fully visible content; no continuous JS animation loop. |
| Microinteraction | One pressed observation state plus explanatory caption; explicit theme select; accessible menu and filter status announcements. |
| Responsive | Eight widths, mobile/tablet/desktop screenshot review; one-column mobile; complete 320px no-JS navigation. |
| Accessibility | Real keyboard paths, explicit labels, contrast, one h1, sequential headings, main landmark, dimensions/alt and reduced motion. |
| Performance | Fixed initial mobile CLS 0.166 by reserving enhancement controls before paint and using optional font loading; final CLS 0. Removed obsolete narrative/data components and CSS. |
| Consistency | Shared tokens, grid, shell, case-study structure and bilingual interface. Social card updated to the same identity and real observations. |
| SEO / resources | Correct preprint status, source-language titles/authors, canonical/hreflang, public paper/code/dataset/talk/BibTeX links. Unverified DOI links omitted. |
| Limitations | No award-level quality or universal 60fps certification claimed. Native transform/opacity motion and zero audit long tasks support the implementation; synthetic tests do not replace design/user judgment. Existing large talk downloads remain click-only and unchanged. |

Two first-pass harness issues were corrected rather than hidden: project reflection used an inappropriate complementary landmark, and indirect Liquid resource-label indexing produced unnamed links. Another harness assumed every lazy image had already decoded and every page contained at least 60 characters; these were replaced by actual image URL fetch and nonempty-main checks, including the short Chinese 404 page.

## Reproduction

Use ./build.sh install once, then ./build.sh build and python3 -m http.server 8811 --directory _site. SITE_ROOT must be the real built directory. Temporary Chrome/axe/Lighthouse audit scripts and screenshots remain outside the repository; they are not runtime dependencies or published assets. See the repository AGENTS.md for the base audit contract. Added figures can be reproduced from the named public archives in ASSETS.md. Social card source: docs/og-preview.html.

## Deployment

User explicitly authorized commit and GitHub push for this redesign. GitHub Pages source verified as main / root. Publication and live-page checks are performed after the implementation commit; completion evidence will be recorded after deployment.
