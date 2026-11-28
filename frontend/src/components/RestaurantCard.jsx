import { formatDining, formatPrice, formatRating } from '../config.js';

/*
 * One restaurant: name, cuisine and city, rating, price, dining option,
 * a bookmark button to save it, and for alternatives the reasons it was suggested.
 */
export default function RestaurantCard({ restaurant, saved, onToggleSave }) {
  const { name, cuisine, city, state, price, rating, exact, reasons = [] } = restaurant;
  const dining = restaurant.diningOptions ?? restaurant.diningOption;
  const isAlternative = exact === false;

  return (
    <li className={`card ${isAlternative ? 'card-alt' : ''}`}>
      <button type="button" className={`save-button ${saved ? 'save-button-on' : ''}`}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
        onClick={() => onToggleSave(restaurant)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'}
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <path d="M6 4h12v17l-6-4-6 4z" />
        </svg>
      </button>

      <h3 className="card-name">{name}</h3>
      <p className="card-place">{cuisine} in {state ? `${city}, ${state}` : city}</p>

      <div className="card-info">
        <span className="card-rating">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
          </svg>
          {formatRating(rating)}
          <span className="visually-hidden"> out of 5</span>
        </span>
        <span className="card-price">{formatPrice(price)}</span>
      </div>

      {dining && <p className="card-dining">{formatDining(dining)}</p>}

      {/* Reasons come from the backend; the frontend never makes them up. */}
      {isAlternative && reasons.length > 0 && (
        <ul className="card-reasons">
          {reasons.map((reason) => <li key={reason}>{reason}</li>)}
        </ul>
      )}
    </li>
  );
}