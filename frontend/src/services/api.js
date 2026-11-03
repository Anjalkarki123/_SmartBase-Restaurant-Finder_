/*
 * All communication with the Flask backend goes through this file.
 * Components never call fetch() directly.
 */
import { mockGetOptions, mockSearchRestaurants } from './mockApi.js';

// ---------------------------------------------------------------------------
// THE SWITCH: true = use demo data, false = call the real Flask backend.
// ---------------------------------------------------------------------------
export const USE_MOCK = true;

let optionsRequest;

// Address of the Flask server. Leave empty during development: Vite forwards
// every /api request to http://localhost:5000 (see vite.config.js).
// For the hosted site, create a .env file with: VITE_API_URL=https://your-backend-url
const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

/**
 * Load cuisines and cities for the search form.
 * The cached promise prevents duplicate requests during React Strict Mode setup.
 */
export function getOptions() {
  if (!optionsRequest) {
    if (USE_MOCK) {
      optionsRequest = mockGetOptions();
    } else {
      optionsRequest = fetch(`${API_BASE_URL}/api/options`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`The server could not load search options (error ${response.status}).`);
          }
          return response.json();
        })
        .then((data) => {
          const validCuisines = Array.isArray(data?.cuisines)
            && data.cuisines.every((cuisine) => typeof cuisine === 'string');
          const validCities = Array.isArray(data?.cities)
            && data.cities.every((city) => typeof city?.city === 'string' && typeof city?.state === 'string');
          if (!validCuisines || !validCities) {
            throw new Error('The server sent unexpected search options.');
          }
          return data;
        });
    }
  }
  return optionsRequest;
}

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
  if (criteria.maxPrice !== '') params.set('maxPrice', String(Number(criteria.maxPrice)));

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
