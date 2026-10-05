# Identity-led homepage revision

Problem: the local homepage still devotes its largest sections to a paired sensing visual, five detailed research stages and four photographic project essays. Service, news and conference participation live on secondary pages. The person is introduced first, but the rest of the reading experience is dominated by projects.

Baseline: eight homepage sections, four large project image essays and one interactive observation pair. Three selected published works appear in the record; recent manuscripts are absent. Local changes from the preceding revisions are preserved.

Success: open with 刘益萌 / Yimeng Liu, factual position, 曹志超 / Zhichao Cao, background and present interests; place six concise core works, service, recent news and verified conference participation before methodology and vision. Zero project images on the homepage. Detailed research remains available on a bilingual research page. Full publications distinguish core research, other first-author work and collaborative papers. No invented conference attendance, teaching, recent news, author lists, acceptance or manuscript results.

Verification: Docker build; bilingual route/theme/width/no-JS regression; live desktop/mobile screenshots; accessible headings, keyboard controls and actual links; disclosure allowlist scoped to explicitly authorized manuscript names. No commit/push in this turn.

## Disclosure decision

The user's latest explicit request supersedes the previous prohibition on naming SPIRIT and Mimer for this local revision. Permit these two names, manuscript titles and short topic descriptions only. Do not copy private PDFs, submission venue, review information, figures, architecture, datasets or results into public assets. Other restricted work remains excluded. SPIRIT/Mimer first authorship cannot be inferred from anonymous manuscript PDFs. AURA remains a public design/research-opportunities preprint, not an evaluated system or an accepted MobiSys paper. The older DISCLOSURE venue row is stale and must be corrected.

## Art direction

Retain the existing paper/ink/green tokens and typography. The portrait is the sole homepage photograph. Use a compact editorial academic record, a two-column service/community section and a dated short news list. Research becomes a succinct personal statement with three open questions; methods precede vision. Detailed photographs, observation controls and the longer roadmap move to Research. This reduces noise by moving content to its appropriate depth rather than adding decoration.

- [x] Verify paper/topic metadata and source boundaries.
- [x] Reorganize bilingual homepage and academic archive.
- [x] Review rendered layouts and run regression.
- [x] Record results and leave local preview.

## Verified result

Homepage order: person → six compact core works → service/conferences/recent updates → research methodology/writing → concise spatial-intelligence vision → contact. The homepage has one real portrait and zero project illustrations, compared with four photographic project essays and an observation pair previously. Its six sections preserve the academic and intellectual identity while detailed material moves to `/research/` and `/zh/research/`. The archive places the six core works first, then Hydra-Bench as other first-author work, followed by collaborative publications. Adonis is explicitly co-first-authored. No teaching or additional conference attendance was invented.

Manuscript titles and broad subjects were checked against the SPIRIT and Mímir manuscript title pages supplied in jobtalk. Both are anonymous manuscripts; author lists and unverified dates are omitted. The driving draft explicitly identifies AURA and describes design principles and research opportunities. Existing arXiv metadata remains the public record. Google Scholar returned HTTP 429 during this turn, so no newly fetched Scholar reconciliation is claimed; existing source-bound records and links were retained.

Validation:

- Docker production build succeeded without warnings. Quiet Jekyll generation was 0.813s; the later concurrent run was 2.0s. Docker was initially stopped and was started using the existing installed application; no dependency was installed.
- `identity-audit.log`: all required regression checks passed with the explicitly authorized naming exception. Zero overflow, axe violations, broken images, broken links or internal-document exposure. Warm local throttled LCP was 232ms desktop / 156ms mobile, CLS 0, no long tasks.
- `identity-release-final.log` / `identity-release.json`: 12 bilingual routes × two themes × two viewport sizes, 48 axe checks; 52 routes/fragments; eight homepage widths, 12 no-JS pages, reduced motion and no console errors. All passed. The first test run stopped because its old sticky assertion assumed the roadmap was still on Home; the assertion was relocated to Research and rerun successfully.
- Behavior checks actually exercised publication filters: published 8, preprints 2, all entries 12. The phone menu opened, Escape closed it and returned focus. Chinese first-screen academic links ended around y=652px at 390 × 844.
- Explicit manuscript-name sweep: SPIRIT and Mímir occur only in the four authorized home/publication HTML files. Other restricted names, submission/review terms and internal documents remain absent. No private PDF or manuscript figure was added to assets.
- Real desktop and phone screenshots covered the personal opening, core work rows, service/community and vision. The vision heading was shortened after visual review to remove an unnatural Chinese line break. JavaScript syntax and `git diff --check` passed.
- Final Chinese-homepage mobile Lighthouse cold-load run: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.7s, CLS 0, TBT 0ms. This local simulated result is distinct from the warm audit measurements and does not claim deployed-network performance.

All audit scripts and screenshot artifacts remain outside the repository in temporary QA storage. No new frontend dependencies, commit or push. Cold-load Lighthouse output is retained separately as `identity-lighthouse.json`.

## Citation-format core record

Problem: the six homepage entries show project names and one-line topics instead of complete citations, and their resource links are only available on deeper pages. Baseline: six short rows, no full titles or per-paper attachment rows on Home. Success: all six entries show exact paper titles, verified authors when available, full venue/preprint/manuscript status and actual resource links beneath each citation, in both languages and themes. Keep unpublished drafts without private attachments or invented author metadata. Verification: Docker build, bilingual home/publication theme/width/axe/link checks and desktop/mobile screenshots, plus the authorized disclosure sweep. No publication action.

Result: Home reuses the archive's citation renderer and the six core publication records. Each entry has its full original title, available author list, full venue/status and a resource row ordered PDF → Website → BibTeX → Slides → paper/arXiv → code/data/Scholar, omitting unavailable resources. Adonis retains its equal-contribution note. AURA's public PDF link was verified against its arXiv record and returned HTTP 200. Private manuscripts have no fabricated author list, venue or attachment. Removed the duplicate featured-work data and obsolete short-row CSS.

Docker generation: 0.844s, no warnings. `citations-release.log` passed 16 axe combinations across bilingual Home/Publications, eight home widths, four no-JS routes, reduced motion, 47 links/fragments and no console errors. Desktop and 390px phone screenshots were visually reviewed. Syntax and whitespace checks passed. Authorized names remain confined to the four allowed HTML pages, with no internal-document exposure. The mandatory regression is recorded separately in `citations-audit.log`; scripts and screenshots remain external temporary artifacts. No commit/push.


## Publication authorization

On 2026-10-05 the user explicitly requested pushing the reviewed site. This authorizes committing and publishing the current bilingual identity-led design and citation-format core record. Earlier notes saying no commit/push describe the authorization state of those earlier turns. Because the repository is public, submission filenames and unrelated restricted research names have been removed from newly committed records.
