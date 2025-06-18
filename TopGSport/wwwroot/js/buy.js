const translations = {
    pl: {
        title: "Kup Karnet | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Shop",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        buy_title: "Kup Karnet",
        start_label: "Data startu:",
        opt_trener: "Osobisty trener",
        opt_towel: "Ręcznik",
        opt_locker: "Szafka",
        contact_data: "Dane kontaktowe",
        ph_name: "Imię i nazwisko",
        ph_email: "Email",
        ph_phone: "Telefon",
        buy_btn: "Kup teraz",
        error_fields: "Wypełnij wszystkie pola!",
        error_user: "Błąd użytkownika!",
        error_purchase: "Błąd zakupu!",
        error_server: "Błąd serwera. Spróbuj ponownie później.",
        success_purchase: "Zakup udany! Numer karnetu:",
        success_instruction: "Instrukcja: Przyjdź do recepcji, Twoje dane i wybrany karnet są już w bazie. Podaj swój adres e-mail, a obsługa zweryfikuje zakup. Płatność za karnet dokonasz na miejscu.",
        error_loading: "Błąd ładowania danych karnetu. Spróbuj ponownie później."
    },
    en: {
        title: "Buy Membership | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        buy_title: "Buy Membership",
        start_label: "Start date:",
        opt_trener: "Personal trainer",
        opt_towel: "Towel",
        opt_locker: "Locker",
        contact_data: "Contact details",
        ph_name: "Full name",
        ph_email: "Email",
        ph_phone: "Phone",
        buy_btn: "Buy now",
        error_fields: "Fill in all fields!",
        error_user: "User error!",
        error_purchase: "Purchase error!",
        error_server: "Server error. Please try again later.",
        success_purchase: "Purchase successful! Membership number:",
        success_instruction: "Instructions: Come to the reception, your details and selected membership are already in the system. Provide your email address, the staff will verify your purchase. You will pay for the membership on site.",
        error_loading: "Error loading membership data. Please try again later."
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

const userId = sessionStorage.getItem('currentUserId');
if (!userId) {
    window.location.href = "login.html";
}

function getKarnetFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('kar')?.replace('kar', '') || '1';
}

async function fillUserData() {
    const userId = sessionStorage.getItem('currentUserId');
    if (!userId) return;
    try {
        const response = await fetch(`http://localhost:5017/api/users/${userId}`);
        if (!response.ok) return;
        const user = await response.json();
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-phone').value = user.phone;
    } catch (e) { }
}

async function renderKarnetInfo() {
    const karId = getKarnetFromUrl();
    try {
        const response = await fetch(`http://localhost:5017/api/memberships/${karId}`);
        if (!response.ok) throw new Error('Karnet nie znaleziony');
        const kar = await response.json();

        document.getElementById('karnet-info').innerHTML = `
            <img src="${kar.img}" alt="${kar.name}">
            <h2>${kar.name}</h2>
            <div class="price">${kar.price}</div>
            <p>${kar.description}</p>
        `;
    } catch (error) {
        console.error('Błąd podczas pobierania danych karnetu:', error);
        const lang = localStorage.getItem('lang') || 'pl';
        document.getElementById('karnet-info').innerHTML = `<p>${translations[lang]['error_loading']}</p>`;
    }
}

document.getElementById('buy-form').onsubmit = async function (e) {
    e.preventDefault();

    const karId = getKarnetFromUrl();
    const startDate = document.getElementById('start-date').value;
    const optTrener = document.getElementById('opt-trener').checked;
    const optTowel = document.getElementById('opt-towel').checked;
    const optLocker = document.getElementById('opt-locker').checked;
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const msg = document.getElementById('buy-msg');
    const lang = localStorage.getItem('lang') || 'pl';

    if (!startDate || !name || !email || !phone) {
        msg.textContent = translations[lang]['error_fields'];
        return;
    }

    const userId = sessionStorage.getItem('currentUserId');
    if (!userId) {
        msg.textContent = translations[lang]['error_user'];
        return;
    }

    try {
        const response = await fetch('http://localhost:5017/api/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: parseInt(userId),
                membershipId: parseInt(karId),
                startDate: startDate,
                options: {
                    trener: optTrener,
                    towel: optTowel,
                    locker: optLocker
                }
            })
        });

        const result = await response.json();
        
        if (!response.ok) {
            msg.textContent = result.message || translations[lang]['error_purchase'];
            return;
        }

        msg.style.color = "#4caf50";
        msg.innerHTML = `${translations[lang]['success_purchase']} <b>${karId}</b><br>${translations[lang]['success_instruction']}`;
        document.getElementById('buy-form').reset();

    } catch (error) {
        console.error('Błąd zakupu:', error);
        msg.textContent = translations[lang]['error_server'];
    }
};

window.onload = function () {
    renderKarnetInfo();
    fillUserData();
};

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