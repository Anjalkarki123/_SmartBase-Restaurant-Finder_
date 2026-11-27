import { useState } from 'react';
import GoogleSignInButton from './GoogleSignInButton.jsx';
import StatusPanel from './StatusPanel.jsx';
import { signInWithGoogle } from '../services/auth.js';

// Sign-in page using Google single sign-on (SSO). No passwords are stored.
export default function LoginPage({ onSignedIn }) {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleCredential(credential) {
    setStatus('loading');
    setErrorMessage('');
    try {
      const user = await signInWithGoogle(credential);
      onSignedIn(user);
    } catch (err) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  }

  function handleGoogleError(message) {
    setErrorMessage(message);
    setStatus('error');
  }

  return (
    <main className="container page">
      <section className="login-card" aria-labelledby="login-heading">
        <div className="login-text">
          <h1 id="login-heading">Sign in to SmartBase</h1>
          <p>
            Sign in with your Google account to start finding restaurants. SmartBase never
            sees your password.
          </p>
        </div>

        <GoogleSignInButton onCredential={handleCredential} onError={handleGoogleError} />

        {status === 'loading' && <StatusPanel title="Signing you in…" loading />}
        {status === 'error' && (
          <StatusPanel title="Sign-in didn't finish" tone="error">{errorMessage}</StatusPanel>
        )}
      </section>
    </main>
  );
}