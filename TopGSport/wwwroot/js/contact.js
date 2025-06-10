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

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.animate-fadein').forEach(function(el, i) {
        el.style.animationDelay = (0.2 * i) + 's';
    });

    const form = document.getElementById('contactForm');
    const msg = document.getElementById('formMessage');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        msg.textContent = "Wiadomość została wysłana! Dziękujemy za kontakt.";
        msg.style.color = "#e63946";
        form.reset();
        setTimeout(() => { msg.textContent = ""; }, 4000);
    });
});