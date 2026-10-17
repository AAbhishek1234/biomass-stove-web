/* Vande Industries – shared behaviour */
(function () {
  'use strict';

  /* 1. Mobile menu */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* 2. Marquee: duplicate items for a seamless -50% loop */
  var track = document.querySelector('.marquee-track');
  if (track) {
    var items = Array.prototype.slice.call(track.children);
    items.forEach(function (n) { track.appendChild(n.cloneNode(true)); });
  }

  /* 3. Scroll reveal */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
    /* Fail-safe: never leave content hidden if the observer does not fire */
    setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 4000);
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }
})();