import RestaurantCard from './RestaurantCard.jsx';

/*
 * Results in two sections: exact matches, then close alternatives.
 * Each section keeps the backend's order (best first).
 */
function Section({ title, note, restaurants, savedIds, onToggleSave }) {
  if (restaurants.length === 0) return null;
  return (
    <section className="results-section">
      <div className="section-head">
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
      <ol className="card-grid">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} saved={savedIds.has(String(r.id))}
            onToggleSave={onToggleSave} />
        ))}
      </ol>
    </section>
  );
}

export default function ResultsList({ results, savedIds, onToggleSave }) {
  const exact = results.filter((r) => r.exact !== false);
  const alternatives = results.filter((r) => r.exact === false);
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

  return (
    <>
      <Section title="Exact matches"
        note={`${plural(exact.length, 'restaurant')}, highest rated first`}
        restaurants={exact} savedIds={savedIds} onToggleSave={onToggleSave} />
      <Section title="Close alternatives"
        note="One part of your search changed"
        restaurants={alternatives} savedIds={savedIds} onToggleSave={onToggleSave} />
    </>
  );
}