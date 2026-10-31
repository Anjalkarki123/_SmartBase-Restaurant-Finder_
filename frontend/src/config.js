/*
 * Settings the team can change in one place.
 */

// ---------------------------------------------------------------------------
// Price units
// Our team has not yet confirmed how price is stored in the database.
//   'level'   = a number from 1 to 4, shown as $, $$, $$$, $$$$
//   'dollars' = an average cost per person in dollars, shown as $25
// Change PRICE_UNIT to switch. The form, validation and cards all follow it.
// ---------------------------------------------------------------------------
export const PRICE_UNIT = 'level';

export const PRICE_SETTINGS = {
  level: { label: 'Maximum price (1 to 4)', min: 1, max: 4, step: 1, help: '1 = $, 4 = $$$$' },
  dollars: { label: 'Maximum price per person ($)', min: 1, max: 500, step: 1, help: 'Average cost per person' },
};

export function formatPrice(value) {
  if (value === null || value === undefined || value === '') return 'Not listed';
  return PRICE_UNIT === 'level' ? '$'.repeat(Number(value)) : `$${value}`;
}

export function formatRating(value) {
  return Number(value).toFixed(1);
}

// ---------------------------------------------------------------------------
// Dropdown options
// For now these are fixed lists. Later they can come from the backend
// (see API_CONTRACT.md, "Proposed: GET /api/options").
// ---------------------------------------------------------------------------
export const CUISINES = ['Vietnamese', 'Korean', 'Chinese', 'Indian', 'Pakistani', 'Italian', 'Mexican'];

export const CITIES = [
  { city: 'Moscow', state: 'ID' },
  { city: 'Pullman', state: 'WA' },
  { city: 'Lewiston', state: 'ID' },
  { city: 'Spokane', state: 'WA' },
];

export const cityLabel = (c) => `${c.city}, ${c.state}`;
