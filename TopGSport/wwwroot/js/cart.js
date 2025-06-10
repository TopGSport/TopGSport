const cartTranslations = {
    pl: {
        cart_empty: "Koszyk jest pusty.",
        cart_total: "Suma:",
        cart_checkout: "Oformić zamówienie"
    },
    en: {
        cart_empty: "Cart is empty.",
        cart_total: "Total:",
        cart_checkout: "Checkout"
    }
};

function getCurrentUser() {
    return sessionStorage.getItem('currentUser');
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
function updateCartCount() {
    const el = document.getElementById('cart-count');
    if (!el) return;
    const cart = getCart();
    el.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}
function openCart() {
    const el = document.getElementById('side-cart');
    if (!el) return;
    el.classList.add('open');
    renderCart();
}
function closeCart() {
    const el = document.getElementById('side-cart');
    if (!el) return;
    el.classList.remove('open');
}

function renderCart() {
    const cart = getCart();
    const list = document.getElementById('side-cart-list');
    const lang = localStorage.getItem('lang') || 'pl'; 

    if (!list) return;
    if (!cart.length) {
        list.innerHTML = `<div style="color:#e63946;">${cartTranslations[lang]['cart_empty']}</div>`;
        document.getElementById('side-cart-total').textContent = `${cartTranslations[lang]['cart_total']} $0`;
        return;
    }
    let total = 0;
    list.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-qty">
                        <button onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${item.id}, 1)">+</button>
                        <span class="cart-item-remove" onclick="removeFromCart(${item.id})">&times;</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    document.getElementById('side-cart-total').textContent = `${cartTranslations[lang]['cart_total']} $${total.toFixed(2)}`;
}

function addToCart(product) {
    let cart = getCart();
    const idx = cart.findIndex(i => i.id === product.id);
    if (idx > -1) {
        cart[idx].qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    setCart(cart);
    updateCartCount();
}
function changeQty(id, delta) {
    let cart = getCart();
    const idx = cart.findIndex(i => i.id === id);
    if (idx > -1) {
        cart[idx].qty += delta;
        if (cart[idx].qty < 1) cart[idx].qty = 1;
        setCart(cart);
        renderCart();
        updateCartCount();
    }
}
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    setCart(cart);
    renderCart();
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cartClose = document.getElementById('side-cart-close');
    if (cartIcon) cartIcon.onclick = openCart;
    if (cartClose) cartClose.onclick = closeCart;
    updateCartCount();

    const checkoutBtn = document.getElementById('side-cart-checkout');
    if (checkoutBtn) {
        checkoutBtn.onclick = function () {
            window.location.href = "buyprod.html";
        };
    }
});

function updateCartLanguage() {
    const lang = localStorage.getItem('lang') || 'pl';

    const cartTitle = document.querySelector('#side-cart-header [data-i18n="cart_title"]');
    if (cartTitle && cartTranslations[lang]['cart_title']) {
        cartTitle.textContent = cartTranslations[lang]['cart_title'];
    }

    const checkoutBtn = document.getElementById('side-cart-checkout');
    if (checkoutBtn && cartTranslations[lang]['cart_checkout']) {
        checkoutBtn.textContent = cartTranslations[lang]['cart_checkout'];
    }

    renderCart();
}

window.addEventListener('storage', function (e) {
    if (e.key === 'lang') {
        updateCartLanguage();
    }
});

window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;
window.updateCartLanguage = updateCartLanguage;