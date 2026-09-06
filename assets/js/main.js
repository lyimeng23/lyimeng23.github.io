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
  } else if (!reduced) {
    // Older browsers should never get a permanently hidden page.
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Spatial Intelligence story: one persistent scene, with the active overlay
  // controlled by the step currently in view or by a keyboard/mouse click.
  var spatialStory = document.querySelector("[data-spatial-story]");
  var spatialScene = spatialStory && spatialStory.querySelector("[data-spatial-scene]");
  var spatialSteps = spatialStory && spatialStory.querySelectorAll("[data-spatial-step]");
  if (spatialStory && spatialScene && spatialSteps && spatialSteps.length) {
    function activateSpatialStep(step) {
      var layer = step.getAttribute("data-spatial-step");
      spatialScene.setAttribute("data-active-stage", layer);
      spatialSteps.forEach(function (candidate) {
        var active = candidate === step;
        candidate.classList.toggle("is-active", active);
        var button = candidate.querySelector("button");
        if (button) button.setAttribute("aria-pressed", String(active));
      });
    }

    activateSpatialStep(spatialSteps[0]);
    spatialSteps.forEach(function (step) {
      var button = step.querySelector("button");
      if (button) {
        button.addEventListener("click", function () {
          activateSpatialStep(step);
          step.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
        });
      }
    });

    if ("IntersectionObserver" in window) {
      var storyObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) activateSpatialStep(entry.target);
          });
        },
        { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
      );
      spatialSteps.forEach(function (step) { storyObserver.observe(step); });
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
