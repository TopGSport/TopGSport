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
        offer_hero_title: "Nasze Karnety",
        offer_hero_desc: "Wybierz idealny karnet dla siebie i dołącz do najlepszej siłowni w mieście!",
        compare_title: "Porównanie Karnetów",
        table_membership: "Karnet",
        table_availability: "Dostępność",
        table_sauna: "Sauna",
        table_group_classes: "Zajęcia grupowe",
        table_consultations: "Konsultacje",
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
        see_more: "Zobacz więcej"
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
        offer_hero_title: "Our Memberships",
        offer_hero_desc: "Choose the perfect membership for you and join the best gym in town!",
        compare_title: "Membership Comparison",
        table_membership: "Membership",
        table_availability: "Availability",
        table_sauna: "Sauna",
        table_group_classes: "Group Classes",
        table_consultations: "Consultations",
        faq_title: "FAQ – Frequently Asked Questions",
        faq1_q: "Can I freeze my membership?",
        faq1_a: "Yes, you can freeze your membership for up to 30 days per year. Please contact the reception.",
        faq2_q: "Is there parking?",
        faq2_a: "Yes, we have free parking for all clients.",
        faq3_q: "Is the first training free?",
        faq3_a: "Yes! The first training is completely free for new clients.",
        faq4_q: "Can I come with a child?",
        faq4_a: "Yes, we offer family memberships and a special area for children.",
        faq5_q: "Are there group classes?",
        faq5_a: "Yes, most memberships include access to group classes.",
        see_more: "See more"
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

    document.querySelectorAll('.btn-offer').forEach(btn => {
        btn.textContent = translations[lang]['see_more'] || 'Zobacz więcej';
    });
}

document.addEventListener('DOMContentLoaded', async function () {
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

    try {
        const response = await fetch('http://localhost:5017/api/memberships');
        const memberships = await response.json();

        const offerCards = document.querySelector('.offer-cards');
        const currentLang = localStorage.getItem('lang') || 'pl';
        const seeMoreText = translations[currentLang]['see_more'] || 'Zobacz więcej';
        offerCards.innerHTML = memberships.map((kar, index) => `
                <div class="card animate-slideup" style="animation-delay:${0.1 * index}s;">
                    <h2>${kar.name}</h2>
                    <p>${kar.description}</p>
                    <div class="price">${kar.price}</div>
                    ${kar.bonus ? `<div class="bonus">${kar.bonus}</div>` : ''}
                    <button class="btn-offer" onclick="window.location.href='karnet.html?kar=kar${kar.id}'">Zobacz więcej</button>
                </div>
            `).join('');

        const compareTable = document.querySelector('.compare-table tbody');
        compareTable.innerHTML = memberships.map(kar => {
            const features = JSON.parse(kar.features || '[]');
            const hasSauna = features.includes('Sauna') ? '✓' : '✗';
            const hasGroupClasses = features.some(f => f.includes('strefy') || f.includes('grupowe')) ? '✓' : '✗';
            const hasConsultations = features.includes('Konsultacje') || features.includes('Konsultacja z trenerem') ? '✓' : '✗';
            return `
                    <tr>
                        <td>${kar.name}</td>
                        <td>${kar.hours}</td>
                        <td>${hasSauna}</td>
                        <td>${hasGroupClasses}</td>
                        <td>${hasConsultations}</td>
                    </tr>
                `;
        }).join('');


    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.animate-slideup').forEach(function(el, i) {
            el.style.animationDelay = (0.1 * i) + 's';
        });

        document.querySelectorAll('.faq-item').forEach(function (item) {
            item.addEventListener('click', function () {
                this.classList.toggle('open');
            });
        });

        document.querySelectorAll('.animate-fadein').forEach(function(el, i) {
            el.style.animationDelay = (0.2 * i) + 's';
        });
        document.querySelectorAll('.animate-zoom').forEach(function(el, i) {
            el.style.animationDelay = (0.15 * i) + 's';
        });
    });
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        alert('Nie udało się załadować danych karnetów. Spróbuj ponownie później.');
    }
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