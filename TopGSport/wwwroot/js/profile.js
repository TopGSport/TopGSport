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

    const userId = sessionStorage.getItem('currentUserId');
    if (!userId) {
        window.location.href = "login.html";
        return;
    }

    async function renderProfile() {
        try {
            const response = await fetch(`http://localhost:5017/api/users/${userId}`);
            if (!response.ok) throw new Error('Użytkownik nie znaleziony');
            const user = await response.json();

            document.getElementById('profile-info').innerHTML = `
                <b>Imię i nazwisko:</b> ${user.name}<br>
                <b>Email:</b> ${user.email}<br>
                <b>Telefon:</b> ${user.phone}
                ${user.membership ? `<br><b>Karnet:</b> ${user.membership.name} (${user.membership.price})` : ''}
            `;

            let history = "";
            if (user.membership && user.membershipId) {
                history = `
                    <div class="purchase-item">
                        <b>${user.membership.name}</b> (${user.membership.price})<br>
                        ${user.membershipPurchaseDate ? `Data zakupu: ${new Date(user.membershipPurchaseDate).toLocaleString()}<br>` : ""}
                        ${user.membershipStartDate ? `Data startu: ${new Date(user.membershipStartDate).toLocaleString()}<br>` : ""}
                        ${user.options ? `Opcje: ${user.options}<br>` : ""}
                        Numer karnetu: <b>KAR${user.membershipId}-${user.id}</b>
                    </div>
                `;
            } else {
                history = "<i>Brak zakupionych karnetów.</i>";
            }
            document.getElementById('purchase-history').innerHTML = history;

            document.getElementById('edit-name').value = user.name;
            document.getElementById('edit-email').value = user.email;
            document.getElementById('edit-phone').value = user.phone;
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            document.getElementById('profile-info').innerHTML = "<p>Błąd ładowania danych. Spróbuj ponownie później.</p>";
        }
    }

    document.getElementById('edit-btn').onclick = function () {
        document.getElementById('edit-form').style.display = "block";
        document.getElementById('edit-btn').style.display = "none";
    };

    document.getElementById('cancel-edit').onclick = function () {
        document.getElementById('edit-form').style.display = "none";
        document.getElementById('edit-btn').style.display = "inline-block";
        document.getElementById('edit-msg').textContent = "";
    };

    document.getElementById('edit-form').onsubmit = async function (e) {
        e.preventDefault();
        const name = document.getElementById('edit-name').value.trim();
        const email = document.getElementById('edit-email').value.trim().toLowerCase();
        const phone = document.getElementById('edit-phone').value.trim();
        const msg = document.getElementById('edit-msg');

        if (!name || !email || !phone) {
            msg.textContent = "Wypełnij wszystkie pola!";
            msg.style.color = "#e63946";
            return;
        }

        try {
            const response = await fetch(`http://localhost:5017/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone })
            });
            const result = await response.json();

            if (!response.ok) {
                msg.textContent = result.message || "Błąd zapisu danych";
                msg.style.color = "#e63946";
                return;
            }

            msg.style.color = "#4caf50";
            msg.textContent = "Dane zapisane!";
            setTimeout(() => {
                document.getElementById('edit-form').style.display = "none";
                document.getElementById('edit-btn').style.display = "inline-block";
                renderProfile();
            }, 1000);
        } catch (error) {
            console.error('Błąd zapisu danych:', error);
            msg.textContent = "Błąd serwera. Spróbuj ponownie później.";
            msg.style.color = "#e63946";
        }
    };

    await renderProfile();
});