# SmartBase frontend

React + Vite frontend for SmartBase: A Cooperative Restaurant Finder (CS 360, University of Idaho).

## Run

```bash
npm install          # PowerShell: npm.cmd install
npm run dev          # PowerShell: npm.cmd run dev
```

Open http://localhost:5180

## Demo mode

`USE_MOCK = true` in `src/services/api.js` uses sample restaurants from `src/services/mockApi.js`.

| Try | Result |
|---|---|
| Vietnamese, Pullman, WA | An exact match, plus alternatives |
| Vietnamese, Moscow, ID, min rating 4.5 | Alternatives only, each with reasons |
| Mexican, any city | No restaurants found |

Set `SIMULATE_ERROR = true` in `mockApi.js` to test the error message and Retry button.

## Connect to the Flask backend

1. Start Flask on port 5000 (Vite forwards `/api` there, see `vite.config.js`).
2. Set `USE_MOCK = false` in `src/services/api.js`.
3. The backend must follow `../API_CONTRACT.md`: each result has `id`, `name`, `cuisine`, `city`,
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
│   └── mockApi.js       sample data for demos
└── components/
    ├── Header.jsx          logo and app name
    ├── HowItWorks.jsx      3-step explanation before the first search
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
