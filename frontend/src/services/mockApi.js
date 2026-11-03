/*
 * ===========================================================================
 * MOCK DATA, FOR DEMONSTRATION ONLY
 * ===========================================================================
 * This file lets the frontend run before the Flask backend exists.
 * The matching below is a simple demo. The real ranking belongs to the backend.
 */
import { FALLBACK_CITIES, FALLBACK_CUISINES, formatPrice, formatRating } from '../config.js';

// Set to true to test the error message and Retry button.
const SIMULATE_ERROR = false;

const CUISINE_FAMILY = {
  Vietnamese: 'Oriental', Korean: 'Oriental', Chinese: 'Oriental',
  Indian: 'South Asian', Pakistani: 'South Asian',
  Italian: 'European',
  Mexican: 'Latin American',
};

const MOCK_RESTAURANTS = [
  { id: 1, name: 'Pho Corner', cuisine: 'Vietnamese', city: 'New York', state: 'NY', price: 1, rating: 4.0, diningOption: 'Carryout' },
  { id: 2, name: 'Seoul Kitchen', cuisine: 'Korean', city: 'New York', state: 'NY', price: 2, rating: 4.5, diningOption: 'Dine-in and carryout' },
  { id: 3, name: 'Saigon Table', cuisine: 'Vietnamese', city: 'Moscow', state: 'ID', price: 2, rating: 5.0, diningOption: 'Dine-in and carryout' },
  { id: 4, name: 'Golden Wok', cuisine: 'Chinese', city: 'New York', state: 'NY', price: 2, rating: 4.0, diningOption: 'Dine-in' },
  { id: 5, name: 'Spice Route', cuisine: 'Indian', city: 'Lewiston', state: 'ID', price: 2, rating: 4.5, diningOption: 'Dine-in' },
  { id: 6, name: 'Lahore Grill', cuisine: 'Pakistani', city: 'New York', state: 'NY', price: 1, rating: 4.0, diningOption: 'Carryout' },
  { id: 7, name: 'Trattoria Verde', cuisine: 'Italian', city: 'New York', state: 'NY', price: 3, rating: 4.5, diningOption: 'Dine-in' },
  { id: 8, name: 'Bella Napoli', cuisine: 'Italian', city: 'Boise', state: 'ID', price: 3, rating: 5.0, diningOption: 'Dine-in and carryout' },
];

export async function mockGetOptions() {
  return { cuisines: FALLBACK_CUISINES, cities: FALLBACK_CITIES };
}

function differences(restaurant, criteria) {
  const reasons = [];
  if (restaurant.cuisine !== criteria.cuisine) reasons.push(`Similar cuisine: ${restaurant.cuisine} instead of ${criteria.cuisine}`);
  if (restaurant.city !== criteria.city || restaurant.state !== criteria.state) reasons.push(`Located in ${restaurant.city} instead of ${criteria.city}`);
  if (criteria.maxPrice !== '' && restaurant.price > Number(criteria.maxPrice)) {
    reasons.push(`Price ${formatPrice(restaurant.price)} is above your maximum of ${formatPrice(criteria.maxPrice)}`);
  }
  if (restaurant.rating < Number(criteria.minRating)) {
    reasons.push(`Rated ${formatRating(restaurant.rating)}, below your minimum of ${formatRating(criteria.minRating)}`);
  }
  return reasons;
}

export async function mockSearchRestaurants(criteria) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (SIMULATE_ERROR) throw new Error('Demo error: the mock server is "down".');

  const family = CUISINE_FAMILY[criteria.cuisine];
  const candidates = MOCK_RESTAURANTS.filter((restaurant) => CUISINE_FAMILY[restaurant.cuisine] === family);

  const exact = [];
  const alternatives = [];
  candidates.forEach((restaurant) => {
    const reasons = differences(restaurant, criteria);
    if (reasons.length === 0) exact.push({ ...restaurant, exact: true, reasons: [] });
    else if (reasons.length <= 2) alternatives.push({ ...restaurant, exact: false, reasons });
  });

  exact.sort((a, b) => b.rating - a.rating);
  alternatives.sort((a, b) => a.reasons.length - b.reasons.length || b.rating - a.rating);

  return { results: [...exact, ...alternatives] };
}
