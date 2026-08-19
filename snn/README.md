# नगर निगम सहारनपुर — citizen portal demo

A static, installable PWA demonstrating what a rebuilt Saharanpur Nagar Nigam website
could look like. No build step, no framework, no server. Three files of application
code plus assets.

**Live path this is built for:** `https://nishantlabs.com/snn/`

---

## 1. Deploy to GitHub Pages

Every path in this package is **relative**, so the folder works at `/`, `/snn/`, or any
other sub-path without editing a single file.

```
your-pages-repo/
├── .nojekyll          ← create this empty file at the repo root
├── index.html         ← your existing nishantlabs.com site (if any)
└── snn/               ← drop this entire folder here, unchanged
    ├── index.html
    ├── manifest.webmanifest
    ├── sw.js
    ├── README.md
    └── assets/
```

```bash
cp -r snn/ /path/to/your-pages-repo/
touch /path/to/your-pages-repo/.nojekyll
cd /path/to/your-pages-repo
git add . && git commit -m "Add SNN citizen portal demo" && git push
```

Settings → Pages → Source: `main` branch, `/ (root)`. Then open
`https://nishantlabs.com/snn/`.

Notes:

- `.nojekyll` stops Jekyll from touching the folder. Harmless if you already have one.
- **HTTPS is required** for the service worker and the install prompt. GitHub Pages with
  a custom domain gives you this once the certificate provisions.
- The trailing slash matters on first load. GitHub Pages will `301` you from `/snn`
  to `/snn/` automatically.
- Opening `index.html` from the filesystem (`file://`) works for a quick look, but the
  service worker is skipped. To test properly:
  `python3 -m http.server 8000` then visit `http://localhost:8000/`.

### Bumping the cached version

The service worker precaches the shell. After changing any file, edit the version
string at the top of `sw.js`:

```js
const VERSION = 'snn-v1.0.1';   // was v1.0.0
```

Old caches are dropped on activate. Without this, returning visitors keep the old build.

---

## 2. What's in here

```
index.html              App shell, icon sprite, masthead, footer
assets/css/app.css      Design tokens + all styles
assets/js/content.js    Every string and record — the CMS payload, hand-written
assets/js/app.js        Hash router, views, search, form, PWA wiring
manifest.webmanifest    Install metadata + app shortcuts
sw.js                   Offline caching
assets/img/             Chakra icon set (generated, not traced from any source)
```

**`content.js` is the point.** No copy is hard-coded into markup — every record carries
`hi` and `en`, so the language toggle is a data concern. In the real product this file
becomes the JSON the CMS serves, and nothing else changes.

## 3. Working demo paths

| Route | What it does |
|---|---|
| `#/` | Home — search, four primary counters, notices, helplines, charter |
| `#/sewaen` | Full service directory |
| `#/suchna` | Notice board |
| `#/media` | Media Centre — filterable feed of work photos, event photos and press clippings |
| `#/vibhag` | All thirteen departments with direct-dial numbers |
| `#/shikayat` | Complaint form — validates, issues a real ticket number |
| `#/meri-shikayat` | Complaints registered on this device |
| `#/sampark` | Office, hours, three zone offices |
| `#/grihkar` | **Handoff page to ptaxsnn.com** — see below |
| `#/sewa/water` | Water & sewer — connection lookup, itemised dues, pay handoff |
| `#/sewa/birth` | Birth & death certificates — apply, or fetch an issued copy |
| `#/sewa/tender` | E-tenders — filterable, with EMD, cost and closing dates |
| `#/parshad` | Ward lookup — councillor, zone office, area staff, direct-dial |
| `#/charter` | Full citizen charter with resolution times |
| `#/adhikari` | **Officer view** — complaint queue, charter compliance, publishing |
| `#/sewa/<id>` | Placeholder for any service not yet wired |

Also live: bilingual toggle, three text-size steps, high-contrast mode, install prompt,
offline banner, and full offline browsing after first visit. All preferences persist.

## 4. Three things to walk the client through

**The house-tax handoff (`#/grihkar`).** The current site jumps straight out to
`ptaxsnn.com` with no warning. This build inserts a branded page first: it explains why
payment happens elsewhere, tells the resident what to have ready (PTIN or old receipt
number), and repeats the "don't pay twice if the receipt didn't generate" warning that
is currently buried on the tax portal itself. It looks integrated without embedding a
payment page you don't control. If the tax vendor later exposes an API, the property
search moves onto this page and only the gateway step stays external.

**Complaints.** Right now a resident's only route is a phone number. This build gives a
form with ward, category, location and photo, and returns a complaint number
immediately. It stores to the device only — nothing is transmitted. That's the demo's
honesty line, and it's stated on-screen.

**The officer view (`#/adhikari`).** Built for the Nagar Ayukt specifically. It shows
the complaint queue filtered by zone and category, counts against the citizen charter
including anything past deadline, and a publish-a-notice form that pushes straight to
the notice board beside it. That last one is the whole CMS argument in ten seconds: a
notice goes live without raising a ticket with a web vendor. The demo figures are
deliberately healthy — mostly closed, a handful overdue — so it reads as a working
system rather than an indictment. Change them in `QUEUE` in `content.js` if you'd
rather show a different picture.

## 5. Deliberate design decisions

- **Citizen charter instead of campaign branding.** The band on the home page states a
  resolution time against each service and says escalation is automatic. It is an
  accountability artifact rather than a slogan, which is the register senior officers
  respond to, and it gives the complaint system a reason to exist.
- **Status is shape-coded, not colour-coded.** Queue pills use a circle, ring, triangle
  and diamond alongside the label, so the officer view is readable in greyscale, on a
  projector, and by anyone with colour vision deficiency.
- **Tricolour is structural, never semantic.** It appears as the rule under the
  masthead, the top and bottom edge of the four primary cards, and the footer band.
  Nothing in the interface asks you to tell saffron from green to understand it —
  state is carried by navy, weight, icon shape and text label. Safe under any form of
  colour vision deficiency.
- **The chakra, not the State Emblem.** The four-lion State Emblem is restricted under
  the State Emblem of India Act, 2005. A 24-spoke chakra is drawn in code (`chakra()`
  in `app.js`, and the PNGs) and used as the site mark. Swap in the corporation's own
  seal when they supply it.
- **Hash routing.** Lets the whole site live in a sub-folder on any static host with no
  rewrite rules. The trade-off is search indexing — see limitations.
- **Two typefaces, both with real Devanagari.** Anek Devanagari for display and Mukta
  for body, both designed for Indian scripts rather than Latin faces with a Devanagari
  fallback bolted on.
- **No photographs, except the Media Centre.** The rest of the site is deliberately
  typographic so the demo doesn't rise or fall on stock photos. The one exception is
  `#/media`, whose entire purpose is to carry photos and press clippings — it currently
  uses seeded [Lorem Picsum](https://picsum.photos) placeholders (`MEDIA` in
  `content.js`) standing in for real corporation photos.

## 6. Known limitations (be upfront about these)

- **SEO.** Hash routes are a single URL to a crawler. A production build must serve real
  URLs per page — server-rendered, or generated static pages. Non-negotiable for a
  government site people find through search.
- **Fonts load from Google.** Fine for a demo. Self-host the `woff2` files before
  production: government sites shouldn't leak visitor IPs to a third party, and
  self-hosting is faster on Indian mobile networks anyway.
- **Everything is client-side.** Complaints, tickets and preferences live in
  `localStorage`. There is no backend.
- **Content is illustrative.** Departments, zones, helplines and the two named officers
  come from the current live site. Everything else is placeholder: notices, tenders,
  councillor names, ward staff, water connection records and the complaint queue are all
  generated. The ward page carries an explicit on-screen note saying so — the councillor
  list in particular must be replaced from the corporation's official parshad list before
  this is shown as anything other than a demo.
- **Accessibility is a good floor, not a certified pass.** Keyboard navigation, focus
  rings, skip link, text scaling, high contrast, `prefers-reduced-motion` and semantic
  landmarks are all in place. A GIGW / WCAG 2.1 AA audit is still a separate exercise.

## 7. Notes toward the multi-tenant version

The shape of this demo is already the shape of the product:

- `content.js` is the tenant payload. One deployment, tenant resolved from the
  `Host` header, content fetched as JSON.
- The recurring content types are the same in every UP nagar nigam: departments,
  notice board, tenders, ward and councillor lists, zone offices, officers, galleries,
  scheme links. Model those as first-class types with fields, not as free-form pages.
  That schema is the defensible part, not the page builder.
- External services vary per city. Every nigam has a different legacy tax vendor with
  different framing and API capabilities, so "external service link" must be a
  configurable integration type per tenant — exactly how `TAX_URL` is isolated here.
- Bilingual content is a field-level concern from day one. Retrofitting it later is
  painful; every record here already carries both.
- Theming per tenant should be limited to the seal, the name and a small set of tokens.
  Resist per-tenant layout freedom — it's where multi-tenant CMS products go to die.

---

Prepared by **Nishant Labs** · [nishantlabs.in](https://nishantlabs.in)
Demonstration build. Not an official publication of Saharanpur Nagar Nigam.
