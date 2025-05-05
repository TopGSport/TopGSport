// Дані про всі карнети
const karnety = {
    kar1: {
        name: "Nocny Karnet",
        price: "59 zł / miesiąc",
        description: "Dostęp od 22:00 do 6:00. Idealny dla nocnych marków!",
        bonus: "Pierwszy tydzień gratis!",
        hours: "22:00 - 6:00",
        features: [
            "Dostęp do siłowni w godzinach nocnych",
            "Szafka na okres treningu",
            "Dostęp do pryszniców"
        ]
    },
    kar2: {
        name: "Tygodniowy Karnet",
        price: "39 zł / tydzień",
        description: "Pełny dostęp przez 7 dni. Świetny na start lub dla gości.",
        bonus: "",
        hours: "6:00 - 22:00",
        features: [
            "7 dni pełnego dostępu",
            "Wszystkie strefy",
            "Szafka na okres treningu"
        ]
    },
    kar3: {
        name: "24/7 Karnet",
        price: "99 zł / miesiąc",
        description: "Nielimitowany dostęp do siłowni przez całą dobę!",
        bonus: "Darmowa konsultacja z trenerem!",
        hours: "24/7",
        features: [
            "Nielimitowany dostęp",
            "Wszystkie strefy",
            "Konsultacja z trenerem"
        ]
    },
    kar4: {
        name: "Miesięczny Karnet",
        price: "89 zł / miesiąc",
        description: "Pełny dostęp до всіх стреф przez 30 dni.",
        bonus: "",
        hours: "6:00 - 22:00",
        features: [
            "30 dni pełnego dostępu",
            "Wszystkie strefy",
            "Szafka на okres treningu"
        ]
    },
    kar5: {
        name: "Studencki Karnet",
        price: "69 zł / miesiąc",
        description: "Dla uczniów i studentów do 26 lat. Wymagana legitymacja.",
        bonus: "",
        hours: "6:00 - 22:00",
        features: [
            "Dla uczniów i studentów",
            "Wszystkie strefy",
            "Szafka на okres treningu"
        ]
    },
    kar6: {
        name: "VIP Karnet",
        price: "159 zł / miesiąc",
        description: "Wszystko bez limitu + sauna, konsultacje, priorytetowa obsługa.",
        bonus: "Darmowy zestaw startowy!",
        hours: "24/7",
        features: [
            "Nielimitowany dostęp",
            "Sauna",
            "Konsultacje",
            "Priorytetowa obsługa"
        ]
    },
    kar7: {
        name: "Rodzinny Karnet",
        price: "199 zł / miesiąc",
        description: "Dla 2 dorosłych + dzieci do 16 lat. Trenujcie razem!",
        bonus: "",
        hours: "6:00 - 22:00",
        features: [
            "Dla rodzin",
            "Wszystkie strefy",
            "Strefa dla dzieci"
        ]
    },
    kar8: {
        name: "Wejście Jednorazowe",
        price: "15 zł / wejście",
        description: "Jednorazowy wstęp do siłowni. Bez zobowiązań.",
        bonus: "",
        hours: "6:00 - 22:00",
        features: [
            "Jednorazowy dostęp",
            "Wszystkie strefy"
        ]
    }
};

const compareTable = [
    {name: "Nocny", hours: "22:00-6:00", sauna: "✗", grupowe: "✓", konsultacje: "✗"},
    {name: "Tygodniowy", hours: "6:00-22:00", sauna: "✗", grupowe: "✓", konsultacje: "✗"},
    {name: "24/7", hours: "24h", sauna: "✓", grupowe: "✓", konsultacje: "✓"},
    {name: "Miesięczny", hours: "6:00-22:00", sauna: "✓", grupowe: "✓", konsultacje: "✗"},
    {name: "Studencki", hours: "6:00-22:00", sauna: "✗", grupowe: "✓", konsultacje: "✗"},
    {name: "VIP", hours: "24h", sauna: "✓", grupowe: "✓", konsultacje: "✓"},
    {name: "Rodzinny", hours: "6:00-22:00", sauna: "✓", grupowe: "✓", konsultacje: "✗"},
    {name: "Jednorazowe", hours: "6:00-22:00", sauna: "✗", grupowe: "✗", konsultacje: "✗"}
];

// Відгуки (фейкові)
const reviews = [
    {text: "Super siłownia, świetna atmosfera i sprzęt!", author: "Marek"},
    {text: "Karnet VIP to był strzał w dziesiątkę. Polecam!", author: "Anna"},
    {text: "Dzięki nocnemu karnetowi mogę trenować po pracy.", author: "Kuba"}
];

// Тренери (фейкові)
const trainers = [
    {name: "Anna Nowak", desc: "Trener personalny, specjalistka od fitnessu", img: "img123.jpg"},
    {name: "Jan Kowalski", desc: "Instruktor siłowni, motywator", img: "img123.jpg"}
];

// Календар занять (фейковий)
const calendar = [
    {day: "Poniedziałek", zajecia: "Crossfit 18:00, Yoga 20:00"},
    {day: "Wtorek", zajecia: "HIIT 17:00, Zumba 19:00"},
    {day: "Środa", zajecia: "Pilates 18:00, Boks 20:00"},
    {day: "Czwartek", zajecia: "Crossfit 18:00, Stretching 20:00"},
    {day: "Piątek", zajecia: "HIIT 17:00, Zumba 19:00"}
];

// Калькулятор економії (простий)
function renderCalc(price) {
    return `
        <h2>Kalkulator oszczędności</h2>
        <div>
            <label>Trenujesz ile razy w miesiącu? <input type="number" id="trains" value="12" min="1" max="60"></label>
            <button id="calc-btn">Oblicz</button>
        </div>
        <div id="calc-result"></div>
    `;
}

// Витягуємо параметр з URL
function getKarnetFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('kar') || 'kar1';
}

// Рендеримо все
function renderKarnet() {
    const karKey = getKarnetFromUrl();
    const kar = karnety[karKey] || karnety.kar1;

    // Hero
    document.getElementById('karnet-hero').innerHTML = `
        <img src="${kar.img}" alt="${kar.name}">
        <h1>${kar.name}</h1>
        <div class="price">${kar.price}</div>
        ${kar.bonus ? `<div class="bonus">${kar.bonus}</div>` : ""}
        <p>${kar.description}</p>
        <a href="buy.html?kar=${karKey}" class="kup-btn">Kup teraz</a>
    `;

    // Features
    document.getElementById('karnet-features').innerHTML = `
        <table>
            <tr><th>Godziny dostępu</th><td>${kar.hours}</td></tr>
            <tr><th>Funkcje</th><td>${kar.features.join(", ")}</td></tr>
        </table>
    `;

    // Compare
    let compareRows = compareTable.map(row => `
        <tr>
            <td>${row.name}</td>
            <td>${row.hours}</td>
            <td>${row.sauna}</td>
            <td>${row.grupowe}</td>
            <td>${row.konsultacje}</td>
        </tr>
    `).join("");
    document.getElementById('karnet-compare').innerHTML = `
        <h2>Porównanie karnetów</h2>
        <table>
            <tr>
                <th>Karnet</th>
                <th>Dostępność</th>
                <th>Sauna</th>
                <th>Zajęcia grupowe</th>
                <th>Konsultacje</th>
            </tr>
            ${compareRows}
        </table>
    `;

    // Reviews
    let reviewHtml = reviews.map(r => `
        <div class="review-item">
            <div>${r.text}</div>
            <div class="review-author">${r.author}</div>
        </div>
    `).join("");
    document.getElementById('karnet-reviews').innerHTML = `
        <h2>Opinie klientów</h2>
        ${reviewHtml}
    `;

    // Calc
    document.getElementById('karnet-calc').innerHTML = renderCalc(kar.price);

    // Calendar
    let calHtml = calendar.map(c => `<tr><td>${c.day}</td><td>${c.zajecia}</td></tr>`).join("");
    document.getElementById('karnet-calendar').innerHTML = `
        <h2>Kalendarz zajęć</h2>
        <table>
            <tr><th>Dzień</th><th>Zajęcia</th></tr>
            ${calHtml}
        </table>
    `;

    // Trainers
    let trainersHtml = trainers.map(t => `
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">
            <img src="${t.img}" alt="${t.name}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;">
            <div>
                <b>${t.name}</b><br>
                <span style="font-size:0.95em;">${t.desc}</span>
            </div>
        </div>
    `).join("");
    document.getElementById('karnet-trainers').innerHTML = `
        <h2>Nasi trenerzy</h2>
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
            btn.onclick = function() {
                const trains = parseInt(document.getElementById('trains').value) || 0;
                let singlePrice = 15; // ціна за разове відвідування
                let abonament = parseInt(kar.price) || 0;
                let save = trains * singlePrice - abonament;
                let msg = save > 0
                    ? `Oszczędzasz ${save} zł miesięcznie!`
                    : `Przy tej ilości treningów lepiej wybrać wejścia jednorazowe.`;
                document.getElementById('calc-result').innerText = msg;
            }
        }
    }, 500);
}

window.onload = renderKarnet;