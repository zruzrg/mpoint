// FILE: script.js

/**

MP Fitness - script.js

Uzun ve detaylı JavaScript dosyası

Tüm interaktivite, animasyon, kullanıcı deneyimi iyileştirme */


(() => { 'use strict';

// GLOBAL VARIABLES const SELECTORS = { mobileToggle: '.mobile-toggle', navMenu: '.nav-menu', anchorLinks: 'a[href^="#"]', sections: 'section[id]', dayCards: '.day-card', testimonials: '.testimonials blockquote', contactForm: '.contact-form', preloader: '#preloader', backToTop: '.back-to-top', themeToggle: '#theme-toggle', html: 'html' };

// Document Ready document.addEventListener('DOMContentLoaded', () => { setupPreloader(); initMobileMenu(); initSmoothScroll(); initRevealAnimations(); initNavHighlight(); initTestimonialsSlider(); initContactForm(); initBackToTop(); initThemeToggle(); initScrollProgressBar(); registerServiceWorker(); console.log('MP Fitness - All modules initialized'); });

/**

PRELOADER: Sayfa yüklenirken göster */ function setupPreloader() { const loader = document.querySelector(SELECTORS.preloader); if (!loader) return; window.addEventListener('load', () => { loader.classList.add('fade-out'); setTimeout(() => loader.remove(), 1000); }); }


/**

MOBILE MENU: Menü açma / kapama */ function initMobileMenu() { const toggle = document.querySelector(SELECTORS.mobileToggle); const menu = document.querySelector(SELECTORS.navMenu); if (!toggle || !menu) return; toggle.addEventListener('click', () => { menu.classList.toggle('open'); toggle.classList.toggle('open'); }); }


/**

SMOOTH SCROLL: Tüm anchor linkler için yumuşak kaydırma */ function initSmoothScroll() { document.querySelectorAll(SELECTORS.anchorLinks).forEach(link => { link.addEventListener('click', e => { const targetID = link.getAttribute('href').slice(1); const target = document.getElementById(targetID); if (target) { e.preventDefault(); const headerOffset = document.querySelector('.site-header').offsetHeight; const elementPosition = target.getBoundingClientRect().top; const offsetPosition = elementPosition + window.pageYOffset - headerOffset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } }); }); }


/**

REVEAL ANIMATIONS: Intersection Observer ile elementleri görünce animasyon ekle */ function initRevealAnimations() { const elements = [...document.querySelectorAll(SELECTORS.sections), ...document.querySelectorAll(SELECTORS.dayCards)]; const observer = new IntersectionObserver((entries, obs) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reveal-visible'); obs.unobserve(entry.target); } }); }, { threshold: 0.1 }); elements.forEach(el => observer.observe(el)); }


/**

NAV HIGHLIGHT: Scroll durumuna göre nav link vurgula */ function initNavHighlight() { const sections = document.querySelectorAll(SELECTORS.sections); const links = document.querySelectorAll('.nav-menu a'); window.addEventListener('scroll', throttle(() => { let scrollPos = window.pageYOffset + window.innerHeight / 4; sections.forEach(sec => { if (scrollPos >= sec.offsetTop) { links.forEach(l => l.classList.remove('active')); const active = document.querySelector(.nav-menu a[href="#${sec.id}"]); if (active) active.classList.add('active'); } }); }, 150)); }


/**

TESTIMONIALS SLIDER: Yorumları döngüsel göster */ function initTestimonialsSlider() { const quotes = document.querySelectorAll(SELECTORS.testimonials); if (!quotes.length) return; let idx = 0; quotes.forEach((q, i) => { q.style.opacity = i === 0 ? '1' : '0'; q.style.transition = 'opacity 1s ease-in-out'; }); setInterval(() => { quotes[idx].style.opacity = '0'; idx = (idx + 1) % quotes.length; quotes[idx].style.opacity = '1'; }, 6000); }


/**

CONTACT FORM: Basit form gönderim işleme */ function initContactForm() { const form = document.querySelector(SELECTORS.contactForm); if (!form) return; form.addEventListener('submit', e => { e.preventDefault(); const msgBox = document.createElement('div'); msgBox.className = 'form-success'; msgBox.innerText = 'Teşekkürler! Mesajınız alındı.'; form.append(msgBox); form.reset(); setTimeout(() => msgBox.remove(), 5000); }); }


/**

BACK TO TOP: Sayfa altından butonla dönme */ function initBackToTop() { const btn = document.querySelector(SELECTORS.backToTop); if (!btn) return; window.addEventListener('scroll', () => { btn.classList.toggle('visible', window.pageYOffset > 500); }); btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); }); }


/**

THEME TOGGLE: Karanlık / Açık mod anahtar */ function initThemeToggle() { const toggle = document.querySelector(SELECTORS.themeToggle); const html = document.documentElement; if (!toggle) return; const saved = localStorage.getItem('theme'); if (saved) html.setAttribute('data-theme', saved); toggle.addEventListener('click', () => { const current = html.getAttribute('data-theme') || 'dark'; const next = current === 'dark' ? 'light' : 'dark'; html.setAttribute('data-theme', next); localStorage.setItem('theme', next); }); }


/**

SCROLL PROGRESS BAR: Sayfa üstündeki ilerleme çubuğu */ function initScrollProgressBar() { const bar = document.createElement('div'); bar.id = 'scroll-progress'; document.body.append(bar); window.addEventListener('scroll', () => { const scrollTop = window.scrollY; const docHeight = document.documentElement.scrollHeight - window.innerHeight; const percent = (scrollTop / docHeight) * 100; bar.style.width = ${percent}%; }); }


/**

SERVICE WORKER: Offline destek (stub) */ function registerServiceWorker() { if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js') .then(reg => console.log('SW registered:', reg.scope)) .catch(err => console.error('SW error:', err)); } }


/**

UTILITY: Throttle fonksiyonu */ function throttle(fn, wait) { let lastTime = Date.now(); return function(...args) { if (Date.now() - lastTime >= wait) { fn.apply(this, args); lastTime = Date.now(); } }; }


})();

