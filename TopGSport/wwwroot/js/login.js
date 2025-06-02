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

document.getElementById('show-register').onclick = function(e) {
    e.preventDefault();
    showRegisterForm();
};

document.getElementById('show-login').onclick = function(e) {
    e.preventDefault();
    showLoginForm();
};

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

    document.getElementById('reg-name').value = '';
    document.getElementById('reg-phone').value = '';
    document.getElementById('reg-password').value = '';

    document.getElementById('login-email').value = email;

    setTimeout(() => {
        showLoginForm();
    }, 1500);
};

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

document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        #login-form, #register-form {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});
const translations = {
    pl: {
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",

        login_title: "Zaloguj się",
        login_btn: "Zaloguj się",
        register_link: "Zarejestruj się",
        no_account: "Nie masz konta?",
        have_account: "Masz już konto?",
        login_link: "Zaloguj się",
        register_title: "Rejestracja",
        register_btn: "Zarejestruj się",
        form_name: "Imię i nazwisko",
        form_email: "Email",
        form_phone: "Telefon",
        form_password: "Hasło",
        login_success: "Zalogowano pomyślnie!",
        register_success: "Rejestracja udana! Przekierowuję do logowania...",
        fill_all: "Wypełnij wszystkie pola!",
        user_exists: "Użytkownik już istnieje!",
        wrong_data: "Nieprawidłowy email lub hasło!"
    },
    en: {
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",

        login_title: "Login",
        login_btn: "Login",
        register_link: "Register",
        no_account: "Don't have an account?",
        have_account: "Already have an account?",
        login_link: "Login",
        register_title: "Register",
        register_btn: "Register",
        form_name: "Full name",
        form_email: "Email",
        form_phone: "Phone",
        form_password: "Password",
        login_success: "Logged in successfully!",
        register_success: "Registration successful! Redirecting to login...",
        fill_all: "Please fill in all fields!",
        user_exists: "User already exists!",
        wrong_data: "Wrong email or password!"
    }
};

function getLang() {
    return localStorage.getItem('lang') || 'pl';
}
function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerHTML = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });
}
document.addEventListener('DOMContentLoaded', () => {
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

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return Array.isArray(users) ? users : [];
    } catch (e) {
        return [];
    }
}
function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function setCurrentUser(email) {
    localStorage.setItem('currentUser', email);
}

document.getElementById('show-register').onclick = function (e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = "none";
    document.getElementById('register-form').style.display = "block";
};
document.getElementById('show-login').onclick = function (e) {
    e.preventDefault();
    document.getElementById('register-form').style.display = "none";
    document.getElementById('login-form').style.display = "block";
};

document.getElementById('register-btn').onclick = function () {
    const lang = getLang();
    const t = translations[lang];
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const msg = document.getElementById('register-msg');
    if (!name || !email || !phone || !password) {
        msg.style.color = "#e63946";
        msg.textContent = t.fill_all;
        return;
    }
    let users = getUsers();
    if (users.find(u => u.email === email)) {
        msg.style.color = "#e63946";
        msg.textContent = t.user_exists;
        return;
    }
    users.push({ name, email, phone, password, purchases: [] });
    setUsers(users);
    msg.style.color = "#4caf50";
    msg.textContent = t.register_success;
    setTimeout(() => {
        document.getElementById('register-form').style.display = "none";
        document.getElementById('login-form').style.display = "block";
    }, 1200);
};

document.getElementById('login-btn').onclick = function () {
    const lang = getLang();
    const t = translations[lang];
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const msg = document.getElementById('login-msg');
    if (!email || !password) {
        msg.style.color = "#e63946";
        msg.textContent = t.fill_all;
        return;
    }
    let users = getUsers();
    let user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        msg.style.color = "#e63946";
        msg.textContent = t.wrong_data;
        return;
    }
    setCurrentUser(email);
    msg.style.color = "#4caf50";
    msg.textContent = t.login_success;
    document.getElementById('success-message').style.display = "block";
    setTimeout(() => {
        window.location.href = "profile.html";
    }, 1200);
};