// Function to fetch cards based on color from the Scryfall API
export async function fetchCards(color) {
    try {
      // Fetch the cards from Scryfall API based on color
      const response = await fetch(`https://api.scryfall.com/cards/search?q=color:${color}`);
      const data = await response.json();
  
      // Check if the data is valid and contains cards
      if (!data.data || data.data.length === 0) {
        throw new Error('No cards found for this color');
      }
  
      // Process the cards into a simpler format (name, image, price)
      return data.data.map(card => ({
        name: card.name,
        imageUrl: card.image_uris?.normal || 'default-image.jpg', // Use a default image if no image is found
        price: card.prices?.usd || 'N/A', // Use 'N/A' if price is unavailable
      }));
    } catch (error) {
      console.error('Error fetching cards:', error);
      return []; // Return an empty array if there was an error
    }
  }
  