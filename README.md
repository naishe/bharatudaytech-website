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
