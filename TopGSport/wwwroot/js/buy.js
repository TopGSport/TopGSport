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

function getCurrentUser() {
    return sessionStorage.getItem('currentUser');
}
function getUsers() {
    return JSON.parse(sessionStorage.getItem('users') || '[]');
}
function setUsers(users) {
    sessionStorage.setItem('users', JSON.stringify(users));
}
function getUserByEmail(email) {
    return getUsers().find(u => u.email === email);
}
function setCurrentUser(email) {
    sessionStorage.setItem('currentUser', email);
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
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-phone').value = user.phone;
    }
}

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