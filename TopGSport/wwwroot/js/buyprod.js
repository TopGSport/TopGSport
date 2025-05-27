function getCurrentUser() {
    return localStorage.getItem('currentUser');
}
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function getCartKey() {
    const user = getCurrentUser();
    return user ? `cart_${user}` : 'cart_guest';
}
function getCart() {
    return JSON.parse(localStorage.getItem(getCartKey()) || '[]');
}
function setCart(cart) {
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
}
function clearCart() {
    setCart([]);
}
function renderBuyProd() {
    const cart = getCart();
    const list = document.getElementById('buyprod-list');
    if (!cart.length) {
        list.innerHTML = '<div style="color:#e63946;">Koszyk jest pusty.</div>';
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
    }).join('') + `<div style="margin-top:12px;font-weight:bold;">Suma: $${total.toFixed(2)}</div>`;
}
document.getElementById('buyprod-form').onsubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('order-name').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const address = document.getElementById('order-address').value.trim();
    const cart = getCart();
    if (!name || !phone || !address || !cart.length) return;
    // Додаємо покупку до user.purchases
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
    document.getElementById('buyprod-msg').innerHTML = '<span style="color:#4caf50;">Dziękujemy za zamówienie!</span>';
    renderBuyProd();
};
document.addEventListener('DOMContentLoaded', renderBuyProd);