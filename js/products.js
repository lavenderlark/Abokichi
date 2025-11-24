// js/products.js
// Product listing page with filters and sorting

// Variables to track current products
let allProducts = [...products];
let filteredProducts = [...products];

// Check for category filter in URL
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Update cart badge
  updateCartBadge();
  
  // If category parameter exists, filter by it
  if (categoryParam) {
    filterByCategory(categoryParam);
  } else {
    renderProducts(allProducts);
  }
  
  // Setup filters and sorting
  setupFilters();
  setupSorting();
  
  // Setup cart modal
  setupCartModal();
  
});

/**
 * Render products to grid
 * @param {Array} productsToRender - Array of product objects
 */
function renderProducts(productsToRender) {
  const productGrid = document.getElementById('productGrid');
  const noResults = document.getElementById('noResults');
  const productCount = document.getElementById('productCount');
  
  if (!productGrid) return;
  
  // Show no results message if empty
  if (productsToRender.length === 0) {
    productGrid.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
    if (productCount) productCount.textContent = 'Products (0)';
    return;
  }
  
  // Show grid and hide no results
  productGrid.style.display = 'grid';
  if (noResults) noResults.style.display = 'none';
  if (productCount) {
    productCount.textContent = `Products (${productsToRender.length})`;
  }
  
  // Build HTML for product cards
  productGrid.innerHTML = productsToRender.map(product => `
    <div class="product-card" onclick="window.location.href='details.html?id=${product.id}'" role="button" tabindex="0">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-name">${product.name}</div>
      <div class="product-price">
        $${product.price.toFixed(2)}
        ${product.oldPrice ? `<span class="product-old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
      </div>
      <div class="product-rating">
        ${'⭐'.repeat(Math.floor(product.rating))}
        <span class="product-reviews">${product.reviews} Reviews</span>
      </div>
      <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `).join('');
}

/**
 * Setup filter controls
 */
function setupFilters() {
  const filterToggleBtn = document.getElementById('filterToggleBtn');
  const filterPanel = document.getElementById('filterPanel');
  const applyFilterBtn = document.getElementById('applyFilterBtn');
  
  // Toggle filter panel visibility
  if (filterToggleBtn && filterPanel) {
    filterToggleBtn.addEventListener('click', function() {
      if (filterPanel.style.display === 'none' || filterPanel.style.display === '') {
        filterPanel.style.display = 'flex';
      } else {
        filterPanel.style.display = 'none';
      }
    });
  }
  
  // Apply filters button
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener('click', applyFilters);
  }
}

/**
 * Apply all selected filters
 * Filters products by category and rating
 */
function applyFilters() {
  let filtered = [...allProducts];
  
  // Get selected category checkboxes
  const categoryCheckboxes = document.querySelectorAll('[data-category]');
  const selectedCategories = [];
  
  categoryCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedCategories.push(checkbox.dataset.category);
    }
  });
  
  // Filter by categories if any selected
  if (selectedCategories.length > 0) {
    filtered = filtered.filter(product => {
      return selectedCategories.includes(product.category);
    });
  }
  
  // Filter by rating
  const ratingFilter = document.getElementById('ratingFilter');
  if (ratingFilter && ratingFilter.value) {
    const minRating = parseFloat(ratingFilter.value);
    filtered = filtered.filter(product => product.rating >= minRating);
  }
  
  // Update filtered products
  filteredProducts = filtered;
  renderProducts(filteredProducts);
  
  // Apply current sort
  const sortBy = document.getElementById('sortBy');
  if (sortBy) {
    sortProducts(sortBy.value);
  }
}

/**
 * Setup sorting dropdown
 */
function setupSorting() {
  const sortBy = document.getElementById('sortBy');
  
  if (sortBy) {
    sortBy.addEventListener('change', function(e) {
      sortProducts(e.target.value);
    });
  }
}

/**
 * Sort products based on selected option
 * @param {string} sortType - Type of sorting to apply
 */
function sortProducts(sortType) {
  let sorted = [...filteredProducts];
  
  switch(sortType) {
    case 'price-low':
      // Sort by price: low to high
      sorted.sort((a, b) => a.price - b.price);
      break;
      
    case 'price-high':
      // Sort by price: high to low
      sorted.sort((a, b) => b.price - a.price);
      break;
      
    case 'rating':
      // Sort by rating: high to low
      sorted.sort((a, b) => b.rating - a.rating);
      break;
      
    case 'name':
      // Sort alphabetically A-Z
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
      
    default:
      // Default (as-is)
      break;
  }
  
  renderProducts(sorted);
}

/**
 * Filter products by specific category
 * @param {string} category - Category to filter by
 */
function filterByCategory(category) {
  filteredProducts = allProducts.filter(product => product.category === category);
  renderProducts(filteredProducts);
}

/**
 * Setup cart modal (same as main.js)
 */
function setupCartModal() {
  const cartBtn = document.getElementById('cartBtn');
  const cartModal = document.getElementById('cartModal');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      cartModal.classList.add('show');
      renderCart();
    });
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', function() {
      cartModal.classList.remove('show');
    });
  }
  
  if (closeCart) {
    closeCart.addEventListener('click', function() {
      cartModal.classList.remove('show');
    });
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartModal.classList.contains('show')) {
      cartModal.classList.remove('show');
    }
  });
  
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear your cart?')) {
        clearCart();
        renderCart();
      }
    });
  }
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      const cart = getCart();
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      clearCart();
      window.location.href = 'order.html';
    });
  }
}
