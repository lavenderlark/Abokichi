// js/cart.js
// Complete cart management system

const cart = {
    // Get cart from localStorage
    get: function() {
        const data = localStorage.getItem('abokichi_cart');
        return data ? JSON.parse(data) : [];
    },

    // Save cart to localStorage
    save: function(items) {
        localStorage.setItem('abokichi_cart', JSON.stringify(items));
        this.updateBadge();
        this.updateTotal();
    },

    // Add product to cart
    add: function(productId, quantity = 1) {
        const items = this.get();
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        // Check if product already exists
        const existing = items.find(item => item.id === productId);
        
        if (existing) {
            existing.quantity += quantity;
        } else {
            items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.save(items);
        
        // Badge pulse animation
        const badge = document.getElementById('cartBadge');
        if (badge) {
            badge.classList.add('pulse');
            setTimeout(() => badge.classList.remove('pulse'), 300);
        }
        
        showToast(`${product.name} added to cart!`);
        this.render();
    },

    // Remove specific product from cart
    remove: function(productId) {
        let items = this.get();
        const product = items.find(item => item.id === productId);
        items = items.filter(item => item.id !== productId);
        this.save(items);
        this.render();
        if (product) {
            showToast(`${product.name} removed from cart`);
        }
    },

    // Update quantity (increment/decrement)
    updateQuantity: function(productId, newQuantity) {
        const items = this.get();
        const item = items.find(i => i.id === productId);
        
        if (item) {
            if (newQuantity <= 0) {
                this.remove(productId);
            } else {
                item.quantity = newQuantity;
                this.save(items);
                this.render();
            }
        }
    },

    // Increment quantity
    incrementQty: function(productId) {
        const items = this.get();
        const item = items.find(i => i.id === productId);
        if (item) {
            item.quantity += 1;
            this.save(items);
            this.render();
        }
    },

    // Decrement quantity
    decrementQty: function(productId) {
        const items = this.get();
        const item = items.find(i => i.id === productId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                this.save(items);
                this.render();
            } else {
                this.remove(productId);
            }
        }
    },

    // Clear entire cart
    clear: function() {
        localStorage.removeItem('abokichi_cart');
        this.updateBadge();
        this.updateTotal();
        this.render();
        showToast('Cart cleared!');
    },

    // Checkout process
    checkout: function() {
        const items = this.get();
        
        // Check if cart is empty
        if (items.length === 0) {
            showToast('Your cart is empty!');
            return;
        }

        const orderInfo = {
            items: items,
            itemCount: this.count(),
            total: this.total(),
            orderDate: new Date().toISOString()
        };
        sessionStorage.setItem('lastOrder', JSON.stringify(orderInfo));

        // Clear the cart
        localStorage.removeItem('abokichi_cart');
        
        // Update UI immediately
        this.updateBadge();
        this.updateTotal();
        closeCartModal();
        showToast('Order placed successfully!');
        setTimeout(() => {
            window.location.href = 'order.html';
        }, 500);
    },

    // Get total count of items
    count: function() {
        const items = this.get();
        return items.reduce((total, item) => total + item.quantity, 0);
    },

    // Get total price
    total: function() {
        const items = this.get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Update badge count
    updateBadge: function() {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            const count = this.count();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    },

    // Update total price display
    updateTotal: function() {
        const totalEl = document.getElementById('cartTotal');
        if (totalEl) {
            totalEl.textContent = `$${this.total().toFixed(2)}`;
        }
    },

    // Render cart items in modal
    render: function() {
        const container = document.getElementById('cartItems');
        if (!container) return;

        const items = this.get();

        if (items.length === 0) {
            container.innerHTML = `
                <div class="cart-empty">
                    <p>🛒</p>
                    <p>Your cart is empty</p>
                </div>
            `;
            this.updateTotal();
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="cart.decrementQty(${item.id})">−</button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="qty-btn" onclick="cart.incrementQty(${item.id})">+</button>
                        <button class="remove-btn" onclick="cart.remove(${item.id})">×</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        this.updateTotal();
    }
};

// Toast notification
function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Open cart modal
function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.add('show');
        cart.render();
    }
}

// Close cart modal
function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    cart.updateBadge();
    
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCartModal);
    }
    
    const closeBtn = document.getElementById('closeCart');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCartModal);
    }
    
    const overlay = document.querySelector('.cart-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeCartModal);
    }

//checkout button handler
const checkoutBtn = document.querySelector('.btn-primary[onclick*="order.html"]');
if (checkoutBtn) {
    checkoutBtn.removeAttribute('onclick');
    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cart.checkout();
    });
}
});
