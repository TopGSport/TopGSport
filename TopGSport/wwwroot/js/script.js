document.addEventListener("DOMContentLoaded", function () {

    const navList = document.querySelector('.main-nav ul');
    const loginLi = navList.querySelector('a[href="login.html"]').parentElement;

    function updateLoginButton() {
        if (sessionStorage.getItem('currentUserId')) {
            loginLi.innerHTML = '<a href="#" id="logout-link"><i class="fas fa-sign-out-alt"></i> Wyloguj</a>';
            document.getElementById('logout-link').onclick = function (e) {
                e.preventDefault();
                sessionStorage.removeItem('currentUserId');
                window.location.href = "login.html";
            };
        } else {
            loginLi.innerHTML = '<a href="login.html"><i class="fas fa-sign-in-alt"></i> Zaloguj</a>';
        }
    }

    updateLoginButton();

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
});
// --- Testimonials anismation ---
document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll('.testimonial-item');
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
});

// --- Language switcher ---
const translations = {
    pl: {
        title: "Fitness Center",
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        hero_title: "OTRZYMAJ BEZPŁATNY TRENING PERSONALNY",
        offer_title: "NASZA OFERTA",
        fitness: "FITNESS",
        fitness_desc: "Kompleks sportowy Coton Fit&Beauty posiada w swojej ofercie wachlarz usług stworzonych dla potrzeb wymarzonego wyglądu, sylwetki oraz zdrowia.",
        beauty: "BEAUTY",
        beauty_desc: "Klub jest wyposażony w ogromną ilość sprzętu siłowego oraz funkcjonalnego. W zakres usług wchodzi profesjonalne doradztwo oraz prowadzenie w zakresie żywienia oraz treningów.",
        stats_title: "COTON FIT & BEAUTY W LICZBACH",
        stat_clients: "klientów",
        stat_area: "m²",
        stat_instructors: "instruktorów",
        stat_days: "dni w tygodniu",
        news_title: "AKTUALNOŚCI",
        news1_title: "Wesołych Świąt Wielkanocnych!",
        news1_desc: "Wesołego Alleluja! Kolorowych pisanek, mokrego dyngusa, pysznego mazurka i rodzinnej atmosfery!",
        news2_title: "Renowacja sauny 17-18 kwietnia",
        news2_desc: "Widzimy się w sobotę!",
        news3_title: "100 DNI DO LATA – ZACZNIJ TERAZ!",
        news3_desc: "Latо coraz bliżej! Czy jesteś gotowy, by powitać je w świetnej formie? Teraz masz najlepsze okazje!",
        news4_title: "Ceremonia saunowa",
        news4_desc: "WIECZÓR SAUNOWY – 21 MARCA 2025. Zapraszamy na wyjątkowy Wieczór Saunowy w Coton Fit&Beauty!",
        more: "Więcej",
        testimonials_title: "MÓWIĄ O NAS",
        testimonial1: "Fajny klub. To był wypadek drogowy, a klub zrobił na mnie bardzo pozytywne wrażenie. Pani w recepcji jest bardzo kompetentna i pomocna. Sprzęt jest rozsądnie rozmieszczony.",
        testimonial1_author: "Andrij, 20 maja 2021",
        testimonial2: "Gorąco polecam Cotona, mam przyjemność ćwiczyć w ogromnej sali z lustrami, gdzie jest dużo miejsca i można spokojnie tańczyć.",
        testimonial2_author: "Ewa, 7 marca 2020",
        stats_final_title1: "COTON",
        stats_final_title2: "FIT & BEAUTY",
        stats_final_title3: "W LICZBACH",
        contact_footer: "KONTAKT",
        hours_footer: "GODZINY",
        open_footer: "OTWARCIA",
        footer_weekdays: "poniedziałek - piątek:<br><span class='footer-red'>6<sup>00</sup> - 22<sup>00</sup></span>",
        footer_weekend: "sobota / niedziela:<br><span class='footer-red'>8<sup>00</sup> - 16<sup>00</sup></span>",
        menu_footer: "MENU STRONY",
        footer_news: "Aktualności",
        footer_schedule: "Grafik",
        footer_classes: "Zajęcia grupowe",
        footer_ems: "EMS",
        footer_rules: "Regulamin",
        footer_docs: "Dokumenty",
        footer_spa: "Activ SPA Infrared"
    },
    en: {
        title: "Fitness Center",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        hero_title: "GET A FREE PERSONAL TRAINING SESSION",
        offer_title: "OUR OFFER",
        fitness: "FITNESS",
        fitness_desc: "The Coton Fit&Beauty sports complex offers a range of services designed for your dream look, figure, and health.",
        beauty: "BEAUTY",
        beauty_desc: "The club is equipped with a huge amount of strength and functional equipment. The services include professional advice and guidance in nutrition and training.",
        stats_title: "COTON FIT & BEAUTY IN NUMBERS",
        stat_clients: "clients",
        stat_area: "m²",
        stat_instructors: "instructors",
        stat_days: "days a week",
        news_title: "NEWS",
        news1_title: "Happy Easter!",
        news1_desc: "Happy Easter! Colorful eggs, wet Śmigus-Dyngus, delicious mazurek, and a family atmosphere!",
        news2_title: "Sauna renovation April 17-18",
        news2_desc: "See you on Saturday!",
        news3_title: "100 DAYS TO SUMMER – START NOW!",
        news3_desc: "Summer is getting closer! Are you ready to welcome it in great shape? Now is your best chance!",
        news4_title: "Sauna ceremony",
        news4_desc: "SAUNA EVENING – MARCH 21, 2025. Join us for a special Sauna Evening at Coton Fit&Beauty!",
        more: "More",
        testimonials_title: "WHAT THEY SAY ABOUT US",
        testimonial1: "Nice club. It was a car accident, and the club made a very positive impression on me. The lady at the reception is very competent and helpful. The equipment is reasonably arranged.",
        testimonial1_author: "Andrij, May 20, 2021",
        testimonial2: "I highly recommend Coton, I enjoy exercising in a huge room with mirrors, where there is plenty of space and you can dance freely.",
        testimonial2_author: "Ewa, March 7, 2020",
        stats_final_title1: "COTON",
        stats_final_title2: "FIT & BEAUTY",
        stats_final_title3: "IN NUMBERS",
        contact_footer: "CONTACT",
        hours_footer: "HOURS",
        open_footer: "OPENING",
        footer_weekdays: "Monday - Friday:<br><span class='footer-red'>6<sup>00</sup> - 22<sup>00</sup></span>",
        footer_weekend: "Saturday / Sunday:<br><span class='footer-red'>8<sup>00</sup> - 16<sup>00</sup></span>",
        menu_footer: "SITE MENU",
        footer_news: "News",
        footer_schedule: "Schedule",
        footer_classes: "Group classes",
        footer_ems: "EMS",
        footer_rules: "Rules",
        footer_docs: "Documents",
        footer_spa: "Activ SPA Infrared"
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
});
document.getElementById('customChatIcon').addEventListener('click', function () {
    document.getElementById('customChatWindow').classList.add('active');
});
// Закрити чат по кліку на хрестик
document.getElementById('closeChatBtn').addEventListener('click', function () {
    document.getElementById('customChatWindow').classList.remove('active');
});
document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById('customChatIcon');
    const chatWindow = document.getElementById('customChatWindow');
    const closeBtn = document.getElementById('closeChatBtn');

    if (chatIcon && chatWindow && closeBtn) {
        chatIcon.addEventListener('click', function() {
            chatWindow.classList.add('active');
        });
        closeBtn.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });
    }

    // Слухаємо події від Voiceflow
    window.addEventListener('message', function(event) {
        // Voiceflow надсилає подію з type: 'vf-close'
        if (event.data && event.data.type === 'vf-close') {
            chatWindow.classList.remove('active');
        }
    });
});