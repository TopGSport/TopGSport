document.addEventListener('DOMContentLoaded', function() {
    // Анімації для карток
    document.querySelectorAll('.animate-slideup').forEach(function(el, i) {
        el.style.animationDelay = (0.1 * i) + 's';
    });

    // FAQ розкривання
    document.querySelectorAll('.faq-item').forEach(function(item) {
        item.addEventListener('click', function() {
            this.classList.toggle('open');
        });
    });

    // Анімація hero
    document.querySelectorAll('.animate-fadein').forEach(function(el, i) {
        el.style.animationDelay = (0.2 * i) + 's';
    });
    document.querySelectorAll('.animate-zoom').forEach(function(el, i) {
        el.style.animationDelay = (0.15 * i) + 's';
    });
});