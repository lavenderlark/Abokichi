// js/detail.js
// Product details page functionality

// Variable to store current product
let currentProduct = null;

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Update cart badge
  updateCartBadge();
  
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  if (productId) {
    loadProductDetails(productId);
  } else {
    // No product ID found
    document.getElementById('productDetail').innerHTML = '<p>Product not found</p>';
  }
  
  // Setup cart modal
  setupCartModal();
  
});

/**
 * Load and display product details
 * @param {number} productId - ID of product to display
 */
function loadProductDetails(productId) {
  // Find product in data
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    document.getElementById('productDetail').innerHTML = '<p>Product not found</p>';
    return;
  }
  
  // Store current product
  currentProduct = product;
  
  // Render breadcrumb navigation
  const breadcrumb = document.getElementById('breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <a href="index.html">Home</a> > 
      <a href="products.html">Products</a> > 
      <a href="products.html?category=${encodeURIComponent(product.category)}">${product.category}</a> > 
      ${product.name}
    `;
  }
  
  // Render product details
  const detailContainer = document.getElementById('productDetail');
  if (!detailContainer) return;
  
  detailContainer.innerHTML = `
    <div class="detail-left">
      <img src="${product.image}" alt="${product.name}" class="detail-image">
    </div>
    
    <div class="detail-right">
      <h1>${product.name}</h1>
      
      <div class="detail-price">
        $${product.price.toFixed(2)}
        ${product.oldPrice ? `<span class="detail-old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
      </div>
      
      <div class="detail-rating">
        ${'⭐'.repeat(Math.floor(product.rating))}
        <span class="product-reviews">${product.reviews} Reviews</span>
      </div>
      
      <p class="detail-description">${product.description}</p>
      
      <div class="detail-actions">
        <button class="btn btn-secondary" onclick="addToCartFromDetail()">ADD TO CART</button>
        <button class="btn btn-primary" onclick="buyNow()">Buy Now</button>
      </div>
      
      <a href="#" class="wishlist-link" style="display:inline-block;margin-top:15px;color:var(--primary);text-decoration:underline;">♡ Add to Wishlist</a>
      
      <div style="margin-top:25px;display:flex;gap:15px;align-items:center;">
        <span style="font-weight:600;">SHARE:</span>
        <a href="#" style="font-size:20px;" aria-label="Share on Facebook">📘</a>
        <a href="#" style="font-size:20px;" aria-label="Share on Twitter">🐦</a>
        <a href="#" style="font-size:20px;" aria-label="Share on Pinterest">📌</a>
      </div>
      
      <div style="margin-top:30px;border-top:2px solid #e4e4e4;padding-top:20px;">
        <h3 style="margin-bottom:15px;">Product Details</h3>
        <p style="color:#555;line-height:1.7;">
          <strong>Category:</strong> ${product.category}<br>
          <strong>Rating:</strong> ${product.rating}/5 (${product.reviews} reviews)<br>
          <strong>Availability:</strong> In Stock
        </p>
      </div>
    </div>
  `;
}

/**
 * Add current product to cart
 * Called from Add to Cart button
 */
function addToCartFromDetail() {
  if (currentProduct) {
    addToCart(currentProduct.id);
  }
}

/**
 * Buy now - add to cart and go to order page
 * Called from Buy Now button
 */
function buyNow() {
  if (currentProduct) {
    addToCart(currentProduct.id);
    window.location.href = 'order.html';
  }
}

/**
 * Setup cart modal (same as other pages)
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
