// Karnety (можеш підключити з karnet.js або дублювати тут)
const karnety = {
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
};

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

// Якщо не залогінений — редірект
if (!getCurrentUser()) {
    window.location.href = "login.html";
}

// Витягуємо карнет з URL
function getKarnetFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('kar') || 'kar1';
}

// Підтягуємо дані користувача
function fillUserData() {
    const user = getUserByEmail(getCurrentUser());
    if (user) {
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-phone').value = user.phone;
    }
}

// Відображаємо інфу про карнет
function renderKarnetInfo() {
    const karKey = getKarnetFromUrl();
    const kar = karnety[karKey] || karnety.kar1;
    document.getElementById('karnet-info').innerHTML = `
        <img src="${kar.img}" alt="${kar.name}">
        <h2>${kar.name}</h2>
        <div class="price">${kar.price}</div>
        <p>${kar.description}</p>
    `;
}

// Обробка покупки
document.getElementById('buy-form').onsubmit = function(e) {
    e.preventDefault();
    const karKey = getKarnetFromUrl();
    const kar = karnety[karKey] || karnety.kar1;
    const startDate = document.getElementById('start-date').value;
    const optTrener = document.getElementById('opt-trener').checked;
    const optTowel = document.getElementById('opt-towel').checked;
    const optLocker = document.getElementById('opt-locker').checked;
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const msg = document.getElementById('buy-msg');
    if (!startDate || !name || !email || !phone) {
        msg.textContent = "Wypełnij wszystkie pola!";
        return;
    }
    // Записуємо покупку в localStorage
    const users = getUsers();
    const user = users.find(u => u.email === getCurrentUser());
    if (!user) {
        msg.textContent = "Błąd użytkownika!";
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
    msg.innerHTML = `Zakup udany! Numer karnetu: <b>${karKey.toUpperCase()}-${user.purchases.length}</b><br>Instrukcja: Przyjdź do recepcji z tym numerem i dokumentem tożsamości.`;
    document.getElementById('buy-form').reset();
    fillUserData();
};

window.onload = function() {
    renderKarnetInfo();
    fillUserData();
};