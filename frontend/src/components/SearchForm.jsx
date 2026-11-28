import { useRef, useState } from 'react';
import { cityLabel } from '../config.js';

/*
 * One-row search bar (cuisine, city, Search) with price and rating
 * filters as buttons underneath.
 */
const PRICE_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: 'Low' },
  { value: '2', label: 'Moderate' },
  { value: '3', label: 'High' },
];

const RATING_OPTIONS = [
  { value: '0', label: 'Any' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '4.5', label: '4.5+' },
];

export const EMPTY_FORM = { cuisine: '', cityKey: '', maxPrice: '', minRating: '0' };

// Returns an object of error messages; an empty object means the form is valid.
function validate(form, options) {
  const errors = {};
  if (!options.cuisines.includes(form.cuisine)) errors.cuisine = 'Choose a cuisine.';
  if (!options.cities.some((city) => cityLabel(city) === form.cityKey)) errors.cityKey = 'Choose a city.';
  return errors;
}

function ChoiceGroup({ label, options, value, onChange }) {
  return (
    <div className="filter-row" role="group" aria-label={label}>
      <span className="filter-label">{label}</span>
      {options.map((option) => (
        <button key={option.value} type="button"
          className={`chip ${value === option.value ? 'chip-on' : ''}`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}

// The form's values live in App (form, onFormChange) so they are kept when you switch tabs.
export default function SearchForm({
  form, onFormChange, loading, options, optionsLoading, optionsError, onSearch, onReset,
}) {
  const [errors, setErrors] = useState({});
  const fieldRefs = { cuisine: useRef(), cityKey: useRef() };

  function update(field, value) {
    onFormChange((f) => ({ ...f, [field]: value }));
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
    onFormChange(EMPTY_FORM);
    setErrors({});
    onReset();
  }

  const errorProps = (field) => ({
    'aria-invalid': errors[field] ? 'true' : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  return (
    <form className="search" onSubmit={handleSubmit} noValidate aria-label="Restaurant search">
      <div className="search-bar">
        <div className={`search-field ${errors.cuisine ? 'search-field-error' : ''}`}>
          <label htmlFor="cuisine">Cuisine</label>
          <select id="cuisine" ref={fieldRefs.cuisine} value={form.cuisine}
            onChange={(e) => update('cuisine', e.target.value)} disabled={optionsLoading}
            {...errorProps('cuisine')}>
            <option value="">{optionsLoading ? 'Loading…' : 'Choose a cuisine'}</option>
            {options.cuisines.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className={`search-field ${errors.cityKey ? 'search-field-error' : ''}`}>
          <label htmlFor="city">City</label>
          <select id="city" ref={fieldRefs.cityKey} value={form.cityKey}
            onChange={(e) => update('cityKey', e.target.value)} disabled={optionsLoading}
            {...errorProps('cityKey')}>
            <option value="">{optionsLoading ? 'Loading…' : 'Choose a city'}</option>
            {options.cities.map((c) => (
              <option key={cityLabel(c)} value={cityLabel(c)}>{cityLabel(c)}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="search-button" disabled={loading || optionsLoading}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      {(errors.cuisine || errors.cityKey) && (
        <div className="search-errors">
          {errors.cuisine && <p className="field-error" id="cuisine-error">{errors.cuisine}</p>}
          {errors.cityKey && <p className="field-error" id="cityKey-error">{errors.cityKey}</p>}
        </div>
      )}

      <ChoiceGroup label="Price" options={PRICE_OPTIONS} value={form.maxPrice}
        onChange={(value) => update('maxPrice', value)} />

      <div className="filter-last">
        <ChoiceGroup label="Rating" options={RATING_OPTIONS} value={form.minRating}
          onChange={(value) => update('minRating', value)} />
        <button type="button" className="link-button" onClick={handleReset} disabled={loading}>
          Reset
        </button>
      </div>

      {optionsError && (
        <p className="field-help" role="status">
          Cuisine and city options could not be loaded. Using sample options.
        </p>
      )}
    </form>
  );
}