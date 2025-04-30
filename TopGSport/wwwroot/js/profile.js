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

function renderProfile() {
    const user = getUserByEmail(getCurrentUser());
    if (!user) return;
    document.getElementById('profile-info').innerHTML = `
        <b>Imię i nazwisko:</b> ${user.name}<br>
        <b>Email:</b> ${user.email}<br>
        <b>Telefon:</b> ${user.phone}
    `;
    // Історія покупок
    let history = "";
    if (user.purchases && user.purchases.length) {
        user.purchases.slice().reverse().forEach((p, i) => {
            history += `
                <div class="purchase-item">
                    <b>${p.name}</b> (${p.price})<br>
                    Data startu: ${p.startDate}<br>
                    Opcje: 
                        ${p.options.trener ? "Trener, " : ""}
                        ${p.options.towel ? "Ręcznik, " : ""}
                        ${p.options.locker ? "Szafka" : ""}
                    <br>
                    Numer karnetu: <b>${p.karKey.toUpperCase()}-${user.purchases.length - i}</b><br>
                    Zakup: ${new Date(p.date).toLocaleString()}
                </div>
            `;
        });
    } else {
        history = "<i>Brak zakupionych karnetów.</i>";
    }
    document.getElementById('purchase-history').innerHTML = history;
}

// Редагування
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