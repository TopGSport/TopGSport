document.addEventListener('DOMContentLoaded', function() {
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
document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll('.testimonial-item');
    if (testimonials.length) {
        const options = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(testimonials).indexOf(entry.target);
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    if (index % 2 === 0) {
                        entry.target.classList.add('left');
                    } else {
                        entry.target.classList.add('right');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        testimonials.forEach(testimonial => {
            observer.observe(testimonial);
        });
    }
});

const translations = {
    pl: {
        title: "O nas | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",

        about_hero_title: "Najlepsza Siłownia w Mieście",
        about_hero_desc: "Top G Sport to nie tylko siłownia – to społeczność ludzi z pasją!  U nas znajdziesz nowoczesny sprzęt, profesjonalnych trenerów i motywującą atmosferę.<br>Dołącz do nas i przekonaj się, dlaczego jesteśmy najlepsi!",

        gallery_title: "Nasza Siłownia w Obiektywie",

        team_title: "Poznaj nasz zespół",
        team1_name: "Andrzej",
        team1_role: "Trener personalny",
        team2_name: "Parhomczik",
        team2_role: "Instruktor fitness",
        team3_name: "Boss_Boy",
        team3_role: "Dietetyk",

        
        footer_copyright: "Top G Sport &copy; 2025"
    },
    en: {
        title: "About us | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",

        about_hero_title: "The Best Gym in Town",
        about_hero_desc: "Top G Sport is not just a gym – it's a community of passionate people!  Here you'll find modern equipment, professional trainers, and a motivating atmosphere.<br>Join us and see why we're the best!",

        gallery_title: "Our Gym in Pictures",

        team_title: "Meet our team",
        team1_name: "Andrew Black",
        team1_role: "Personal Trainer",
        team2_name: "Parhom4ik",
        team2_role: "Fitness Instructor",
        team3_name: "Svatik Sava",
        team3_role: "Dietitian",

        // Footer
        footer_copyright: "Top G Sport &copy; 2025"
    }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === "A" && el.querySelector("i")) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3) node.textContent = " " + translations[lang][key];
                });
            } else if (el.tagName === "TITLE") {
                document.title = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'pl';
    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.value = lang;
    setLanguage(lang);

    if (switcher) {
        switcher.addEventListener('change', function () {
            setLanguage(this.value);
        });
    }
});