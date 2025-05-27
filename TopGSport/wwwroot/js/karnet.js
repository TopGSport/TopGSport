async function renderKarnet() {
    const params = new URLSearchParams(window.location.search);
    const karKey = params.get('kar') || 'kar1';
    const karId = karKey.replace('kar', ''); // np. kar1 -> 1

    try {
        const response = await fetch(`http://localhost:5017/api/memberships/${karId}`);
        if (!response.ok) throw new Error('Karnet nie znaleziony');
        const kar = await response.json();

        const features = JSON.parse(kar.features || '[]');

        document.getElementById('karnet-hero').innerHTML = `
            <h1>${kar.name}</h1>
            <div class="price">${kar.price}</div>
            ${kar.bonus ? `<div class="bonus">${kar.bonus}</div>` : ''}
            <p>${kar.description}</p>
            <a href="buy.html?kar=kar${kar.id}" class="kup-btn">Kup teraz</a>
        `;

        document.getElementById('karnet-features').innerHTML = `
            <table>
                <tr><th>Godziny dostępu</th><td>${kar.hours}</td></tr>
                <tr><th>Funkcje</th><td>${features.join(', ')}</td></tr>
            </table>
        `;

        const responseAll = await fetch('http://localhost:5017/api/memberships');
        const allMemberships = await responseAll.json();
        const compareRows = allMemberships.map(row => {
            const rowFeatures = JSON.parse(row.features || '[]');
            const hasSauna = rowFeatures.includes('Sauna') ? '✓' : '✗';
            const hasGroupClasses = rowFeatures.some(f => f.includes('strefy') || f.includes('grupowe')) ? '✓' : '✗';
            const hasConsultations = rowFeatures.includes('Konsultacje') || rowFeatures.includes('Konsultacja z trenerem') ? '✓' : '✗';
            return `
                <tr>
                    <td>${row.name}</td>
                    <td>${row.hours}</td>
                    <td>${hasSauna}</td>
                    <td>${hasGroupClasses}</td>
                    <td>${hasConsultations}</td>
                </tr>
            `;
        }).join('');
        document.getElementById('karnet-compare').innerHTML = `
            <h2>Porównanie karnetów</h2>
            <table>
                <tr>
                    <th>Karnet</th>
                    <th>Dostępność</th>
                    <th>Sauna</th>
                    <th>Zajęcia grupowe</th>
                    <th>Konsultacje</th>
                </tr>
                ${compareRows}
            </table>
        `;

        
        document.querySelectorAll('.animate-fadein, .animate-slideup').forEach((el, i) => {
            el.style.opacity = 0;
            setTimeout(() => {
                el.style.opacity = 1;
            }, 200 + i * 200);
        });

        
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        document.getElementById('karnet-hero').innerHTML = `<p>Błąd ładowania danych karnetu. Spróbuj ponownie później.</p>`;
    }
}

window.onload = renderKarnet;