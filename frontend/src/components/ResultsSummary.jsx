import { formatPrice } from '../config.js';

/* One line that repeats what was searched for, read out to screen readers when it changes. */
export default function ResultsSummary({ criteria, results }) {
  const parts = [`${criteria.cuisine} in ${criteria.city}, ${criteria.state}`];
  if (criteria.maxPrice !== '') parts.push(`up to ${formatPrice(criteria.maxPrice)}`);
  if (Number(criteria.minRating) > 0) parts.push(`rated ${criteria.minRating}+`);

  return (
    <p className="summary" aria-live="polite">
      {results.length} {results.length === 1 ? 'result' : 'results'} for <strong>{parts.join(', ')}</strong>
    </p>
  );
}