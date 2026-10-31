/*
 * ===========================================================================
 * MOCK DATA, FOR DEMONSTRATION ONLY
 * ===========================================================================
 * This file lets the frontend run before the Flask backend exists.
 * The restaurants are made up, and the matching below is a simple demo.
 * The real ranking (distance functions and the cuisine TAH) belongs to the
 * backend. Do not copy this logic into production.
 */
import { formatPrice, formatRating } from '../config.js';

// Set to true to test the error message and Retry button.
const SIMULATE_ERROR = false;

// A tiny cuisine "family" list, standing in for the backend's TAH.
const CUISINE_FAMILY = {
  Vietnamese: 'Oriental', Korean: 'Oriental', Chinese: 'Oriental',
  Indian: 'South Asian', Pakistani: 'South Asian',
  Italian: 'European',
  Mexican: 'Latin American',
};

const MOCK_RESTAURANTS = [
  { id: 1, name: 'Pho Corner (sample)', cuisine: 'Vietnamese', city: 'Moscow', state: 'ID', price: 1, rating: 4.0, diningOption: 'Carryout' },
  { id: 2, name: 'Seoul Kitchen (sample)', cuisine: 'Korean', city: 'Moscow', state: 'ID', price: 2, rating: 4.5, diningOption: 'Dine-in and carryout' },
  { id: 3, name: 'Saigon Table (sample)', cuisine: 'Vietnamese', city: 'Pullman', state: 'WA', price: 2, rating: 5.0, diningOption: 'Dine-in and carryout' },
  { id: 4, name: 'Golden Wok (sample)', cuisine: 'Chinese', city: 'Moscow', state: 'ID', price: 2, rating: 4.0, diningOption: 'Dine-in' },
  { id: 5, name: 'Spice Route (sample)', cuisine: 'Indian', city: 'Pullman', state: 'WA', price: 2, rating: 4.5, diningOption: 'Dine-in' },
  { id: 6, name: 'Lahore Grill (sample)', cuisine: 'Pakistani', city: 'Lewiston', state: 'ID', price: 1, rating: 4.0, diningOption: 'Carryout' },
  { id: 7, name: 'Trattoria Verde (sample)', cuisine: 'Italian', city: 'Moscow', state: 'ID', price: 3, rating: 4.5, diningOption: 'Dine-in' },
  { id: 8, name: 'Bella Napoli (sample)', cuisine: 'Italian', city: 'Spokane', state: 'WA', price: 3, rating: 5.0, diningOption: 'Dine-in and carryout' },
];

// Reasons why a restaurant differs from the search. Empty list = exact match.
function differences(r, c) {
  const reasons = [];
  if (r.cuisine !== c.cuisine) reasons.push(`Similar cuisine: ${r.cuisine} instead of ${c.cuisine}`);
  if (r.city !== c.city || r.state !== c.state) reasons.push(`Located in ${r.city} instead of ${c.city}`);
  if (c.maxPrice !== '' && r.price > Number(c.maxPrice)) {
    reasons.push(`Price ${formatPrice(r.price)} is above your maximum of ${formatPrice(c.maxPrice)}`);
  }
  if (r.rating < Number(c.minRating)) {
    reasons.push(`Rated ${formatRating(r.rating)}, below your minimum of ${formatRating(c.minRating)}`);
  }
  return reasons;
}

export async function mockSearchRestaurants(criteria) {
  await new Promise((resolve) => setTimeout(resolve, 600)); // pretend network delay
  if (SIMULATE_ERROR) throw new Error('Demo error: the mock server is "down".');

  // Only same or similar cuisines are considered.
  const family = CUISINE_FAMILY[criteria.cuisine];
  const candidates = MOCK_RESTAURANTS.filter((r) => CUISINE_FAMILY[r.cuisine] === family);

  const exact = [];
  const alternatives = [];
  candidates.forEach((r) => {
    const reasons = differences(r, criteria);
    if (reasons.length === 0) exact.push({ ...r, exact: true, reasons: [] });
    else if (reasons.length <= 2) alternatives.push({ ...r, exact: false, reasons });
  });

  // Demo ordering: exact matches first, then alternatives with fewer differences.
  exact.sort((a, b) => b.rating - a.rating);
  alternatives.sort((a, b) => a.reasons.length - b.reasons.length || b.rating - a.rating);

  return { results: [...exact, ...alternatives] };
}
