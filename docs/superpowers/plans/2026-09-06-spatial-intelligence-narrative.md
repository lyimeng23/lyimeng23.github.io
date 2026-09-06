# Spatial Intelligence Narrative — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the Yimeng Liu homepage's research narrative into a five-stage Spatial Intelligence agenda (Multimodal Perception → Cross-modal & Spatial Representation → Physical/Spatial Modeling → Spatial Reasoning → Embodied Intelligence) with honest published-evidence mapping, capability labels on featured cards, and the new H1 "Building Spatial Intelligence for the Physical World".

**Architecture:** Content-narrative change on the existing Jekyll theme. `_data/vision.yml` grows from 4 keys to 5 stages (each with key, title, question, blurb, evidence, status). Existing `_includes/vision.html`/`featured.html` are rewritten to render the new schema with the existing `reveal` motion system; `_sass/_components.scss` adds vision-flow + capability-label styles reusing existing design tokens. H1 text changes in `_includes/hero.html` only. No layouts, config, or build changes.

**Tech Stack:** Jekyll 3.9 (github-pages), Liquid, SCSS (`_sass/_tokens.scss` design tokens), existing `reveal` CSS animation (IntersectionObserver + `prefers-reduced-motion`), jekyll-sitemap.

---

### Task 1: Update `_data/vision.yml` to the five-stage ladder

**Files:**
- Modify: `_data/vision.yml`

- [ ] **Step 1: Replace the data model**

Current file has 4 entries (`SENSE/MODEL/REASON/ACT`). Replace entire content with the 5-stage ladder. Each entry: `key` (display code), `title`, `question`, `blurb` (capability statement + honest evidence note), `stage` (1–5), `status` (`foundation` | `future` | `current`).

```yaml
main:
  - key: "01"
    title: "Multimodal Perception"
    question: "What is there?"
    blurb: "Observing people, objects, and environment through vision, mmWave/RF, and human/vehicle sensing — complementary modalities perceiving the same physical state even under adverse conditions."
    evidence: "Hydra: first mmWave + RGB fusion showing complementary perception when light or weather degrades one channel."
    status: foundation
  - key: "02"
    title: "Cross-modal & Spatial Representation"
    question: "Where is it, and how is it related?"
    blurb: "Transforming and fusing information across modalities into a more stable physical and spatial representation."
    evidence: "Proteus: cross-modality knowledge transfer that keeps prediction stable when one sensing modality is unreliable or unavailable."
    status: foundation
  - key: "03"
    title: "Physical / Spatial Modeling"
    question: "How is the world changing?"
    blurb: "Recovering physical structure, geometry, state, and fine-grained spatial detail from sparse or noisy observations."
    evidence: "Adonis: efficient mmWave imaging that recovers fine-grained physical state at wider scan distances."
    status: foundation
  - key: "04"
    title: "Spatial Reasoning & Prediction"
    question: "Why is it changing, and what happens next?"
    blurb: "On an evolving spatial state, understanding object–object, human–object, and agent–environment relations, tracking change, and predicting future states."
    evidence: "Dynamic world models and spatial prediction — the focus of my current and future agenda."
    status: current
  - key: "05"
    title: "Embodied Intelligence"
    question: "What should the agent do?"
    blurb: "Grounded, safety-aware decision and action in real systems — driving, robotics, smart spaces, and agriculture."
    evidence: "Cognitive Driving: LLM-grounded spatial reasoning for risk-aware decisions in CARLA — ongoing research."
    status: current
```

- [ ] **Step 2: Verify YAML parses**

Run:
`python3 -c "import yaml,sys; d=yaml.safe_load(open('_data/vision.yml')); print(len(d['main']), [x['title'] for x in d['main']])"`
Expected: `5 ['Multimodal Perception', 'Cross-modal & Spatial Representation', 'Physical / Spatial Modeling', 'Spatial Reasoning & Prediction', 'Embodied Intelligence']`

- [ ] **Step 3: Commit**

```bash
git add _data/vision.yml
git commit -m "feat(vision): five-stage Spatial Intelligence ladder in data"
```

---

### Task 2: Rewrite `_includes/vision.html` to render the continuous flow

**Files:**
- Modify: `_includes/vision.html`

- [ ] **Step 1: Replace template**

Key changes vs current version: (a) new H2 + motivation lede per spec §5; (b) five `vision__step` items in a continuous vertical flow (not 4-card grid); (c) each step shows `question` as question-style line and `evidence` line beneath blurb; (d) `status` → modifier class (`vision__step--foundation/current/future`) driving maturity treatment; (e) closing "Where this is leading" block per spec §8.

```liquid
<section class="section section--alt" id="research-vision" tabindex="-1">
  <div class="container">
    <div class="section__head reveal">
      <p class="eyebrow">Research Vision</p>
      <h2 class="section__title">Building Spatial Intelligence for the Physical World</h2>
      <p class="section__lede">
        Foundation models are strong on static vision and language, but stable understanding
        of continuously changing, partially observable, multi-entity real environments —
        maintaining spatial state over time, respecting physical constraints, predicting, and
        acting grounded in that state — remains hard. My research builds that capability, one
        stage at a time.
      </p>
    </div>

    <ol class="vision" aria-label="Research pipeline: Perception, Representation, Modeling, Reasoning, Embodied Intelligence">
      {% assign stages = site.data.vision.main %}
      {% for step in stages %}
      <li class="vision__step vision__step--{{ step.status }} reveal" style="--i: {{ forloop.index0 }}">
        <div class="vision__row">
          <span class="vision__num" aria-hidden="true">{{ step.key }}</span>
          <div class="vision__content">
            <p class="vision__question" aria-hidden="true">{{ step.question }}</p>
            <h3 class="vision__title">{{ step.title }}</h3>
            <p class="vision__blurb">{{ step.blurb }}</p>
            <p class="vision__evidence">
              <span class="vision__evidence-tag">{% if step.status == 'foundation' %}Published foundation{% elsif step.status == 'current' %}Current research{% else %}Future agenda{% endif %}</span>
              <span class="vision__evidence-text">{{ step.evidence }}</span>
            </p>
          </div>
        </div>
        {% unless forloop.last %}
        <div class="vision__gap" aria-hidden="true"></div>
        {% endunless %}
      </li>
      {% endfor %}
    </ol>

    <div class="vision__forward reveal">
      <p class="eyebrow">Where this is leading</p>
      <p class="vision__forward-text">
        From isolated sensing → persistent spatial state → dynamic world models → spatial
        reasoning and prediction → embodied decision and action. Over five to ten years, my
        agenda turns today's perception foundations into AI that knows <em>what is where</em>,
        <em>how things relate</em>, <em>what is changing</em>, and <em>what will happen next</em>
        in the physical world — and acts on that understanding safely.
      </p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Confirm Liquid builds**

Run docker build (production):
```bash
docker run --rm -v jekyll_gems:/usr/local/bundle -v $PWD:/srv/jekyll -e JEKYLL_ENV=production -e PAGES_REPO_NWO=lyimeng23/lyimeng23.github.io jekyll/jekyll:4 bundle exec jekyll build
```
Expected: `done in … seconds` with no error/warning lines for vision.

- [ ] **Step 3: Verify rendered output**

Run: `grep -oE "vision__step--[a-z]+" _site/index.html | sort | uniq -c`
Expected: `vision__step--current x2` and `vision__step--foundation x3` lines present.

- [ ] **Step 4: Commit**

```bash
git add _includes/vision.html
git commit -m "feat(vision): render five-stage continuous Spatial Intelligence flow"
```

---

### Task 3: Update the Research Vision SCSS for the flow layout

**Files:**
- Modify: `_sass/_components.scss` (replace lines 5–66, the `.vision*` block)

- [ ] **Step 1: Replace vision styles**

Replaces the 4-card grid styles with a 5-step continuous vertical flow. Reuses existing tokens (`$color-bg`, `$color-border`, `$color-accent`, `$color-accent-soft`, `$color-muted`, `$color-text`, `$radius`, `$radius-sm`, `$bp-md`). Maturity treatment: foundation steps get normal emphasis, current steps get a dashed border + `Ongoing` text color treatment, future steps (if any) get muted styling. New classes: `.vision__num`, `.vision__row`, `.vision__content`, `.vision__question`, `.vision__evidence`, `.vision__evidence-tag`, `.vision__gap`, `.vision__forward`, `.vision__forward-text`, `.vision__step--foundation/current`.

```scss
// ---------- Research Vision (Spatial Intelligence flow) ----------
.vision {
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.vision__step {
  margin: 0;
  padding: 0;
}

.vision__row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.25rem;
  align-items: start;
  padding: 1.25rem 1.5rem;
  background: $color-bg;
  border: 1px solid $color-border;
  border-radius: $radius;
  box-shadow: 0 1px 2px rgba($color-text, 0.04);

  @media (min-width: $bp-md) {
    grid-template-columns: 88px 1fr;
    gap: 1.5rem;
  }
}

.vision__num {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: $color-accent;
  border: 1px solid $color-accent;
  border-radius: 999px;
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.vision__question {
  margin: 0 0 0.15rem;
  font-size: 0.875rem;
  font-style: italic;
  color: $color-muted;
}

.vision__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: $color-text;
}

.vision__blurb {
  margin: 0;
  color: $color-text;
  font-size: 0.96875rem;
  line-height: 1.55;
  max-width: 66ch;
}

.vision__evidence {
  margin: 0.9rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.90625rem;
  color: $color-text;

  @media (min-width: $bp-sm) {
    flex-direction: row;
    align-items: baseline;
    gap: 0.6rem;
  }
}

.vision__evidence-tag {
  flex-shrink: 0;
  display: inline-block;
  padding: 0.15rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: $color-accent;
  background: $color-accent-soft;
  border-radius: $radius-sm;
}

.vision__evidence-text { color: $color-muted; }

// Maturity: foundation (solid), current (dashed accent), future (muted).
.vision__step--current .vision__row {
  border-color: $color-accent;
  border-style: dashed;
  background: $color-accent-soft;
}

.vision__gap {
  height: 1.1rem;
  width: 2px;
  margin: 0 auto;
  background: $color-accent;
  opacity: 0.35;
}

.vision__forward {
  margin-top: 2.5rem;
  padding: 1.5rem 1.75rem;
  background: $color-bg;
  border: 1px solid $color-border;
  border-left: 4px solid $color-accent;
  border-radius: $radius;
}

.vision__forward-text {
  margin: 0.6rem 0 0;
  max-width: 78ch;
  font-size: 1rem;
  line-height: 1.6;
  color: $color-text;

  em { font-style: italic; color: $color-accent-strong; }
}
```

- [ ] **Step 2: Build + verify styles compile**

Run:
```bash
docker run --rm -v jekyll_gems:/usr/local/bundle -v $PWD:/srv/jekyll -e JEKYLL_ENV=production -e PAGES_REPO_NWO=lyimeng23/lyimeng23.github.io jekyll/jekyll:4 bundle exec jekyll build
```
Expected: `done in … seconds`, no SCSS error.

- [ ] **Step 3: Verify new classes in compiled CSS**

Run: `grep -cE "vision__forward|vision__question|vision__evidence-tag" _site/assets/css/main.css`
Expected: ≥ 3 (all three class names appear in rendered CSS).

- [ ] **Step 4: Commit**

```bash
git add _sass/_components.scss
git commit -m "feat(vision): five-stage flow layout with maturity treatment"
```

---

### Task 4: Update H1 in `_includes/hero.html`

**Files:**
- Modify: `_includes/hero.html:5-7`

- [ ] **Step 1: Replace the H1 text**

Change the hero title line (current: `I build intelligent systems that perceive, model, reason about, and act in the physical world.`).

```html
<h1 class="hero__title">
  Building Spatial Intelligence for the Physical World.
</h1>
```

- [ ] **Step 2: Build + confirm H1**

Run: `grep -oE "<h1[^>]*>[^<]*</h1>" _site/index.html`
Expected: `<h1 class="hero__title"> Building Spatial Intelligence for the Physical World. </h1>` (line may include leading/trailing newline — check subject text contains `Building Spatial Intelligence`).

- [ ] **Step 3: Commit**

```bash
git add _includes/hero.html
git commit -m "feat(hero): Spatial Intelligence positioning headline"
```

---

### Task 5: Add capability labels to featured cards

**Files:**
- Modify: `_data/featured.yml` (add `capability` per card)
- Modify: `_includes/featured.html`
- Modify: `_sass/_components.scss` (add `.feature-card__capability` style)

- [ ] **Step 1: Add `capability` field to each featured entry**

In `_data/featured.yml`, add one line per entry:
- Hydra → `capability: "Multimodal Perception"`
- Proteus → `capability: "Cross-modal Learning"`
- Adonis → `capability: "Physical Representation"`
- Driving → `capability: "Spatial Reasoning & Action · Ongoing"`

Example (Hydra entry):
```yaml
  - id: hydra
    title: "Hydra"
    capability: "Multimodal Perception"
    tagline: "Multi-modal leaf wetness sensing with mm-Wave and camera fusion"
    ...
```

- [ ] **Step 2: Render the eyebrow in featured.html**

Inside `.feature-card__meta` add before the venue badge:

```liquid
{% if item.capability %}<span class="feature-card__capability">{{ item.capability }}</span>{% endif %}
```

- [ ] **Step 3: Style `.feature-card__capability`**

Append to `_sass/_components.scss` near the existing `.feature-card__meta` block (line ~117):

```scss
.feature-card__capability {
  flex-shrink: 0;
  padding: 0.15rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: $color-on-accent;
  background: $color-accent;
  border-radius: $radius-sm;
}
```

- [ ] **Step 4: Build + verify**

Run: `grep -oE "feature-card__capability"[^>]*>[^<]*" _site/index.html | head -4`
Expected: four lines: `Multimodal Perception`, `Cross-modal Learning`, `Physical Representation`, `Spatial Reasoning & Action · Ongoing`.

- [ ] **Step 5: Commit**

```bash
git add _data/featured.yml _includes/featured.html _sass/_components.scss
git commit -m "feat(featured): capability labels instead of stage numbers"
```

---

### Task 6: Cross-check honesty of copy against spec §4

**Files:** (read-only check; edit only if needed)
- `_includes/vision.html`
- `_data/vision.yml`
- `_data/featured.yml`

- [ ] **Step 1: Verify no overclaim**

Verify these strings appear as authored in spec, and their negation does NOT appear in rendered homepage HTML:
- `cross-modality knowledge transfer` (Proteus) — not "unified 3D world representation"
- `efficient mmWave imaging` / `fine-grained physical state` (Adonis) — not "world model"
- `ongoing research` (Driving) — appears
- `Dynamic world models and spatial prediction — the focus of my current and future agenda` (stage 4 evidence) — appears, marked current

Run:
```bash
grep -iE "world model|unified 3d|full 3d" _site/index.html
```
Expected: matches only the stage-4 future framing / forward block, NOT attached to Proteus/Adonis names.

- [ ] **Step 2: Commit only if edits needed**

If any overclaim found, edit `_data/vision.yml` or `_includes/vision.html` accordingly, then rebuild + git commit.

---

### Task 7: Full site verification + Lighthouse

**Files:** (no changes expected)

- [ ] **Step 1: Production build clean**

Run:
```bash
docker run --rm -v jekyll_gems:/usr/local/bundle -v $PWD:/srv/jekyll -e JEKYLL_ENV=production -e PAGES_REPO_NWO=lyimeng23/lyimeng23.github.io jekyll/jekyll:4 bundle exec jekyll build
```
Expected: no error/warning lines.

- [ ] **Step 2: SANITY-DOM check via Playwright (local server)**

Serve `_site` on port 8098 and run the existing `webp-scroll.js` style check — all 4 featured imgs ok, no failed requests, no page errors. Also assert:
- `#research-vision` contains exactly 5 `.vision__step`
- H1 text = "Building Spatial Intelligence for the Physical World."
- `.vision__step--current` count = 2 (stages 4 & 5), `.vision__step--foundation` = 3

- [ ] **Step 3: Screen captures at 1440 / 1280 / tablet / 390**

Existing screenshot helper works against the live URL after push; capture new Vision section at all four widths.

- [ ] **Step 4: Lighthouse desktop + mobile**

Run Lighthouse on the deployed URL (after push in Task 8):
```bash
cd /var/folders/p2/3g4m9xds31158t3k1lpq3xgr0000gn/T/opencode && npx lighthouse <url> --quiet --chrome-flags="--headless --no-sandbox" --output=json --output-path=lh-si.json --only-categories=performance,accessibility,best-practices,seo
```
Expected: a11y ≥ 90, performance ≥ 90, CLS = 0 (content change only; no perf regression expected).

- [ ] **Step 5: Commit (if any validation fix landed)**

```bash
git add -A && git commit -m "fix: post-validation adjustments"
```

---

### Task 8: Deploy

**Files:** (no code changes)

- [ ] **Step 1: Push**

```bash
git -c credential.helper='!f() { echo "username=x-access-token"; echo "password=$(gh auth token)"; }; f' -c http.postBuffer=524288000 push origin main
```
Expected: `… main -> main`.

- [ ] **Step 2: Wait for GH Pages build green**

Poll `gh api repos/lyimeng23/lyimeng23.github.io/pages` until `status: built`.

- [ ] **Step 3: Live 200 checks**

```bash
for u in https://lyimeng23.github.io/ https://lyimeng23.github.io/news/ https://lyimeng23.github.io/activities/ https://lyimeng23.github.io/project/senior-driving/; do curl -sL -o /dev/null -w "%{http_code} $u\n" $u; done
```
Expected: 200 for all four.

- [ ] **Step 4: Confirm live narrative**

```bash
curl -s https://lyimeng23.github.io/ | grep -oE "Building Spatial Intelligence for the Physical World"
```
Expected: exact string present.

---

## Self-Review

Spec coverage mapping:
- §4 five stages + honest evidence → Tasks 1, 2, 6
- §5 motivation lede → Task 2 (lede paragraph)
- §6 hero H1 → Task 4
- §7 capability labels → Task 5
- §8 Where this is leading block → Task 2 forward block
- §10 constraints (no SPIRIT, no rebuild) → honored: no SPIRIT anywhere in plan; only 5 files touched
- §11 acceptance → Tasks 7, 8

Placeholders: none — every step has exact file paths, complete Liquid/SCSS/YAML content, and exact verification commands.

Type/name consistency: `vision.yml` keys (`key/title/question/blurb/evidence/status`) match Task 2 template references `step.key`, `step.question`, `step.title`, `step.blurb`, `step.evidence`, `step.status`. `vision__step--foundation/current` modifiers match Task 3 SCSS. `feature-card__capability` consistent across Tasks 5 (Liquid + SCSS + grep). Stage count 5 consistent throughout.