// Copy install commands from terminal code blocks
const COPY_BTN_LABEL = 'Copy';
const COPIED_BTN_LABEL = 'Copied!';
const COPIED_FEEDBACK_MS = 2000;

function copyToClipboard(text) {
    if (navigator.clipboard?.writeText) {
        return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
        } catch (err) {
            reject(err);
        } finally {
            document.body.removeChild(textarea);
        }
    });
}

function selectCodeContents(codeEl) {
    const range = document.createRange();
    range.selectNodeContents(codeEl);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
}

document.querySelectorAll('.code-block--terminal .code-block__copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
        const block = btn.closest('.code-block');
        const codeEl = block?.querySelector('pre code');
        const text = codeEl?.textContent?.trim() ?? '';
        if (!text) return;

        try {
            await copyToClipboard(text);
            btn.textContent = COPIED_BTN_LABEL;
            btn.classList.add('code-block__copy--done');
            btn.setAttribute('aria-label', 'Commands copied to clipboard');
            window.setTimeout(() => {
                btn.textContent = COPY_BTN_LABEL;
                btn.classList.remove('code-block__copy--done');
                btn.setAttribute('aria-label', 'Copy install commands to clipboard');
            }, COPIED_FEEDBACK_MS);
        } catch {
            if (codeEl) {
                selectCodeContents(codeEl);
                window.alert(
                    'Could not copy automatically. The commands are selected — press Ctrl+C (Cmd+C on Mac).'
                );
            } else {
                window.alert('Copy failed. Install commands:\n\n' + text);
            }
        }
    });
});

// Hero demo video: muted autoplay with fallback for strict browsers
const heroVideo = document.querySelector('.hero-video video');
if (heroVideo) {
    heroVideo.muted = true;
    const tryPlay = () => heroVideo.play().catch(() => {});
    if (heroVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        tryPlay();
    } else {
        heroVideo.addEventListener('loadeddata', tryPlay, { once: true });
    }
}

// Smooth scroll for navigation links (offset for sticky navbar)
const navOffset = () => document.querySelector('.navbar')?.offsetHeight ?? 72;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - navOffset();
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Mobile menu toggle (optional enhancement)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.mission-card, .feature-item, .tool-card, .oss-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    observer.observe(el);
});

// --- i18n: Google Translate widget + custom language switcher ---

const LANG_LABELS = {
    en: 'English',
    pl: 'Polski',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
    it: 'Italiano',
    pt: 'Português',
    ru: 'Русский',
    'zh-CN': '中文',
    ja: '日本語',
    ko: '한국어',
    nl: 'Nederlands',
    sv: 'Svenska',
    cs: 'Čeština',
    uk: 'Українська'
};

function getActiveTranslateLang() {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
    if (!match || !match[1]) return 'en';
    const parts = decodeURIComponent(match[1]).split('/');
    return parts[parts.length - 1] || 'en';
}

function setTranslateCookie(lang) {
    const hostname = location.hostname;
    const root = hostname.replace(/^www\./, '');
    const domains = [hostname];
    if (root.includes('.')) domains.push('.' + root);
    const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';

    if (lang === 'en') {
        domains.forEach((domain) => {
            document.cookie = `googtrans=;path=/;domain=${domain};expires=${expires}`;
        });
        document.cookie = `googtrans=;path=/;expires=${expires}`;
        return;
    }

    const value = `/en/${lang}`;
    domains.forEach((domain) => {
        document.cookie = `googtrans=${value};path=/;domain=${domain}`;
    });
    document.cookie = `googtrans=${value};path=/`;
}

function switchLanguage(lang) {
    const i18n = window.__coruI18n;
    if (!i18n) return;
    try {
        localStorage.setItem(i18n.STORAGE_KEY, lang);
    } catch (_) {}
    setTranslateCookie(lang);
    location.reload();
}

function initLanguageSwitcher() {
    const i18n = window.__coruI18n;
    const select = document.getElementById('lang-select');
    if (!i18n || !select) return;

    const detected = i18n.detectLocale();
    const active = getActiveTranslateLang();
    const options = [{ code: 'en', label: LANG_LABELS.en }];

    i18n.SUPPORTED.forEach((code) => {
        if (code === 'en') return;
        let label = LANG_LABELS[code] || code.toUpperCase();
        if (code === detected && detected !== 'en') {
            label += ' (suggested)';
        }
        options.push({ code, label });
    });

    select.replaceChildren();
    options.forEach(({ code, label }) => {
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = label;
        select.appendChild(opt);
    });

    select.value = active === 'en' ? 'en' : (options.some(o => o.code === active) ? active : 'en');

    select.addEventListener('change', () => {
        if (select.value !== getActiveTranslateLang()) {
            switchLanguage(select.value);
        }
    });
}

initLanguageSwitcher();
// ---------------------------------------------------------------------------
// "Koru in Action" — animated shell scenarios
// ---------------------------------------------------------------------------
const SCENARIOS = {
    headless: {
        usecase: 'Use case: CI runners, build servers, cron-driven maintenance. No editor installed — Koru autodetects a vendor CLI (Claude Code, aider, codex) via tillm and works the ticket queue end-to-end.',
        lines: [
            { type: 'cmd', text: 'koru auto' },
            { type: 'out', text: "[koru] no editor IDE detected; auto-selected shell client 'claude-code' (tillm)" },
            { type: 'out', text: '[koru] cycle 1: scan → 3 new tickets (planfile)' },
            { type: 'out', text: '[koru] ticket STARTER-101: Reduce CC in parser.py (18 → ≤10)' },
            { type: 'out', text: '[koru] drive → claude-code · execute profile: automation' },
            { type: 'ok',  text: '✓ edits applied · pytest: 214 passed · regix gates: green' },
            { type: 'out', text: '[koru] ticket STARTER-101 done · commit pushed · next ticket…' },
        ],
    },
    ide: {
        usecase: 'Use case: hands-off refactor sessions in your own editor. The autopilot daemon pastes the ticket prompt into Windsurf / VS Code / Cursor chat, verifies the submit, and watches the result.',
        lines: [
            { type: 'cmd', text: 'koru -a --ide windsurf' },
            { type: 'out', text: '[koru] autopilot daemon up · plugin connected (windsurf)' },
            { type: 'out', text: '[koru] ticket STARTER-102: Split god-module cli.py into layers' },
            { type: 'out', text: '[koru] drive → chat paste (1.4 kB) → submit verified' },
            { type: 'ok',  text: '✓ verify: 178 tests passed · no new gate violations' },
            { type: 'out', text: '[koru] cycle complete — queue has 2 tickets left' },
        ],
    },
    gates: {
        usecase: 'Use case: quality gates as a feedback loop. A red regix gate becomes a deduplicated planfile ticket with the exact failing line — and the loop fixes it instead of just reporting it.',
        lines: [
            { type: 'cmd', text: 'regix gates' },
            { type: 'err', text: '✗ 1 hard-gate violation(s):' },
            { type: 'err', text: '  src/app/api.py::handle_request  cc: 24 (threshold: ≤ 15)' },
            { type: 'cmd', text: 'koru auto' },
            { type: 'out', text: '[koru] gate finding captured → ticket STARTER-103 [gate-finding:a1b2c3]' },
            { type: 'out', text: '[koru] drive → extract 4 helpers from handle_request · cc: 24 → 9' },
            { type: 'ok',  text: '✓ regix gates: all quality gates passed' },
        ],
    },
    rescue: {
        usecase: 'Use case: resilient automation on messy hosts. When the chosen lane is unavailable, Koru falls back across lanes — vendor CLI → GUI driver (gillm) → OS-level input — instead of stalling the loop.',
        lines: [
            { type: 'cmd', text: 'koru -a --ide claude' },
            { type: 'err', text: '[koru] tillm client unavailable on this host' },
            { type: 'out', text: '[koru] editor detected (vscode) → cross-lane rescue' },
            { type: 'out', text: '[koru] GUI chain: vdisplay → gillm GuiDriver → submit verified' },
            { type: 'ok',  text: '✓ drive delivered · reply: shell_client_rescued_from=claude-code' },
        ],
    },
    openrouter: {
        usecase: 'Use case: fully headless, editor-free refactoring with a hosted or local model. Tickets with executor.kind=llm go straight to OpenRouter (MiniMax, Qwen3-coder, DeepSeek, …) or any local OpenAI-compatible endpoint — with per-run cost tracking.',
        lines: [
            { type: 'cmd', text: 'export OPENROUTER_API_KEY=sk-or-…' },
            { type: 'cmd', text: 'koru auto' },
            { type: 'out', text: '[koru] lane: openrouter · model: qwen/qwen3-coder' },
            { type: 'out', text: '[koru] ticket STARTER-104 → prompt 2.1 kB → patch received' },
            { type: 'ok',  text: '✓ tests green · committed · cost tracked: $0.004 (costs)' },
            { type: 'out', text: '[koru] swap models per ticket: minimax, deepseek, local llama…' },
        ],
    },
};

(function initScenarioPlayer() {
    const output = document.getElementById('scenario-output');
    const usecaseEl = document.getElementById('scenario-usecase');
    const panel = document.getElementById('scenario-panel');
    const tabs = Array.from(document.querySelectorAll('.scenario-tab'));
    if (!output || !usecaseEl || tabs.length === 0) return;

    const ORDER = tabs.map((t) => t.dataset.scenario);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let runToken = 0;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const lineClass = { cmd: 'sc-cmd', out: 'sc-out', ok: 'sc-ok', err: 'sc-err' };

    function renderStatic(scenario) {
        output.replaceChildren();
        SCENARIOS[scenario].lines.forEach((line) => {
            const el = document.createElement('span');
            el.className = lineClass[line.type];
            el.textContent = (line.type === 'cmd' ? '$ ' : '') + line.text + '\n';
            output.appendChild(el);
        });
    }

    async function play(scenario, token) {
        output.replaceChildren();
        usecaseEl.textContent = SCENARIOS[scenario].usecase;
        if (reduceMotion) { renderStatic(scenario); return; }

        for (const line of SCENARIOS[scenario].lines) {
            if (token !== runToken) return;
            const el = document.createElement('span');
            el.className = lineClass[line.type];
            output.appendChild(el);
            if (line.type === 'cmd') {
                el.textContent = '$ ';
                await sleep(350);
                for (const ch of line.text) {
                    if (token !== runToken) return;
                    el.textContent += ch;
                    await sleep(26);
                }
                el.textContent += '\n';
                await sleep(420);
            } else {
                el.textContent = line.text + '\n';
                await sleep(line.type === 'ok' ? 700 : 480);
            }
        }
        await sleep(3800);
        if (token !== runToken) return;
        const next = ORDER[(ORDER.indexOf(scenario) + 1) % ORDER.length];
        activate(next, { autoplay: true });
    }

    function activate(scenario, { autoplay = false } = {}) {
        tabs.forEach((tab) => {
            const active = tab.dataset.scenario === scenario;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', String(active));
            tab.setAttribute('tabindex', active ? '0' : '-1');
        });
        if (panel) {
            const activeTab = tabs.find((t) => t.dataset.scenario === scenario);
            if (activeTab) panel.setAttribute('aria-labelledby', activeTab.id);
        }
        runToken += 1;
        play(scenario, runToken);
        if (!autoplay) manualHold = true;
    }

    let manualHold = false;
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => activate(tab.dataset.scenario));
        tab.addEventListener('keydown', (e) => {
            const idx = tabs.indexOf(tab);
            let newIdx = idx;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                newIdx = (idx + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                newIdx = (idx - 1 + tabs.length) % tabs.length;
            } else if (e.key === 'Home') {
                e.preventDefault();
                newIdx = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                newIdx = tabs.length - 1;
            }
            if (newIdx !== idx) {
                tabs[newIdx].focus();
                activate(tabs[newIdx].dataset.scenario);
            }
        });
    });

    // Start when scrolled into view (saves work above the fold).
    const section = document.getElementById('in-action');
    if ('IntersectionObserver' in window && section) {
        const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) {
                io.disconnect();
                activate(ORDER[0], { autoplay: true });
            }
        }, { threshold: 0.25 });
        io.observe(section);
    } else {
        activate(ORDER[0], { autoplay: true });
    }
})();
