# coru.dev

Official marketing site for **[Koru](https://github.com/semcod/koru)** — the open-source (Apache-2.0) Python library for closed-loop refactor orchestration across multi-repo workspaces.

**Live at:** https://www.coru.dev/

## What this site promotes

- **OSS library:** [semcod/koru](https://github.com/semcod/koru) on GitHub, `pip install koru` on [PyPI](https://pypi.org/project/koru/)
- **Core loop:** Detect → Plan → Execute → Verify → Heal → Learn
- **Quick start:** `pip install koru` then `koru auto` (advanced workflows in the semcod/koru README and docs)
- **Docs:** Links into `semcod/koru` `docs/` and README

This repo (`coru-agent/coru-dev`) is the static GitHub Pages deployment only; feature development happens in `semcod/koru`.

## Contents

- `index.html` — Single-page landing (hero, OSS library, mission, capabilities, workflow, ecosystem, quick start, docs, CTA)
- `styles.css` — Dark theme with gradient accents
- `script.js` — Smooth scrolling, copy buttons, locale detection, Google Translate switcher
- `CNAME` — `www.coru.dev`

## Sections

- **Hero** — Koru OSS positioning, two-command install snippet, PyPI/GitHub CTAs
- **Open Source** — Package, first-run (`koru auto`), doc links
- **Mission** — Closed-loop, ticket-driven, verification, LLM orchestration
- **Capabilities** — Discovery, ticketed delivery, IDE automation, verification, multi-repo, auditing
- **Workflow** — The Koru loop (DETECT → … → LEARN)
- **Ecosystem** — Integrated semcod tools (planfile, regix, testql, …)
- **Quick Start** — `pip install koru` + `koru auto`; links to README for advanced options
- **Docs** — README and key guides on GitHub

## Hero demo video

The hero embed expects a local file at **`video/demo.mp4`** (16:9 MP4 recommended). Until you add it, the page falls back to `https://github.com/semcod/koru/raw/main/koru.mp4`. Autoplay is muted with `playsinline` for browser policy compliance.

## Development

No build step required. Serve with any static web server:

```bash
cd coru-dev && python -m http.server 8000
```

Then visit `http://localhost:8000`

### Internationalization (i18n)

- **Source language:** English (`lang="en"` in HTML).
- **Translation:** [Google Translate Website widget](https://translate.google.com/manager/website/) (no API key). A hidden `#google_translate_element` loads the official embed; the nav `<select id="lang-select">` drives language changes via the `googtrans` cookie.
- **Locale detection:** On first visit, `navigator.languages` / `navigator.language` is mapped to a supported target (PL, DE, FR, ES, IT, PT, RU, ZH, JA, KO, NL, SV, CS, UK). Non-English locales auto-translate; preference is stored in `localStorage` (`coru-lang`).
- **Protected strings:** Code blocks, brand names (`Koru`, `semcod/koru`, `coru.dev`), pip commands, version numbers, and tool identifiers use `class="notranslate"`.
- **Privacy:** Translation requests go to Google’s servers when a non-English language is active. No geo-IP lookup is used.
- **Optional API path:** Pre-translating static strings via Google Cloud Translation API would require a build step and `GOOGLE_TRANSLATE_API_KEY`; not implemented — the widget is the zero-config default for GitHub Pages.

## GitHub Pages

Push to `main` to deploy to `www.coru.dev`.

## License

Licensed under Apache-2.0.
