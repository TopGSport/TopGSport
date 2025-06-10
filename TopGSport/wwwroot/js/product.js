const translations = {
    pl: {
        title: "Produkt | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Shop",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        cart_title: "Twój koszyk",
        cart_total: "Suma:",
        cart_checkout: "Oformić zamówienie",
        add_to_cart: "Dodaj do koszyka",
        error_loading: "Błąd pobierania danych.",
        product_not_found: "Produkt nie znaleziony."
    },
    en: {
        title: "Product | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        cart_title: "Your cart",
        cart_total: "Total:",
        cart_checkout: "Checkout",
        add_to_cart: "Add to cart",
        error_loading: "Error loading data.",
        product_not_found: "Product not found."
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
}

let allItems = [];

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

async function fetchShopItems() {
    try {
        const response = await fetch('http://localhost:5017/api/shop');
        allItems = await response.json();
        showProduct();
    } catch (error) {
        const lang = localStorage.getItem('lang') || 'pl';
        document.getElementById('product-container').innerHTML = `<div style="color:#e63946;padding:24px;">${translations[lang]['error_loading']}</div>`;
    }
}

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function showProduct() {
    const id = getProductIdFromUrl();
    const product = allItems.find(item => item.id == id);
    const container = document.getElementById('product-container');
    const lang = localStorage.getItem('lang') || 'pl'; 

    if (!product) {
        container.innerHTML = `<div style="color:#e63946;padding:24px;">${translations[lang]['product_not_found']}</div>`;
        return;
    }
    container.innerHTML = `
        <div class="product-card">
            <img src="/images/${product.img}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h2>${product.name}</h2>
                <div class="product-price">$${product.price}</div>
                <div class="product-desc">${product.desc || ''}</div>
                <button class="item-btn" id="add-to-cart-btn">${translations[lang]['add_to_cart']}</button>
            </div>
        </div>
    `;
    document.getElementById('add-to-cart-btn').onclick = function () {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img
        });
        openCart();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    fetchShopItems();

    const lang = localStorage.getItem('lang') || 'pl';
    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.value = lang;
    setLanguage(lang);

    if (switcher) {
        switcher.addEventListener('change', function () {
            setLanguage(this.value);
            if (allItems.length > 0) {
                showProduct();
            }
        });
    }
});