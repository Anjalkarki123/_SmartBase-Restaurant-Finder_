import { formatPrice, formatRating } from '../config.js';

export default function RestaurantCard({ restaurant }) {
  const { name, cuisine, city, state, price, rating, diningOption, exact, reasons = [] } = restaurant;
  const isExact = exact === true;

  return (
    <li className={`card ${isExact ? 'card-exact' : 'card-alt'}`}>
      <div className="card-top">
        <h3>{name}</h3>
        <span className={`badge ${isExact ? 'badge-exact' : 'badge-alt'}`}>
          {isExact ? 'Exact match' : 'Suggested alternative'}
        </span>
      </div>

      <dl className="details">
        <div><dt>Cuisine</dt><dd>{cuisine}</dd></div>
        <div><dt>Location</dt><dd>{state ? `${city}, ${state}` : city}</dd></div>
        <div><dt>Price</dt><dd>{formatPrice(price)}</dd></div>
        <div><dt>Rating</dt><dd>{formatRating(rating)} / 5</dd></div>
        {diningOption && <div><dt>Dining</dt><dd>{diningOption}</dd></div>}
      </dl>

      {/* Reasons come from the backend; the frontend never makes them up. */}
      {!isExact && reasons.length > 0 && (
        <div className="reasons">
          <p className="reasons-title">Why it's suggested</p>
          <ul>
            {reasons.map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
        </div>
      )}
    </li>
  );
}
