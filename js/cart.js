// js/cart.js
// Shopping cart functions using localStorage

/**
 * Get cart from localStorage
 * Returns array of cart items
 */
function getCart() {
  const cartData = localStorage.getItem('abokichi_cart');
  return cartData ? JSON.parse(cartData) : [];
}

/**
 * Save cart to localStorage
 * @param {Array} cart - Array of cart items
 */
function saveCart(cart) {
  localStorage.setItem('abokichi_cart', JSON.stringify(cart));
  updateCartBadge();
}

/**
 * Add product to cart
 * @param {number} productId - ID of product to add
 * @param {number} quantity - Quantity to add (default 1)
 */
function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    console.error('Product not found:', productId);
    return;
  }
  
  // Check if product already in cart
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  saveCart(cart);
  
  // Add pulse animation to cart badge
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.classList.add('pulse');
    setTimeout(() => badge.classList.remove('pulse'), 300);
  }
  
  alert(`${product.name} added to cart!`);
}

/**
 * Remove product from cart
 * @param {number} productId - ID of product to remove
 */
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
}

/**
 * Clear entire cart
 */
function clearCart() {
  localStorage.removeItem('abokichi_cart');
  updateCartBadge();
}

/**
 * Get total number of items in cart
 * Returns sum of all quantities
 */
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get total price of all items in cart
 */
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Update cart badge display
 * Shows count on cart icon
 */
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = getCartCount();
  }
}

/**
 * Render cart items in modal
 * Displays all items with remove buttons
 */
function renderCart() {
  const cartBody = document.getElementById('cartBody');
  const cart = getCart();
  
  if (!cartBody) return;
  
  if (cart.length === 0) {
    cartBody.innerHTML = '<div class="cart-empty"><p>Your cart is empty</p></div>';
    return;
  }
  
  // Build cart HTML
  let cartHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">Qty: ${item.quantity}</div>
        <button class="btn-remove" onclick="removeFromCart(${item.id}); renderCart();" style="background:none;border:none;color:#F96A00;cursor:pointer;font-size:14px;margin-top:8px;">Remove</button>
      </div>
    </div>
  `).join('');
  
  // Add total
  cartHTML += `
    <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e4e4e4;">
      <strong style="font-size:18px;">Total: $${getCartTotal().toFixed(2)}</strong>
    </div>
  `;
  
  cartBody.innerHTML = cartHTML;
}
