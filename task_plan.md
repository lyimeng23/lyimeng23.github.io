# Task Plan: Yimeng Liu Academic Homepage — First-Principles Rebuild

## Goal
From first principles, review and rebuild Yimeng Liu's academic homepage, upgrading it from a traditional "online CV / publication list" into a high-quality academic homepage that clearly expresses a Research Vision, supports future Faculty / Research Scientist job searches, collaboration, and personal research branding. Two phases: Phase 1 = full audit & design plan (NO code changes); Phase 2 = confirm, then implement with full acceptance testing.

## Current Phase
Phase 1 (Audit & Design Plan)

## Phases

### Phase 1: Audit & Design Plan (NO CODE CHANGES)
- [x] Pull latest repo, confirm git state
- [x] Set up local build environment to view/run current site (Docker jekyll + Playwright screenshots captured)
- [x] Screenshot current site on desktop/tablet/mobile (4 viewports captured)
- [x] Audit Jekyll structure, _data, _includes, _layouts, SCSS, JS, project subpages
- [x] Audit Google Scholar workflow, SEO, CNAME, historical residue
- [x] Classify: real features / dead template residue / duplicate content / misconfig / infrastructure to keep
- [x] Fix/verify discovered issues: VERIFIED CNAME (Song Chen residue), Scholar IDs, Proteus/Hydra-Bench, robots/sitemap, analytics secrets (all documented, changes pending user confirm)
- [ ] Output complete audit report (A–J) to user — IN PROGRESS
- **Status:** in_progress

### Phase 2: Implementation (after user confirmation)
- [ ] Homepage shell → Hero → Research Vision → Featured Research → Publications → News/About → Project template → cleanup → SEO/performance
- [ ] Build & check desktop/mobile after each major section
- **Status:** pending

### Phase 3: Full Acceptance
- [ ] Jekyll production build no error/warning
- [ ] Internal/external link check
- [ ] Screenshots: 1440 / 1280 / tablet / 390 mobile
- [ ] Typography / alignment / spacing / breakpoints
- [ ] Animation impact on reading
- [ ] Accessibility / reduced motion
- [ ] Publication data consistency
- [ ] SEO / canonical / CNAME
- [ ] Lighthouse
- [ ] Delete confirmed-unused historical code and backups
- [ ] Before/after comparison + rationale
- **Status:** pending

## Key Questions (must verify facts, no guessing)
1. ✔ VERIFIED: Production domain = lyimeng23.github.io (live, 200). CNAME songchen.science = original author's (Song Chen), REMOVE. _config canonical minipal-light-theme.yliu.me = template residue. → ASK user what production domain to set as canonical (probably https://lyimeng23.github.io or a real custom domain if they have one).
2. ✔ VERIFIED: correct Scholar = U0Py5sAAAAAJ (Yimeng). Crawler uses wrong sf-0AGoAAAAJ (Song Chen). Fix crawler.
3. ✔ VERIFIED: Hydra-Bench (2507.22685) is a REAL paper. publications.yml entry1 = corrupted (Proteus title/authors + Hydra-Bench files/arxiv). entry2 = correct Proteus. Fix entry1 → Hydra-Bench.
4. Research narrative (Physical AI for the Real World / Sense→Model→Reason→Act) — CONFIRM direction with user.
5. Which modules to keep/delete (Conferences, Services, Contact, projects, CaspianPost, driving page) — ASK user.

## Confirmations needed from user (Phase 1 gate)
A. Production/canonical domain.
B. Approve research narrative + Sense→Model→Reason→Act mapping.
C. CaspianPost (commercial SaaS) — place in separate /project link or remove from academic site?
D. Senior-driving standalone page — migrate into unified project template or keep standalone?
E. Keep/merge: Conferences & Events, Services, Contact (move to secondary pages).
F. Which publications are "Featured" (3-4) vs "Full" list.

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Phase 1 = audit only, no code changes | Explicit user instruction |
| Verify CNAME/canonical/scholar/links before touching | User: no guessing on identity/external links |
| Prefer Docker jekyll for local build | System Ruby too old (2.6.10), no modern ruby installed |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| brew ruby path stale (no /opt/homebrew/opt/ruby/bin) | 1 | Use Docker jekyll/jekyll image instead |

## Notes
- Skill: planning-with-files. Record findings in findings.md, logs in progress.md.
- Re-read plan before major decisions.
