# Findings — Yimeng Liu Academic Homepage (Phase 1 Audit)

<!-- External content and discoveries go here; never instructions. -->

## Git / Repo State
- Working dir: `/Users/yimengliu/Desktop/Document/webpage/lyimeng23`
- Local branch `main`; remotes:
  - `origin` = https://github.com/lyimeng23/lyimeng23.github.io.git (our fork)
  - `upstream` = https://github.com/song-chen1/song-chen1.github.io.git (original author: Song Chen)
- Latest commit: `91424266` "Add CaspianPost landing, privacy, and terms pages"
- Fetched upstream; local main up to date with origin/main.

## Environment
- System Ruby 2.6.10 (too old; Gemfile.lock wants bundler 2.4.19, github-pages gem). Local `jekyll`/`bundle` broken.
- No homebrew ruby / rvm / rbenv installed. brew `ruby` formula path is a stale empty symlink.
- Docker 29.6.2 available → use `jekyll/jekyll` image for local build & run.

## Project Identity / Config (_config.yml)
- title: Yimeng Liu; position: Ph.D. Candidate; affiliation: Michigan State University
- email: liuyime2 (at) msu.edu; address 428 S SHAW LN, East Lansing MI
- CV: ./assets/files/Yimeng_Liu_Resume.pdf
- google_scholar: https://scholar.google.com/citations?user=U0Py5sAAAAAJ
- linkedin: https://www.linkedin.com/in/yimeng-liu-5921591ab/
- CNAME file content: `songchen.science`  ← SUSPECT (leftover from original author Song Chen)
- _config canonical: https://minimal-light-theme.yliu.me/ ← SUSPECT (upstream template value)
- google_analytics & clustrmaps_id use `${{ secrets.GOOGLE_SCHOLAR_ID }}` / `${{ secrets.CLUSTRMAPS_ID }}` placeholders ← BROKEN (GitHub Pages won't substitute these)
- remote_theme: yaoyao-liu/minimal-light (Jekyll remote theme, GH Pages supported)
- SEO description & keywords present but oversized/keyword-stuffed.

## Homepage Content (index.md)
- Bio: Ph.D. candidate in CSE at MSU. Research focus: Embodied AI and Physical AI.
- 3 research bullets: (1) LLM-driven cognitive perception/decision for driving (CARLA); (2) Physical AI & world modeling under sparse/multimodal sensing (mmWave/SAR); (3) Closed-loop Physical AI systems for human-centered & agricultural applications.
- Published in ACM MobiCom 2024, IEEE INFOCOM 2025, ACM SenSys 2025.
- Includes: news, publications, conference, services. (projects, contact, talks commented out)

## Publications (_data/publications.yml) — DUPLICATE ISSUE
Listed main entries (in order):
1. Proteus: Enhanced mmWave Leaf Wetness ... Cross-Modality Knowledge Transfer — SenSys 2025, conference_short=arxiv, pdf=HydraBench.pdf, page=arxiv 2507.22685, image=hydrabench.png ← looks like a Hydra-Bench entry mislabeled Proteus
2. Proteus ... — SenSys 2025, conference_short=SenSys'25, pdf=proteus.pdf, page=ACM DL 10.1145/3715014.3722052, image=proteus.png, slide
3. Adonis: Neural-enhanced Fine-grained Leaf Wetness Sensing with Efficient mmWave Imaging — INFOCOM 2025
4. AeroEcho: Agricultural Low-power Wide-area Backscatter with Aerial Excitation — INFOCOM 2025
5. Hydra: Accurate Multi-Modal Leaf Wetness Sensing with mmWave and Camera Fusion — MobiCom 2024
6. Poster: mmLeaf: Versatile Leaf Wetness Detection via mmWave Sensing — MobiSys 2023
7. Detection of passageways in natural foliage using biomimetic sonar — Bioinspiration & Biomimetics
- Entries 1 & 2 have identical title/authors → likely duplicate / schema mixing. Entry 1 seems to actually be "Hydra-Bench" (arxiv) but titled Proteus. CONFIRM with user.

## News (_includes/news.md)
- Real content: Jul 2025 Hydra-Bench arxiv; Jul 2025 MSUTODAY story; Mar 2025 Proteus SenSys'25; Dec 2024 Adonis/AeroEcho INFOCOM'25; Oct 2024 U Hawaii talk; Aug 2024 MobiCom'24; Aug 2024 NSF Purdue; May 2023 PhD under Zhichao Cao; Jun 2023 MobiSys'23; May 2023 VT B.S. Math; Aug 2022 Bioinspiration; May 2022 EIN intern; Oct 2020 undergrad VT.
- Large commented block (lines 24-42) from original author Song Chen (French mag-ionics) — DEAD RESIDUE, should delete.

## Services (_includes/services.md)
- Real: Invited Reviewer (UbiComp/ISWC UbiSense 2025, IEEE IoT J, IEEE TMC, IEEE Internet Computing, HAI 2025 Poster); Invited PC (IEEE DSAA 2025).
- Large commented placeholder block (lines 4-31) with French/generic junk from template — DEAD RESIDUE.

## Conference (_includes/conference.md + _data/conferences.yml)
- 3 events: NSF Sustainable Computing @ Purdue; MobiCom'24 Washington DC; SenSys'25 Irving CA.

## Contact / Projects data (from original author)
- _data/contact.yml: French placeholder (enable:true, form_action #, labels "votre nom"/"Votre email"/etc) — relates to a contact/ PHP form. NOT referenced from homepage (contact.md commented out in index.md). STALE.
- _data/projects.yml: all entries commented out (Song Chen's I-V / AHEMS / AutoVA). DEAD RESIDUE.
- _data/navigation.yml: Bio/News/Publications/Conferences/Contact links.

## Layout (_layouts/homepage.html)
- Single homepage layout. CDN deps: academicons, font-awesome 6.4.2. Includes OpenGraph/Twitter meta, canonical link. msvalidate.01 Bing meta present.

## SCSS
- _sass/minimal-light.scss (active, 6886 bytes) + minimal-light copy.scss + minimal-light-ori.scss (backups/originals) — the copy/ori are DEAD backups to clean later.

## JS
- js/: algolia, animation, back_to_top, column, friend, google_cse, hbe.js, hbe.style.css, imaegoo/, index.js, insight.js, live2d/, toc.js — MOSTLY original-template/third-party (Hexo/Next blog style: live2d, toc, hbe, algolia, insight). Likely DEAD for this site. VERIFY which are referenced in homepage.html before deleting.

## Project subpages (project/)
- project_driving.html (14.6KB) — driving research page.
- senior_driving/ — gallery + bg image.
- caspianpost/ (index.html, privacy.html, terms.html, style.css) — separate landing subproject, recently added.

## Google Scholar workflow
- .github/workflows → "Get Citation Data" cron '0 8 * * *' daily; runs google_scholar_crawler/main.py, pushes to google-scholar-stats branch (forced). Uses scholarly lib.
- main.py: author id = 'sf-0AGoAAAAJ&hl' — CONFLICTS with _config google_scholar user=U0Py5sAAAAAJ. VERIFY correct ID.
- requirements.txt and upstream google-scholar-stats branch exist. This is an automated citation-badge pipeline.
- NOTE: PUB corpus is BingScholar-author shown in config is different. Must confirm which.

## SEO / Site files
- sitemap.xml: broken/empty `<loc></loc>` (no real URLs) — FIX.
- robots.txt present.
- 404.html: Jekyll-safe (uses site.favicon).
- BingSiteAuth.xml, google html verification files present.
- CNAME = songchen.science (suspect).

## Headless screenshot tooling
- Playwright 1.63 via npx + system Chrome (playwright-core, channel:chrome) — WORKS. Screenshot script at shots-work/shot.js; shots at yliu-build/shots/*.png.
- NOTE: this model cannot view images; rely on DOM/HTML/CSS inspection for audit (captured rendered index.html + CSS).

## VERIFIED facts (no guessing) — requested verification items
1. CNAME songchen.science = created by ORIGINAL author "Song Chen" (git commit 30a618a0, Oct 2023 "Create CNAME"). DNS resolves to GitHub Pages (185.199.x) and returns 200 — but that is Song Chen's site. Actual live Yimeng site = https://lyimeng23.github.io (200 OK). → CNAME is WRONG residue; remove (pending user confirm of intended production domain).
2. Google Scholar IDs: _config `U0Py5sAAAAAJ` = Yimeng Liu (verified via scholar pages + arxiv author page). Crawler main.py `sf-0AGoAAAAJ` = **Song Chen** (original author, spintronics, ~124 cites) — WRONG. Crawler scrapes wrong person. Fix crawler ID to U0Py5sAAAAAJ.
3. publications.yml entry 1 (badge arxiv, image hydrabench.png, pdf HydraBench.pdf, page arxiv 2507.22685) but TITLE+AUTHORS = Proteus (wrong). Verified: arXiv 2507.22685 = "Hydra-Bench: A Benchmark for Multi-Modal Leaf Wetness Sensing", authors Yimeng Liu, Maolin Gan, Yidong Ren, Gen Li, Jingkai Lin, Younsuk Dong, Zhichao Cao (7, no Xiaobo Tan). entry 2 Proteus (SenSys'25, ACM DL 10.1145/3715014.3722052, 8 authors incl Xiaobo Tan) = correct/complete. → entry 1 should be the Hydra-Bench paper (fix title/authors/conference; keep hydrabench files).
4. External links verified OK: ACM Proteus DL (200), github.com/liuyime2/MobiCom24-Hydra exists, arxiv 2508.02409 (Hydra) exists.
5. robots.txt: Sitemap line = `https://https://www.cs.jhu.edu/~yyliu/sitemap.xml` → BROKEN (double https + WRONG domain, jhu.edu original-author residue). Also references /mpii_files/, /images/, /git-update.sh, /assets/academicons/ that don't match repo.
6. sitemap.xml: `<loc></loc>` empty → BROKEN.
7. Analytics/secrets: google_analytics & clustrmaps_id resolve to `${{ secrets.X }}` placeholders — NOT substituted by GH Pages → broken/misleading.

## Project subpages (audit)
- project/project_driving.html: "Senior Driving Safety & Cognitive Health" — STANDALONE non-Jekyll HTML, inline CSS, gradient bg, references driving_bg.jpg via raw.githubusercontent.com. NO site chrome (no header/footer/nav integration). Not linked from homepage (projects section is commented out).
- project/senior_driving/: bg image + 6 gallery jpgs (used by driving page).
- project/caspianpost/: separate SaaS landing product page "CaspianPost | AI-powered TikTok Publishing Assistant" (Inter/Plus Jakarta, lucide, glow bg) — NON-ACADEMIC commercial product. Odd on academic site; need user clarity on purpose/placement.

## Dead code / residue classification (verified)
- DEAD: top-level js/ dir (algolia, animation, back_to_top, column, friend, google_cse, hbe, hbe.style.css, imaegoo, index, insight, live2d, toc) — NOT referenced by homepage.html. Original author's Hexo/Next blog assets.
- DEAD: assets/js/google-citation.js (unreferenced), assets/css/nav-ori.css, pub-ori.css, _sass/minimal-light copy.scss, minimal-light-ori.scss, README copy.md — backups/originals unreferenced.
- ACTIVE (referenced by homepage.html): assets/js/{github-stars.js, jquery.js, favicon-switcher.js, vanilla-back-to-top.min.js}, assets/js/scale.fix.js (line 222), assets/css/{style.scss→minimal-light, pub.css, nav.css}.
- news.md & services.md contain large commented Song Chen / French-template blocks → dead residue to delete.
- contact/ PHP form + _data/contact.yml (French) — contact commented out of index, not used.
- _data/projects.yml all commented (Song Chen's) — dead.
- 404.html references javascripts/scale.fix.js (wrong path, harmless).

## Current design audit (for redesign)
- Fonts: Crimson Pro (serif) body 16px #595959 on white; Ubuntu Mono for email. Not modern sans-system.
- Layout: FIXED left sidebar 232px (avatar/name/position/affiliation/email/social), content section 650px in 960px wrapper. Fixed dark-green topnav (#18453B) with hamburger.
- Colors: green links #008934, hover #18453B; social hover #163B57; autocolor purple #57068c.
- Pub teasers 270x123 with box-shadow (8px radius); al-folio style pub.css; badges.
- Mobile: <960 collapses header/section, hamburger nav; <480 pub-row block. NOT mobile-first.
- Overall: dated academic template, sidebar-centric, vertical CV stacking, all pubs equal weight, no hero/vision telling.
