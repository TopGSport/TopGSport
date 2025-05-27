let allItems = [];

async function fetchShopItems() {
    try {
        const response = await fetch('http://localhost:5017/api/shop');
        allItems = await response.json();
        showProduct();
    } catch (error) {
        document.getElementById('product-container').innerHTML = '<div style="color:#e63946;padding:24px;">Błąd pobierania danych.</div>';
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
    if (!product) {
        container.innerHTML = '<div style="color:#e63946;padding:24px;">Продукт не знайдено.</div>';
        return;
    }
    container.innerHTML = `
        <div class="product-card">
            <img src="/images/${product.img}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h2>${product.name}</h2>
                <div class="product-price">$${product.price}</div>
                <div class="product-desc">${product.desc || ''}</div>
                <button class="item-btn" id="add-to-cart-btn">Додати в кошик</button>
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

document.addEventListener('DOMContentLoaded', fetchShopItems);