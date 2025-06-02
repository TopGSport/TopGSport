function getCurrentUser() {
    return localStorage.getItem('currentUser');
}
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function getUserByEmail(email) {
    return getUsers().find(u => u.email === email);
}
function setCurrentUser(email) {
    localStorage.setItem('currentUser', email);
}

if (!getCurrentUser()) {
    window.location.href = "login.html";
}

function renderProfile() {
    const user = getUserByEmail(getCurrentUser());
    if (!user) return;
    document.getElementById('profile-info').innerHTML = `
        <b>Imię i nazwisko:</b> ${user.name}<br>
        <b>Email:</b> ${user.email}<br>
        <b>Telefon:</b> ${user.phone}
    `;
    let history = "";
    if (user.purchases && user.purchases.length) {
        user.purchases.slice().reverse().forEach((p, i) => {
            if (p.type === "shop") {
                history += `
                    <div class="purchase-item">
                        <b>Zakupy w sklepie</b><br>
                        <ul style="margin:6px 0 6px 18px;padding:0;">
                            ${p.items.map(item => `
                                <li>${item.name} <span style="color:#e63946;">x${item.qty}</span> — $${(item.price * item.qty).toFixed(2)}</li>
                            `).join('')}
                        </ul>
                        <b>Adres dostawy:</b> ${p.address}<br>
                        <b>Telefon:</b> ${p.phone}<br>
                        <span style="font-size:0.95em;">${new Date(p.date).toLocaleString()}</span>
                    </div>
                `;
            } else {
                history += `
                    <div class="purchase-item">
                        <b>${p.name}</b> (${p.price})<br>
                        ${p.startDate ? `Data startu: ${p.startDate}<br>` : ""}
                        ${p.options ? `Opcje: 
                            ${p.options.trener ? "Trener, " : ""}
                            ${p.options.towel ? "Ręcznik, " : ""}
                            ${p.options.locker ? "Szafka" : ""}
                        <br>` : ""}
                        ${p.karKey ? `Numer karnetu: <b>${p.karKey.toUpperCase()}-${user.purchases.length - i}</b><br>` : ""}
                        Zakup: ${new Date(p.date).toLocaleString()}
                    </div>
                `;
            }
        });
    } else {
        history = "<i>Brak zakupionych produktów i karnetów.</i>";
    }
    document.getElementById('purchase-history').innerHTML = history;
}

document.getElementById('edit-btn').onclick = function() {
    const user = getUserByEmail(getCurrentUser());
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-email').value = user.email;
    document.getElementById('edit-phone').value = user.phone;
    document.getElementById('edit-form').style.display = "block";
    this.style.display = "none";
};
document.getElementById('cancel-edit').onclick = function() {
    document.getElementById('edit-form').style.display = "none";
    document.getElementById('edit-btn').style.display = "inline-block";
    document.getElementById('edit-msg').textContent = "";
};
document.getElementById('edit-form').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('edit-name').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const msg = document.getElementById('edit-msg');
    if (!name || !email || !phone) {
        msg.textContent = "Wypełnij wszystkie pola!";
        return;
    }
    let users = getUsers();
    let user = users.find(u => u.email === getCurrentUser());
    if (!user) return;
    user.name = name;
    user.email = email;
    user.phone = phone;
    setUsers(users);
    setCurrentUser(email);
    msg.style.color = "#4caf50";
    msg.textContent = "Dane zapisane!";
    setTimeout(() => {
        document.getElementById('edit-form').style.display = "none";
        document.getElementById('edit-btn').style.display = "inline-block";
        renderProfile();
    }, 1000);
};

window.onload = renderProfile;
// --- Testimonials animation (для сторінок з відгуками) ---
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

// --- Translations ---
const translations = {
    pl: {
        // Головне меню (для всіх сторінок)
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",

        // INDEX PAGE
        title: "Fitness Center",
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
        footer_spa: "Activ SPA Infrared",

        // ABOUT PAGE
        about_hero_title: "Najlepsza Siłownia w Mieście",
        about_hero_desc: "Top G Sport to nie tylko siłownia – to społeczność ludzi z pasją!  U nas znajdziesz nowoczesny sprzęt, profesjonalnych trenerów i motywującą atmosferę.<br>Dołącz do nas i przekonaj się, dlaczego jesteśmy najlepsi!",
        gallery_title: "Nasza Siłownia w Obiektywie",
        team_title: "Poznaj nasz zespół",
        team1_name: "Anna Nowak",
        team1_role: "Trener personalny",
        team2_name: "Jan Kowalski",
        team2_role: "Instruktor fitness",
        team3_name: "Kasia Wiśniewska",
        team3_role: "Dietetyk",

        // CONTACT PAGE
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

        // PROFILE PAGE
        profile_title: "Twój profil",
        edit_btn: "Edytuj dane",
        form_phone: "Telefon",
        save_btn: "Zapisz zmiany",
        cancel_btn: "Anuluj",
        purchase_history_title: "Historia zakupów",

        footer_copyright: "Top G Sport &copy; 2025"
    },
    en: {
        // Main menu (for all pages)
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",

        // INDEX PAGE
        title: "Fitness Center",
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
        footer_spa: "Activ SPA Infrared",

        // ABOUT PAGE
        about_hero_title: "The Best Gym in Town",
        about_hero_desc: "Top G Sport is not just a gym – it's a community of passionate people!  Here you'll find modern equipment, professional trainers, and a motivating atmosphere.<br>Join us and see why we're the best!",
        gallery_title: "Our Gym in Pictures",
        team_title: "Meet our team",
        team1_name: "Anna Nowak",
        team1_role: "Personal Trainer",
        team2_name: "Jan Kowalski",
        team2_role: "Fitness Instructor",
        team3_name: "Kasia Wiśniewska",
        team3_role: "Dietitian",

        // CONTACT PAGE
        contact_hero_title: "Contact us",
        contact_hero_desc: "Have questions? Fill out the form or use the contact details below.",
        contact_phone: "Phone",
        contact_address: "Address",
        contact_email: "Email",
        form_title: "Write to us",
        form_name: "Full name",
        form_email: "Your email",
        form_message: "Message",
        form_send: "Send",

        // PROFILE PAGE
        profile_title: "Your profile",
        edit_btn: "Edit data",
        form_phone: "Phone",
        save_btn: "Save changes",
        cancel_btn: "Cancel",
        purchase_history_title: "Purchase history",

        // Footer (general)
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

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

function getLang() {
    return localStorage.getItem('lang') || 'pl';
}

document.addEventListener('DOMContentLoaded', () => {
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

if (typeof getCurrentUser !== 'undefined') {
}