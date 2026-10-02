/* Yimeng Liu — homepage behaviour.
   Vanilla, no dependencies. Everything degrades to a complete, readable page. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduced = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* ------------------------------------------------------------------
     1. Reveal on scroll — once per element, transform/opacity only.
     ------------------------------------------------------------------ */
  function reveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (reduced || !("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  }

  /* ------------------------------------------------------------------
     2. Primary navigation — mobile drawer, scrolled state, scroll-spy.
     ------------------------------------------------------------------ */
  function nav() {
    var bar = document.getElementById("site-nav");
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");

    if (!bar) return;

    var rail = document.querySelector(".rail");
    var stuck = false;
    var railed = false;
    var onScroll = function () {
      var next = window.scrollY > 12;
      if (next !== stuck) {
        stuck = next;
        bar.classList.toggle("is-stuck", stuck);
      }
      // The rail is noise over the hero; it earns its place once you scroll in.
      var show = window.scrollY > window.innerHeight * 0.7;
      if (show !== railed && rail) {
        railed = show;
        rail.classList.toggle("is-visible", show);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!toggle || !menu) return;

    function setMenu(open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  function scrollSpy() {
    if (!("IntersectionObserver" in window)) return;

    var sections = [].slice.call(document.querySelectorAll("main > section[id]"));
    if (!sections.length) return;

    var links = {};
    [].slice.call(document.querySelectorAll("[data-nav-link]")).forEach(function (a) {
      links[a.getAttribute("data-nav-link")] = a;
    });
    var railItems = {};
    [].slice.call(document.querySelectorAll("[data-rail]")).forEach(function (a) {
      railItems[a.getAttribute("data-rail")] = a;
    });

    var visible = {};

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        var best = null;
        var bestRatio = 0;
        sections.forEach(function (section) {
          var r = visible[section.id] || 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = section;
          }
        });

        var key = best ? best.id : null;
        document.querySelectorAll("[data-nav-link]").forEach(function (a) {
          if (key && a.getAttribute("data-nav-link") === key) {
            a.setAttribute("aria-current", "true");
          } else {
            a.removeAttribute("aria-current");
          }
        });
        Object.keys(railItems).forEach(function (id) {
          if (id === key) {
            railItems[id].setAttribute("aria-current", "true");
          } else {
            railItems[id].removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.15, 0.4, 0.75, 1] }
    );

    sections.forEach(function (s) { io.observe(s); });
  }

  /* ------------------------------------------------------------------
     3. The instrument — one scene, six stages, driven by scroll.
     ------------------------------------------------------------------ */
  function instrument() {
    var rootEl = document.querySelector("[data-instrument]");
    if (!rootEl) return;

    var frame = rootEl.querySelector(".panel__frame");
    var steps = [].slice.call(rootEl.querySelectorAll(".step"));
    if (!steps.length) return;

    var layers = [].slice.call(rootEl.querySelectorAll(".pn-layer[data-layer]"));
    var stageOut = rootEl.querySelector("[data-panel-stage]");
    var readOut = rootEl.querySelector("[data-panel-read]");
    var progress = 0;
    var current = -1;

    function setStage(index) {
      if (index === current) return;
      current = index;

      var layer = Number(steps[index].getAttribute("data-layer"));
      steps.forEach(function (step, i) {
        var active = i === index;
        step.classList.toggle("is-active", active);
        var btn = step.querySelector(".step__btn");
        if (btn) btn.setAttribute("aria-pressed", String(active));
      });

      layers.forEach(function (g) {
        var n = Number(g.getAttribute("data-layer"));
        g.classList.toggle("is-on", n <= layer);
        g.classList.toggle("is-front", n === layer);
      });

      if (stageOut) {
        stageOut.textContent =
          "Stage " + steps[index].getAttribute("data-step") + " / 06 — " + steps[index].getAttribute("data-label");
      }
      if (readOut) readOut.textContent = steps[index].getAttribute("data-read");

      progress = (layer / (layers.length - 1)) * 100;
      rootEl.style.setProperty("--progress", progress + "%");
    }

    steps.forEach(function (step, i) {
      var btn = step.querySelector(".step__btn");
      if (!btn) return;
      btn.addEventListener("click", function () {
        setStage(i);
        step.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: window.innerWidth < 1080 ? "start" : "center"
        });
      });
    });

    if ("IntersectionObserver" in window) {
      // Pick the step that occupies the reading band most, not simply the last
      // one seen — otherwise adjacent steps flicker as they cross the band.
      var compact = window.innerWidth < 1080;
      var ratios = {};
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            ratios[steps.indexOf(entry.target)] = entry.isIntersecting ? entry.intersectionRatio : 0;
          });
          var best = -1;
          var bestRatio = 0.05;
          Object.keys(ratios).forEach(function (key) {
            if (ratios[key] > bestRatio) {
              bestRatio = ratios[key];
              best = Number(key);
            }
          });
          if (best > -1) setStage(best);
        },
        {
          rootMargin: compact ? "-58% 0px -26% 0px" : "-44% 0px -38% 0px",
          threshold: [0, 0.15, 0.35, 0.6, 0.9]
        }
      );
      steps.forEach(function (s) { spy.observe(s); });
    } else {
      setStage(0);
    }

    /* Depth: the panel sits on a different plane from the text beside it, and
       drifts a few pixels across the section. Transform only, rAF-throttled,
       and only while the section is on screen. */
    if (!reduced) {
      var ticking = false;
      var section = rootEl.closest("section") || rootEl;

      function depth() {
        ticking = false;
        var box = section.getBoundingClientRect();
        var span = box.height - window.innerHeight;
        if (span <= 0) {
          rootEl.style.setProperty("--depth", 0);
          return;
        }
        var t = Math.min(1, Math.max(0, -box.top / span));
        rootEl.style.setProperty("--depth", t.toFixed(3));
      }

      var onDepthScroll = function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(depth);
      };

      if ("IntersectionObserver" in window) {
        var near = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              window.addEventListener("scroll", onDepthScroll, { passive: true });
              depth();
            } else {
              window.removeEventListener("scroll", onDepthScroll);
            }
          });
        }, { rootMargin: "20% 0px" });
        near.observe(section);
      }
    }

    /* Probing the field: crosshair plus a metric readout. Information, not decoration. */
    var crosshair = rootEl.querySelector("[data-crosshair]");
    var cursorOut = rootEl.querySelector("[data-panel-cursor]");
    var finePointer = window.matchMedia ? window.matchMedia("(hover: hover) and (pointer: fine)") : null;

    if (frame && crosshair && cursorOut && finePointer && finePointer.matches && !reduced) {
      frame.addEventListener("pointerenter", function () {
        frame.parentNode.classList.add("is-probing");
      });
      frame.addEventListener("pointerleave", function () {
        frame.parentNode.classList.remove("is-probing");
      });
      frame.addEventListener("pointermove", function (e) {
        var box = frame.getBoundingClientRect();
        var px = (e.clientX - box.left) / box.width;
        var py = (e.clientY - box.top) / box.height;
        if (px < -0.02 || px > 1.02 || py < -0.02 || py > 1.02) return;
        crosshair.style.transform = "translate(" + px * box.width + "px," + py * box.height + "px)";
        cursorOut.textContent =
          "x " + (px * 100).toFixed(1) + " m · y " + (py * 62).toFixed(1) + " m";
      });
    }
  }

  /* ------------------------------------------------------------------
     4. Publication filter.
     ------------------------------------------------------------------ */
  function pubFilter() {
    var buttons = [].slice.call(document.querySelectorAll("[data-filter]"));
    var pubs = [].slice.call(document.querySelectorAll("[data-track]"));
    var count = document.querySelector("[data-filter-count]");
    var empty = document.querySelector("[data-pubs-empty]");
    if (!buttons.length || !pubs.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var want = btn.getAttribute("data-filter");

        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", String(on));
        });

        var shown = 0;
        pubs.forEach(function (item) {
          var match = want === "all" || item.getAttribute("data-track") === want;
          item.hidden = !match;
          if (match) shown++;
        });

        if (count) {
          count.textContent = shown + (shown === 1 ? " paper" : " papers");
        }
        if (empty) empty.hidden = shown > 0;
      });
    });
  }

  function init() {
    reveal();
    nav();
    scrollSpy();
    instrument();
    pubFilter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();