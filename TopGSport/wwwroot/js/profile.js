const translations = {
    pl: {
        title: "Profil | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        profile_title: "Twój profil",
        edit_btn: "Edytuj dane",
        save_btn: "Zapisz zmiany",
        cancel_btn: "Anuluj",
        purchase_history_title: "Historia zakupów",
        form_name: "Imię i nazwisko",
        form_email: "Email",
        form_phone: "Telefon",
        profile_name: "Imię i nazwisko:",
        profile_email: "Email:",
        profile_phone: "Telefon:",
        profile_membership: "Karnet:",
        purchase_date: "Data zakupu:",
        start_date: "Data startu:",
        options: "Opcje:",
        membership_number: "Numer karnetu:",
        no_memberships: "Brak zakupionych karnetów.",
        error_fill_fields: "Wypełnij wszystkie pola!",
        error_save_data: "Błąd zapisu danych",
        error_server: "Błąd serwera. Spróbuj ponownie później.",
        error_loading: "Błąd ładowania danych. Spróbuj ponownie później.",
        error_user_not_found: "Użytkownik nie znaleziony",
        success_save: "Dane zapisane!"
    },
    en: {
        title: "Profile | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        profile_title: "Your profile",
        edit_btn: "Edit data",
        save_btn: "Save changes",
        cancel_btn: "Cancel",
        purchase_history_title: "Purchase history",
        form_name: "Full name",
        form_email: "Email",
        form_phone: "Phone",
        profile_name: "Full name:",
        profile_email: "Email:",
        profile_phone: "Phone:",
        profile_membership: "Membership:",
        purchase_date: "Purchase date:",
        start_date: "Start date:",
        options: "Options:",
        membership_number: "Membership number:",
        no_memberships: "No purchased memberships.",
        error_fill_fields: "Fill in all fields!",
        error_save_data: "Error saving data",
        error_server: "Server error. Please try again later.",
        error_loading: "Error loading data. Please try again later.",
        error_user_not_found: "User not found",
        success_save: "Data saved!"
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

document.addEventListener('DOMContentLoaded', async function () {
    const lang = localStorage.getItem('lang') || 'pl';
    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.value = lang;
    setLanguage(lang);

    if (switcher) {
        switcher.addEventListener('change', function () {
            setLanguage(this.value);
            renderProfile();
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

    const userId = sessionStorage.getItem('currentUserId');
    if (!userId) {
        window.location.href = "login.html";
        return;
    }

    async function renderProfile() {
        const lang = localStorage.getItem('lang') || 'pl';

        try {
            const response = await fetch(`http://localhost:5017/api/users/${userId}`);
            if (!response.ok) throw new Error(translations[lang]['error_user_not_found']);
            const user = await response.json();

            document.getElementById('profile-info').innerHTML = `
                <b>${translations[lang]['profile_name']}</b> ${user.name}<br>
                <b>${translations[lang]['profile_email']}</b> ${user.email}<br>
                <b>${translations[lang]['profile_phone']}</b> ${user.phone}
                ${user.membership ? `<br><b>${translations[lang]['profile_membership']}</b> ${user.membership.name} (${user.membership.price})` : ''}
            `;

            let history = "";
            if (user.membership && user.membershipId) {
                history = `
                    <div class="purchase-item">
                        <b>${user.membership.name}</b> (${user.membership.price})<br>
                        ${user.membershipPurchaseDate ? `${translations[lang]['purchase_date']} ${new Date(user.membershipPurchaseDate).toLocaleString()}<br>` : ""}
                        ${user.membershipStartDate ? `${translations[lang]['start_date']} ${new Date(user.membershipStartDate).toLocaleString()}<br>` : ""}
                        ${user.options ? `${translations[lang]['options']} ${user.options}<br>` : ""}
                        ${translations[lang]['membership_number']} <b>KAR${user.membershipId}-${user.id}</b>
                    </div>
                `;
            } else {
                history = `<i>${translations[lang]['no_memberships']}</i>`;
            }
            document.getElementById('purchase-history').innerHTML = history;

            document.getElementById('edit-name').value = user.name;
            document.getElementById('edit-email').value = user.email;
            document.getElementById('edit-phone').value = user.phone;
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            document.getElementById('profile-info').innerHTML = `<p>${translations[lang]['error_loading']}</p>`;
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
        const lang = localStorage.getItem('lang') || 'pl'; 

        if (!name || !email || !phone) {
            msg.textContent = translations[lang]['error_fill_fields'];
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
                msg.textContent = result.message || translations[lang]['error_save_data'];
                msg.style.color = "#e63946";
                return;
            }

            msg.style.color = "#4caf50";
            msg.textContent = translations[lang]['success_save'];
            setTimeout(() => {
                document.getElementById('edit-form').style.display = "none";
                document.getElementById('edit-btn').style.display = "inline-block";
                renderProfile();
            }, 1000);
        } catch (error) {
            console.error('Błąd zapisu danych:', error);
            msg.textContent = translations[lang]['error_server'];
            msg.style.color = "#e63946";
        }
    };

    await renderProfile();
});