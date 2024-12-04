// Import the fetchCards function from cards.js
import { fetchCards } from './cards.js';

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
  container.innerHTML = ''; // Clear the container before adding new cards

  if (cards.length === 0) {
    container.innerHTML = '<p>No cards found for this color.</p>';
    return;
  }

  // Loop through the cards and display them
  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('product-card');
    cardElement.innerHTML = `
      <img src="${card.imageUrl}" alt="${card.name}" />
      <h2>${card.name}</h2>
      <p>Price: $${card.price}</p>
    `;
    container.appendChild(cardElement);
  });
}
