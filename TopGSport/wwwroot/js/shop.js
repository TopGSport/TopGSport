// Data_4_clothes
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
//Data_4_supplements
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

// rener
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
            <button class="item-btn" onclick="window.location.href='product.html?id=${item.id}'">Przejdź</button>
        </div>
    `).join('');
}

// start_ren
function renderShop() {
    renderList(clothes, "clothes-list", document.getElementById('clothes-filter').value, document.getElementById('shop-search-input').value);
    renderList(supplements, "supplements-list", document.getElementById('supp-filter').value, document.getElementById('shop-search-input').value);
}
// filter&search
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('clothes-filter').onchange = renderShop;
    document.getElementById('supp-filter').onchange = renderShop;
    document.getElementById('shop-search-input').oninput = renderShop;
    renderShop();
});