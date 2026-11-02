export function formatPrice(value) {
  if (value === null || value === undefined || value === '') return 'Not listed';

  const prices = {
    '1': 'Low',
    '2': 'Moderate',
    '3': 'High',
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
  };
  return prices[String(value).trim().toLowerCase()] ?? 'Not listed';
}

export function formatRating(value) {
  return Number(value).toFixed(1);
}

export const FALLBACK_CUISINES = [
  'Vietnamese', 'Korean', 'Chinese', 'Indian', 'Pakistani', 'Italian', 'Mexican',
];

export const FALLBACK_CITIES = [
  { city: 'New York', state: 'NY' },
  { city: 'Moscow', state: 'ID' },
  { city: 'Lewiston', state: 'ID' },
  { city: 'Boise', state: 'ID' },
  { city: "Coeur d'Alene", state: 'ID' },
];

export const cityLabel = (c) => `${c.city}, ${c.state}`;
