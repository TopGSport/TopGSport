const translations = {
    pl: {
        title: "Logowanie | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        login_title: "Zaloguj się",
        register_title: "Rejestracja",
        form_email: "Email",
        form_password: "Hasło",
        form_name: "Imię i nazwisko",
        form_phone: "Telefon",
        login_btn: "Zaloguj się",
        register_btn: "Zarejestruj się",
        no_account: "Nie masz konta?",
        register_link: "Zarejestruj się",
        have_account: "Masz już konto?",
        login_link: "Zaloguj się",
        login_success: "Zalogowano pomyślnie!",
        error_name_format: "Podaj imię i nazwisko (dwa słowa)",
        error_email_format: "Podaj poprawny adres email",
        error_phone_format: "Telefon musi mieć dokładnie 9 cyfr",
        error_password_format: "Hasło musi mieć min. 8 znaków, zawierać literę i cyfrę",
        error_fill_fields: "Wypełnij wszystkie pola!",
        error_registration: "Błąd rejestracji",
        error_login: "Błąd logowania",
        error_server: "Błąd serwera. Spróbuj ponownie później.",
        success_registration: "Rejestracja udana! Zaloguj się.",
        success_login: "Logowanie udane! Przekierowanie..."
    },
    en: {
        title: "Login | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        login_title: "Log in",
        register_title: "Registration",
        form_email: "Email",
        form_password: "Password",
        form_name: "Full name",
        form_phone: "Phone",
        login_btn: "Log in",
        register_btn: "Register",
        no_account: "Don't have an account?",
        register_link: "Register",
        have_account: "Already have an account?",
        login_link: "Log in",
        login_success: "Logged in successfully!",
        error_name_format: "Enter first and last name (two words)",
        error_email_format: "Enter a valid email address",
        error_phone_format: "Phone must have exactly 9 digits",
        error_password_format: "Password must have min. 8 characters, contain letter and digit",
        error_fill_fields: "Fill in all fields!",
        error_registration: "Registration error",
        error_login: "Login error",
        error_server: "Server error. Please try again later.",
        success_registration: "Registration successful! Please log in.",
        success_login: "Login successful! Redirecting..."
    }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === "A" && el.querySelector("i")) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3) node.textContent = " " + translations[lang][key];
                });
            } else if (el.tagName === "TITLE") {
                document.title = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const lang = localStorage.getItem('lang') || 'pl';
    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.value = lang;
    setLanguage(lang);

    if (switcher) {
        switcher.addEventListener('change', function () {
            setLanguage(this.value);
        });
    }

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

    function getUsers() {
        const data = sessionStorage.getItem('users');
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    function setUsers(users) {
        sessionStorage.setItem('users', JSON.stringify(users));
    }

    function setCurrentUser(email) {
        sessionStorage.setItem('currentUser', email);
    }

    function getCurrentUser() {
        return sessionStorage.getItem('currentUser');
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

    document.getElementById('show-register').onclick = function (e) {
        e.preventDefault();
        showRegisterForm();
    };

    document.getElementById('show-login').onclick = function (e) {
        e.preventDefault();
        showLoginForm();
    };

    document.getElementById('register-btn').onclick = async function () {
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim().toLowerCase();
        const phone = document.getElementById('reg-phone').value.trim();
        const password = document.getElementById('reg-password').value;
        const msg = document.getElementById('register-msg');
        const lang = localStorage.getItem('lang') || 'pl'; 

        if (!/^([A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+)\s+([A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+)$/.test(name)) {
            msg.textContent = translations[lang]['error_name_format'];
            msg.style.color = "#e63946";
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            msg.textContent = translations[lang]['error_email_format'];
            msg.style.color = "#e63946";
            return;
        }

        if (!/^\d{9}$/.test(phone)) {
            msg.textContent = translations[lang]['error_phone_format'];
            msg.style.color = "#e63946";
            return;
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(password)) {
            msg.textContent = translations[lang]['error_password_format'];
            msg.style.color = "#e63946";
            return;
        }

        if (!name || !email || !phone || !password) {
            msg.textContent = translations[lang]['error_fill_fields'];
            msg.style.color = "#e63946";
            return;
        }

        try {
            const response = await fetch('http://localhost:5017/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, password })
            });
            const result = await response.json();

            if (!response.ok) {
                msg.textContent = result.message || translations[lang]['error_registration'];
                msg.style.color = "#e63946";
                return;
            }

            msg.style.color = "#4caf50";
            msg.textContent = translations[lang]['success_registration'];

            document.getElementById('reg-name').value = '';
            document.getElementById('reg-email').value = '';
            document.getElementById('reg-phone').value = '';
            document.getElementById('reg-password').value = '';

            document.getElementById('login-email').value = email;

            setTimeout(showLoginForm, 1500);
        } catch (error) {
            console.error('Błąd rejestracji:', error);
            msg.textContent = translations[lang]['error_server'];
            msg.style.color = "#e63946";
        }
    };

    document.getElementById('login-btn').onclick = async function () {
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        const msg = document.getElementById('login-msg');
        const lang = localStorage.getItem('lang') || 'pl';

        if (!email || !password) {
            msg.textContent = translations[lang]['error_fill_fields'];
            msg.style.color = "#e63946";
            return;
        }

        try {
            const response = await fetch('http://localhost:5017/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();

            if (!response.ok) {
                msg.textContent = result.message || translations[lang]['error_login'];
                msg.style.color = "#e63946";
                return;
            }

            sessionStorage.setItem('currentUserId', result.userId);

            msg.style.color = "#4caf50";
            msg.textContent = translations[lang]['success_login'];
            showSuccessMessage(translations[lang]['login_success']);

            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } catch (error) {
            console.error('Błąd logowania:', error);
            msg.textContent = translations[lang]['error_server'];
            msg.style.color = "#e63946";
        }
    };

    const style = document.createElement('style');
    style.textContent = `
        #login-form, #register-form {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});