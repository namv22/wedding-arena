# Prompt — Vietnamese Wedding Invitation Website

> Copy everything between the lines into an AI agent (Claude, ChatGPT, Arena Agent Mode, Cursor…)
> to rebuild or restyle this site from scratch. Replace the `[SQUARE BRACKETS]` before sending.

---

## ROLE

You are a senior front-end developer and illustrator. Build a complete, production-ready wedding
invitation website for me and my wife, plus the custom artwork it uses. Ship it as a small static
site that I can push to GitHub and deploy on Netlify with **no build step and no backend**.

## THE COUPLE & THE DAY

- Groom: **[GROOM FULL NAME]** (goes by **[GROOM NICKNAME]**)
- Bride: **[BRIDE FULL NAME]** (goes by **[BRIDE NICKNAME]**)
- Wedding date: **[DATE]** — **[WEEKDAY]**, ceremony **[TIME]**, reception **[TIME]**
- Venue: **[VENUE NAME]**, **[FULL ADDRESS]**, **[CITY]**
- Language: **bilingual Vietnamese + English** with a VI/EN switch in the header
- Guest RSVPs: **no form, no backend.** Instead show contact cards (phone / Zalo / email) plus an
  "please reply before [DATE]" line. Do not add a form or any third-party service.

## ARTWORK — CHIBI PORTRAITS (generate these first)

Generate **two chibi illustrations of the same couple**, both in a soft watercolour-and-gouache
style, 2-head-tall chibi proportions, big expressive eyes, rosy cheeks, elegant thin linework,
antique-gold accents on a plain ivory background, no text and no watermark.

1. **Áo Dài portrait** — the couple holding hands. Groom in a **royal blue Áo Dài** with gold trim
   and a matching blue khăn xếp; bride in a **vivid red Áo Dài** with gold brocade and a red khăn
   đóng, holding a small red-and-gold bouquet.
2. **Vietnamese historical dress portrait** — the couple in court/imperial attire: groom in a
   **deep blue Áo Ngũ Thân / Áo Tấc** five-panel robe with wide sleeves and gold cloud embroidery;
   bride in a **crimson red Áo Ngũ Thân** with wide sleeves, gold lotus brocade and a red-and-gold
   khăn vấn turban, holding a round silk fan.

Colour rule that must never break: **the groom is always blue, the bride is always red.**

Optimise the output (≈1100 px wide WebP, well under 150 KB each) plus one 1200×630 JPEG social
card, and add proper `alt` text in both languages.

## SITE REQUIREMENTS

**Stack:** plain HTML + CSS + vanilla JS. No framework, no npm, no build step, no external fonts,
no CDN, no tracking. Everything must work offline from the filesystem except the map links.

**Content in one file:** every name, date, address and sentence lives in `assets/js/config.js` as
`{ vi: "...", en: "..." }` objects. `index.html` is a thin shell; `app.js` renders from config.
I must be able to change the whole site by editing one file.

**Sections, in order**
1. **Hero** — "Trân trọng kính mời" eyebrow, huge serif names with a red italic *&*, the Áo Dài
   chibi portrait in a softly arched gold frame, the date plus the lunar-calendar date, a live
   countdown, and two buttons: *See the details* and *Add to calendar* (client-side `.ics` download).
2. **Lời Ngỏ / A Note** — a short, warm invitation letter on a bordered card with a signature.
3. **Ngày Trọng Đại / The Big Day** — event cards (ceremony + reception) with time, venue, address,
   dress code, a note and a "view map" link. Cards must render from an array so I can add events.
4. **Chương Trình / Schedule** — a vertical gold timeline of the day.
5. **Ảnh Cưới / Portraits** — the two chibi images in soft polaroid-style frames with captions.
6. **Liên Hệ / Contact** — contact cards (phone, Zalo, email) and the reply-by date.
7. **Footer** — monogram, one-line thank-you, wedding hashtag, date.

**Design direction:** ivory paper background with a faint grain, cinnabar red, royal blue and
antique gold; serif display type (system serif stack is fine — do *not* load web fonts), generous
whitespace, thin gold rules, subtle SVG cloud/ornament motifs, a few slow-falling petals, gentle
scroll reveals. Elegant and traditional — closer to letterpress stationery than to a template.

**Must-haves**
- Mobile-first and genuinely good on a 390 px phone (this is how guests will open it).
- Accessible: semantic landmarks, visible focus states, a skip link, `alt` text, and full
  `prefers-reduced-motion` support that disables petals and reveals.
- SEO + social: title, description, Open Graph and Twitter card with the 1200×630 image.
- The VI/EN switch re-renders everything, sets `<html lang>`, and remembers the choice.
- Fast: no render-blocking requests, lazy-loaded gallery images, total page under ~400 KB.

**Repo & deploy**
- Repo layout: `index.html`, `assets/css/styles.css`, `assets/js/config.js`,
  `assets/js/app.js`, `assets/img/*`, `README.md`, `netlify.toml`, `.gitignore`.
- `netlify.toml` with `publish = "."`, long cache headers for `assets/*` — deployable by drag-and-drop
  or by connecting the GitHub repo, root directory `/`, no build command.
- A README that covers: how to edit `config.js`, how to swap the artwork for real photos, how to
  test locally, and the exact Netlify + custom-domain steps.
- Also produce a **single self-contained `wedding-preview.html`** (CSS, JS and images inlined as
  data URIs) so I can preview the whole thing in a sandboxed viewer with no network access.

## DELIVER

Working files, the two chibi images, the preview file, and a short summary of what to edit first.
Where real information is missing, use an obvious placeholder marked `// TODO` — never invent
details and present them as mine.

---

### Notes on using this prompt

- **Fastest path:** paste it as-is, then reply with the real names/date/venue so the agent can fill
  the `TODO` values in `assets/js/config.js`.
- **Restyling only?** Keep section 1 (Artwork) but replace the design direction with your own palette.
- **Want RSVP collection later?** Add "use Netlify Forms with a hidden static form in `index.html`
  and a `data-netlify="true"` attribute" to the *Guest RSVPs* line — no backend needed on Netlify.
