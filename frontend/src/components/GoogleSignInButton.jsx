import { useEffect, useRef } from 'react';

// Shows Google's official "Sign in with Google" button.
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCRIPT_URL = 'https://accounts.google.com/gsi/client';

let scriptPromise;

function loadGoogleScript() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error('Could not load Google sign-in. Check your internet connection.'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export default function GoogleSignInButton({ onCredential, onError }) {
  const buttonRef = useRef(null);
  const credentialRef = useRef(onCredential);
  const errorRef = useRef(onError);
  credentialRef.current = onCredential;
  errorRef.current = onError;

  useEffect(() => {
    if (!CLIENT_ID) {
      errorRef.current?.('Google sign-in is not set up yet. Add VITE_GOOGLE_CLIENT_ID to frontend/.env and restart the frontend.');
      return undefined;
    }

    let active = true;
    loadGoogleScript()
      .then(() => {
        if (!active || !buttonRef.current) return;
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (response) => credentialRef.current?.(response.credential),
          ux_mode: 'popup',
        });
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: 280,
        });
      })
      .catch((err) => {
        if (active) errorRef.current?.(err.message);
      });

    return () => {
      active = false;
    };
  }, []);

  return <div ref={buttonRef} className="google-button" />;
}