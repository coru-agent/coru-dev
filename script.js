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