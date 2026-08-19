# नगर निगम सहारनपुर — citizen portal demo

Static, installable PWA for Saharanpur Municipal Corporation. No framework, no build
step, no backend. Four files of application code plus assets:

```
index.html              App shell: masthead, nav, footer, icon sprite, lightbox
assets/css/app.css      Design tokens (CSS custom properties) + every style
assets/js/content.js    All copy + data — the "CMS payload." Every record is bilingual.
assets/js/app.js        Hash router, view functions, form/filter wiring, PWA glue
```

Open `index.html` directly, or `python3 -m http.server 8000` for a proper test (the
service worker needs http(s), not `file://`). See `README.md` for deploy instructions,
full route table, and the deliberate design decisions behind this build — read that
before making UI calls that might already be discussed there.

## Routing

Hash-based on purpose — the whole site works from any sub-path on any static host with
no server rewrite rules (see the comment at the top of `app.js`). Each entry in the
`ROUTES` map (bottom of `app.js`) points at a `V.*` view function that returns an HTML
string; `render()` swaps it into `<main id="view">` on every `hashchange`.

## Adding a new page

Follow the pattern the Media Centre feature (`#/media`) already uses end to end —
`V.tenders`/`TENDERS`/`TENDER_CATS` is the other canonical worked example for a
filterable list page:

1. **`content.js`** — add i18n keys to *both* `UI.hi` and `UI.en` (page title, lede,
   any empty-state strings), plus a data array if the page lists records.
2. **`app.js`** — add a `V.name` view function (usually `pageHead(titleKey, ledeKey)` +
   a `.sec`/`.wrap` section), any list/card helper it needs, and register the route in
   `ROUTES`. If the page has filter chips or a form, wire the interactivity in
   `wireView()` (runs after every render) or `wireChrome()` (runs once at boot — use
   this for chrome that persists across route changes, like the lightbox dialog).
3. **`index.html`** — add the nav link (`<nav class="nav">`) and usually the footer
   "जानकारी/Information" list too.
4. **`app.css`** — reuse existing primitives before adding new classes: `.card`,
   `.grid2`/`.grid3`, `.tiles`/`.tile`, `.notices`/`.notice`, `.filters`/`.chip`,
   `.tag`/`.pill`. Design tokens (`--ink`, `--stone`, `--chakra`, `--r`, `--r-lg`,
   `--sh`, `--gap`, ...) are defined once in `:root` — use them, don't hardcode colors.

## Bilingual convention

Every user-facing string is `{hi:'...', en:'...'}`, or for data records a nested
`hi:{...}`/`en:{...}` block. Two helpers in `app.js` read them:
- `t(key)` — looks up a `UI` string for the current language.
- `L(record)` — returns a record's `hi` or `en` block for the current language.

Never hardcode user-facing copy in one language only; the language toggle
(`data-lang-toggle`) re-renders the current view by re-running `t()`/`L()`, so anything
outside that system won't switch.

## State & storage

Everything client-side: language, font-size step and high-contrast preference persist
to `localStorage` (`snn.*` keys), as do complaint tickets (`snn.tickets`). Forms
(complaints, certificates, notice publishing) simulate submission — there is no backend
and nothing leaves the device. Don't add real network calls without checking with the
user first; that would be a material change to what this demo claims about itself
(see README §4 "That's the demo's honesty line").

## Content is illustrative

Most data in `content.js` — tenders, the complaint queue, ward/councillor names, water
connection records, and the Media Centre's photos/press clippings — is placeholder
content for the demo, not live municipal data. README §6 has the authoritative list of
what's real (departments, zones, helplines, the two named officers from the live site)
versus generated.
