// js/main.js
// Homepage functionality

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Update cart badge with current count
  updateCartBadge();
  
  // Render product cards on homepage
  renderCategories();
  
  // Setup cart modal
  setupCartModal();
  
});

/**
 * Render category/product cards on homepage
 * Shows first 4 products as featured items
 */
function renderCategories() {
  const categoryGrid = document.getElementById('categoryGrid');
  
  if (!categoryGrid) return;
  
  // Get first 4 products for homepage
  const featuredProducts = products.slice(0, 4);
  
  // Build HTML for each product card
  categoryGrid.innerHTML = featuredProducts.map(product => `
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
    </div>
  `).join('');
}

/**
 * Setup cart modal open/close functionality
 */
function setupCartModal() {
  const cartBtn = document.getElementById('cartBtn');
  const cartModal = document.getElementById('cartModal');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  // Open cart modal
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      cartModal.classList.add('show');
      renderCart();
    });
  }
  
  // Close cart modal - overlay click
  if (cartOverlay) {
    cartOverlay.addEventListener('click', function() {
      cartModal.classList.remove('show');
    });
  }
  
  // Close cart modal - close button
  if (closeCart) {
    closeCart.addEventListener('click', function() {
      cartModal.classList.remove('show');
    });
  }
  
  // Close cart on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartModal.classList.contains('show')) {
      cartModal.classList.remove('show');
    }
  });
  
  // Clear cart button
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear your cart?')) {
        clearCart();
        renderCart();
      }
    });
  }
  
  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      const cart = getCart();
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      // Clear cart and go to order page
      clearCart();
      window.location.href = 'order.html';
    });
  }
}
