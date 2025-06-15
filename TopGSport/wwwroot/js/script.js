document.addEventListener("DOMContentLoaded", function () {

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

    const testimonials = document.querySelectorAll('.testimonial-item');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(testimonials).indexOf(entry.target);
                entry.target.style.opacity = 1; // Показати елемент
                entry.target.style.transform = 'translateY(0)'; 
                if (index % 2 === 0) {
                    entry.target.classList.add('left');
                } else {
                    entry.target.classList.add('right');
                }
                observer.unobserve(entry.target); 
            }
        });
    }, options);

    testimonials.forEach(testimonial => {
        observer.observe(testimonial);
    });
});
document.getElementById('customChatIcon').addEventListener('click', function () {
    document.getElementById('customChatWindow').classList.add('active');
});
// Закрити чат по кліку на хрестик
document.getElementById('closeChatBtn').addEventListener('click', function () {
    document.getElementById('customChatWindow').classList.remove('active');
});
document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById('customChatIcon');
    const chatWindow = document.getElementById('customChatWindow');
    const closeBtn = document.getElementById('closeChatBtn');

    if (chatIcon && chatWindow && closeBtn) {
        chatIcon.addEventListener('click', function() {
            chatWindow.classList.add('active');
        });
        closeBtn.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });
    }

    // Слухаємо події від Voiceflow
    window.addEventListener('message', function(event) {
        // Voiceflow надсилає подію з type: 'vf-close'
        if (event.data && event.data.type === 'vf-close') {
            chatWindow.classList.remove('active');
        }
    });
});