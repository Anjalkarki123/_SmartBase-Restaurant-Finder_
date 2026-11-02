import { useRef, useState } from 'react';
import { cityLabel } from '../config.js';

const EMPTY_FORM = { cuisine: '', cityKey: '', maxPrice: '', minRating: '0' };

// Returns an object of error messages; empty object = form is valid.
function validate(form, options) {
  const errors = {};
  if (!options.cuisines.includes(form.cuisine)) errors.cuisine = 'Choose a cuisine.';
  if (!options.cities.some((city) => cityLabel(city) === form.cityKey)) errors.cityKey = 'Choose a city.';

  const rating = Number(form.minRating);
  if (form.minRating === '' || Number.isNaN(rating)) errors.minRating = 'Enter a rating from 0 to 5.';
  else if (rating < 0 || rating > 5) errors.minRating = 'Enter a rating from 0 to 5.';

  return errors;
}

export default function SearchForm({
  loading,
  options,
  optionsLoading,
  optionsError,
  onSearch,
  onReset,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const fieldRefs = { cuisine: useRef(), cityKey: useRef(), minRating: useRef() };

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (optionsLoading) return;
    const found = validate(form, options);
    setErrors(found);
    const firstInvalid = Object.keys(fieldRefs).find((key) => found[key]);
    if (firstInvalid) {
      fieldRefs[firstInvalid].current.focus(); // take keyboard users to the problem
      return;
    }
    const city = options.cities.find((c) => cityLabel(c) === form.cityKey);
    onSearch({
      cuisine: form.cuisine,
      city: city.city,
      state: city.state,
      maxPrice: form.maxPrice === '' ? '' : Number(form.maxPrice),
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
            onChange={(e) => update('cuisine', e.target.value)} disabled={optionsLoading}
            {...errorProps('cuisine')}>
            <option value="">{optionsLoading ? 'Loading options…' : 'Choose a cuisine'}</option>
            {options.cuisines.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.cuisine && <p className="field-error" id="cuisine-error">{errors.cuisine}</p>}
        </div>

        <div className="field">
          <label htmlFor="city">City</label>
          <select id="city" ref={fieldRefs.cityKey} value={form.cityKey}
            onChange={(e) => update('cityKey', e.target.value)} disabled={optionsLoading}
            {...errorProps('cityKey')}>
            <option value="">{optionsLoading ? 'Loading options…' : 'Choose a city'}</option>
            {options.cities.map((c) => <option key={cityLabel(c)} value={cityLabel(c)}>{cityLabel(c)}</option>)}
          </select>
          {errors.cityKey && <p className="field-error" id="cityKey-error">{errors.cityKey}</p>}
        </div>

        <div className="field">
          <label htmlFor="maxPrice">Maximum price</label>
          <select id="maxPrice" value={form.maxPrice}
            onChange={(e) => update('maxPrice', e.target.value)}>
            <option value="">Any price</option>
            <option value="1">Low</option>
            <option value="2">Moderate</option>
            <option value="3">High</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="minRating">Minimum rating (0 to 5)</label>
          <input id="minRating" ref={fieldRefs.minRating} type="number" inputMode="decimal"
            min="0" max="5" step="0.5" value={form.minRating}
            onChange={(e) => update('minRating', e.target.value)} {...errorProps('minRating')} />
          {errors.minRating && <p className="field-error" id="minRating-error">{errors.minRating}</p>}
        </div>
      </div>

      {optionsError && (
        <p className="field-help" role="status">
          Cuisine and city options could not be loaded. Using sample options.
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={loading || optionsLoading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
        <button type="button" className="button" onClick={handleReset} disabled={loading || optionsLoading}>
          Reset
        </button>
      </div>
    </form>
  );
}
