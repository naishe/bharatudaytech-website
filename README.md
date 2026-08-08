# Bharat Uday — Website

Static site (plain HTML/CSS/JS, no build step) for **Bharat Uday**, a GovTech
division of Nishant Labs Pvt Ltd. English by default at `/en/`, Hindi at `/hi/`,
each independently indexable for SEO.

## Structure

```
/                   root — instant redirect to /en/
/en/index.html      English site (canonical default)
/hi/index.html      Hindi site
/assets/css/        shared stylesheet (design tokens: navy/amber theme)
/assets/js/main.js  mobile nav toggle + decorative network-mesh hero animation
/assets/img/        favicon and inline-icon source
/sitemap.xml        lists both language URLs with hreflang annotations
/robots.txt
/CNAME              custom domain for GitHub Pages
/.nojekyll          disables Jekyll processing on GitHub Pages
```

## Preview locally

No build step — any static server works:

```bash
cd /Users/nishant/dev/bharat-uday-website
python3 -m http.server 8080
# open http://localhost:8080/en/
```

## Push to GitHub

```bash
git remote add origin <your-repo-url>
git push -u origin main
```

Then in the repo: **Settings → Pages → Build and deployment → Deploy from a
branch → `main` / `/(root)`**. No GitHub Actions workflow is needed for a
plain static site.

## DNS — bharatuday.nishantlanbs.com

At whatever DNS provider hosts `nishantlanbs.com`, add:

```
CNAME   bharatuday   <your-github-username>.github.io.
```

The `CNAME` file in this repo (already set to `bharatuday.nishantlanbs.com`)
tells GitHub Pages which custom domain to serve. Once DNS propagates, enable
**Enforce HTTPS** in the repo's Pages settings.

## Migrating to bharatudaytech.com later

Every absolute URL is hardcoded to `https://bharatuday.nishantlanbs.com` (by
design — hreflang/canonical/sitemap tags require absolute URLs, and this repo
has no templating layer). When the new domain is ready:

1. Update `CNAME` to `bharatudaytech.com`.
2. Find-and-replace `bharatuday.nishantlanbs.com` → `bharatudaytech.com` across:
   `en/index.html`, `hi/index.html`, `index.html`, `sitemap.xml`, `robots.txt`.
3. Point the new domain's DNS at GitHub Pages (A/ALIAS records for an apex
   domain, or CNAME if using a `www` subdomain).
4. Add both old and new properties in Google Search Console; once the new
   domain is live, a 301 equivalent is only possible via GitHub Pages if you
   keep the old domain resolving — plan a transition window rather than a
   hard cutover, so existing government bookmarks/links don't break.

## Known follow-ups (not yet done)

- **Social share image**: no `og:image` is set. Add a 1200×630 PNG (e.g.
  `/assets/img/og-cover.png`) and reference it in both `<head>`s once branded
  artwork exists — a broken image reference is worse than none, so it was
  left out for now.
- **Google Search Console**: verify both language URLs and submit
  `sitemap.xml` once the domain is live.
- **Hero visual**: the header/hero mark and hero background are an abstract
  network-mesh (nodes/lines), deliberately *not* a literal outline of India's
  borders — those are legally/politically sensitive to depict incorrectly
  (J&K, Arunachal Pradesh, Aksai Chin) and a govt-facing site shouldn't risk
  getting them wrong. If a literal India map graphic is wanted later, source
  it from an authoritative Survey of India-compliant asset, not a hand-drawn
  approximation.
- **Contact**: primary CTA is a `mailto:gov@nishantlabs.in` link (no backend,
  since GitHub Pages is static). Swap for a form service later if needed.
