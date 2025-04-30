document.addEventListener('DOMContentLoaded', function() {
    // Анімація для info-item (запуск при завантаженні)
    document.querySelectorAll('.animate-fadein').forEach(function(el, i) {
        el.style.animationDelay = (0.2 * i) + 's';
    });

    // Відправка форми (імітація)
    const form = document.getElementById('contactForm');
    const msg = document.getElementById('formMessage');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        msg.textContent = "Wiadomość została wysłana! Dziękujemy za kontakt.";
        msg.style.color = "#e63946";
        form.reset();
        setTimeout(() => { msg.textContent = ""; }, 4000);
    });
});