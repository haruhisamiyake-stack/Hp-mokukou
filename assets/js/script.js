/* ========================================================================
   株式会社木工舎 — Scripts
   ======================================================================== */
(function () {
  "use strict";

  /* ---- Header shadow on scroll + back-to-top ---- */
  const header = document.getElementById("header");
  const toTop = document.getElementById("toTop");

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 20);
    toTop.classList.toggle("is-visible", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  const closeMenu = () => {
    nav.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---- Works filter ---- */
  const chips = document.querySelectorAll(".chip");
  const works = document.querySelectorAll(".work");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filter = chip.dataset.filter;
      works.forEach((w) => {
        const show = filter === "all" || w.dataset.cat === filter;
        w.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---- Scroll reveal ---- */
  const revealTargets = document.querySelectorAll(
    ".about__grid, .card, .reason, .work, .flow__item, .voice__card, .company__table, .contact__grid"
  );
  revealTargets.forEach((el, i) => {
    el.setAttribute("data-reveal", "");
    el.style.transitionDelay = (i % 4) * 0.08 + "s";
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Contact form (front-end validation / demo) ---- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !message || !emailOk) {
        note.textContent = "必須項目（お名前・メールアドレス・内容）をご確認ください。";
        note.className = "contact__form-note is-error";
        return;
      }

      // NOTE: This is a front-end demo. Connect to a mail/API backend for production.
      note.textContent = "お問い合わせありがとうございます。担当者より折り返しご連絡いたします。";
      note.className = "contact__form-note is-success";
      form.reset();
    });
  }

  /* ---- Current year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
