/* ══════════════════════════════════════════════════════════════════
   株式会社木工舎 — Scripts
   ══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var $  = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  /* ── オープニング ──────────────────────────
     消去自体はCSSアニメーションが担うため、ここでは
     「省略するかどうか」だけを判断する。JSが動かなくても導入は明ける。 */
  (function () {
    var op = $("#op");
    if (!op) return;

    var root = document.documentElement;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var seen;
    try { seen = sessionStorage.getItem("mokukou.op") === "1"; } catch (e) { seen = false; }

    function skip() {
      op.classList.add("is-skip");
      root.classList.add("op-skip");
      unlock();
    }

    // 同じ滞在中に何度も見せない。動きを抑える設定なら最初から出さない。
    if (seen || reduce) { skip(); return; }
    try { sessionStorage.setItem("mokukou.op", "1"); } catch (e) {}

    // 導入中のスクロールを止める。解除は時間経過でも必ず行う。
    root.style.overflow = "hidden";
    function unlock() { root.style.overflow = ""; }
    setTimeout(unlock, 2700);

    // 見飽きた人向けに、触れば飛ばせるようにする。
    op.addEventListener("click", skip);
  })();

  /* ── ヘッダーの追従とトップへ戻る ───────────── */
  var hd = $("#hd");
  var totop = $("#totop");

  function onScroll() {
    var y = window.pageYOffset;
    hd.classList.toggle("is-stuck", y > window.innerHeight * 0.7);
    totop.classList.toggle("is-in", y > window.innerHeight);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── モバイルメニュー ────────────────────── */
  var burger = $("#burger");
  var nav = $("#nav");

  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    burger.classList.toggle("is-on", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      nav.classList.remove("is-open");
      burger.classList.remove("is-on");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "メニューを開く");
    }
  });

  /* ── 施工事例の絞り込み ─────────────────── */
  var filters = $$(".filter__b");
  var works = $$(".work");
  var empty = $("#worksEmpty");

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("is-on"); });
      btn.classList.add("is-on");

      var key = btn.dataset.filter;
      var shown = 0;
      works.forEach(function (w) {
        var show = key === "all" || w.dataset.cat === key;
        w.hidden = !show;
        if (show) shown++;
      });
      empty.hidden = shown > 0;
    });
  });

  /* ── スクロールに応じた表示 ─────────────── */
  var targets = $$(".lead, .figures__item, .craft, .reason, .work, .flow__i, .voice, .spec, .tel, .form");
  targets.forEach(function (el, i) {
    el.setAttribute("data-rv", "");
    el.style.transitionDelay = (i % 3) * 0.1 + "s";
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ── お問い合わせフォーム（フロント側の検証のみ） ──
     ※ 実際の送信にはメール送信APIとの連携が必要です。            */
  var form = $("#form");
  var note = $("#formNote");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // form.name / form.method などは HTMLFormElement 自身のプロパティに
      // 遮られるため、入力欄は ID で直接取得する。
      var name = $("#f-name").value.trim();
      var mail = $("#f-mail").value.trim();
      var msg  = $("#f-msg").value.trim();
      var mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

      if (!name || !mailOk || !msg) {
        note.textContent = "必須項目（お名前・メールアドレス・お問い合わせ内容）をご確認ください。";
        note.className = "form__note is-ng";
        return;
      }

      note.textContent = "お問い合わせありがとうございます。担当者より折り返しご連絡いたします。";
      note.className = "form__note is-ok";
      form.reset();
    });
  }

  /* ── 年号 ─────────────────────────────── */
  var yr = $("#yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
