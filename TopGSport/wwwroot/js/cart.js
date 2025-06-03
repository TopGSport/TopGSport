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
    if (!list) return;
    if (!cart.length) {
        list.innerHTML = '<div style="color:#e63946;">Кошик порожній.</div>';
        document.getElementById('side-cart-total').textContent = 'Сума: $0';
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
    document.getElementById('side-cart-total').textContent = 'Сума: $' + total.toFixed(2);
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
    // Кнопка оформлення
    const checkoutBtn = document.getElementById('side-cart-checkout');
    if (checkoutBtn) {
        checkoutBtn.onclick = function () {
            window.location.href = "buyprod.html";
        };
    }
});
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;