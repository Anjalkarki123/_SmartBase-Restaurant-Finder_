import RestaurantCard from './RestaurantCard.jsx';

// Shows results exactly in the order the backend sent them (best first).
export default function ResultsList({ results }) {
  return (
    <ol className="results" aria-label="Restaurants, best match first">
      {results.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
    </ol>
  );
}
