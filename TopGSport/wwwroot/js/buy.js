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
    return params.get('kar')?.replace('kar', '') || '1'; // Zwraca tylko ID
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
        document.getElementById('karnet-info').innerHTML = `<p>Błąd ładowania danych karnetu. Spróbuj ponownie później.</p>`;
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

    if (!startDate || !name || !email || !phone) {
        msg.textContent = "Wypełnij wszystkie pola!";
        return;
    }

    const userId = sessionStorage.getItem('currentUserId');
    if (!userId) {
        msg.textContent = "Błąd użytkownika!";
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
            msg.textContent = result.message || "Błąd zakupu!";
            return;
        }

        msg.style.color = "#4caf50";
        msg.innerHTML = `Zakup udany! Numer karnetu: <b>${result.cardNumber}</b><br>Instrukcja: Przyjdź do recepcji z tym numerem i dokumentem tożsamości.`;
        document.getElementById('buy-form').reset();

    } catch (error) {
        console.error('Błąd zakupu:', error);
        msg.textContent = "Błąd serwera. Spróbuj ponownie później.";
    }
};

window.onload = function () {
    renderKarnetInfo();
    fillUserData();
};