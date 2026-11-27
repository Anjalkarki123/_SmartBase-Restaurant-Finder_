// Sign-in calls to the Flask backend. The backend remembers the user with a session cookie.
const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

// Send Google's token to the backend, which checks it and signs the user in.
export async function signInWithGoogle(credential) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/google`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });
  } catch {
    throw new Error('Could not reach the SmartBase server. Check that the backend is running.');
  }
  const data = await readJson(response);
  if (!response.ok || !data.user) {
    throw new Error(data.error || `Sign-in failed (error ${response.status}).`);
  }
  return data.user;
}

// Ask the backend who is signed in. Returns null if nobody is.
export async function getCurrentUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, { credentials: 'include' });
    if (!response.ok) return null;
    const data = await readJson(response);
    return data.user ?? null;
  } catch {
    return null;
  }
}

// Sign out on the backend and stop Google from auto signing in again.
export async function signOut() {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
  } finally {
    window.google?.accounts?.id?.disableAutoSelect();
  }
}