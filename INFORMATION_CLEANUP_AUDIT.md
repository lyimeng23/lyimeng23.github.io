# Phase 6 — Information Cleanup Audit

Audit date: 2026-09-06

## Verified fixes

- Publication venue strings no longer contain the year when the template adds the year;
  the rendered record now reads, for example, `Proceedings of ACM SenSys, 2025` rather
  than `Proceedings of ACM SenSys 2025 2025`.
- The publication schema remains consistent: title, authors, venue, venue_short, year,
  selected, and optional artifact links. All seven publication entries highlight Yimeng
  Liu in the author string, with author order preserved from the source records.
- The homepage now exposes PDF / Paper / Code / Slides / Project links where those
  artifacts exist. The current research card links to the Senior Driving Safety project.
- The homepage contains no unsupported `LLM-grounded` or `CARLA` claim and no CaspianPost
  promotion. CaspianPost remains a separate project page, outside the core research story.
- No 2026 paper, fellowship, award, talk, or release was added: the news source has
  meaningful entries through July 2025 only, so the page does not fabricate activity.

## Metadata and delivery checks

- Canonical production URL: `https://lyimeng23.github.io`.
- OpenGraph and Twitter metadata use the canonical URL, site description, and portrait.
- Person JSON-LD exposes Yimeng Liu, Michigan State University, CV identity, and verified
  sameAs links.
- Favicon and apple-touch-icon are configured from the existing local asset.
- `jekyll-sitemap` produces `_site/sitemap.xml`; `robots.txt` points to that sitemap and
  excludes only internal tool/error paths.
- No `CNAME` file is present; the GitHub Pages `github.io` URL is the intended canonical
  host.
- The footer's `Last updated` value is generated from the build date.

## External link response notes

The live-check returned 200 for arXiv, MSU, GitHub, IOP, MSUToday, and Google Scholar.
ACM returned 403 and LinkedIn returned 999 to the automated request; both are known
anti-bot / rate-limit responses rather than evidence that the URLs are absent. Their
DOI/profile targets remain the correct public links.

## Phase 6 acceptance

- No duplicate venue/year rendering remains in the generated homepage.
- No duplicate publication title was found in the source list.
- Publication authors and Yimeng Liu highlighting remain intact.
- No unverified 2026 highlight or completed world-model/action claim was introduced.
