# Task Plan: Yimeng Liu Academic Homepage — First-Principles Rebuild

## Goal
From first principles, review and rebuild Yimeng Liu's academic homepage, upgrading it from a traditional "online CV / publication list" into a high-quality academic homepage that clearly expresses a Research Vision, supports future Faculty / Research Scientist job searches, collaboration, and personal research branding. Two phases: Phase 1 = full audit & design plan (NO code changes); Phase 2 = confirm, then implement with full acceptance testing.

## Current Phase
Phase 3 (Full Acceptance) — in progress

## Phases

### Phase 1: Audit & Design Plan (NO CODE CHANGES)
- [x] Pull latest repo, confirm git state
- [x] Set up local build environment to view/run current site (Docker jekyll + Playwright screenshots captured)
- [x] Screenshot current site on desktop/tablet/mobile (4 viewports captured)
- [x] Audit Jekyll structure, _data, _includes, _layouts, SCSS, JS, project subpages
- [x] Audit Google Scholar workflow, SEO, CNAME, historical residue
- [x] Classify: real features / dead template residue / duplicate content / misconfig / infrastructure to keep
- [x] Fix/verify discovered issues: VERIFIED CNAME (Song Chen residue), Scholar IDs, Proteus/Hydra-Bench, robots/sitemap, analytics secrets (all documented, changes pending user confirm)
- [x] Output complete audit report (A–J) to user — AUDIT_REPORT.md delivered; 7 user decisions confirmed
- **Status:** complete

### Phase 2: Implementation (after user confirmation)
- [x] Homepage shell → Hero → Research Vision → Featured Research → Publications → News/About → Project template → cleanup → SEO/performance
- [x] Build & check desktop/mobile after each major section
- [x] Deploy: commit + push to origin/main; GitHub Pages build verified live
- **Status:** complete

### Phase 3: Full Acceptance
- [x] Jekyll production build no error/warning
- [x] Internal/external link check (27/27 internal; external verified — 403/999 are bot-blocks)
- [x] Screenshots: 1440 / 1280 / tablet / 390 mobile (Playwright DOM + full-page shots)
- [x] Typography / alignment / spacing / breakpoints (design-token SCSS; fluid clamp type)
- [x] Animation impact on reading (reveal-on-scroll addititive, no reflow)
- [x] Accessibility / reduced motion (skip-link, focus-visible, aria toggles, prefers-reduced-motion disables all motion)
- [x] Publication data consistency (publications.yml normalized; featured flags verified on page)
- [x] SEO / canonical / CNAME (canonical lyimeng23.github.io; CNAME removed; sitemap.xml canonical; robots.txt clean; verification metas restored)
- [ ] Lighthouse (remaining)
- [x] Delete confirmed-unused historical code and backups (js/, contact/, ori/copy, legacy includes/data)
- [ ] Before/after comparison + rationale (remaining)
- **Status:** in_progress

## Key Questions (must verify facts, no guessing)
1. ✔ VERIFIED: Production domain = lyimeng23.github.io (live, 200). CNAME songchen.science = original author's (Song Chen), REMOVED. Canonical = https://lyimeng23.github.io (user-confirmed).
2. ✔ VERIFIED: correct Scholar = U0Py5sAAAAAJ (Yimeng). Crawler fixed (was sf-0AGoAAAAJ = Song Chen).
3. ✔ VERIFIED: Hydra-Bench (2507.22685) is a REAL paper. publications.yml entry1 fixed → Hydra-Bench; Proteus decoupled.
4. ✔ Research narrative approved by user: "Physical AI for the Real World" / Sense→Model→Reason→Act, with honesty note.
5. ✔ Module decisions confirmed by user (Activities page, driving→template, CaspianPost secondary).

## Confirmations needed from user (Phase 1 gate) — ALL ANSWERED
A. Production/canonical domain → https://lyimeng23.github.io/
B. Approve research narrative + Sense→Model→Reason→Act mapping → yes, with honesty caveat
C. CaspianPost → separate /project secondary link (kept, visually secondary)
D. Senior-driving standalone page → migrated into unified project template
E. Conferences & Events, Services, Contact → moved to secondary Activities page
F. Featured publications → Hydra, Proteus, Adonis (Driving as research direction card)

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Phase 1 = audit only, no code changes | Explicit user instruction |
| Verify CNAME/canonical/scholar/links before touching | User: no guessing on identity/external links |
| Prefer Docker jekyll for local build | System Ruby too old (2.6.10), no modern ruby installed |
| Fully local theme (no remote_theme) | Own the design, no template drift |
| Delete CNAME entirely (no custom domain) | User chose lyimeng23.github.io as canonical |
| jekyll-sitemap plugin for sitemap.xml | Removes broken static sitemap residue |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| brew ruby path stale (no /opt/homebrew/opt/ruby/bin) | 1 | Use Docker jekyll/jekyll image instead |
| Ruby 3.4 stdlib gems missing for github-pages | 1 | Add csv/base64/bigdecimal/logger/json shims to Gemfile |
| jekyll-sitemap output overwritten by static sitemap.xml | 1 | Delete static sitemap.xml; plugin generates it |
| `/news`, `/activities` 404 (page files are .html) | 1 | Add `permalink: /news/` and `/activities/` front matter |
| initial commit included .opencode session state | amend | `git rm -r --cached .opencode` + .gitignore |
| push HTTP 400 | 1 | `-c http.postBuffer=524288000` (large multi-file change set) |

## Notes
- Skill: planning-with-files. Record findings in findings.md.
- Re-read plan before major decisions.
- Live site deployed at https://lyimeng23.github.io/ (pages build green).