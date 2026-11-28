/*
 * Saved restaurants for the signed-in user.
 * The backend knows who the user is from the sign-in session cookie.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { credentials: 'include', ...options });
  } catch {
    throw new Error('Could not reach the SmartBase server. Check that the backend is running.');
  }
  let data = {};
  try {
    data = await response.json();
  } catch {
    // Some responses have no body.
  }
  if (!response.ok) {
    throw new Error(data.error || `The server could not update your saved restaurants (error ${response.status}).`);
  }
  return data;
}

/** All restaurants the user saved, newest first. */
export async function getSaved() {
  const data = await request('/api/saved');
  return Array.isArray(data.results) ? data.results : [];
}

/** Save one restaurant. */
export function saveRestaurant(restaurantId) {
  return request('/api/saved', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ restaurantId: String(restaurantId) }),
  });
}

/** Remove one restaurant from saved. */
export function unsaveRestaurant(restaurantId) {
  return request(`/api/saved/${encodeURIComponent(restaurantId)}`, { method: 'DELETE' });
}