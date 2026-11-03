# SmartBase frontend

React + Vite frontend for SmartBase: A Cooperative Restaurant Finder (CS 360, University of Idaho).

## Run

```bash
npm install          # PowerShell: npm.cmd install
npm run dev          # PowerShell: npm.cmd run dev
```

Open http://localhost:5180

## Demo mode

`USE_MOCK = true` in `src/services/api.js` uses demo restaurants from `src/services/mockApi.js`.

## Connect to the Flask backend

1. Start Flask on port 5000 (Vite forwards `/api` there, see `vite.config.js`).
2. Set `USE_MOCK = false` in `src/services/api.js`.
3. The backend must return results with `id`, `name`, `cuisine`, `city`,
   `price`, `rating`, `exact` (true/false), `reasons` (list), and optionally `state` and `diningOption`.

## Structure

```
src/
├── main.jsx             starts React
├── App.jsx              page state: idle, loading, success, error
    ├── config.js            price units, dropdown lists, formatting
    ├── styles.css           all styles (colors at the top)
    ├── services/
    │   ├── api.js           the only code that talks to the backend
    │   └── mockApi.js       demo options and restaurant data
    └── components/
    ├── Header.jsx          logo and app name
        ├── SearchForm.jsx   fields, validation, Search and Reset
    ├── ResultsSummary.jsx
    ├── ResultsList.jsx
    ├── RestaurantCard.jsx
    └── StatusPanel.jsx
```

## Build for hosting

```bash
npm run build
```

Upload `dist/`. Set `VITE_API_URL` (see `.env.example`) to the hosted backend address.
