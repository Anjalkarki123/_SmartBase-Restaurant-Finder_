/*
 * All communication with the Flask backend goes through this file.
 * Components never call fetch() directly.
 */
import { mockSearchRestaurants } from './mockApi.js';

// ---------------------------------------------------------------------------
// THE SWITCH: true = use demo data, false = call the real Flask backend.
// ---------------------------------------------------------------------------
export const USE_MOCK = true;

// Address of the Flask server. Leave empty during development: Vite forwards
// every /api request to http://localhost:5000 (see vite.config.js).
// For the hosted site, create a .env file with: VITE_API_URL=https://your-backend-url
const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

/**
 * Search for restaurants.
 * @param {object} criteria - { cuisine, city, state, maxPrice, minRating }
 * @returns {Promise<{results: Array}>} results in the backend's ranked order
 */
export async function searchRestaurants(criteria) {
  if (USE_MOCK) {
    return mockSearchRestaurants(criteria);
  }

  // Build the query string in the format agreed in API_CONTRACT.md.
  // An empty maxPrice is left out, which means "any price".
  const params = new URLSearchParams({
    cuisine: criteria.cuisine,
    city: criteria.city,
    minRating: criteria.minRating,
  });
  if (criteria.maxPrice !== '') params.append('maxPrice', criteria.maxPrice);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/search?${params}`);
  } catch {
    throw new Error('Could not reach the SmartBase server. Check that the backend is running.');
  }

  if (!response.ok) {
    throw new Error(`The server could not complete the search (error ${response.status}).`);
  }

  const data = await response.json();
  if (!Array.isArray(data.results)) {
    throw new Error('The server sent an unexpected response.');
  }
  return data;
}
