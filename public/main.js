// Reduced motion preference
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Theme toggle ───
var themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');
    var isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
        document.documentElement.classList.toggle('dark', e.matches);
    }
});

// ─── Sticky nav ───
var navWrap = document.getElementById('navWrap');
var navScrolled = false;
var navTicking = false;

window.addEventListener('scroll', function() {
    if (!navTicking) {
        requestAnimationFrame(function() {
            var shouldBeScrolled = window.scrollY > 50;
            if (shouldBeScrolled !== navScrolled) {
                navScrolled = shouldBeScrolled;
                navWrap.classList.toggle('scrolled', navScrolled);
            }
            navTicking = false;
        });
        navTicking = true;
    }
}, { passive: true });

// ─── Scroll-triggered reveals ───
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            if (prefersReducedMotion) {
                entry.target.classList.add('revealed');
            } else {
                var delay = parseFloat(entry.target.style.transitionDelay) || 0;
                var extraDelay = delay * 1000;
                setTimeout(function() {
                    entry.target.classList.add('revealed');
                }, extraDelay > 0 ? 0 : 0); // delays are already in CSS transition-delay
                entry.target.classList.add('revealed');
            }
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
    if (prefersReducedMotion) {
        el.classList.add('revealed');
    } else {
        revealObserver.observe(el);
    }
});

// ─── Hero entrance animation ───
if (!prefersReducedMotion) {
    var heroLabel = document.getElementById('heroLabel');
    var heroTitle = document.getElementById('heroTitle');
    var heroSubtitle = document.getElementById('heroSubtitle');
    var heroCta = document.getElementById('heroCta');
    var heroVisual = document.getElementById('heroVisual');

    // Small delay before triggering to let page paint first
    setTimeout(function() {
        if (heroLabel) heroLabel.classList.add('hero-loaded');
        if (heroTitle) heroTitle.classList.add('hero-loaded');
        if (heroSubtitle) heroSubtitle.classList.add('hero-loaded');
        if (heroCta) heroCta.classList.add('hero-loaded');
        if (heroVisual) heroVisual.classList.add('hero-loaded');
    }, 80);
} else {
    // If reduced motion: show everything immediately
    ['heroLabel', 'heroTitle', 'heroSubtitle', 'heroCta', 'heroVisual'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
    });
}

// ─── App Store badge glow (one-time, on first viewport entry) ───
var badge = document.getElementById('appStoreBadge');
if (badge && !prefersReducedMotion) {
    var badgeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    badge.classList.add('cta-glow');
                }, 800);
                badgeObserver.unobserve(badge);
            }
        });
    }, { threshold: 0.8 });
    badgeObserver.observe(badge);
}

// ─── Smooth scroll for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            var navHeight = navWrap ? navWrap.offsetHeight : 0;
            var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
    });
});
