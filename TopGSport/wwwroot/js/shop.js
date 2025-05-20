let allItems = [];

async function fetchShopItems() {
    try {
        const response = await fetch('http://localhost:5017/api/shop');
        allItems = await response.json();
        console.log("Dane z API:", allItems);
        renderShop();
    } catch (error) {
        console.error("Błąd pobierania danych:", error);
    }
}


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
            <img src="/images/${item.img}" alt="${item.name}">
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.price}</div>
            <button class="item-btn" onclick="alert('Strona produktu wkrótce!')">Przejdź</button>
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
    document.getElementById('clothes-filter').onchange = renderShop;
    document.getElementById('supp-filter').onchange = renderShop;
    document.getElementById('shop-search-input').oninput = renderShop;
    fetchShopItems();
});