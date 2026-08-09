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

## DNS — bharatudaytech.com (apex domain)

At whatever DNS provider hosts `bharatudaytech.com`, add:

```
A       @    185.199.108.153
A       @    185.199.109.153
A       @    185.199.110.153
A       @    185.199.111.153
CNAME   www  <your-github-username>.github.io.
```

(Use ALIAS/ANAME instead of A records at the apex if your DNS provider
supports it.) The `CNAME` file in this repo (already set to
`bharatudaytech.com`) tells GitHub Pages which custom domain to serve. Once
DNS propagates, enable **Enforce HTTPS** in the repo's Pages settings.

## Known follow-ups (not yet done)

- **Social share image**: `og:image`/`twitter:image` currently point at the
  256×256 `logo-256.png` so link previews aren't broken, but it's square, not
  the ideal 1200×630 landscape crop. Swap in a proper branded cover image
  under `/assets/img/og-cover.png` when one exists.
- **Google Search Console**: verify both language URLs and submit
  `sitemap.xml` once the domain is live.
- **Hero visual**: the header/hero mark and hero background are an abstract
  network-mesh (nodes/lines), deliberately *not* a literal outline of India's
  borders — those are legally/politically sensitive to depict incorrectly
  (J&K, Arunachal Pradesh, Aksai Chin) and a govt-facing site shouldn't risk
  getting them wrong. If a literal India map graphic is wanted later, source
  it from an authoritative Survey of India-compliant asset, not a hand-drawn
  approximation.
- **Contact**: primary CTA is a `mailto:hello@bharatudaytech.com` link (no backend,
  since GitHub Pages is static). Swap for a form service later if needed.
