// Import the fetchCards function from cards.js
import { fetchCards } from './cards.js';
import { addToCart } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // Get the color parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const color = urlParams.get('color');

  if (color) {
    // Set the heading to display the selected color
    const colorHeading = document.getElementById('color-heading');
    colorHeading.textContent = `${color.charAt(0).toUpperCase() + color.slice(1)} Cards`;

    // Fetch and display the cards for the selected color
    fetchCards(color).then(cards => {
      displayCards(cards);
    }).catch(error => {
      console.error('Error fetching cards:', error);
    });
  } else {
    console.error('No color specified in the URL');
  }
});

// Function to display the fetched cards
function displayCards(cards) {
  const container = document.getElementById('product-container');
  container.innerHTML = ''; 

  if (cards.length === 0) {
    container.innerHTML = '<p>No cards found for this color.</p>';
    return;
  }

  // Loop through the cards and display them
  cards.forEach(card => {
    if (card.price === "N/A") {
      const cardElement = document.createElement('div');
    cardElement.classList.add('product-card');
    cardElement.innerHTML = `
    <div class="card" data-id="${card.id}">
      <img src="${card.imageUrl}" alt="${card.name}" />
      <div class="card-details">
        <h2>${card.name}</h2>
        <p>Price: $${card.price}</p>
        <p class="add-to-cart">Card unavailable for purchase</p>
      </div>
    </div>
    `;
    container.appendChild(cardElement);
    } else {
    const cardElement = document.createElement('div');
    cardElement.classList.add('product-card');
    cardElement.innerHTML = `
    <div class="card" data-id="${card.id}">
      <img src="${card.imageUrl}" alt="${card.name}" />
      <div class="card-details">
        <h2>${card.name}</h2>
        <p>Price: $${card.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
    `;
    container.appendChild(cardElement);
  }
  });

  //Add eventlistener for add to cart button
  attachCartListener();
}

function attachCartListener() {
  const addToCartButton = document.querySelectorAll('.add-to-cart');

  addToCartButton.forEach(button => {
    button.addEventListener('click', event => { 
    const cardElement = event.target.closest('.card');
    const productId = cardElement.dataset.id;
    const productName = cardElement.querySelector('h2').textContent;
    const productPrice = parseFloat(cardElement.querySelector('p').textContent.replace('Price: $', '').trim());
    const productImage = cardElement.querySelector('img').src;


    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    };

    addToCart(product);
  });
})
}
