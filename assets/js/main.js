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
    pubFilter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();