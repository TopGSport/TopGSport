const translations = {
    pl: {
        title: "Kup Karnet | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
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
        fill_all: "Wypełnij wszystkie pola!",
        user_error: "Błąd użytkownika!",
        buy_success: "Zakup udany! Numer karnetu: <b>{num}</b><br>Instrukcja: Przyjdź do recepcji z tym numerem i dokumentem tożsamości.",
        karnety: {
            kar1: {
                name: "Nocny Karnet",
                price: "59 zł / miesiąc",
                description: "Dostęp od 22:00 do 6:00. Idealny dla nocnych marków!",
                img: "karnet.jpg"
            },
            kar2: {
                name: "Tygodniowy Karnet",
                price: "39 zł / tydzień",
                description: "Pełny dostęp przez 7 dni. Świetny na start lub dla gości.",
                img: "karnet.jpg"
            },
            kar3: {
                name: "24/7 Karnet",
                price: "99 zł / miesiąc",
                description: "Nielimitowany dostęp do siłowni przez całą dobę!",
                img: "karnet.jpg"
            },
            kar4: {
                name: "Miesięczny Karnet",
                price: "89 zł / miesiąc",
                description: "Pełny dostęp do wszystkich stref przez 30 dni.",
                img: "karnet.jpg"
            },
            kar5: {
                name: "Studencki Karnet",
                price: "69 zł / miesiąc",
                description: "Dla uczniów i studentów do 26 lat. Wymagana legitymacja.",
                img: "karnet.jpg"
            },
            kar6: {
                name: "VIP Karnet",
                price: "159 zł / miesiąc",
                description: "Wszystko bez limitu + sauna, konsultacje, priorytetowa obsługa.",
                img: "karnet.jpg"
            },
            kar7: {
                name: "Rodzinny Karnet",
                price: "199 zł / miesiąc",
                description: "Dla 2 dorosłych + dzieci do 16 lat. Trenujcie razem!",
                img: "karnet.jpg"
            },
            kar8: {
                name: "Wejście Jednorazowe",
                price: "15 zł / wejście",
                description: "Jednorazowy wstęp do siłowni. Bez zobowiązań.",
                img: "karnet.jpg"
            }
        }
    },
    en: {
        title: "Buy Pass | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        buy_title: "Buy Pass",
        start_label: "Start date:",
        opt_trener: "Personal trainer",
        opt_towel: "Towel",
        opt_locker: "Locker",
        contact_data: "Contact details",
        ph_name: "Full name",
        ph_email: "Email",
        ph_phone: "Phone",
        buy_btn: "Buy now",
        fill_all: "Please fill in all fields!",
        user_error: "User error!",
        buy_success: "Purchase successful! Pass number: <b>{num}</b><br>Instruction: Come to the reception with this number and your ID.",
        karnety: {
            kar1: {
                name: "Night Pass",
                price: "59 PLN / month",
                description: "Access from 10 PM to 6 AM. Perfect for night owls!",
                img: "karnet.jpg"
            },
            kar2: {
                name: "Weekly Pass",
                price: "39 PLN / week",
                description: "Full access for 7 days. Great for a start or for guests.",
                img: "karnet.jpg"
            },
            kar3: {
                name: "24/7 Pass",
                price: "99 PLN / month",
                description: "Unlimited access to the gym 24/7!",
                img: "karnet.jpg"
            },
            kar4: {
                name: "Monthly Pass",
                price: "89 PLN / month",
                description: "Full access to all zones for 30 days.",
                img: "karnet.jpg"
            },
            kar5: {
                name: "Student Pass",
                price: "69 PLN / month",
                description: "For students up to 26 years old. Student ID required.",
                img: "karnet.jpg"
            },
            kar6: {
                name: "VIP Pass",
                price: "159 PLN / month",
                description: "All unlimited + sauna, consultations, priority service.",
                img: "karnet.jpg"
            },
            kar7: {
                name: "Family Pass",
                price: "199 PLN / month",
                description: "For 2 adults + children up to 16 years. Train together!",
                img: "karnet.jpg"
            },
            kar8: {
                name: "Single Entry",
                price: "15 PLN / entry",
                description: "One-time gym entry. No obligations.",
                img: "karnet.jpg"
            }
        }
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

    // Placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (t[key]) el.placeholder = t[key];
    });

    renderKarnetInfo();
    fillUserData();
}

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

function getKarnetFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('kar') || 'kar1';
}

function fillUserData() {
    const user = getUserByEmail(getCurrentUser());
    if (user) {
        document.getElementById('user-name').value = user.name || "";
        document.getElementById('user-email').value = user.email || "";
        document.getElementById('user-phone').value = user.phone || "";
    }
}

function renderKarnetInfo() {
    const lang = getLang();
    const t = translations[lang];
    const karKey = getKarnetFromUrl();
    const kar = t.karnety[karKey] || t.karnety.kar1;
    document.getElementById('karnet-info').innerHTML = `
        <img src="${kar.img}" alt="${kar.name}">
        <h2>${kar.name}</h2>
        <div class="price">${kar.price}</div>
        <p>${kar.description}</p>
    `;
}

document.getElementById('buy-form').onsubmit = function (e) {
    e.preventDefault();
    const lang = getLang();
    const t = translations[lang];
    const karKey = getKarnetFromUrl();
    const kar = t.karnety[karKey] || t.karnety.kar1;
    const startDate = document.getElementById('start-date').value;
    const optTrener = document.getElementById('opt-trener').checked;
    const optTowel = document.getElementById('opt-towel').checked;
    const optLocker = document.getElementById('opt-locker').checked;
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const msg = document.getElementById('buy-msg');
    if (!startDate || !name || !email || !phone) {
        msg.style.color = "#e63946";
        msg.textContent = t.fill_all;
        return;
    }
    const users = getUsers();
    const user = users.find(u => u.email === getCurrentUser());
    if (!user) {
        msg.style.color = "#e63946";
        msg.textContent = t.user_error;
        return;
    }
    const purchase = {
        karKey,
        name: kar.name,
        price: kar.price,
        startDate,
        options: {
            trener: optTrener,
            towel: optTowel,
            locker: optLocker
        },
        date: new Date().toISOString()
    };
    user.purchases = user.purchases || [];
    user.purchases.push(purchase);
    user.name = name;
    user.email = email;
    user.phone = phone;
    setUsers(users);
    msg.style.color = "#4caf50";
    msg.innerHTML = t.buy_success.replace("{num}", `${karKey.toUpperCase()}-${user.purchases.length}`);
    document.getElementById('buy-form').reset();
    fillUserData();
};

document.addEventListener('DOMContentLoaded', function () {
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