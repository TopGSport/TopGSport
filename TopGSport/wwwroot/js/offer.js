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
const translations = {
    pl: {
        title: "Oferta | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        hero_title: "Nasze Karnety",
        hero_desc: "Wybierz idealny karnet dla siebie i dołącz do najlepszej siłowni w mieście!",
        night: "Nocny Karnet",
        night_desc: "Dostęp od 22:00 do 6:00. Idealny dla nocnych marków!",
        night_price: "59 zł / miesiąc",
        night_bonus: "Pierwszy tydzień gratis!",
        week: "Tygodniowy Karnet",
        week_desc: "Pełny dostęp przez 7 dni. Świetny na start lub dla gości.",
        week_price: "39 zł / tydzień",
        all_day: "24/7 Karnet",
        all_day_desc: "Nielimitowany dostęp do siłowni przez całą dobę!",
        all_day_price: "99 zł / miesiąc",
        all_day_bonus: "Darmowa konsultacja z trenerem!",
        month: "Miesięczny Karnet",
        month_desc: "Pełny dostęp do wszystkich stref przez 30 dni.",
        month_price: "89 zł / miesiąc",
        student: "Studencki Karnet",
        student_desc: "Dla uczniów i studentów do 26 lat. Wymagana legitymacja.",
        student_price: "69 zł / miesiąc",
        vip: "VIP Karnet",
        vip_desc: "Wszystko bez limitu + sauna, konsultacje, priorytetowa obsługa.",
        vip_price: "159 zł / miesiąc",
        vip_bonus: "Darmowy zestaw startowy!",
        family: "Rodzinny Karnet",
        family_desc: "Dla 2 dorosłych + dzieci do 16 lat. Trenujcie razem!",
        family_price: "199 zł / miesiąc",
        single: "Wejście Jednorazowe",
        single_desc: "Jednorazowy wstęp do siłowni. Bez zobowiązań.",
        single_price: "15 zł / wejście",
        see_more: "Zobacz więcej",
        compare_title: "Porównanie Karnetów",
        th_pass: "Karnet",
        th_access: "Dostępność",
        th_sauna: "Sauna",
        th_group: "Zajęcia grupowe",
        th_consult: "Konsultacje",
        night_short: "Nocny",
        week_short: "Tygodniowy",
        all_day_short: "24/7",
        month_short: "Miesięczny",
        student_short: "Studencki",
        vip_short: "VIP",
        family_short: "Rodzinny",
        single_short: "Jednorazowe",
        faq_title: "FAQ – Najczęstsze pytania",
        faq1_q: "Czy mogę zamrozić karnet?",
        faq1_a: "Tak, możesz zamrozić karnet na maksymalnie 30 dni w roku. Skontaktuj się z recepcją.",
        faq2_q: "Czy jest parking?",
        faq2_a: "Tak, mamy bezpłatny parking dla wszystkich klientów.",
        faq3_q: "Czy pierwszy trening jest gratis?",
        faq3_a: "Tak! Pierwszy trening jest całkowicie darmowy dla nowych klientów.",
        faq4_q: "Czy mogę przyjść z dzieckiem?",
        faq4_a: "Tak, oferujemy rodzinne karnety oraz specjalną strefę dla dzieci.",
        faq5_q: "Czy są zajęcia grupowe?",
        faq5_a: "Tak, w cenie większości karnetów masz dostęp do zajęć grupowych.",
        footer: "Top G Sport &copy; 2025"
    },
    en: {
        title: "Offer | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        hero_title: "Our Passes",
        hero_desc: "Choose your perfect pass and join the best gym in town!",
        night: "Night Pass",
        night_desc: "Access from 10 PM to 6 AM. Perfect for night owls!",
        night_price: "59 PLN / month",
        night_bonus: "First week free!",
        week: "Weekly Pass",
        week_desc: "Full access for 7 days. Great for a start or for guests.",
        week_price: "39 PLN / week",
        all_day: "24/7 Pass",
        all_day_desc: "Unlimited access to the gym 24/7!",
        all_day_price: "99 PLN / month",
        all_day_bonus: "Free consultation with a trainer!",
        month: "Monthly Pass",
        month_desc: "Full access to all zones for 30 days.",
        month_price: "89 PLN / month",
        student: "Student Pass",
        student_desc: "For students up to 26 years old. Student ID required.",
        student_price: "69 PLN / month",
        vip: "VIP Pass",
        vip_desc: "All unlimited + sauna, consultations, priority service.",
        vip_price: "159 PLN / month",
        vip_bonus: "Free starter pack!",
        family: "Family Pass",
        family_desc: "For 2 adults + children up to 16 years. Train together!",
        family_price: "199 PLN / month",
        single: "Single Entry",
        single_desc: "One-time gym entry. No obligations.",
        single_price: "15 PLN / entry",
        see_more: "See more",
        compare_title: "Pass Comparison",
        th_pass: "Pass",
        th_access: "Access",
        th_sauna: "Sauna",
        th_group: "Group classes",
        th_consult: "Consultations",
        night_short: "Night",
        week_short: "Weekly",
        all_day_short: "24/7",
        month_short: "Monthly",
        student_short: "Student",
        vip_short: "VIP",
        family_short: "Family",
        single_short: "Single",
        faq_title: "FAQ – Frequently Asked Questions",
        faq1_q: "Can I freeze my pass?",
        faq1_a: "Yes, you can freeze your pass for up to 30 days per year. Contact the reception.",
        faq2_q: "Is there parking?",
        faq2_a: "Yes, we have free parking for all clients.",
        faq3_q: "Is the first training free?",
        faq3_a: "Yes! The first training is completely free for new clients.",
        faq4_q: "Can I come with a child?",
        faq4_a: "Yes, we offer family passes and a special kids zone.",
        faq5_q: "Are there group classes?",
        faq5_a: "Yes, most passes include access to group classes.",
        footer: "Top G Sport &copy; 2025"
    }
};

function getLang() {
    return localStorage.getItem('lang') || 'pl';
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const t = translations[lang];

    document.title = t.title;

    // Menu
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === "A" && el.querySelector("i")) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3) node.textContent = " " + t[key];
                });
            } else {
                el.innerHTML = t[key];
            }
        }
    });

    // All other elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerHTML = t[key];
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Анімації для карток
    document.querySelectorAll('.animate-slideup').forEach(function (el, i) {
        el.style.animationDelay = (0.1 * i) + 's';
    });

    document.querySelectorAll('.faq-item').forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.toggle('open');
        });
    });

    document.querySelectorAll('.animate-fadein').forEach(function (el, i) {
        el.style.animationDelay = (0.2 * i) + 's';
    });
    document.querySelectorAll('.animate-zoom').forEach(function (el, i) {
        el.style.animationDelay = (0.15 * i) + 's';
    });

    // Language switcher
    const lang = getLang();
    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.value = lang;
    setLanguage(lang);
    if (switcher) {
        switcher.addEventListener('change', function () {
            setLanguage(this.value);
        });
    }
});