import { useRef, useState } from 'react';
import { CUISINES, CITIES, cityLabel, PRICE_UNIT, PRICE_SETTINGS } from '../config.js';

const EMPTY_FORM = { cuisine: '', cityKey: '', maxPrice: '', minRating: '0' };
const price = PRICE_SETTINGS[PRICE_UNIT];

// Returns an object of error messages; empty object = form is valid.
function validate(form) {
  const errors = {};
  if (!form.cuisine) errors.cuisine = 'Choose a cuisine.';
  if (!form.cityKey) errors.cityKey = 'Choose a city.';

  if (form.maxPrice !== '') {
    const value = Number(form.maxPrice);
    if (Number.isNaN(value)) errors.maxPrice = 'Enter a number.';
    else if (value < price.min || value > price.max) errors.maxPrice = `Enter a value from ${price.min} to ${price.max}.`;
    else if (PRICE_UNIT === 'level' && !Number.isInteger(value)) errors.maxPrice = 'Enter a whole number.';
  }

  const rating = Number(form.minRating);
  if (form.minRating === '' || Number.isNaN(rating)) errors.minRating = 'Enter a rating from 0 to 5.';
  else if (rating < 0 || rating > 5) errors.minRating = 'Enter a rating from 0 to 5.';

  return errors;
}

export default function SearchForm({ loading, onSearch, onReset }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const fieldRefs = { cuisine: useRef(), cityKey: useRef(), maxPrice: useRef(), minRating: useRef() };

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(fieldRefs).find((key) => found[key]);
    if (firstInvalid) {
      fieldRefs[firstInvalid].current.focus(); // take keyboard users to the problem
      return;
    }
    const city = CITIES.find((c) => cityLabel(c) === form.cityKey);
    onSearch({
      cuisine: form.cuisine,
      city: city.city,
      state: city.state,
      maxPrice: form.maxPrice,
      minRating: form.minRating,
    });
  }

  function handleReset() {
    setForm(EMPTY_FORM);
    setErrors({});
    onReset();
  }

  // Helper: props that connect an input to its error message for screen readers.
  const errorProps = (field) => ({
    'aria-invalid': errors[field] ? 'true' : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate aria-label="Restaurant search">
      <div className="field-grid">
        <div className="field">
          <label htmlFor="cuisine">Cuisine</label>
          <select id="cuisine" ref={fieldRefs.cuisine} value={form.cuisine}
            onChange={(e) => update('cuisine', e.target.value)} {...errorProps('cuisine')}>
            <option value="">Choose a cuisine</option>
            {CUISINES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.cuisine && <p className="field-error" id="cuisine-error">{errors.cuisine}</p>}
        </div>

        <div className="field">
          <label htmlFor="city">City</label>
          <select id="city" ref={fieldRefs.cityKey} value={form.cityKey}
            onChange={(e) => update('cityKey', e.target.value)} {...errorProps('cityKey')}>
            <option value="">Choose a city</option>
            {CITIES.map((c) => <option key={cityLabel(c)} value={cityLabel(c)}>{cityLabel(c)}</option>)}
          </select>
          {errors.cityKey && <p className="field-error" id="cityKey-error">{errors.cityKey}</p>}
        </div>

        <div className="field">
          <label htmlFor="maxPrice">{price.label}</label>
          <input id="maxPrice" ref={fieldRefs.maxPrice} type="number" inputMode="numeric"
            min={price.min} max={price.max} step={price.step} placeholder="Any price"
            value={form.maxPrice} onChange={(e) => update('maxPrice', e.target.value)}
            {...errorProps('maxPrice')} />
          {errors.maxPrice
            ? <p className="field-error" id="maxPrice-error">{errors.maxPrice}</p>
            : <p className="field-help">{price.help}. Leave empty for any price.</p>}
        </div>

        <div className="field">
          <label htmlFor="minRating">Minimum rating (0 to 5)</label>
          <input id="minRating" ref={fieldRefs.minRating} type="number" inputMode="decimal"
            min="0" max="5" step="0.5" value={form.minRating}
            onChange={(e) => update('minRating', e.target.value)} {...errorProps('minRating')} />
          {errors.minRating && <p className="field-error" id="minRating-error">{errors.minRating}</p>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
        <button type="button" className="button" onClick={handleReset} disabled={loading}>
          Reset
        </button>
      </div>
    </form>
  );
}
