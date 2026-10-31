export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <div className="brand-row">
          <svg className="logo" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
            <path d="M8 11h6" />
            <path d="M11 8v6" />
          </svg>
          <div>
            <p className="brand">SmartBase</p>
            <p className="tagline">Find your restaurant—or the closest match.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
