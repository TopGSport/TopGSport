const translations = {
    pl: {
        title: "Oformienie zamówienia | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Shop",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        order_title: "Oformienie zamówienia",
        ph_name: "Imię i nazwisko",
        ph_phone: "Telefon",
        ph_address: "Adres dostawy",
        confirm_order: "Potwierdź zamówienie",
        cart_empty: "Koszyk jest pusty.",
        total: "Suma:",
        success_order: "Dziękujemy za zamówienie!",
        footer_contact: "KONTAKT",
        footer_hours: "GODZINY<br><span class=\"footer-title-bold\">OTWARCIA</span>",
        footer_weekdays: "poniedziałek - piątek:<br><span class=\"footer-red\">6<sup>00</sup> - 22<sup>00</sup></span>",
        footer_weekend: "sobota / niedziela:<br><span class=\"footer-red\">8<sup>00</sup> - 16<sup>00</sup></span>",
        footer_menu: "MENU STRONY",
        menu_news: "Aktualności",
        menu_schedule: "Grafik",
        menu_classes: "Zajęcia grupowe",
        menu_ems: "EMS",
        menu_rules: "Regulamin",
        menu_docs: "Dokumenty",
        menu_spa: "Activ SPA Infrared"
    },
    en: {
        title: "Order Checkout | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        order_title: "Order Checkout",
        ph_name: "Full name",
        ph_phone: "Phone",
        ph_address: "Delivery address",
        confirm_order: "Confirm order",
        cart_empty: "Cart is empty.",
        total: "Total:",
        success_order: "Thank you for your order!",
        footer_contact: "CONTACT",
        footer_hours: "OPENING<br><span class=\"footer-title-bold\">HOURS</span>",
        footer_weekdays: "monday - friday:<br><span class=\"footer-red\">6<sup>00</sup> - 22<sup>00</sup></span>",
        footer_weekend: "saturday / sunday:<br><span class=\"footer-red\">8<sup>00</sup> - 16<sup>00</sup></span>",
        footer_menu: "SITE MENU",
        menu_news: "News",
        menu_schedule: "Schedule",
        menu_classes: "Group Classes",
        menu_ems: "EMS",
        menu_rules: "Rules",
        menu_docs: "Documents",
        menu_spa: "Activ SPA Infrared"
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

function getCurrentUser() {
    return sessionStorage.getItem('currentUser');
}
function getUsers() {
    return JSON.parse(sessionStorage.getItem('users') || '[]');
}
function setUsers(users) {
    sessionStorage.setItem('users', JSON.stringify(users));
}
function getCartKey() {
    const user = getCurrentUser();
    return user ? `cart_${user}` : 'cart_guest';
}
function getCart() {
    return JSON.parse(sessionStorage.getItem(getCartKey()) || '[]');
}
function setCart(cart) {
    sessionStorage.setItem(getCartKey(), JSON.stringify(cart));
}
function clearCart() {
    setCart([]);
}

function renderBuyProd() {
    const cart = getCart();
    const list = document.getElementById('buyprod-list');
    const lang = localStorage.getItem('lang') || 'pl';

    if (!cart.length) {
        list.innerHTML = `<div style="color:#e63946;">${translations[lang]['cart_empty']}</div>`;
        document.getElementById('buyprod-form').style.display = 'none';
        return;
    }
    let total = 0;
    list.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div>
                <b>${item.name}</b> x ${item.qty} — $${(item.price * item.qty).toFixed(2)}
            </div>
        `;
    }).join('') + `<div style="margin-top:12px;font-weight:bold;">${translations[lang]['total']} $${total.toFixed(2)}</div>`; // ✅ ИЗМЕНЕНО: Используем переведенное слово "Suma"
}

document.getElementById('buyprod-form').onsubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('order-name').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const address = document.getElementById('order-address').value.trim();
    const cart = getCart();
    const lang = localStorage.getItem('lang') || 'pl'; 

    if (!name || !phone || !address || !cart.length) return;

    let users = getUsers();
    let user = users.find(u => u.email === getCurrentUser());
    if (!user) return;
    if (!user.purchases) user.purchases = [];
    user.purchases.push({
        type: "shop",
        items: cart,
        name,
        phone,
        address,
        date: new Date().toISOString()
    });
    setUsers(users);
    clearCart();

    document.getElementById('buyprod-msg').innerHTML = `<span style="color:#4caf50;">${translations[lang]['success_order']}</span>`;
    renderBuyProd();
};

document.addEventListener('DOMContentLoaded', () => {
    renderBuyProd();

    const lang = localStorage.getItem('lang') || 'pl';
    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.value = lang;
    setLanguage(lang);

    if (switcher) {
        switcher.addEventListener('change', function () {
            setLanguage(this.value);
        });
    }
});