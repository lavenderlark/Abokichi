// js/main.js

document.addEventListener('DOMContentLoaded', function() {
    renderBestSellers();
});

function renderBestSellers() {
    const grid = document.getElementById('bestSellersGrid');
    if (!grid) return;
    const bestSellers = products.filter(p => p.rating >= 4.5).slice(0, 4);

    grid.innerHTML = bestSellers.map(product => `
        <div class="product-card" onclick="location.href='details.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">
                $${product.price.toFixed(2)}
                ${product.oldPrice ? `<span class="product-old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-rating">
                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                <span class="product-reviews">${product.reviews} Reviews</span>
            </div>
        </div>
    `).join('');
}
