const translations = {
    pl: {
        title: "Karnet | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Shop",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        contact_title: "Kontakt",
        contact_phone: "Telefon:",
        contact_email: "Email:",
        contact_address: "Adres:",
        footer: "Top G Sport &copy; 2025",
        buy_btn: "Kup teraz",
        features_hours: "Godziny dostępu",
        features_list: "Funkcje",
        compare_title: "Porównanie karnetów",
        compare_karnet: "Karnet",
        compare_hours: "Dostępność",
        compare_sauna: "Sauna",
        compare_group: "Zajęcia grupowe",
        compare_consult: "Konsultacje",
        error_loading: "Błąd ładowania danych karnetu. Spróbuj ponownie później.",
        not_found: "Karnet nie znaleziony"
    },
    en: {
        title: "Membership | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        contact_title: "Contact",
        contact_phone: "Phone:",
        contact_email: "Email:",
        contact_address: "Address:",
        footer: "Top G Sport &copy; 2025",
        buy_btn: "Buy now",
        features_hours: "Access hours",
        features_list: "Features",
        compare_title: "Membership comparison",
        compare_karnet: "Membership",
        compare_hours: "Availability",
        compare_sauna: "Sauna",
        compare_group: "Group classes",
        compare_consult: "Consultations",
        error_loading: "Error loading membership data. Please try again later.",
        not_found: "Membership not found"
    }
};

function getLang() {
    return localStorage.getItem('lang') || 'pl';
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const t = translations[lang];

    document.title = t.title;

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

async function renderKarnet() {
    const lang = getLang();
    const t = translations[lang];
    const params = new URLSearchParams(window.location.search);
    const karKey = params.get('kar') || 'kar1';
    const karId = karKey.replace('kar', '');

    try {
        const response = await fetch(`http://localhost:5017/api/memberships/${karId}`);
        if (!response.ok) throw new Error(t.not_found);
        const kar = await response.json();

        const features = JSON.parse(kar.features || '[]');

        document.getElementById('karnet-hero').innerHTML = `
            <h1>${kar.name}</h1>
            <div class="price">${kar.price}</div>
            ${kar.bonus ? `<div class="bonus">${kar.bonus}</div>` : ''}
            <p>${kar.description}</p>
            <a href="buy.html?kar=kar${kar.id}" class="kup-btn">${t.buy_btn}</a>
        `;

        document.getElementById('karnet-features').innerHTML = `
            <table>
                <tr><th>${t.features_hours}</th><td>${kar.hours}</td></tr>
                <tr><th>${t.features_list}</th><td>${features.join(', ')}</td></tr>
            </table>
        `;

        const responseAll = await fetch('http://localhost:5017/api/memberships');
        const allMemberships = await responseAll.json();
        const compareRows = allMemberships.map(row => {
            const rowFeatures = JSON.parse(row.features || '[]');
            const hasSauna = rowFeatures.includes('Sauna') ? '✓' : '✗';
            const hasGroupClasses = rowFeatures.some(f => f.toLowerCase().includes('strefy') || f.toLowerCase().includes('grupowe')) ? '✓' : '✗';
            const hasConsultations = rowFeatures.includes('Konsultacje') || rowFeatures.includes('Konsultacja z trenerem') ? '✓' : '✗';
            return `
                <tr>
                    <td>${row.name}</td>
                    <td>${row.hours}</td>
                    <td>${hasSauna}</td>
                    <td>${hasGroupClasses}</td>
                    <td>${hasConsultations}</td>
                </tr>
            `;
        }).join('');
        document.getElementById('karnet-compare').innerHTML = `
            <h2>${t.compare_title}</h2>
            <table>
                <tr>
                    <th>${t.compare_karnet}</th>
                    <th>${t.compare_hours}</th>
                    <th>${t.compare_sauna}</th>
                    <th>${t.compare_group}</th>
                    <th>${t.compare_consult}</th>
                </tr>
                ${compareRows}
            </table>
        `;

        document.querySelectorAll('.animate-fadein, .animate-slideup').forEach((el, i) => {
            el.style.opacity = 0;
            setTimeout(() => {
                el.style.opacity = 1;
            }, 200 + i * 200);
        });

    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        document.getElementById('karnet-hero').innerHTML = `<p>${translations[getLang()]['error_loading']}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const lang = getLang();
    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.value = lang;
    setLanguage(lang);
    if (switcher) {
        switcher.addEventListener('change', function () {
            setLanguage(this.value);
            renderKarnet();
        });
    }
    renderKarnet();
});