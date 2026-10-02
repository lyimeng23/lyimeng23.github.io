# AGENTS.md

Working contract for this repository. Read this before changing anything.

Project: `lyimeng23.github.io` — the personal academic site of Yimeng Liu, Ph.D. candidate in
Computer Science and Engineering at Michigan State University. Jekyll, GitHub Pages, no build
framework beyond Jekyll itself.

---

## 全局工作原则 / Global working principles

### 1. 评测先行 / Evaluation first

任何非 trivial 修改，必须在动手之前先写清楚四件事：

1. **问题** — 到底哪里不对，用可观察的现象描述，不用形容词
2. **Baseline** — 当前的数值或状态是什么
3. **成功标准** — 什么数值或状态算修好了
4. **验证方法** — 用哪条命令、哪个检查能证明

没有这四项就开始改代码，是本仓库最常见的错误来源。指标能测的就必须给数字；测不了就给
before/after 的截图或 DOM 证据。

### 2. 第一性原理 / First principles

不要默认现有架构、代码和历史设计是对的。先回答两个问题，再决定保留、删除、合并还是重写：

- 真正要解决什么问题？
- 最小必要系统是什么？

"原来就是这么写的" 不是理由。`docs/AUDIT.md` 里记录的第一版站点就是一个例子：它符合当时
的 spec 措辞，但把 thesis 当成了主角、把访问者本人降级成灰色小字。spec 的字面意思和它的
意图不是一回事。

### 3. 真实数据与真实结果 / Real data, real results

**禁止伪造论文、结果、奖项、经历、研究结论、引用数或 venue。**

- 测试可以用 mock，simulation 可以用 synthetic data，但**必须显式标注**，不能让它们冒充真实证据
- 无法核实的元数据（例如从 PDF 里提取不到的 DOI）**就不要给链接** —— 错的 DOI 比没有链接更糟
- 站点上任何一条 claim 都必须能追到论文摘要、CV，或明确标注为"尚未完成"
- 用户提供的事实（例如 Google Scholar 记录）以用户为准；与其冲突时**先问，不要覆盖**

### 4. Think Before Coding · Simplicity First · Surgical Changes · Goal-Driven Execution

修改前先理解全局。优先最简单方案。保持最小有效 diff。只做真正服务当前目标的工作。
避免无意义重构和 over-engineering —— 尤其是"既然要改这块不如把整个文件重写"。

### 5. 独立可复现环境 / Self-contained, reproducible environment

环境的建立、依赖、配置和运行入口必须显式定义，并尽量隔离在 workspace 内，不依赖机器上的
隐式状态（全局 node_modules、全局 gem、系统字体假设、某个 Chrome 路径），保证换机器也能重跑。

本仓库的具体做法：

- 构建固定走 Docker，避免本机 Ruby 版本差异：见下方 `构建`
- 字体一律 self-hosted 或使用系统字体栈，不假设访问者机器上有什么
- 本地 HTTP server 用 `python3 -m http.server`，不引入新的前端依赖
- 任何临时验证脚本放 `/var/folders/.../T/opencode/`，**不提交进仓库**
- **新增根目录文件前先问它是否该被发布**。Jekyll 会把未 exclude 的根 `.md` 变成可访问页面，
  `AGENTS.md` 就这样泄漏过保密词（见下方保密边界）

### 6. Infra First, Loop Fast

优先打通 `install → data → run → evaluate → output` 的最小完整闭环，再优化。基础设施必须
支持快速重复实验和快速定位失败。

对本仓库意味着：改任何东西之后，`构建` 必须能在 2 秒内跑完并给出错误。构建慢或需要手动清理
`_site`，本身就是 bug。

### 7. Evidence-Driven Iteration

每一轮修改都必须形成闭环：

```
修改 → 运行 → 评测 → 定位问题 → 下一轮修改
```

根据结果决定下一步，而不是凭感觉持续加功能。**评测的优先级高于产出。**

### 8. Small Changes, Continuous Validation

每次只解决一个明确问题。修改后立即运行相关测试、benchmark 和 regression check。发现问题就
定位根因，不接受"看起来好了"。禁止积累大量未经验证的修改 —— 连续三个改动不验证就应该停下来。

### 9. Delete Before Add

面对复杂系统，默认优先级：

```
delete → merge → simplify → reuse → rewrite → add
```

优先减少代码、重复路径、wrapper、历史兼容层和不必要抽象，而不是继续增加新层。

本仓库的实例：`jekyll-theme-primer` 注入了 76KB 无用 CSS，`theme: null` 就删掉了它；
换 Times New Roman 之后 Instrument Serif 的 woff2 和 preload 一并删除，字体负载 148KB → 78KB。

### 10. Done Means Verified

"代码写完"不等于完成。只有同时满足才算完成：

- 目标指标达到
- 核心路径**真实运行**过（不是只通过静态检查）
- 旧功能没有明显 regression
- 结果可复现
- 文档同步更新

### 11. Git 版本管理

- **除非用户明确要求，否则不 commit、不 push。** 上一轮的 push 授权不自动延伸到下一轮改动。
- 提交前必须先跑 `审查` 里的检查。
- commit message 遵循本仓库既有的 conventional commits 风格：`feat(scope):`、`fix(scope):`、
  `docs(audit):`、`chore(scope):`、`refactor(scope):`
- message body 要写**为什么**，不只写**改了什么**；把权衡和被否决的方案写进去
- 不 commit 未验证的状态；working tree 保持 clean
- **绝不提交 secret、credential、未公开稿件或本机路径**

### 12. Todo 纪律

根据进度、目标和当前任务**不断更新 todo**。不要因为一个任务"做不下去"就把它删掉 —— 删掉
等于遗忘。正确做法是**修改它的描述，或把它拆成更小、能推进的子任务**，再继续。

同样地，遇到阻塞时：先尝试拆分问题；确实需要用户输入、审批、凭据或外部数据时，明确说明
缺什么，而不是反复做只读探测。

---

## 保密边界 / Disclosure boundary

**最高优先级约束，任何修改都不得违反。**

`docs/DISCLOSURE.md` 是决策记录（该目录被 Jekyll build 排除，不会上线）。

**Jekyll 会把任何未 exclude 的根目录 `.md` 发布成可访问页面。** 已经踩过一次：新建
`AGENTS.md`（内含保密词）后它变成 `_site/AGENTS.html` 公开可访问，把 SPIRIT / Mímir / Snotra
三个名字和"双盲在审"的事实全部泄漏。任何新增的根目录文件都必须同步加进 `_config.yml`
的 `exclude`，并重跑上面的保密检查。

| 类别 | 内容 |
|---|---|
| 可公开 | 已 camera-ready 的论文：Hydra (MobiCom'24)、Adonis (INFOCOM'25)、Proteus (SenSys'25)、Driving (arXiv:2603.00691)、AeroEcho (INFOCOM'25)、Hydra-Bench (arXiv:2507.22685)、Soilnutri (IMWUT'26)、mmLeaf (MobiSys'23)、Biomimetic sonar (2022)、Gap restoration (CEA'26) |
| **绝不公开** | **SPIRIT、Mímir、Snotra** —— ICLR '27 双盲在审稿：不得出现名字、方法、架构、数据集、消融、结果数字、PDF 或 arXiv 链接 |
| 安全替代 | 只陈述它们回答的**研究问题**。问题是 agenda，结果才是 answer。 |

MobiSys 2026 那份 driving PDF **不得声称已发表于 MobiSys '26**：它没有 ACM camera-ready 版权块，
LaTeX 里残留 Hydra MobiCom'24 的 DOI，且是 10 位作者跨两所。真实 venue 是 arXiv 预印本。

每次改动后必须复查（见 `审查`）。

---

## 构建 / Build

固定用 Docker，避免本机 Ruby / gem 差异：

```bash
rm -rf _site && docker run --rm \
  -v "jekyll_gems:/usr/local/bundle" \
  -v "$PWD":/srv/jekyll \
  -e JEKYLL_ENV=production \
  -w /srv/jekyll \
  jekyll/jekyll:4 bundle exec jekyll build
```

通过标准：`done in N seconds`，且输出中没有 error / warning。

本地预览（`_site` 是纯静态产物，python server 足够，不引入前端依赖）：

```bash
cd _site && python3 -m http.server 8811
```

---

## 审查 / Verification

原则 10 要求真实运行。**下面每一条都实际执行过，不允许只做静态检查就宣称完成。**

```bash
cd /var/folders/p2/3g4m9xds31158t3k1lpq3xgr0000gn/T/opencode
SITE_ROOT="$PWD/_site" node audit.js "http://localhost:8811" "<label>"   # 全套回归
```

`audit.js`（零依赖，Node 22+ 原生 WebSocket 驱动系统 Chrome）覆盖：

0. **Disclosure sweep** — 对构建产物逐词统计命中**文件数**（不是行数）；找不到构建目录时
   **报 NOT RUN 并判失败**，绝不允许因为路径写错而假通过
1. **Overflow + DOM 完整性** — 首页在 320/360/390/430/768/834/1280/1440 八个宽度下无横向溢出，
   无 broken image，每个 `<img>` 有 `alt` 和 `width`/`height`，每页恰好一个 `h1`
2. **axe-core 4.10.2** — 5 个页面 × 桌面 1440 / 移动 390，全滚动，`wcag2a` `wcag2aa` `wcag21a`
   `wcag21aa` `best-practice`，目标 **0 violations**
3. **Heading / landmark / link** — 无 heading level 跳跃，每页有 `<main>`，无无名链接/按钮，
   无重复 id，`target="_blank"` 全部带 `noopener`
4. **Image src 可达性** — 对每个 `<img>` 的实际 URL 发 fetch，而不是看 `naturalWidth`（后者对
   `loading="lazy"` 的图会误报）
5. **内部链接** — 所有站内 `<a href>` 实际 fetch，必须 0 broken
6. **Core Web Vitals** — 4× CPU throttle + Slow 4G 下测 LCP / CLS / long task

其他必要检查：

```bash
# JS 语法
node --check assets/js/main.js && node --check assets/js/vision.js

# 构建产物不能包含内部文档
find _site -iname "*DISCLOSURE*" -o -iname "*AUDIT*" | wc -l   # 必须为 0

# 保密词必须整站为 0 —— 注意用 -l 数"有多少个文件命中"，不要用 grep -c 的行数
for t in SPIRIT "Mímir" Snotra ICLR27 "under review" "double-blind"; do
  printf "%-14s %s\n" "$t" "$(grep -rl "$t" _site/ 2>/dev/null | wc -l | tr -d ' ')"
done   # 必须全部为 0

# 视觉复核（每个改动过的 section 至少一张）
node shot.js "http://localhost:8811/" /tmp/x.png 1440 1000 "#section"
node shot.js "http://localhost:8811/" /tmp/y.png 390 844
node shot.js "http://localhost:8811/" /tmp/z.png 320 640
```

### 已知的检查盲区

- `audit.js` 报告 rail 对比度问题时要先确认不是 **transition 中途采样**。scroll-spy 会给
  `.rail__item` 的 `color` 加 transition，axe 在过渡中采样会报出一个稳态下永不出现的颜色。
  脚本已在跑 axe 前等 1400ms 让 transition 收敛。
- headless `--screenshot` 不响应 `#hash` 滚动，必须用 `shot.js`（CDP）而不是 Chrome 的
  `--screenshot` 参数。

---

## 内容与设计约束

- **设计语言**：scientific editorial minimalism + computational visual language。极少色彩：
  paper `#faf9f5`、ink `#16150f`/`#4a473f`/`#6b6659`、唯一 accent `#17503f`、signal `#d8a24a`
  （只用于原始观测、不确定性和预测）。禁止 AI 蓝紫渐变、glassmorphism、大量 glow、阴影。
- **字体**：display = **Times New Roman**（系统字体，零 webfont 开销）；
  text = Newsreader；labels/data = IBM Plex Mono。全部 self-hosted 或系统字体栈。
  改字体时要重新截图检查 `clamp()` 上限 —— Times 比 Instrument Serif 窄。
- **站点结构**：person-first。组织成五条主线，每条对应一节：
  我是谁 (Hero) → 我们发表了什么 (Record) → 我有什么想法 (Thesis) →
  空间智能 (Instrument) → 怎么做到 (Research System → Selected work) →
  路线 (Roadmap) → 科研理想 (Vision)
- **signature moment** 必须原创、必须表达研究思想本身，且不能是通用粒子背景 / network sphere /
  3D globe。
- **动效**必须服务信息表达，支持 `prefers-reduced-motion`，no-JS 时内容必须完全可见。
- **不引入不必要的依赖。** 当前零运行时前端依赖。这是主动决策，不是巧合：Three.js 约 600KB，
  且会在访客和页面之间放一个 WebGL context，破坏 no-JS 回退、reduced-motion 保证和 LCP。
  引入任何新依赖前必须先论证它带来的表达力无法用现有手段达到。
- 图片必须有显式 `width`/`height`（CLS）和有意义的 `alt`。

---

## 已知限制（不要重复"发现"）

- `assets/files/*.pptx` 里两份 talk deck 分别 19MB / 18MB。只在点击时加载，但仓库体积约 37MB。
  转 PDF 可显著减小，**未经用户批准不要动**。
- `jekyll-sitemap` 会把 `assets/files/` 下的论文 PDF 列入 sitemap —— 这是有意的，论文应该可被检索到。
- `project/caspianpost/` 保留在仓库中但被 `_config.yml` 的 `exclude` 排除在构建之外
  （无关的产品页，恢复只需改一行）。
- Lighthouse 的 Chrome 曾对所有页面报 `NO_FCP`（包括一个空白测试页），因此最终指标改用
  `audit.js` 直接测。早期一次 Lighthouse 结果：桌面 100/100/100/100，移动 97/100/100/100。
- `~/Downloads/jobtalk` 里有 ICLR'27 在审稿的 zip。**可以读已发表的论文源码取元数据，
  但不要触碰那三个 ICLR zip。**

---

## 约定

- Include 放 `_includes/`，内容放 `_data/`，样式放 `_sass/`（`_tokens` → `_base` → `_layout`
  → `_components` → `_motion`）
- 优先修改已有结构，而不是不断增加 wrapper 和重复组件
- 数据驱动：可枚举内容进 `_data/*.yml`，include 只负责渲染
- CSS 注释解释**为什么**，尤其是设计取舍和被否决的方案 —— 不要注释复述代码
- 记录决策和被否决的方案进 `docs/`（不上线）