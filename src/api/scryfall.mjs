import { fetchWithTimeout } from '../utils/fetchUtils.mjs';

const API_BASE_URL = 'https://api.scryfall.com';

export async function fetchCards(query = '') {
    const url = `${API_BASE_URL}/cards/search?q=${encodeURIComponent(query)}`;
    return await fetchWithTimeout(url);
}