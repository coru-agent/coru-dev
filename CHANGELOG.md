# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **"Koru in Action" section** — five animated terminal scenarios (headless
  server, IDE takeover, gate→ticket, self-healing lanes, OpenRouter LLM) with
  per-scenario use-case notes; typewriter engine honors
  `prefers-reduced-motion` and starts on scroll-into-view.
- Nav links: In Action section and https://docs.coru.dev.

### Changed
- **All emoji/Unicode icons replaced with an inline SVG sprite** (20 stroke
  icons on `currentColor`) — identical rendering on every platform; drawn
  spiral favicon.
- **Fluid uniform type scale** — one vw-driven root `font-size` drives every
  rem unit (zero px font sizes left); containers widened to
  `min(80rem, 92vw)` so the layout stretches with the screen.

## [0.0.5] - 2026-06-02

### Docs
- Update README.md

### Other
- Update index.html
- Update script.js
- Update styles.css
- Update video/.gitkeep

## [0.0.4] - 2026-06-02

### Other
- Update index.html
- Update styles.css

## [0.0.3] - 2026-06-02

### Docs
- Update README.md

### Other
- Update index.html
- Update script.js
- Update styles.css

## [0.0.2] - 2026-06-01

### Other
- Update .koru/event-store.jsonl
- Update .koru/events/observability.dsl.log
- Update .koru/events/observability.jsonl
- Update .koru/project.json
- Update .planfile/.koru/autonomous-state.json
- Update .planfile/.koru/autonomy-telemetry.json
- Update .planfile/.koru/command_catalogs/windsurf-0.2.0.json
- Update .planfile/.koru/event-store.jsonl
- Update .planfile/.koru/integration-actions.jsonl
- Update .planfile/.koru/nfo-events.jsonl

## [0.0.1] - 2026-06-01

### Docs
- Update README.md
- Update docs/interfaces/koru-interface-registry.yaml

### Other
- Update .gitignore
- Update .koru/event-store.jsonl
- Update .koru/events/observability.dsl.log
- Update .koru/events/observability.jsonl
- Update .koru/history.jsonl
- Update .koru/onboarding.json
- Update .koru/project.json
- Update .planfile/.koru/autonomous-state.json
- Update .planfile/.koru/autonomy-telemetry.json
- Update .planfile/.koru/command_catalogs/vscode-0.2.0.json
- ... and 11 more files

