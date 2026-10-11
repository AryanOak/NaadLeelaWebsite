/* =========================================================
   Naad Leela — main.js
   Mobile menu · scroll reveal · testimonial slider · booking modal
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1. Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      mobileNav.hidden = open;
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      }
    });
  }

  /* ---------- 2. Missing-image placeholders ----------
     Any <figure class="slot"> whose image fails to load shows its
     data-label instead, so the layout still reads while you add photos. */
  document.querySelectorAll('.slot').forEach(function (slot) {
    var img = slot.querySelector('img');
    if (!img) return;
    var fail = function () { slot.classList.add('is-empty'); };
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener('error', fail);
    img.addEventListener('load', function () { slot.classList.remove('is-empty'); });
  });

  /* ---------- 3. Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 6, 4) * 70) + 'ms';
      // anything already on screen at load reveals straight away
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
      else io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 4. Testimonial slider ---------- */
  var track = document.getElementById('tTrack');
  if (track) {
    var cards = Array.prototype.slice.call(track.children);
    var dotsWrap = document.getElementById('tDots');
    var step = function () {
      if (!cards.length) return 1;
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return cards[0].getBoundingClientRect().width + gap;
    };
    var perView = function () { return Math.max(1, Math.round(track.clientWidth / step())); };

    var buildDots = function () {
      dotsWrap.innerHTML = '';
      var pages = Math.max(1, cards.length - perView() + 1);
      for (var i = 0; i < pages; i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        (function (idx) { b.addEventListener('click', function () { track.scrollTo({ left: idx * step(), behavior: 'smooth' }); }); })(i);
        dotsWrap.appendChild(b);
      }
      syncDots();
    };
    var syncDots = function () {
      var idx = Math.round(track.scrollLeft / step());
      Array.prototype.forEach.call(dotsWrap.children, function (d, i) { d.classList.toggle('is-on', i === idx); });
    };

    document.getElementById('tPrev').addEventListener('click', function () {
      if (track.scrollLeft < 8) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
      else track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    document.getElementById('tNext').addEventListener('click', function () {
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 8) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: step(), behavior: 'smooth' });
    });
    track.addEventListener('scroll', syncDots, { passive: true });
    window.addEventListener('resize', buildDots);
    buildDots();
  }

  /* ---------- 5. Booking modal ---------- */
  var modal = document.getElementById('bookModal');
  if (modal) {
    var lastFocus = null;

    var open = function (offer) {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.classList.add('is-locked');
      var panel = modal.querySelector('.modal-panel');
      var title = offer ? 'Ready to begin?' : 'Come sit with us';
      panel.innerHTML =
        '<div class="modal-head">' +
          '<h2 id="bookTitle">' + title + '</h2>' +
          '<button class="icon-btn" type="button" data-close aria-label="Close">' +
            '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="modal-cta">' +
          '<div class="cta-orb" aria-hidden="true"><span></span><span></span><span></span></div>' +
          '<p class="modal-intro">No forms, no waiting room. Reach out directly and we will help you find the right next step.</p>' +
          '<div class="modal-actions">' +
            '<button class="btn btn-solid btn-block" type="button">WhatsApp us</button>' +
            '<button class="btn btn-line btn-block" type="button">Call +91 90110 09613</button>' +
          '</div>' +
          '<p class="modal-foot">We usually reply within one day.</p>' +
        '</div>';
      panel.querySelector('[data-close]').addEventListener('click', close);
      panel.querySelector('.modal-actions button').focus();
    };
    var close = function () {
      modal.hidden = true;
      document.body.classList.remove('is-locked');
      if (lastFocus) lastFocus.focus();
    };

    document.querySelectorAll('[data-book]').forEach(function (btn) {
      btn.addEventListener('click', function () { open(btn.getAttribute('data-offer')); });
    });
    modal.querySelectorAll('[data-close]').forEach(function (btn) {
      btn.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) close();
    });
  }

  /* ---------- 6. About video ---------- */
  document.querySelectorAll('.about-video video').forEach(function (video) {
    video.addEventListener('ended', function () {
      video.pause();
      video.currentTime = 0;
    });
  });
})();
