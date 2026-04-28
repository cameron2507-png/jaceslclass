# JAC's Class

Free interactive ESL games for English teachers — built with Astro 5, deployed on Cloudflare Pages.

## Quick start

```bash
npm install
npm run dev
```

Site runs at `http://localhost:4321`.

## Project structure

```
jacesclass/
├── public/
│   ├── favicon.svg
│   └── games/                   ← self-contained HTML game files live here
│       ├── hotel-vocabulary-hangman.html
│       ├── past-tenses-jeopardy.html
│       └── business-meetings-taboo.html
├── src/
│   ├── content/games/           ← one .md file per game (frontmatter + notes)
│   ├── layouts/BaseLayout.astro ← SEO, fonts, <head>, header, footer
│   ├── components/              ← Header, Footer, GameCard
│   ├── pages/
│   │   ├── index.astro          ← homepage
│   │   ├── about.astro
│   │   ├── privacy.astro
│   │   ├── games/
│   │   │   ├── index.astro      ← /games (with filter + search)
│   │   │   └── [...slug].astro  ← /games/<slug>
│   │   ├── level/[level].astro  ← /level/A1, /level/B2 ...
│   │   └── type/[type].astro    ← /type/Hangman, /type/Taboo ...
│   ├── styles/global.css
│   └── content.config.ts        ← schema for games collection
├── astro.config.mjs
└── package.json
```

## How to add a new game

Two steps. Roughly two minutes once you've done it once.

### 1. Drop the game HTML into `public/games/`

Self-contained HTML file — same as the existing samples. Inline CSS and JS, no external dependencies (or only allowlist-friendly CDNs). It will be served at `/games/<filename>.html`.

### 2. Create a Markdown file in `src/content/games/`

Filename becomes the URL slug. Example: `phrasal-verbs-codenames.md` → `/games/phrasal-verbs-codenames`.

```markdown
---
title: "Phrasal verbs codenames"
description: "Short pitch — what's covered, who it's for, what's the hook."
level: B2                       # A1 | A2 | B1 | B2 | C1
type: Codenames                 # Hangman | Jeopardy | Blockbusters | Taboo | Codenames | Typhoon | Gap-fills | Quizzes
topic: "Phrasal verbs"
duration: 25                    # minutes (number)
ageGroup: "Adults"              # Young learners | Teens | Adults | All ages
gameFile: "phrasal-verbs-codenames.html"  # the file in public/games/
featured: false                 # set true to show on homepage
publishDate: 2026-05-01
instructions: "How to use this in class — appears in the orange tip box."
---

Optional longer-form content goes here as Markdown. Use headings, lists,
ideas for variations, prerequisite vocabulary, etc. This content renders
below the game on the game's page.
```

That's it. The game now appears:

- On `/games` (filterable + searchable)
- On `/level/B2`
- On `/type/Codenames`
- On the homepage if `featured: true`
- On its own page at `/games/phrasal-verbs-codenames`

## Build & deploy to Cloudflare Pages

### Option A: connect a GitHub repo (recommended)

1. Push this folder to a new GitHub repo
2. Go to Cloudflare Pages → Create a project → Connect to GitHub
3. Select the repo
4. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy. Cloudflare will rebuild on every push to main.
6. Custom domain: Pages → your project → Custom domains → add `jaceslclass.com`. Cloudflare will guide you through DNS.

### Option B: direct upload

```bash
npm run build
```

Then in Cloudflare Pages → Create a project → Direct upload → drag the `dist/` folder.

## Adding ads (later)

Don't apply for AdSense until you have ~30+ pages and some traffic. When you're ready:

1. Apply for AdSense at [adsense.google.com](https://www.google.com/adsense/)
2. Once approved, find your `data-ad-client` ID
3. In `src/layouts/BaseLayout.astro`, replace the AdSense placeholder comment with the script tag from your AdSense dashboard
4. Add a cookie-consent banner before going live with ads (RGPD requirement) — try [Klaro](https://klaro.org/) or [CookieYes](https://www.cookieyes.com/)

## Known gotchas

- Game HTML files are loaded in an iframe with `sandbox="allow-scripts allow-same-origin"`. If a game needs popups or top navigation, adjust the sandbox attribute in `src/pages/games/[...slug].astro`.
- Slugs are derived from the filename — don't include spaces or special characters in `.md` filenames.
- Astro requires the `publishDate` to be a valid ISO date in YAML (e.g. `2026-04-15`, no quotes).

## Maintenance checklist

Every few weeks:

- Add 2–3 new games (more = better SEO)
- Check Search Console for impressions and click-through
- Update the privacy policy date if you change anything
- Test on mobile — most teachers will browse on a phone, even if they project on a laptop

---

Built with [Astro](https://astro.build). Hosted on [Cloudflare Pages](https://pages.cloudflare.com).
