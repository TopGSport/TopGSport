const translations = {
    pl: {
        title: "Sklep | Top G Sport",
        home: "Główna",
        about: "O nas",
        shop: "Sklep",
        offer: "Oferta",
        contact: "Kontakt",
        login: "Zaloguj",
        profile: "Profil",
        clothes_title: "Odzież",
        supplements_title: "Suplementy",
        search_placeholder: "Szukaj produktu...",
        go_btn: "Przejdź",
        no_results: "Brak wyników.",
        footer: "Top G Sport &copy; 2025"
    },
    en: {
        title: "Shop | Top G Sport",
        home: "Home",
        about: "About us",
        shop: "Shop",
        offer: "Offer",
        contact: "Contact",
        login: "Login",
        profile: "Profile",
        clothes_title: "Clothes",
        supplements_title: "Supplements",
        search_placeholder: "Search product...",
        go_btn: "Go to",
        no_results: "No results.",
        footer: "Top G Sport &copy; 2025"
    }
};

function getLang() {
    return localStorage.getItem('lang') || 'pl';
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const t = translations[lang];

    document.title = t.title;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === "A" && el.querySelector("i")) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3) node.textContent = " " + t[key];
                });
            } else {
                el.innerHTML = t[key];
            }
        }
    });

    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) searchInput.placeholder = t.search_placeholder;

    const clothesTitle = document.querySelector('[data-i18n-section="clothes_title"]');
    if (clothesTitle) clothesTitle.innerHTML = t.clothes_title;
    const suppTitle = document.querySelector('[data-i18n-section="supplements_title"]');
    if (suppTitle) suppTitle.innerHTML = t.supplements_title;

    const footer = document.querySelector('[data-i18n-footer="footer"]');
    if (footer) footer.innerHTML = t.footer;

    renderShop();
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
        renderShop();
    } catch (error) {
        console.error("Błąd pobierania danych:", error);
    }
}

function renderList(list, containerId, filterType, search) {
    const lang = getLang();
    const t = translations[lang];
    const container = document.getElementById(containerId);
    let filtered = list.filter(item =>
        (filterType === "all" || item.type === filterType) &&
        (!search || item.name.toLowerCase().includes(search.toLowerCase()))
    );
    if (filtered.length === 0) {
        container.innerHTML = `<div style="padding:24px;color:#e63946;">${t.no_results}</div>`;
        return;
    }
    container.innerHTML = filtered.map(item => `
        <div class="shop-item">
            <img src="/images/${item.img}" alt="${item.name}">
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.price}</div>
            <a class="item-btn" href="product.html?id=${item.id}">${t.go_btn}</a>
        </div>
    `).join('');
}

function renderShop() {
    const search = document.getElementById('shop-search-input').value;
    const clothesFilter = document.getElementById('clothes-filter').value;
    const suppFilter = document.getElementById('supp-filter').value;

    const clothes = allItems.filter(item => item.category === "Clothes");
    const supplements = allItems.filter(item => item.category === "Supplements");

    renderList(clothes, "clothes-list", clothesFilter, search);
    renderList(supplements, "supplements-list", suppFilter, search);
}

document.addEventListener('DOMContentLoaded', function () {
    const lang = getLang();
    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.value = lang;
    setLanguage(lang);
    if (switcher) {
        switcher.addEventListener('change', function () {
            setLanguage(this.value);
        });
    }

    document.querySelector('h2[data-i18n-section="clothes_title"]')?.setAttribute('data-i18n-section', 'clothes_title');
    document.querySelector('h2[data-i18n-section="supplements_title"]')?.setAttribute('data-i18n-section', 'supplements_title');

    document.querySelector('span[data-i18n-footer="footer"]')?.setAttribute('data-i18n-footer', 'footer');

    document.getElementById('clothes-filter').onchange = renderShop;
    document.getElementById('supp-filter').onchange = renderShop;
    document.getElementById('shop-search-input').oninput = renderShop;
    fetchShopItems();
});