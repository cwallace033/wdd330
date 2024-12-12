import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

// Render cart contents
export function renderCartContents() {
  const cartItems = getLocalStorage("cart") || [];
  const productList = qs(".product-list");

  if (!cartItems.length) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate).join("");
  productList.innerHTML = htmlItems;

  // Add event listeners to "Remove" buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => removeFromCart(button.dataset.id));
  });
}

// Template for each cart item
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.image}" alt="${item.name}" />
      </a>
      <h2 class="card__name">${item.name}</h2>
      <p class="cart-card__quantity">Qty: ${item.quantity}</p>
      <p class="cart-card__price">$${(item.price * item.quantity).toFixed(2)}</p>
      <button class="remove-item" data-id="${item.id}">Remove</button>
    </li>`;
}

// Remove an item from the cart
function removeFromCart(productId) {
  let cart = getLocalStorage("cart") || [];
  cart = cart.filter((item) => item.id !== productId);

  setLocalStorage("cart", cart);
  renderCartContents();
  showCartTotal();
}

// Calculate total price
function calculateCartTotal() {
  const cartItems = getLocalStorage("cart") || [];
  return cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0;  
    const itemQuantity = item.quantity || 0;        
    return total + itemPrice * itemQuantity;
  }, 0).toFixed(2);
}

// Display cart total
export function showCartTotal() {
  const total = calculateCartTotal();
  const totalElement = qs(".cart-total");

  if (totalElement) {
    if (total > 0) {
      totalElement.innerHTML = `Total: $${total}`;
    } else {
      totalElement.innerHTML = "Total: $0.00";
    }
  } else {
    console.error("Cart total element not found");
  }
}

// Initialize the cart page
export function initCart() {
  renderCartContents();
  showCartTotal();
}

// Call initCart to load the cart page when this module is imported
document.addEventListener('DOMContentLoaded', () => {
  initCart();
});