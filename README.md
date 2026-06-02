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
- `script.js` — Smooth scrolling and intersection observer animations
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

## Development

No build step required. Serve with any static web server:

```bash
cd coru-dev && python -m http.server 8000
```

Then visit `http://localhost:8000`

## GitHub Pages

Push to `main` to deploy to `www.coru.dev`.

## License

Licensed under Apache-2.0.
