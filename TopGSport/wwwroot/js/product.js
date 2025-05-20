// --- Дані з shop.js (копія для product.js) ---
const clothes = [
    {
        id: "clothes1",
        name: "T-shirt BossBoy",
        type: "tshirt",
        price: 25,
        img: "/images/img123.jpg",
        desc: "Wysokiej jakości bawełniany t-shirt z logo BossBoy. Idealny na trening i na co dzień."
    },
    {
        id: "clothes2",
        name: "Szorty treningowe",
        type: "shorts",
        price: 22,
        img: "img123.jpg",
        desc: "Lekkie i wygodne szorty do treningu. Szybkoschnący materiał, elastyczny pas."
    },
    {
        id: "clothes3",
        name: "Bluza z kapturem",
        type: "hoodie",
        price: 40,
        img: "img123.jpg",
        desc: "Ciepła bluza z kapturem BossBoy. Miękka, przyjemna w dotyku, z dużą kieszenią."
    },
    {
        id: "clothes4",
        name: "T-shirt Classic",
        type: "tshirt",
        price: 20,
        img: "img123.jpg",
        desc: "Klasyczny t-shirt sportowy. Oddychający materiał, dopasowany krój."
    },
    {
        id: "clothes5",
        name: "Szorty Pro",
        type: "shorts",
        price: 28,
        img: "img123.jpg",
        desc: "Profesjonalne szorty do intensywnych treningów. Wzmocnione szwy, nowoczesny design."
    }
];

const supplements = [
    {
        id: "supp1",
        name: "Kreatyna Monohydrat",
        type: "creatine",
        price: 18,
        img: "img123.jpg",
        desc: "Czysta kreatyna monohydrat. Wspiera wzrost siły i masy mięśniowej."
    },
    {
        id: "supp2",
        name: "Białko WPC 80",
        type: "protein",
        price: 32,
        img: "img123.jpg",
        desc: "Wysokiej jakości koncentrat białka serwatkowego. Szybka regeneracja po treningu."
    },
    {
        id: "supp3",
        name: "BCAA 2:1:1",
        type: "bcaa",
        price: 15,
        img: "img123.jpg",
        desc: "Aminokwasy rozgałęzione BCAA w proporcji 2:1:1. Redukują zmęczenie mięśni."
    },
    {
        id: "supp4",
        name: "Kreatyna Jabłczan",
        type: "creatine",
        price: 20,
        img: "img123.jpg",
        desc: "Kreatyna jabłczan dla lepszej przyswajalności i mniejszego zatrzymania wody."
    },
    {
        id: "supp5",
        name: "Białko Isolate",
        type: "protein",
        price: 38,
        img: "img123.jpg",
        desc: "Izolat białka serwatkowego. Najczystsza forma białka, minimalna ilość tłuszczu."
    }
];

// --- Пошук товару по id ---
function getProductById(id) {
    return clothes.concat(supplements).find(item => item.id === id);
}

// --- Витягуємо id з URL ---
function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// --- Рендер продукту ---
function renderProduct() {
    const id = getIdFromUrl();
    const product = getProductById(id);
    const container = document.getElementById('product-container');
    if (!product) {
        container.innerHTML = `<div style="color:#e63946;font-size:1.3em;padding:40px;">Produkt nie znaleziony.</div>`;
        return;
    }
    let sizeSelect = '';
    if (product.id.startsWith('clothes')) {
        sizeSelect = `
        <div class="product-size-select">
            <label for="size">Rozmiar:</label>
            <select id="size">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
            </select>
        </div>`;
    }
    container.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="product-img">
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price}</div>
        <div class="product-desc">${product.desc}</div>
        ${sizeSelect}
        <button class="add-to-cart-btn" id="add-to-cart-btn">Dodaj do koszyka</button>
    `;

    document.getElementById('add-to-cart-btn').onclick = function () {
        let size = null;
        if (product.id.startsWith('clothes')) {
            size = document.getElementById('size').value;
        }
        addToCart(product, size);
        showPopup('Dodano do koszyka!');
    };
}

// --- Кошик (sidebar) ---
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(product, size) {
    let cart = getCart();
    // Якщо це одяг — враховуємо розмір як окрему позицію
    if (product.id.startsWith('clothes')) {
        let found = cart.find(item => item.id === product.id && item.size === size);
        if (found) {
            found.qty += 1;
        } else {
            cart.push({ ...product, size, qty: 1 });
        }
    } else {
        let found = cart.find(item => item.id === product.id);
        if (found) {
            found.qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }
    }
    setCart(cart);
    renderCart();
}
function removeFromCart(idx) {
    let cart = getCart();
    cart.splice(idx, 1);
    setCart(cart);
    renderCart();
}
function renderCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cart.length) {
        cartItems.innerHTML = `<div style="color:#e63946;padding:24px;">Koszyk jest pusty.</div>`;
        cartTotal.textContent = '0';
        return;
    }
    let total = 0;
    cartItems.innerHTML = cart.map((item, idx) => {
        total += item.price * item.qty;
        return `
        <div class="cart-item">
            <img src="${item.img}" class="cart-item-img" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                ${item.size ? `<div class="cart-item-size">Rozmiar: ${item.size}</div>` : ''}
                <div class="cart-item-qty">Ilość: ${item.qty}</div>
            </div>
            <div class="cart-item-price">$${item.price * item.qty}</div>
            <button class="remove-cart-item" onclick="removeFromCart(${idx})">&times;</button>
        </div>
        `;
    }).join('');
    cartTotal.textContent = total;
}
window.removeFromCart = removeFromCart;

// --- Кошик sidebar відкривати/закривати ---
document.getElementById('open-cart').onclick = function () {
    document.getElementById('cart-sidebar').classList.add('open');
    renderCart();
};
document.getElementById('close-cart').onclick = function () {
    document.getElementById('cart-sidebar').classList.remove('open');
};

// --- Кнопка "Опрóżnij кошик" ---
document.getElementById('checkout-btn').onclick = function () {
    setCart([]);
    renderCart();
    showPopup('Koszyk został opróżniony!');
};

// --- Pop-up повідомлення ---
function showPopup(msg) {
    const popup = document.getElementById('popup-message');
    popup.textContent = msg;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 1800);
}

// --- Рендер продукту при завантаженні ---
document.addEventListener('DOMContentLoaded', renderProduct);