import { useEffect, useRef, useState } from 'react';

/*
 * Green top bar.
 * Signed out: logo only (the sign-in page is showing).
 * Signed in:  logo, Search / Saved / About tabs, and an account menu with Sign out.
 */
const TABS = [
  { id: 'search', label: 'Search' },
  { id: 'saved', label: 'Saved' },
  { id: 'about', label: 'About' },
];

export default function Header({ user, view, savedCount = 0, onNavigate, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const firstName = user?.name ? user.name.split(' ')[0] : user?.email;

  // Close the account menu when clicking outside it or pressing Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    function handleClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    }
    function handleKey(event) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container header-row">
        <button type="button" className="brand" onClick={() => onNavigate?.('search')}
          aria-label="SmartBase home">
          <svg className="logo" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
            <path d="M8 11h6" />
            <path d="M11 8v6" />
          </svg>
          <span>SmartBase</span>
        </button>

        {user && (
          <nav className="tabs" aria-label="Main">
            {TABS.map((tab) => (
              <button key={tab.id} type="button"
                className={`tab ${view === tab.id ? 'tab-active' : ''}`}
                aria-current={view === tab.id ? 'page' : undefined}
                onClick={() => onNavigate(tab.id)}>
                {tab.label}
                {tab.id === 'saved' && savedCount > 0 && (
                  <span className="tab-count" aria-label={`${savedCount} saved`}>{savedCount}</span>
                )}
              </button>
            ))}
          </nav>
        )}

        {user && (
          <div className="account" ref={menuRef}>
            <button type="button" className="account-button" aria-haspopup="menu"
              aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
              {user.picture ? (
                <img className="avatar" src={user.picture} alt="" width="30" height="30"
                  referrerPolicy="no-referrer" />
              ) : (
                <span className="avatar avatar-fallback" aria-hidden="true">
                  {(firstName || '?').charAt(0).toUpperCase()}
                </span>
              )}
              <span className="account-name">{firstName}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {menuOpen && (
              <div className="account-menu" role="menu">
                <p className="account-email">{user.email}</p>
                <button type="button" role="menuitem" className="menu-item"
                  onClick={() => { setMenuOpen(false); onSignOut(); }}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}