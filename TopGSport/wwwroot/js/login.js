// Надійна робота з localStorage
function getUsers() {
    const data = localStorage.getItem('users');
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function setCurrentUser(email) {
    localStorage.setItem('currentUser', email);
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function getUserByEmail(email) {
    return getUsers().find(u => u.email === email);
}

// Анімації для форм
function showLoginForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    registerForm.style.opacity = '0';
    setTimeout(() => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        setTimeout(() => {
            loginForm.style.opacity = '1';
        }, 50);
    }, 300);
}

function showRegisterForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    loginForm.style.opacity = '0';
    setTimeout(() => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        setTimeout(() => {
            registerForm.style.opacity = '1';
        }, 50);
    }, 300);
}

// Повідомлення про успіх
function showSuccessMessage(message) {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = message;
    document.body.appendChild(successMsg);

    setTimeout(() => {
        successMsg.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            successMsg.remove();
        }, 500);
    }, 2000);
}

// Перемикання форм
document.getElementById('show-register').onclick = function(e) {
    e.preventDefault();
    showRegisterForm();
};

document.getElementById('show-login').onclick = function(e) {
    e.preventDefault();
    showLoginForm();
};

// Реєстрація
document.getElementById('register-btn').onclick = function() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const phone = document.getElementById('reg-phone').value.trim();
    const password = document.getElementById('reg-password').value;
    const msg = document.getElementById('register-msg');

    if (!name || !email || !phone || !password) {
        msg.textContent = "Wypełnij wszystkie pola!";
        msg.style.color = "#e63946";
        return;
    }

    if (getUserByEmail(email)) {
        msg.textContent = "Użytkownik z tym emailem już istnieje!";
        msg.style.color = "#e63946";
        return;
    }

    const users = getUsers();
    users.push({ name, email, phone, password, purchases: [] });
    setUsers(users);

    msg.style.color = "#4caf50";
    msg.textContent = "Rejestracja udana! Zaloguj się.";

    // Очищення полів
    document.getElementById('reg-name').value = '';
    document.getElementById('reg-phone').value = '';
    document.getElementById('reg-password').value = '';

    // Автозаповнення email для логіну
    document.getElementById('login-email').value = email;

    // Перехід на форму логіну через 1.5 сек
    setTimeout(() => {
        showLoginForm();
    }, 1500);
};

// Логін
document.getElementById('login-btn').onclick = function() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const msg = document.getElementById('login-msg');

    if (!email || !password) {
        msg.textContent = "Wypełnij wszystkie pola!";
        msg.style.color = "#e63946";
        return;
    }

    const user = getUserByEmail(email);
    if (!user || user.password !== password) {
        msg.textContent = "Nieprawidłowy email lub hasło!";
        msg.style.color = "#e63946";
        return;
    }

    setCurrentUser(email);
    msg.style.color = "#4caf50";
    msg.textContent = "Logowanie udane! Przekierowanie...";

    showSuccessMessage("Zalogowano pomyślnie!");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
};

// Додаємо плавність формам
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        #login-form, #register-form {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});