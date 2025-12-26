document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ЛОГИКА СМЕНЫ ТЕМЫ ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Проверка сохраненной темы
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
        });
    }

    // --- 2. ЛОГИКА КНОПКИ "НАВЕРХ" ---
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Следим за скроллом
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Клик для возврата
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.error("Кнопка 'back-to-top' не найдена в HTML!");
    }
});