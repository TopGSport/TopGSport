const translations = {
    pl: {
        title: "Kontakt | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        contact_hero_title: "Skontaktuj się z nami",
        contact_hero_desc: "Masz pytania? Wypełnij formularz lub skorzystaj z danych kontaktowych poniżej.",
        contact_phone: "Telefon",
        contact_address: "Adres",
        contact_email: "Email",
        form_title: "Napisz do nas",
        form_name: "Imię i nazwisko",
        form_email: "Twój email",
        form_message: "Wiadomość",
        form_send: "Wyślij",
        form_success: "Wiadomość została wysłana! Dziękujemy za kontakt.",
        footer_copyright: "Top G Sport © 2025"
    },
    en: {
        title: "Contact | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        contact_hero_title: "Contact Us",
        contact_hero_desc: "Have questions? Fill out the form or use the contact information below.",
        contact_phone: "Phone",
        contact_address: "Address",
        contact_email: "Email",
        form_title: "Write to us",
        form_name: "Full name",
        form_email: "Your email",
        form_message: "Message",
        form_send: "Send",
        form_success: "Message sent! Thank you for contacting us.",
        footer_copyright: "Top G Sport © 2025"
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

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

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

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.animate-fadein').forEach(function (el, i) {
        el.style.animationDelay = (0.2 * i) + 's';
    });

    const form = document.getElementById('contactForm');
    const msg = document.getElementById('formMessage');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const lang = localStorage.getItem('lang') || 'pl';
        msg.textContent = translations[lang]['form_success'];
        msg.style.color = "#e63946";
        form.reset();
        setTimeout(() => { msg.textContent = ""; }, 4000);
    });
});

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