// ============================================================
// Vision — the shared spatial state, drawn from scratch on a 2D canvas.
//
// No dependency, on purpose. Three.js would cost roughly 600KB and would put a WebGL
// canvas between the visitor and the page, breaking the no-JS fallback, the
// prefers-reduced-motion guarantee and the LCP that currently sits under 150ms. A 2D
// canvas does the same job here because the argument is about convergence and coverage,
// not about depth.
//
// Three phases, driven by scroll progress through the section:
//   1. many bounded observers, each covering a fragment, each with a gap
//   2. those fragments converging into one shared state that keeps its own ignorance
//   3. one committed action from that state, and the paths that were rejected
// ============================================================
(function () {
  "use strict";

  var reduced = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  var W = 1200;
  var H = 620;

  // Fixed seeds. A visualisation whose observers jump around on every load looks broken.
  function mulberry(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Each observer is a bounded device with a limited reach and a blind side.
  function buildObservers() {
    var rnd = mulberry(20260302);
    var out = [];
    var spots = [
      [0.14, 0.30], [0.31, 0.66], [0.50, 0.24], [0.63, 0.74],
      [0.79, 0.36], [0.88, 0.80], [0.42, 0.88], [0.06, 0.70]
    ];
    for (var i = 0; i < spots.length; i++) {
      var a = rnd() * Math.PI * 2;
      out.push({
        x: spots[i][0] + (rnd() - 0.5) * 0.05,
        y: spots[i][1] + (rnd() - 0.5) * 0.05,
        reach: 0.13 + rnd() * 0.09,
        facing: a,
        blind: rnd() > 0.5 ? 1 : -1,
        phase: rnd() * Math.PI * 2
      });
    }
    return out;
  }

  var OBSERVERS = buildObservers();

  // The shared state: a lattice where confidence is uneven and three cells are
  // explicitly unobserved. Carrying its own ignorance is the point of the figure.
  var CELLS = 14;
  var HOLES = [[3, 9], [8, 4], [11, 11]];

  function isHole(cx, cy) {
    for (var i = 0; i < HOLES.length; i++) {
      if (HOLES[i][0] === cx && HOLES[i][1] === cy) return true;
    }
    return false;
  }

  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function draw(ctx, p) {
    var s = W / 1200;
    ctx.clearRect(0, 0, W, H);

    // ---- ground plane ----
    var gx0 = 90, gy0 = 96, gx1 = W - 90, gy1 = H - 96;
    var gcols = 15, grows = 8;

    ctx.strokeStyle = "rgba(107,102,89,0.16)";
    ctx.lineWidth = 1 * s;
    for (var c = 0; c <= gcols; c++) {
      var x = gx0 + ((gx1 - gx0) * c) / gcols;
      ctx.beginPath();
      ctx.moveTo(x, gy0);
      ctx.lineTo(x, gy1);
      ctx.stroke();
    }
    for (var r = 0; r <= grows; r++) {
      var y = gy0 + ((gy1 - gy0) * r) / grows;
      ctx.beginPath();
      ctx.moveTo(gx0, y);
      ctx.lineTo(gx1, y);
      ctx.stroke();
    }

    // ---- phase 2: the shared state, fading in as observers converge ----
    var p2 = clamp01((p - 0.28) / 0.34);
    if (p2 > 0) {
      var e2 = ease(p2);
      ctx.save();
      ctx.globalAlpha = e2;

      var cw = (gx1 - gx0) / gcols;
      var ch = (gy1 - gy0) / grows;
      for (var cc = 0; cc < gcols; cc++) {
        for (var rr = 0; rr < grows; rr++) {
          if (isHole(cc, rr)) continue;
          // Confidence falls off from the centre of coverage.
          var d = Math.hypot((cc - gcols / 2) / gcols, (rr - grows / 2) / grows);
          var conf = clamp01(1.25 - d * 1.55);
          if (conf < 0.06) continue;
          ctx.fillStyle = "rgba(23,80,63," + Math.min(0.62, 0.2 + conf * 0.45).toFixed(3) + ")";
          ctx.fillRect(
            gx0 + cc * cw + 1.5 * s,
            gy0 + rr * ch + 1.5 * s,
            cw - 3 * s,
            ch - 3 * s
          );
        }
      }
      ctx.strokeStyle = "rgba(23,80,63," + (e2 * 0.5).toFixed(3) + ")";
      ctx.lineWidth = 1.4 * s;
      ctx.strokeRect(gx0, gy0, gx1 - gx0, gy1 - gy0);

      // The holes are the point of the figure: the state says what it does not know.
      var hw = (gx1 - gx0) / gcols, hh = (gy1 - gy0) / grows;
      for (var hi = 0; hi < HOLES.length; hi++) {
        var hx2 = gx0 + HOLES[hi][0] * hw, hy2 = gy0 + HOLES[hi][1] * hh;
        ctx.fillStyle = "rgba(250,249,245," + (e2 * 0.92).toFixed(3) + ")";
        ctx.fillRect(hx2 + 1.5 * s, hy2 + 1.5 * s, hw - 3 * s, hh - 3 * s);
        ctx.strokeStyle = "rgba(216,162,74," + (e2 * 0.85).toFixed(3) + ")";
        ctx.setLineDash([3 * s, 3 * s]);
        ctx.lineWidth = 1.1 * s;
        ctx.strokeRect(hx2 + 1.5 * s, hy2 + 1.5 * s, hw - 3 * s, hh - 3 * s);
        ctx.setLineDash([]);
      }
      ctx.restore();
    }

    // ---- observers: scattered, then drawn inward ----
    var pull = ease(clamp01((p - 0.18) / 0.5));
    var centreX = (gx0 + gx1) / 2;
    var centreY = (gy0 + gy1) / 2;

    for (var i = 0; i < OBSERVERS.length; i++) {
      var o = OBSERVERS[i];
      var ox = (o.x * W);
      var oy = (o.y * H);
      var x = ox + (centreX - ox) * pull;
      var y = oy + (centreY - oy) * pull;

      var alpha = (1 - pull * 0.82) * (reduced ? 1 : 0.82 + 0.18 * Math.cos(o.phase + p * 6.28));

      // coverage cone — the fragment each observer actually gets
      var reach = o.reach * Math.min(W, H) * (1 + pull * 0.25);
      var half = 0.52 + Math.abs(o.blind) * 0.06;
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, reach, o.facing - half, o.facing + half);
      ctx.closePath();
      ctx.fillStyle = "rgba(216,162,74,0.09)";
      ctx.fill();
      ctx.strokeStyle = "rgba(216,162,74,0.30)";
      ctx.lineWidth = 1 * s;
      ctx.stroke();
      ctx.restore();

      // the device itself
      ctx.save();
      ctx.globalAlpha = Math.min(1, alpha + 0.18);
      ctx.fillStyle = "#17503f";
      ctx.strokeStyle = "#17503f";
      ctx.lineWidth = 1.6 * s;
      var bw = 22 * s, bh = 13 * s;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 2 * s);
      else ctx.rect(x - bw / 2, y - bh / 2, bw, bh);
      ctx.stroke();
      ctx.restore();
    }

    // ---- phase 3: one committed path, and what it displaced ----
    var p3 = clamp01((p - 0.62) / 0.3);
    if (p3 > 0) {
      var e3 = ease(p3);
      ctx.save();
      ctx.globalAlpha = e3;

      var ax = centreX - 150 * s, ay = gy0 + 18 * s;
      var bx = centreX + 210 * s, by = gy1 - 30 * s;

      // rejected candidates, faint
      ctx.strokeStyle = "rgba(107,102,89,0.32)";
      ctx.setLineDash([4 * s, 5 * s]);
      ctx.lineWidth = 1.2 * s;
      var rejected = [
        [[centreX - 40 * s, ay], [centreX + 40 * s, centreY - 30 * s], [bx - 30 * s, by - 40 * s]],
        [[centreX - 60 * s, by - 10 * s], [centreX + 10 * s, centreY + 20 * s], [bx, by + 30 * s]]
      ];
      for (var k = 0; k < rejected.length; k++) {
        ctx.beginPath();
        ctx.moveTo(rejected[k][0][0], rejected[k][0][1]);
        for (var m = 1; m < rejected[k].length; m++) ctx.lineTo(rejected[k][m][0], rejected[k][m][1]);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // the committed path
      var path = [[ax, ay], [centreX - 30 * s, centreY - 40 * s], [bx, by]];
      ctx.strokeStyle = "#17503f";
      ctx.lineWidth = 2.6 * s;
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(path[0][0], path[0][1]);
      var prog = ease(clamp01((p3 - 0.35) / 0.65));
      for (var n = 1; n < path.length; n++) {
        var seg = [path[n - 1], path[n]];
        var segProg = clamp01((prog - (n - 1) / (path.length - 1)) * (path.length - 1));
        if (segProg <= 0) break;
        ctx.lineTo(
          seg[0][0] + (seg[1][0] - seg[0][0]) * segProg,
          seg[0][1] + (seg[1][1] - seg[0][1]) * segProg
        );
        if (segProg < 1) break;
      }
      ctx.stroke();

      // action marker at the head of the path
      if (prog > 0.92) {
        var hx = path[path.length - 1][0], hy = path[path.length - 1][1];
        ctx.fillStyle = "#17503f";
        ctx.beginPath();
        ctx.arc(hx, hy, 5.5 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // ---- phase label, so the figure is readable without animating it ----
    var label = p < 0.32 ? "01 · Many partial observers"
      : p < 0.66 ? "02 · One shared state, with its gaps"
      : "03 · One committed action";
    ctx.fillStyle = "rgba(107,102,89,0.9)";
    ctx.font = "500 " + Math.round(13 * s) + 'px "IBM Plex Mono", ui-monospace, monospace';
    ctx.fillText(label.toUpperCase(), gx0, 60 * s);
  }

  function init() {
    var canvas = document.querySelector("[data-vision-canvas]");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var section = canvas.closest("section") || canvas;
    var visible = false;
    var progress = 0;
    var raf = null;

    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var cssW = canvas.clientWidth || W;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round((cssW * H) / W * dpr);
      ctx.setTransform(dpr * (cssW / W), 0, 0, dpr * (cssW / W), 0, 0);
    }

    function render() { draw(ctx, progress); }

    function measure() {
      var r = section.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      // 0 when the section's top hits the bottom of the viewport, 1 when its
      // bottom reaches the top — so the figure resolves while it is being read.
      var span = r.height + vh;
      var passed = vh - r.top;
      progress = clamp01(passed / span);
    }

    function update() {
      raf = null;
      measure();
      render();
    }

    function request() {
      if (raf === null) raf = window.requestAnimationFrame(update);
    }

    size();
    // Reduced motion: draw one representative frame and stop. The argument is
    // carried by the numbered caption beneath, which is always present.
    if (reduced) {
      progress = 0.5;
      render();
    } else {
      render();
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          visible = entries[0].isIntersecting;
          if (visible) request();
        }, { threshold: [0, 0.15, 0.4, 0.7, 1] }).observe(section);
      } else {
        visible = true;
      }
      var onScroll = function () { if (visible) request(); };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", function () { size(); request(); }, { passive: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();