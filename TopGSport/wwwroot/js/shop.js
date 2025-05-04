// Дані для одягу
const clothes = [
    { name: "T-shirt BossBoy", type: "tshirt", price: 25, img: "img123.jpg" },
    { name: "Szorty treningowe", type: "shorts", price: 22, img: "img123.jpg" },
    { name: "Bluza z kapturem", type: "hoodie", price: 40, img: "img123.jpg" },
    { name: "T-shirt Classic", type: "tshirt", price: 20, img: "img123.jpg" },
    { name: "Szorty Pro", type: "shorts", price: 28, img: "img123.jpg" }
];

// Дані для добавок
const supplements = [
    { name: "Kreatyna Monohydrat", type: "creatine", price: 18, img: "img123.jpg" },
    { name: "Białko WPC 80", type: "protein", price: 32, img: "img123.jpg" },
    { name: "BCAA 2:1:1", type: "bcaa", price: 15, img: "img123.jpg" },
    { name: "Kreatyna Jabłczan", type: "creatine", price: 20, img: "img123.jpg" },
    { name: "Białko Isolate", type: "protein", price: 38, img: "img123.jpg" }
];

// Рендер товарів
function renderList(list, containerId, filterType, search) {
    const container = document.getElementById(containerId);
    let filtered = list.filter(item =>
        (filterType === "all" || item.type === filterType) &&
        (!search || item.name.toLowerCase().includes(search.toLowerCase()))
    );
    if (filtered.length === 0) {
        container.innerHTML = `<div style="padding:24px;color:#e63946;">Brak wyników.</div>`;
        return;
    }
    container.innerHTML = filtered.map(item => `
        <div class="shop-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.price}</div>
            <button class="item-btn" onclick="alert('Strona produktu wkrótce!')">Przejdź</button>
        </div>
    `).join('');
}

// Початковий рендер
function renderShop() {
    renderList(clothes, "clothes-list", document.getElementById('clothes-filter').value, document.getElementById('shop-search-input').value);
    renderList(supplements, "supplements-list", document.getElementById('supp-filter').value, document.getElementById('shop-search-input').value);
}

// Фільтри та пошук
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('clothes-filter').onchange = renderShop;
    document.getElementById('supp-filter').onchange = renderShop;
    document.getElementById('shop-search-input').oninput = renderShop;
    renderShop();
});