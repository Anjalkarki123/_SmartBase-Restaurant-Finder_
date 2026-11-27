// Top bar: logo on the left; Sign in button, or the user's photo, name and Sign out on the right.
export default function Header({ user, onSignIn, onSignOut, onHome }) {
  const firstName = user?.name ? user.name.split(' ')[0] : user?.email;

  return (
    <header className="site-header">
      <div className="container header-row">
        <button type="button" className="brand-row brand-link" onClick={onHome} aria-label="SmartBase home">
          <svg className="logo" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
            <path d="M8 11h6" />
            <path d="M11 8v6" />
          </svg>
          <span className="brand-text">
            <span className="brand">SmartBase</span>
            <span className="tagline">Find your restaurant—or the closest match.</span>
          </span>
        </button>

        <div className="account">
          {user ? (
            <>
              <span className="user-chip">
                {user.picture ? (
                  <img className="avatar" src={user.picture} alt="" width="32" height="32"
                    referrerPolicy="no-referrer" />
                ) : (
                  <span className="avatar avatar-fallback" aria-hidden="true">
                    {(firstName || '?').charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="user-name">{firstName}</span>
              </span>
              <button type="button" className="button button-small" onClick={onSignOut}>Sign out</button>
            </>
          ) : (
            <button type="button" className="button button-small" onClick={onSignIn}>Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
}