import RestaurantCard from './RestaurantCard.jsx';
import StatusPanel from './StatusPanel.jsx';

/* The Saved tab: every restaurant the signed-in user bookmarked. */
export default function SavedPage({ saved, status, errorMessage, onRetry, onToggleSave, onFindRestaurants }) {
  const count = saved.length;

  return (
    <main className="container page">
      <div className="page-head">
        <h1>Your saved restaurants</h1>
        {status === 'ready' && count > 0 && (
          <p>{count} {count === 1 ? 'restaurant' : 'restaurants'}</p>
        )}
      </div>

      {status === 'loading' && <StatusPanel title="Loading your saved restaurants…" loading />}

      {status === 'error' && (
        <StatusPanel title="Your saved restaurants didn't load" tone="error"
          action={{ label: 'Retry', onClick: onRetry }}>
          {errorMessage}
        </StatusPanel>
      )}

      {status === 'ready' && count === 0 && (
        <div className="empty-state">
          <h2>No saved restaurants yet</h2>
          <p>Tap the bookmark on any restaurant to keep it here.</p>
          <button type="button" className="primary-button" onClick={onFindRestaurants}>
            Find restaurants
          </button>
        </div>
      )}

      {status === 'ready' && count > 0 && (
        <ol className="card-grid">
          {saved.map((r) => (
            <RestaurantCard key={r.id} restaurant={{ ...r, exact: true }} saved
              onToggleSave={onToggleSave} />
          ))}
        </ol>
      )}
    </main>
  );
}