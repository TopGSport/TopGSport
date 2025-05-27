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

function renderProfile() {
    const user = getUserByEmail(getCurrentUser());
    if (!user) return;
    document.getElementById('profile-info').innerHTML = `
        <b>Imię i nazwisko:</b> ${user.name}<br>
        <b>Email:</b> ${user.email}<br>
        <b>Telefon:</b> ${user.phone}
    `;
    let history = "";
    if (user.purchases && user.purchases.length) {
        user.purchases.slice().reverse().forEach((p, i) => {
            if (p.type === "shop") {
                // Покупки з магазину
                history += `
                    <div class="purchase-item">
                        <b>Zakupy w sklepie</b><br>
                        <ul style="margin:6px 0 6px 18px;padding:0;">
                            ${p.items.map(item => `
                                <li>${item.name} <span style="color:#e63946;">x${item.qty}</span> — $${(item.price * item.qty).toFixed(2)}</li>
                            `).join('')}
                        </ul>
                        <b>Adres dostawy:</b> ${p.address}<br>
                        <b>Telefon:</b> ${p.phone}<br>
                        <span style="font-size:0.95em;">${new Date(p.date).toLocaleString()}</span>
                    </div>
                `;
            } else {
                // Абонементи (кАрнети)
                history += `
                    <div class="purchase-item">
                        <b>${p.name}</b> (${p.price})<br>
                        ${p.startDate ? `Data startu: ${p.startDate}<br>` : ""}
                        ${p.options ? `Opcje: 
                            ${p.options.trener ? "Trener, " : ""}
                            ${p.options.towel ? "Ręcznik, " : ""}
                            ${p.options.locker ? "Szafka" : ""}
                        <br>` : ""}
                        ${p.karKey ? `Numer karnetu: <b>${p.karKey.toUpperCase()}-${user.purchases.length - i}</b><br>` : ""}
                        Zakup: ${new Date(p.date).toLocaleString()}
                    </div>
                `;
            }
        });
    } else {
        history = "<i>Brak zakupionych produktów i karnetów.</i>";
    }
    document.getElementById('purchase-history').innerHTML = history;
}

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