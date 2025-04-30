document.addEventListener('DOMContentLoaded', function() {
    // Анімації для секцій
    document.querySelectorAll('.animate-fadein').forEach(function(el, i) {
        el.style.animationDelay = (0.2 * i) + 's';
    });
    document.querySelectorAll('.animate-slideup').forEach(function(el, i) {
        el.style.animationDelay = (0.2 * i) + 's';
    });
    document.querySelectorAll('.animate-zoom').forEach(function(el, i) {
        el.style.animationDelay = (0.15 * i) + 's';
    });
});