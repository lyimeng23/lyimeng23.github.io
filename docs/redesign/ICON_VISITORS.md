# Icon and visitor-map refinement

Problem: the current icon is an anonymous nine-cell grid, and the site has no visitor-map placement. Baseline: three existing SVG/PNG icons; no VisitorDots runtime resources. The supplied map responds as SVG despite its .png URL, with intrinsic dimensions 420 × 210 and approximately 1.2 MB uncompressed payload.

Success: a recognizable personal YL monogram, consistent SVG/32px/180px exports; the supplied real widget on bilingual Home only, below the identity and research content; no third-party script or initial map fetch in normal script-enabled browsers; keyboard-accessible native disclosure; explicit image dimensions, responsive layout, preserved attribution and a usable details link if the image fails. Do not fabricate visitors or alter the supplied map data.

Verification: Docker build, image/resource/heading and accessibility audits, all eight home widths, expanded/collapsed map and no-JS behavior, desktop/mobile light/dark screenshots, cold-load performance and publication-boundary scan.

Design: reuse the established green/paper palette. Use a simple geometric YL monogram with no font dependency. Place the visitor map as a quiet native details control in the homepage footer, max-width 420px. Keep the provider image on its original white canvas in both themes rather than recoloring geographic data. Preserve the supplied provider attribution as a secondary text link. Loading the widget records widget views; it is not a unique-visitor or collaborator count. Loading is deferred until expansion, so the counts describe map views rather than every homepage visit.

- [x] Inspect assets, provider behavior and placement.
- [x] Implement and review icons and bilingual footer integration.
- [x] Verify responsive, accessibility, keyboard, no-JS and loading behavior.

The user explicitly authorized committing and pushing this verified icon and visitor-map revision on 2026-10-05. Publish to the existing main-branch GitHub Pages site, then verify the exact deployment commit, both homepage integrations and all three icon assets.

## Verified results

The SVG monogram is the canonical source. Its 32px and 180px PNG exports use the existing bundled Sharp renderer, with no new dependency installation or visitor webfont. All favicon references carry an updated cache key. No photograph or research figure was repurposed as branding.

The supplied VisitorDots image loaded in the actual browser at 420 × 210. The integration retains the exact widget/details URLs and original image, plus the supplied create-link parameters with a concise provider credit. No account setting or widget theme was changed. Expanded Home passed eight English/Chinese × light/dark × desktop/phone axe combinations, 37 internal links/fragments, both homepages at eight widths, no-JS narrative, reduced motion and browser-console checks. The matrix also verified zero initial map requests and successful real image loading after expansion. The native keyboard Enter interaction was exercised, and desktop light / phone dark screenshots were inspected.

The required audit passed: no overflow, broken images, missing dimensions, inaccessible headings, unnamed controls or broken internal links; publication-boundary checks passed. Its external image check uses normal browser request headers because the provider rejects the generic Python client with 403. Direct cross-origin fetch is not used as a browser image test because the image does not grant CORS; real image loading and the separate HTTP check establish reachability.

Docker builds completed without warnings at 0.701s and 1.420s. JavaScript syntax and whitespace checks passed. Cold-load mobile Lighthouse: 100 performance / accessibility / best practices / SEO; LCP 1.7s, CLS 0, TBT 0ms. This is a local simulated-load result. In browsers with JavaScript disabled, native lazy-loading may be ignored and the widget can load earlier; the rest of the page and the native details control remain usable. No universal tracking coverage or unique-visitor count is claimed.

A dedicated no-JS phone check also opened the native disclosure through real pointer input on both homepages: image natural width 420px, no overflow at 320px. The first pointer test sampled during smooth scrolling; using an instant scroll for deterministic targeting resolved the test failure. SVG-derived PNG dimensions were verified as 32 × 32 and 180 × 180.
