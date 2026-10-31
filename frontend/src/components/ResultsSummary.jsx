import { formatPrice, formatRating } from '../config.js';

export default function ResultsSummary({ criteria, results }) {
  const exactCount = results.filter((r) => r.exact).length;
  const altCount = results.length - exactCount;

  let countText;
  if (results.length === 0) countText = 'No results';
  else if (exactCount === 0) countText = `No exact matches. ${altCount} suggested ${altCount === 1 ? 'alternative' : 'alternatives'}.`;
  else countText = `${exactCount} exact ${exactCount === 1 ? 'match' : 'matches'}`
    + (altCount ? ` and ${altCount} suggested ${altCount === 1 ? 'alternative' : 'alternatives'}.` : '.');

  return (
    <div className="summary" aria-live="polite">
      <dl className="criteria">
        <div><dt>Cuisine</dt><dd>{criteria.cuisine}</dd></div>
        <div><dt>City</dt><dd>{criteria.city}, {criteria.state}</dd></div>
        <div><dt>Max price</dt><dd>{criteria.maxPrice === '' ? 'Any' : formatPrice(criteria.maxPrice)}</dd></div>
        <div><dt>Min rating</dt><dd>{formatRating(criteria.minRating)}</dd></div>
      </dl>
      <p className="count">{countText}</p>
    </div>
  );
}
