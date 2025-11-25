// js/products.js

let filteredProducts = [...products];

document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupControls();
});

function renderProducts(productList) {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const count = document.getElementById('productCount');

    if (count) count.textContent = `(${productList.length})`;

    if (productList.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';

    grid.innerHTML = productList.map(product => `
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

function setupControls() {
    // Filter toggle
    const filterToggle = document.getElementById('filterToggle');
    const filterPanel = document.getElementById('filterPanel');
    
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            filterPanel.classList.toggle('show');
        });
    }

    // Sort - FIXED VERSION
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            console.log('Sorting by:', sortValue); // Debug log
            sortProducts(sortValue);
        });
    }

    // Apply filters
    const applyBtn = document.getElementById('applyFilters');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            applyFilters();
            if (filterPanel) {
                filterPanel.classList.remove('show');
            }
        });
    }
}

function applyFilters() {
    let filtered = [...products];

    // Category filter
    const categoryBoxes = document.querySelectorAll('input[name="category"]:checked');
    if (categoryBoxes.length > 0) {
        const categories = Array.from(categoryBoxes).map(cb => cb.value);
        filtered = filtered.filter(p => categories.includes(p.category));
    }

    // Type filter
    const typeBoxes = document.querySelectorAll('input[name="type"]:checked');
    if (typeBoxes.length > 0) {
        const types = Array.from(typeBoxes).map(cb => cb.value);
        filtered = filtered.filter(p => p.type && types.includes(p.type));
    }

    // Flavor filter
    const flavorBoxes = document.querySelectorAll('input[name="flavor"]:checked');
    if (flavorBoxes.length > 0) {
        const flavors = Array.from(flavorBoxes).map(cb => cb.value);
        filtered = filtered.filter(p => p.flavor && flavors.includes(p.flavor));
    }

    // Rating filter
    const ratingSelect = document.getElementById('ratingFilter');
    if (ratingSelect && ratingSelect.value !== '0') {
        const minRating = parseFloat(ratingSelect.value);
        filtered = filtered.filter(p => p.rating >= minRating);
    }

    filteredProducts = filtered;
    
    // Apply current sort to filtered results
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortProducts(sortSelect.value);
    } else {
        renderProducts(filteredProducts);
    }
}

function sortProducts(sortType) {
    // Create a copy to sort
    let sorted = [...filteredProducts];

    console.log('Before sort:', sorted.length, 'products'); 

    switch(sortType) {
        case 'name-asc':
            sorted.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            console.log('Sorted A-Z'); 
            break;
            
        case 'name-desc':
            sorted.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA > nameB) return -1;
                if (nameA < nameB) return 1;
                return 0;
            });
            console.log('Sorted Z-A');
            break;
            
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            console.log('Sorted Price: Low to High'); 
            break;
            
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            console.log('Sorted Price: High to Low'); 
            break;
            
        case 'rating-desc':
            sorted.sort((a, b) => b.rating - a.rating);
            console.log('Sorted Rating: High to Low'); 
            break;
            
        default:
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            console.log('Sorted Default A-Z'); 
            break;
    }

    console.log('After sort, first item:', sorted[0]?.name); 

    renderProducts(sorted);
}
