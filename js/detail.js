// js/detail.js
// Product detail page logic

let currentProduct = null;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (productId) {
        loadProduct(productId);
    }
});

function loadProduct(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.querySelector('.container').innerHTML = '<div class="no-results">Product not found</div>';
        return;
    }

    currentProduct = product;

    // Update breadcrumb
    const breadcrumbName = document.getElementById('breadcrumbName');
    if (breadcrumbName) breadcrumbName.textContent = product.name;

    // Update image
    const img = document.getElementById('detailImage');
    if (img) {
        img.src = product.image;
        img.alt = product.name;
    }

    // Update name
    const name = document.getElementById('detailName');
    if (name) name.textContent = product.name;

    // Update price
    const price = document.getElementById('detailPrice');
    if (price) price.textContent = `$${product.price.toFixed(2)}`;

    // Update old price
    const oldPrice = document.getElementById('detailOldPrice');
    if (oldPrice) {
        if (product.oldPrice) {
            oldPrice.textContent = `$${product.oldPrice.toFixed(2)}`;
            oldPrice.style.display = 'inline';
        } else {
            oldPrice.style.display = 'none';
        }
    }

    // Update rating
    const rating = document.getElementById('detailRating');
    if (rating) {
        rating.innerHTML = `
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
            <span class="product-reviews">(${product.reviews} reviews)</span>
        `;
    }

    // Update short description
    const desc = document.getElementById('detailDescription');
    if (desc) desc.textContent = product.description;

    // Update product specs (Generic for all products)
    const specs = document.getElementById('productSpecs');
    if (specs) {
        let output = `<div class="product-specs-table">`;
        output += `<div><b>Category:</b> ${product.category}</div>`;
        if (product.type) output += `<div><b>Type:</b> ${product.type}</div>`;
        if (product.flavor) output += `<div><b>Flavor:</b> ${product.flavor}</div>`;
        output += `<div><b>Storage:</b> Store in a cool, dry place. Refrigerate after opening.</div>`;
        output += `<div><b>Country of Origin:</b> Japan</div>`;
        output += `</div>`;
        specs.innerHTML = output;
    }

    // Add to Cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.onclick = () => {
            cart.add(product.id);
        };
    }

    // Buy Now button
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.onclick = () => {
            cart.remove(product.id);
            showToast(`Order placed for ${product.name}!`);
            setTimeout(() => {
                location.href = 'order.html';
            }, 800);
        };
    }
}

// Tab switching function
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}
