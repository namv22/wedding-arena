# Nam &amp; Thảo — Wedding Website

Thiệp cưới trực tuyến, song ngữ Việt / Anh. Static site — no build step, no backend, no tracking.

```
.
├── index.html              # shell only — all content comes from config.js
├── assets/
│   ├── css/styles.css      # all styling
│   ├── js/config.js        # ← EDIT THIS: names, dates, addresses, all text
│   ├── js/app.js           # rendering, VI/EN switch, countdown, .ics, petals
│   └── img/                # chibi artwork (webp), favicon, social card
├── tools/build_preview.py  # bundles a single offline preview file (dev only)
├── netlify.toml
└── README.md
```

---

## 1. Make it yours (5 minutes)

Open **`assets/js/config.js`**. Everything marked `// TODO` is sample data.

| What | Where |
| --- | --- |
| Names, hashtag | `couple.groom`, `couple.bride`, `couple.hashtag` |
| Date + countdown + lunar date | `dateISO`, `dateDisplay`, `dateDisplayShort`, `lunarDate` |
| Headlines, letter, intro blurbs | `copy` |
| Ceremony / reception cards | `events[]` (add `startISO`/`endISO` for the calendar file) |
| Schedule timeline | `timeline[]` |
| Photos | `gallery[]` |
| Phone / Zalo / email | `contacts[]`, `email`, `rsvpBy` |
| Feature switches | `showCountdown`, `showLunarDate`, `showCalendarButton`, `defaultLang` |

Every text value is written as `{ vi: "…", en: "…" }`. Both languages are required for the
VI / EN switch to work; if you only fill one, the other falls back to it.

> **`dateISO` must include the Vietnam offset**, e.g. `"2027-03-14T10:00:00+07:00"` — it drives the
> countdown and the "Add to calendar" file.

## 2. Preview locally

```bash
# any static server works
python3 -m http.server 8000
# then open http://localhost:8000
```

Just opening `index.html` from the file manager also works — there are no external requests.

To rebuild the self-contained `wedding-preview.html` (useful for sandboxed viewers or emailing):

```bash
python3 tools/build_preview.py
```

## 3. Swap the artwork for real photos

The chibi portraits were made for this site. To use engagement photos instead, drop them in
`assets/img/` and update the two entries in `gallery` inside `config.js` (hero uses `gallery[0]`).
Keep images around **1100 px wide, WebP or JPEG**, and give each one `alt` text in both languages.

The full-resolution chibi originals live outside the repo so the deploy stays light.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Wedding website"
git branch -M main
git remote add origin git@github.com:<your-user>/<your-repo>.git
git push -u origin main
```

## 5. Deploy on Netlify

**Option A — drag & drop (fastest)**
1. Go to <https://app.netlify.com/drop>.
2. Drag the whole project folder onto the page.
3. Done — you get a `something.netlify.app` URL immediately.

**Option B — connect the GitHub repo (auto-deploys on every push)**
1. Netlify → **Add new site → Import an existing project → GitHub**.
2. Pick the repo.
3. **Build command:** leave empty. **Publish directory:** `.` (already set in `netlify.toml`).
4. **Deploy site.**

**Custom domain**
1. Site → **Domain management → Add a domain** → enter your domain.
2. Point DNS at Netlify: either change the nameservers, or add a `CNAME` for `www` →
   `<your-site>.netlify.app` and an `ALIAS`/`A` record for the apex.
3. Netlify provisions a free Let's Encrypt certificate automatically (usually within minutes).

## 6. Notes

- **No RSVP form** by design — guests call, Zalo or email you. To collect RSVPs later, add a hidden
  static form with `data-netlify="true"` and Netlify will store submissions without any backend.
- `.ics` calendar files are generated in the browser, so there is no server work at all.
- Fonts are system serif/sans stacks — no Google Fonts, nothing to load, works offline.
- `prefers-reduced-motion` disables petals, reveals and the pulsing scroll behaviour.

Chúc mừng hạnh phúc! 🎉
