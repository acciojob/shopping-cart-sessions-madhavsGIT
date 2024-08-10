// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners for "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ''; // Clear the current cart list
  const cartItems = getCartItems();

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners for "Remove" buttons
  document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      removeFromCart(productId);
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const cartItems = getCartItems();
  const product = products.find(p => p.id === productId);
  cartItems.push(product);
  sessionStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  let cartItems = getCartItems();
  cartItems = cartItems.filter(item => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Get cart items from session storage
function getCartItems() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Initial render
renderProducts();
renderCart();
clearCartBtn.addEventListener('click', clearCart);
