/* Native enhancements. The full bilingual document remains usable without JavaScript. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var theme = document.getElementById('theme');
  if (theme) {
    var preference = 'system';
    try { preference = localStorage.getItem('appearance') || 'system'; } catch (_) {}
    if (!['system', 'light', 'dark'].includes(preference)) preference = 'system';
    theme.value = preference;
    theme.addEventListener('change', function () {
      if (theme.value === 'system') root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', theme.value);
      try { localStorage.setItem('appearance', theme.value); } catch (_) {}
    });
  }
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.hidden = false;
    function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open);
    });
    menu.addEventListener('click', function (event) { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
    });
    var mobile = window.matchMedia('(max-width: 767px)');
    mobile.addEventListener('change', closeMenu);
  }
  document.querySelectorAll('[data-observation]').forEach(function (figure) {
    var controls = figure.querySelector('.observation__controls');
    controls.hidden = false;
    controls.addEventListener('click', function (event) {
      var button = event.target.closest('[data-view]');
      if (!button) return;
      figure.setAttribute('data-view', button.dataset.view);
      figure.querySelector('[data-view-description]').textContent = figure.getAttribute('data-' + button.dataset.view + '-note');
      controls.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
    });
  });
  var filter = document.querySelector('.filter');
  if (filter) {
    filter.hidden = false;
    filter.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (!button) return;
      var shown = 0;
      filter.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
      document.querySelectorAll('[data-track]').forEach(function (pub) {
        pub.hidden = button.dataset.filter !== 'all' && pub.dataset.track !== button.dataset.filter;
        if (!pub.hidden) shown++;
      });
      var counter = document.querySelector('[data-filter-count]');
      counter.textContent = shown + (root.lang === 'zh-CN' ? ' 篇论文' : shown === 1 ? ' paper' : ' papers');
    });
  }
})();
