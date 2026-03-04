const phoneNumber = '5547999999999';

function sendToWhatsApp(message) {
  const url = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initScrollReveal() {
  var elements = document.querySelectorAll('.scroll-reveal');
  var options = { rootMargin: '0px 0px -60px 0px', threshold: 0.1 };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, options);

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

function initCounter() {
  var counterEl = document.querySelector('.counter-display');
  if (!counterEl) return;

  var target = parseInt(counterEl.getAttribute('data-target'), 10) || 500;
  var duration = 2000;
  var step = target / (duration / 16);
  var current = 0;

  var options = { rootMargin: '0px', threshold: 0.3 };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      var startTime = null;
      function updateCount(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = timestamp - startTime;
        current = Math.min(Math.floor(step * (progress / 16)), target);
        counterEl.textContent = '+' + current;
        if (current < target) {
          requestAnimationFrame(updateCount);
        } else {
          counterEl.textContent = '+' + target;
        }
      }
      requestAnimationFrame(updateCount);
    });
  }, options);

  observer.observe(counterEl);
}

function initHeaderScroll() {
  var header = document.getElementById('header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('bg-white/95', 'shadow-sm', 'backdrop-blur');
    } else {
      header.classList.remove('bg-white/95', 'shadow-sm', 'backdrop-blur');
    }
  }

  window.addEventListener('scroll', function () {
    requestAnimationFrame(updateHeader);
  });
  updateHeader();
}

function initYear() {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initSmoothScroll();
  initScrollReveal();
  initCounter();
  initHeaderScroll();
  initYear();
});
