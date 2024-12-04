import { fetchCards } from './api/scryfall.mjs';

const productList = document.querySelector('.product-list');

(async () => {
  const app = document.querySelector('#app');
  app.innerHTML = '<p>Loading cards...</p>';

  try {
    const cards = await fetchCards('black lotus'); // Example query
    app.innerHTML = cards
      .map(
        (card) => `
        <div>
          <h2>${card.name}</h2>
          <img src="${card.image_uris?.normal || ''}" alt="${card.name}">
        </div>`
      )
      .join('');
  } catch (error) {
    app.innerHTML = '<p>Error loading cards. Please try again.</p>';
    console.error(error);
  }
})();
