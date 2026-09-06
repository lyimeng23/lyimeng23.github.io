(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal-on-scroll (skipped entirely when reduced motion is requested).
  if (!reduced && "IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    }
  }

  // Mobile nav toggle.
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("site-nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open");
    });
    // Close the menu when a link is chosen.
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      }
    });
  }
})();