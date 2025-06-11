document.addEventListener('DOMContentLoaded', async function () {
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

    try {
        const response = await fetch('http://localhost:5017/api/memberships');
        const memberships = await response.json();

        const offerCards = document.querySelector('.offer-cards');
        offerCards.innerHTML = memberships.map((kar, index) => `
                <div class="card animate-slideup" style="animation-delay:${0.1 * index}s;">
                    <h2>${kar.name}</h2>
                    <p>${kar.description}</p>
                    <div class="price">${kar.price}</div>
                    ${kar.bonus ? `<div class="bonus">${kar.bonus}</div>` : ''}
                    <button class="btn-offer" onclick="window.location.href='karnet.html?kar=kar${kar.id}'">Zobacz więcej</button>
                </div>
            `).join('');

        const compareTable = document.querySelector('.compare-table tbody');
        compareTable.innerHTML = memberships.map(kar => {
            const features = JSON.parse(kar.features || '[]');
            const hasSauna = features.includes('Sauna') ? '✓' : '✗';
            const hasGroupClasses = features.some(f => f.includes('strefy') || f.includes('grupowe')) ? '✓' : '✗';
            const hasConsultations = features.includes('Konsultacje') || features.includes('Konsultacja z trenerem') ? '✓' : '✗';
            return `
                    <tr>
                        <td>${kar.name}</td>
                        <td>${kar.hours}</td>
                        <td>${hasSauna}</td>
                        <td>${hasGroupClasses}</td>
                        <td>${hasConsultations}</td>
                    </tr>
                `;
        }).join('');
        document.querySelectorAll('.animate-slideup').forEach(function (el, i) {
            el.style.animationDelay = (0.1 * i) + 's';
        });

        document.querySelectorAll('.faq-item').forEach(function (item) {
            item.addEventListener('click', function () {
                this.classList.toggle('open');
            });
        });

        document.querySelectorAll('.animate-fadein').forEach(function (el, i) {
            el.style.animationDelay = (0.2 * i) + 's';
        });
        document.querySelectorAll('.animate-zoom').forEach(function (el, i) {
            el.style.animationDelay = (0.15 * i) + 's';
        });

    
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        alert('Nie udało się załadować danych karnetów. Spróbuj ponownie później.');
    }
});