/* ==========================================================================
   MINH & THẢO — WEDDING SITE LOGIC
   Renders the page from config.js, handles the VI/EN switch, the countdown,
   the .ics calendar download, petals and scroll reveals.
   You should not need to edit this file.
   ========================================================================== */
(function () {
  "use strict";

  var C = window.WEDDING_CONFIG;
  if (!C) { console.error("config.js not loaded"); return; }

  /* --- tiny helpers ---------------------------------------------------- */
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function t(obj, lang) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] != null ? obj[lang] : (obj.vi || obj.en || "");
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Fixed interface strings that are not content (kept out of config.js). */
  var UI = {
    vi: {
      navLetter: "Lời ngỏ", navDetails: "Ngày cưới", navTimeline: "Chương trình",
      navGallery: "Hình ảnh", navContact: "Liên hệ",
      eyebrow: "Trân trọng kính mời",
      unitDays: "Ngày", unitHours: "Giờ", unitMins: "Phút", unitSecs: "Giây",
      btnDetails: "Xem ngày cưới", btnCalendar: "Lưu vào lịch",
      scroll: "Cuộn xuống",
      labelTime: "Giờ", labelVenue: "Địa điểm", labelDress: "Trang phục", labelMap: "Xem bản đồ",
      daysToGo: "ngày nữa",
    },
    en: {
      navLetter: "A Note", navDetails: "The Day", navTimeline: "Schedule",
      navGallery: "Portraits", navContact: "Contact",
      eyebrow: "Together with their families",
      unitDays: "Days", unitHours: "Hours", unitMins: "Minutes", unitSecs: "Seconds",
      btnDetails: "See the details", btnCalendar: "Add to calendar",
      scroll: "Scroll",
      labelTime: "Time", labelVenue: "Venue", labelDress: "Dress code", labelMap: "Open map",
      daysToGo: "days to go",
    },
  };

  var lang = C.defaultLang === "en" ? "en" : "vi";
  try {
    var saved = localStorage.getItem("wedding-lang");
    if (saved === "vi" || saved === "en") lang = saved;
  } catch (e) {}

  /* --- icons ----------------------------------------------------------- */
  var ICONS = {
    rings:
      '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4">' +
      '<circle cx="19" cy="29" r="10"/><circle cx="30" cy="29" r="10"/>' +
      '<path d="M24 6l3.5 5.5h-7L24 6z" stroke-linejoin="round"/>' +
      '<path d="M20.5 11.5h7"/></svg>',
    cup:
      '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4">' +
      '<path d="M15 9h18l-2.5 14a6.5 6.5 0 01-13 0L15 9z"/><path d="M24 30v8M18 41h12"/>' +
      '<path d="M18.5 15.5c2 1.5 3.5-.8 5.5.6s3.5-.9 5.5.6"/></svg>',
  };

  /* --- renderers ------------------------------------------------------- */
  function renderHero() {
    $("#groomName").textContent = t(C.couple.groom.short, lang);
    $("#brideName").textContent = t(C.couple.bride.short, lang);
    $("#dateDisplay").textContent = t(C.dateDisplay, lang);

    var lunar = $("#lunarDate");
    if (C.showLunarDate && C.lunarDate) {
      lunar.textContent = t(C.lunarDate, lang);
      lunar.hidden = false;
    } else { lunar.hidden = true; }

    var portrait = $("#heroPortrait");
    if (C.gallery && C.gallery[0]) {
      portrait.src = C.gallery[0].src;
      portrait.alt = t(C.gallery[0].alt, lang);
    }

    var cd = $("#countdown");
    if (C.showCountdown) cd.hidden = false;

    var ics = $("#icsBtn");
    if (C.showCalendarButton) { ics.hidden = false; ics.href = buildICS(); }
    else { ics.hidden = true; }

    // monogram initials (header + footer) come from the couple, not the markup
    var monoL = C.couple.groom.monogram || t(C.couple.groom.short, lang).slice(0, 1);
    var monoR = C.couple.bride.monogram || t(C.couple.bride.short, lang).slice(0, 1);
    $$('[data-mono="left"]').forEach(function (el) { el.textContent = monoL; });
    $$('[data-mono="right"]').forEach(function (el) { el.textContent = monoR; });

    $("#hashtag").textContent = C.couple.hashtag || "";
    $("#footerNames").textContent =
      t(C.couple.groom.short, lang) + " & " + t(C.couple.bride.short, lang);
    $("#footerDate").textContent = t(C.dateDisplayShort || C.dateDisplay, lang);
  }

  function renderEvents() {
    var wrap = $("#eventCards");
    wrap.innerHTML = (C.events || []).map(function (ev) {
      var rows = "";
      rows += row(t(UI[lang].labelTime, lang), esc(t(ev.time, lang)));
      rows += row(t(UI[lang].labelVenue, lang),
        '<span class="card__venue">' + esc(t(ev.venue, lang)) + "</span>" +
        '<span class="card__addr">' + esc(t(ev.address, lang)) + "</span>");
      if (ev.dress) rows += row(t(UI[lang].labelDress, lang), esc(t(ev.dress, lang)));

      var map = ev.mapUrl
        ? '<a class="card__map" href="' + esc(ev.mapUrl) + '" target="_blank" rel="noopener noreferrer">' +
          esc(UI[lang].labelMap) + " →</a>"
        : "";

      return '<article class="card">' +
        '<div class="card__icon" aria-hidden="true">' + (ICONS[ev.icon] || ICONS.rings) + "</div>" +
        '<h3 class="card__title">' + esc(t(ev.title, lang)) + "</h3>" +
        '<p class="card__date">' + esc(t(ev.date, lang)) + "</p>" +
        "<dl>" + rows + "</dl>" +
        (ev.note ? '<p class="card__note">' + esc(t(ev.note, lang)) + "</p>" : "") +
        map +
        "</article>";
    }).join("");

    function row(label, value) {
      return '<div class="card__row"><dt>' + label + "</dt><dd>" + value + "</dd></div>";
    }
  }

  function renderTimeline() {
    $("#timelineList").innerHTML = (C.timeline || []).map(function (item) {
      return '<li><span class="tl-time">' + esc(item.time) + "</span>" +
             '<span class="tl-text">' + esc(t(item.text, lang)) + "</span></li>";
    }).join("");
  }

  function renderGallery() {
    $("#galleryGrid").innerHTML = (C.gallery || []).map(function (g) {
      return '<figure class="shot">' +
        '<img src="' + esc(g.src) + '" alt="' + esc(t(g.alt, lang)) + '" loading="lazy" width="1100" height="600" />' +
        "<figcaption>" + esc(t(g.caption, lang)) + "</figcaption></figure>";
    }).join("");
  }

  function renderContacts() {
    var by = $("#rsvpBy");
    by.textContent = C.rsvpBy ? t(C.rsvpBy, lang) : "";
    by.hidden = !C.rsvpBy;

    var html = (C.contacts || []).map(function (p) {
      var tel = String(p.phone || "").replace(/[^\d+]/g, "");
      var out = '<div class="contact">' +
        "<h3>" + esc(t(p.name, lang)) + "</h3>" +
        '<span class="role">' + esc(t(p.role || { vi: "Liên hệ", en: "Contact" }, lang)) + "</span>";
      if (p.phone) out += '<a href="tel:' + esc(tel) + '">' + esc(p.phone) + "</a>";
      if (p.phone && p.zalo) out += '<span class="sep"></span>';
      if (p.zalo) out += '<a href="' + esc(p.zalo) + '" target="_blank" rel="noopener noreferrer">Zalo</a>';
      return out + "</div>";
    }).join("");

    if (C.email) {
      html += '<div class="contact"><h3>Email</h3>' +
        '<span class="role">' + esc(t({ vi: "Thư từ", en: "Say hello" }, lang)) + "</span>" +
        '<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></div>";
    }
    $("#contactCards").innerHTML = html;
  }

  /* --- .ics calendar file ---------------------------------------------- */
  function icsDate(iso) {
    var d = new Date(iso);
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }
  function fold(line) { // RFC 5545: keep lines < 75 octets
    var out = "", cur = "";
    for (var i = 0; i < line.length; i++) {
      cur += line[i];
      if (cur.length >= 73) { out += cur + "\r\n "; cur = ""; }
    }
    return out + cur;
  }
  function buildICS() {
    var stamp = icsDate(new Date().toISOString());
    var names = t(C.couple.groom.short, "vi") + " & " + t(C.couple.bride.short, "vi");
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//" + names + "//Wedding//VI",
      "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    ];
    (C.events || []).forEach(function (ev, i) {
      if (!ev.startISO) return;
      lines.push(
        "BEGIN:VEVENT",
        "UID:" + stamp + "-" + i + "@wedding",
        "DTSTAMP:" + stamp,
        "DTSTART:" + icsDate(ev.startISO),
        "DTEND:" + icsDate(ev.endISO || ev.startISO),
        fold("SUMMARY:" + t(ev.title, "vi") + " — " + names),
        fold("LOCATION:" + t(ev.venue, "vi") + ", " + t(ev.address, "vi")),
        fold("DESCRIPTION:" + (t(ev.note, "vi") || "")),
        "END:VEVENT"
      );
    });
    lines.push("END:VCALENDAR");
    var text = lines.join("\r\n") + "\r\n";
    return "data:text/calendar;charset=utf-8," + encodeURIComponent(text);
  }

  /* --- countdown -------------------------------------------------------- */
  function startCountdown() {
    var target = new Date(C.dateISO).getTime();
    var box = $("#countdown");
    if (!C.showCountdown || isNaN(target)) return;

    var cells = {
      d: $("#cd-d"), h: $("#cd-h"), m: $("#cd-m"), s: $("#cd-s"),
    };
    function pad(n) { return String(n).padStart(2, "0"); }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        [cells.d, cells.h, cells.m, cells.s].forEach(function (el) { el.textContent = "00"; });
        var label = $(".countdown__unit span", box);
        if (label) label.textContent = t({ vi: "Chúc mừng!", en: "We did it!" }, lang);
        return;
      }
      var sec = Math.floor(diff / 1000);
      cells.d.textContent = pad(Math.floor(sec / 86400));
      cells.h.textContent = pad(Math.floor((sec % 86400) / 3600));
      cells.m.textContent = pad(Math.floor((sec % 3600) / 60));
      cells.s.textContent = pad(sec % 60);
      requestAnimationFrame(function () { setTimeout(tick, 1000 - (Date.now() % 1000)); });
    }
    tick();
  }

  /* --- language --------------------------------------------------------- */
  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;

    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = (UI[lang] && UI[lang][key]) || (C.copy && C.copy[key] ? t(C.copy[key], lang) : null);
      if (value != null) el.textContent = value;
    });

    document.title = t(C.copy.htmlTitle, lang);
    $$(".lang button").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });

    renderHero();
    renderEvents();
    renderTimeline();
    renderGallery();
    renderContacts();
    observeReveals();

    try { localStorage.setItem("wedding-lang", lang); } catch (e) {}
  }

  /* --- decoration: petals ----------------------------------------------- */
  function petals() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var host = $("#petals");
    if (!host) return;
    for (var i = 0; i < 14; i++) {
      var p = document.createElement("i");
      p.className = "petal";
      var size = 6 + Math.random() * 8;
      p.style.left = (Math.random() * 100) + "%";
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.animationDuration = (11 + Math.random() * 12) + "s";
      p.style.animationDelay = (-Math.random() * 18) + "s";
      p.style.setProperty("--drift", (Math.random() * 160 - 80) + "px");
      p.style.opacity = (0.25 + Math.random() * 0.35).toFixed(2);
      host.appendChild(p);
    }
  }

  /* --- scroll behaviour -------------------------------------------------- */
  var revealIO = null;
  function observeReveals() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $$(".reveal").forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); revealIO.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    $$(".reveal:not(.is-in)").forEach(function (el) { revealIO.observe(el); });
  }

  function scrollChrome() {
    var bar = $("#topbar");
    var onScroll = function () {
      bar.classList.toggle("is-stuck", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // highlight the nav link for the section in view
    var links = $$(".nav a");
    var sections = links.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-current", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* --- boot -------------------------------------------------------------- */
  $$(".lang button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang"));
    });
  });

  applyLang(lang);
  startCountdown();
  petals();
  scrollChrome();
})();
