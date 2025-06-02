const translations = {
    pl: {
        title: "Karnet | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        contact_title: "Kontakt",
        phone: "Telefon:",
        email: "Email:",
        address: "Adres:",
        buy_btn: "Kup teraz",
        features_title: "Funkcje",
        hours_title: "Godziny dostępu",
        compare_title: "Porównanie karnetów",
        th_pass: "Karnet",
        th_access: "Dostępność",
        th_sauna: "Sauna",
        th_group: "Zajęcia grupowe",
        th_consult: "Konsultacje",
        reviews_title: "Opinie klientów",
        calc_title: "Kalkulator oszczędności",
        calc_label: "Trenujesz ile razy w miesiącu?",
        calc_btn: "Oblicz",
        calc_save: "Oszczędzasz {save} zł miesięcznie!",
        calc_better: "Przy tej ilości treningów lepiej wybrać wejścia jednorazowe.",
        calendar_title: "Kalendarz zajęć",
        calendar_day: "Dzień",
        calendar_classes: "Zajęcia",
        trainers_title: "Nasi trenerzy",
        footer: "Top G Sport &copy; 2025"
    },
    en: {
        title: "Pass | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        contact_title: "Contact",
        phone: "Phone:",
        email: "Email:",
        address: "Address:",
        buy_btn: "Buy now",
        features_title: "Features",
        hours_title: "Access hours",
        compare_title: "Pass Comparison",
        th_pass: "Pass",
        th_access: "Access",
        th_sauna: "Sauna",
        th_group: "Group classes",
        th_consult: "Consultations",
        reviews_title: "Customer reviews",
        calc_title: "Savings calculator",
        calc_label: "How many times do you train per month?",
        calc_btn: "Calculate",
        calc_save: "You save {save} PLN per month!",
        calc_better: "With this frequency, single entries are better.",
        calendar_title: "Class schedule",
        calendar_day: "Day",
        calendar_classes: "Classes",
        trainers_title: "Our trainers",
        footer: "Top G Sport &copy; 2025"
    }
};

const karnety = {
    kar1: {
        name: { pl: "Nocny Karnet", en: "Night Pass" },
        price: { pl: "59 zł / miesiąc", en: "59 PLN / month" },
        description: { pl: "Dostęp od 22:00 do 6:00. Idealny dla nocnych marków!", en: "Access from 10 PM to 6 AM. Perfect for night owls!" },
        bonus: { pl: "Pierwszy tydzień gratis!", en: "First week free!" },
        hours: "22:00 - 6:00",
        features: {
            pl: ["Dostęp do siłowni w godzinach nocnych", "Szafka na okres treningu", "Dostęp do pryszniców"],
            en: ["Night gym access", "Locker during training", "Showers access"]
        },
        img: "/images/sigma.jpg"
    },
    kar2: {
        name: { pl: "Tygodniowy Karnet", en: "Weekly Pass" },
        price: { pl: "39 zł / tydzień", en: "39 PLN / week" },
        description: { pl: "Pełny dostęp przez 7 dni. Świetny na start lub dla gości.", en: "Full access for 7 days. Great for a start or for guests." },
        bonus: { pl: "", en: "" },
        hours: "6:00 - 22:00",
        features: {
            pl: ["7 dni pełnego dostępu", "Wszystkie strefy", "Szafka na okres treningu"],
            en: ["7 days full access", "All zones", "Locker during training"]
        },
        img: "/images/sigma.jpg"
    },
    kar3: {
        name: { pl: "24/7 Karnet", en: "24/7 Pass" },
        price: { pl: "99 zł / miesiąc", en: "99 PLN / month" },
        description: { pl: "Nielimitowany dostęp do siłowni przez całą dobę!", en: "Unlimited access to the gym 24/7!" },
        bonus: { pl: "Darmowa konsultacja z trenerem!", en: "Free consultation with a trainer!" },
        hours: "24/7",
        features: {
            pl: ["Nielimitowany dostęp", "Wszystkie strefy", "Konsultacja z trenerem"],
            en: ["Unlimited access", "All zones", "Consultation with trainer"]
        },
        img: "/images/sigma.jpg"
    },
    kar4: {
        name: { pl: "Miesięczny Karnet", en: "Monthly Pass" },
        price: { pl: "89 zł / miesiąc", en: "89 PLN / month" },
        description: { pl: "Pełny dostęp do wszystkich stref przez 30 dni.", en: "Full access to all zones for 30 days." },
        bonus: { pl: "", en: "" },
        hours: "6:00 - 22:00",
        features: {
            pl: ["30 dni pełnego dostępu", "Wszystkie strefy", "Szafka na okres treningu"],
            en: ["30 days full access", "All zones", "Locker during training"]
        },
        img: "/images/sigma.jpg"
    },
    kar5: {
        name: { pl: "Studencki Karnet", en: "Student Pass" },
        price: { pl: "69 zł / miesiąc", en: "69 PLN / month" },
        description: { pl: "Dla uczniów i studentów do 26 lat. Wymagana legitymacja.", en: "For students up to 26 years old. Student ID required." },
        bonus: { pl: "", en: "" },
        hours: "6:00 - 22:00",
        features: {
            pl: ["Dla uczniów i studentów", "Wszystkie strefy", "Szafka na okres treningu"],
            en: ["For students", "All zones", "Locker during training"]
        },
        img: "/images/sigma.jpg"
    },
    kar6: {
        name: { pl: "VIP Karnet", en: "VIP Pass" },
        price: { pl: "159 zł / miesiąc", en: "159 PLN / month" },
        description: { pl: "Wszystko bez limitu + sauna, konsultacje, priorytetowa obsługa.", en: "All unlimited + sauna, consultations, priority service." },
        bonus: { pl: "Darmowy zestaw startowy!", en: "Free starter pack!" },
        hours: "24/7",
        features: {
            pl: ["Nielimitowany dostęp", "Sauna", "Konsultacje", "Priorytetowa obsługa"],
            en: ["Unlimited access", "Sauna", "Consultations", "Priority service"]
        },
        img: "/images/sigma.jpg"
    },
    kar7: {
        name: { pl: "Rodzinny Karnet", en: "Family Pass" },
        price: { pl: "199 zł / miesiąc", en: "199 PLN / month" },
        description: { pl: "Dla 2 dorosłych + dzieci do 16 lat. Trenujcie razem!", en: "For 2 adults + children up to 16 years. Train together!" },
        bonus: { pl: "", en: "" },
        hours: "6:00 - 22:00",
        features: {
            pl: ["Dla rodzin", "Wszystkie strefy", "Strefa dla dzieci"],
            en: ["For families", "All zones", "Kids zone"]
        },
        img: "/images/sigma.jpg"
    },
    kar8: {
        name: { pl: "Wejście Jednorazowe", en: "Single Entry" },
        price: { pl: "15 zł / wejście", en: "15 PLN / entry" },
        description: { pl: "Jednorazowy wstęp do siłowni. Bez zobowiązań.", en: "One-time gym entry. No obligations." },
        bonus: { pl: "", en: "" },
        hours: "6:00 - 22:00",
        features: {
            pl: ["Jednorazowy dostęp", "Wszystkie strefy"],
            en: ["Single entry", "All zones"]
        },
        img: "/images/sigma.jpg"
    }
};

const compareTable = [
    { name: { pl: "Nocny", en: "Night" }, hours: "22:00-6:00", sauna: "✗", grupowe: "✓", konsultacje: "✗" },
    { name: { pl: "Tygodniowy", en: "Weekly" }, hours: "6:00-22:00", sauna: "✗", grupowe: "✓", konsultacje: "✗" },
    { name: { pl: "24/7", en: "24/7" }, hours: "24h", sauna: "✓", grupowe: "✓", konsultacje: "✓" },
    { name: { pl: "Miesięczny", en: "Monthly" }, hours: "6:00-22:00", sauna: "✓", grupowe: "✓", konsultacje: "✗" },
    { name: { pl: "Studencki", en: "Student" }, hours: "6:00-22:00", sauna: "✗", grupowe: "✓", konsultacje: "✗" },
    { name: { pl: "VIP", en: "VIP" }, hours: "24h", sauna: "✓", grupowe: "✓", konsultacje: "✓" },
    { name: { pl: "Rodzinny", en: "Family" }, hours: "6:00-22:00", sauna: "✓", grupowe: "✓", konsultacje: "✗" },
    { name: { pl: "Jednorazowe", en: "Single" }, hours: "6:00-22:00", sauna: "✗", grupowe: "✗", konsultacje: "✗" }
];

const reviews = [
    { text: { pl: "Super siłownia, świetna atmosfera i sprzęt!", en: "Great gym, awesome atmosphere and equipment!" }, author: "Marek" },
    { text: { pl: "Karnet VIP to był strzał w dziesiątkę. Polecam!", en: "VIP pass was a great choice. I recommend!" }, author: "Anna" },
    { text: { pl: "Dzięki nocnemu karnetowi mogę trenować po pracy.", en: "Thanks to the night pass I can train after work." }, author: "Kuba" }
];

const trainers = [
    { name: "Anna Nowak", desc: { pl: "Trener personalny, specjalistka od fitnessu", en: "Personal trainer, fitness specialist" }, img: "img123.jpg" },
    { name: "Jan Kowalski", desc: { pl: "Instruktor siłowni, motywator", en: "Gym instructor, motivator" }, img: "img123.jpg" }
];

const calendar = [
    { day: { pl: "Poniedziałek", en: "Monday" }, zajecia: { pl: "Crossfit 18:00, Yoga 20:00", en: "Crossfit 18:00, Yoga 20:00" } },
    { day: { pl: "Wtorek", en: "Tuesday" }, zajecia: { pl: "HIIT 17:00, Zumba 19:00", en: "HIIT 17:00, Zumba 19:00" } },
    { day: { pl: "Środa", en: "Wednesday" }, zajecia: { pl: "Pilates 18:00, Boks 20:00", en: "Pilates 18:00, Boxing 20:00" } },
    { day: { pl: "Czwartek", en: "Thursday" }, zajecia: { pl: "Crossfit 18:00, Stretching 20:00", en: "Crossfit 18:00, Stretching 20:00" } },
    { day: { pl: "Piątek", en: "Friday" }, zajecia: { pl: "HIIT 17:00, Zumba 19:00", en: "HIIT 17:00, Zumba 19:00" } }
];

function getLang() {
    return localStorage.getItem('lang') || 'pl';
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const t = translations[lang];
    document.title = t.title;

    // Menu, footer, contact
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

    renderKarnet();
}

function getKarnetFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('kar') || 'kar1';
}

function renderKarnet() {
    const lang = getLang();
    const t = translations[lang];
    const karKey = getKarnetFromUrl();
    const kar = karnety[karKey] || karnety.kar1;

    // Hero
    document.getElementById('karnet-hero').innerHTML = `
        <img src="${kar.img}" alt="${kar.name[lang]}">
        <h1>${kar.name[lang]}</h1>
        <div class="price">${kar.price[lang]}</div>
        ${kar.bonus[lang] ? `<div class="bonus">${kar.bonus[lang]}</div>` : ""}
        <p>${kar.description[lang]}</p>
        <a href="buy.html?kar=${karKey}" class="kup-btn">${t.buy_btn}</a>
    `;

    // Features
    document.getElementById('karnet-features').innerHTML = `
        <table>
            <tr><th>${t.hours_title}</th><td>${kar.hours}</td></tr>
            <tr><th>${t.features_title}</th><td>${kar.features[lang].join(", ")}</td></tr>
        </table>
    `;

    // Compare
    let compareRows = compareTable.map(row => `
        <tr>
            <td>${row.name[lang]}</td>
            <td>${row.hours}</td>
            <td>${row.sauna}</td>
            <td>${row.grupowe}</td>
            <td>${row.konsultacje}</td>
        </tr>
    `).join("");
    document.getElementById('karnet-compare').innerHTML = `
        <h2>${t.compare_title}</h2>
        <table>
            <tr>
                <th>${t.th_pass}</th>
                <th>${t.th_access}</th>
                <th>${t.th_sauna}</th>
                <th>${t.th_group}</th>
                <th>${t.th_consult}</th>
            </tr>
            ${compareRows}
        </table>
    `;

    // Reviews
    let reviewHtml = reviews.map(r => `
        <div class="review-item">
            <div>${r.text[lang]}</div>
            <div class="review-author">${r.author}</div>
        </div>
    `).join("");
    document.getElementById('karnet-reviews').innerHTML = `
        <h2>${t.reviews_title}</h2>
        ${reviewHtml}
    `;

    // Calc
    document.getElementById('karnet-calc').innerHTML = `
        <h2>${t.calc_title}</h2>
        <div>
            <label>${t.calc_label} <input type="number" id="trains" value="12" min="1" max="60"></label>
            <button id="calc-btn">${t.calc_btn}</button>
        </div>
        <div id="calc-result"></div>
    `;

    // Calendar
    let calHtml = calendar.map(c => `<tr><td>${c.day[lang]}</td><td>${c.zajecia[lang]}</td></tr>`).join("");
    document.getElementById('karnet-calendar').innerHTML = `
        <h2>${t.calendar_title}</h2>
        <table>
            <tr><th>${t.calendar_day}</th><th>${t.calendar_classes}</th></tr>
            ${calHtml}
        </table>
    `;

    // Trainers
    let trainersHtml = trainers.map(tr => `
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">
            <img src="${tr.img}" alt="${tr.name}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;">
            <div>
                <b>${tr.name}</b><br>
                <span style="font-size:0.95em;">${tr.desc[lang]}</span>
            </div>
        </div>
    `).join("");
    document.getElementById('karnet-trainers').innerHTML = `
        <h2>${t.trainers_title}</h2>
        ${trainersHtml}
    `;

    // Анімації (fade-in)
    document.querySelectorAll('.animate-fadein, .animate-slideup').forEach((el, i) => {
        el.style.opacity = 0;
        setTimeout(() => {
            el.style.opacity = 1;
        }, 200 + i * 200);
    });

    // Калькулятор
    setTimeout(() => {
        const btn = document.getElementById('calc-btn');
        if (btn) {
            btn.onclick = function () {
                const trains = parseInt(document.getElementById('trains').value) || 0;
                let singlePrice = 15;
                let abonament = parseInt(kar.price[lang]) || 0;
                let save = trains * singlePrice - abonament;
                let msg = save > 0
                    ? t.calc_save.replace('{save}', save)
                    : t.calc_better;
                document.getElementById('calc-result').innerText = msg;
            }
        }
    }, 500);
}

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