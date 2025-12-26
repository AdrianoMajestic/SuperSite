// ===== КОНСТАНТЫ =====
const themeBtn = document.getElementById("theme-toggle");
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');
const body = document.body;
const header = document.querySelector('.header');

// ===== 1. ТЕМА ОФОРМЛЕНИЯ =====
function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    });
}

// Загрузка сохраненной темы
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

// ===== 2. ПРОСТОЕ БУРГЕР-МЕНЮ =====
if (burgerBtn && navMenu) {
    // Переключение меню по клику на бургер
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
}

// Обработка dropdown (Портфолио)
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdown = document.querySelector('.dropdown');

if (dropdownBtn && dropdown) {
    dropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('open');
    });
}

// Закрытие меню при клике на ссылку (только на мобильных)
const mobileLinks = document.querySelectorAll('.nav-link[href^="#"]');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 850) {
            burgerBtn.classList.remove('open');
            navMenu.classList.remove('open');
        }
    });
});

// Закрытие меню при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 850) {
        burgerBtn.classList.remove('open');
        navMenu.classList.remove('open');
    }
});

// ===== 3. ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ =====
const navLinks = document.querySelectorAll(".nav-link[href^='#']");
const sections = Array.from(navLinks)
    .map(link => {
        const href = link.getAttribute("href");
        return document.querySelector(href);
    })
    .filter(section => section !== null);

function setActiveLink() {
    const scrollPosition = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${section.id}`) {
                    link.classList.add("active");
                }
            });
            break;
        }
    }
}

// Обновление при скролле
window.addEventListener("scroll", () => {
    setActiveLink();
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

window.addEventListener("load", setActiveLink);

// ===== 4. ФУТЕР-АККОРДЕОН =====
const footerCols = document.querySelectorAll(".footer-col");

footerCols.forEach(col => {
    const title = col.querySelector(".footer-title");
    
    if (title) {
        title.addEventListener("click", () => {
            if (window.innerWidth <= 850) {
                col.classList.toggle("open");
            }
        });
    }
});

// ===== 5. ПЛАВНАЯ ПРОКРУТКА =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href && href !== '#') {
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== 6. АНИМАЦИЯ ПОЯВЛЕНИЯ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('✨ NovaLab - сайт загружен успешно!');