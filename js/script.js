(() => {
  'use strict';

  // ── Scroll-reveal observer ──────────────────────────────────
  const revealElements = () => {
    const targets = document.querySelectorAll('.reveal-up');

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  };

  // ── Navbar background on scroll ─────────────────────────────
  const handleNavbar = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const toggleNavbar = () => {
      if (window.scrollY > 80) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    };

    window.addEventListener('scroll', toggleNavbar, { passive: true });
    toggleNavbar();
  };

  // ── Smooth anchor scrolling ─────────────────────────────────
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  // ── Waitlist form handling (demo) ───────────────────────────
  const handleForm = () => {
    const form = document.getElementById('waitlist-form');
    const successMsg = document.getElementById('success-message');

    if (!form || !successMsg) return;

    form.addEventListener('submit', (e) => {
      const action = form.getAttribute('action');
      if (!action || action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
        successMsg.classList.add('hero-fade');
      }
    });
  };

  // ── Parallax hint on hero image ─────────────────────────────
  const heroParallax = () => {
    const heroImg = document.querySelector('section:first-of-type img');
    if (!heroImg) return;

    window.addEventListener(
      'scroll',
      () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
        }
      },
      { passive: true }
    );
  };

  // ── Initialize ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    revealElements();
    handleNavbar();
    smoothScroll();
    handleForm();
    heroParallax();
  });
})();
