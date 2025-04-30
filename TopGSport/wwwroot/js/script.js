document.addEventListener("DOMContentLoaded", function() {
    const testimonials = document.querySelectorAll('.testimonial-item');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(testimonials).indexOf(entry.target);
                entry.target.style.opacity = 1; // Показати елемент
                entry.target.style.transform = 'translateY(0)'; // Скинути зсув
                if (index % 2 === 0) {
                    entry.target.classList.add('left');
                } else {
                    entry.target.classList.add('right');
                }
                observer.unobserve(entry.target); // Припинити спостереження
            }
        });
    }, options);

    testimonials.forEach(testimonial => {
        observer.observe(testimonial);
    });
});