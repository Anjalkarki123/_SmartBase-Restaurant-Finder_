import { useState } from 'react';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import ResultsSummary from './components/ResultsSummary.jsx';
import ResultsList from './components/ResultsList.jsx';
import StatusPanel from './components/StatusPanel.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import { searchRestaurants, USE_MOCK } from './services/api.js';

/*
 * App holds the page state:
 *   status   'idle' (before any search) | 'loading' | 'success' | 'error'
 *   criteria the last search the user ran (used for the summary and Retry)
 *   results  the list returned by the backend, kept in the backend's order
 */
export default function App() {
  const [status, setStatus] = useState('idle');
  const [criteria, setCriteria] = useState(null);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  async function runSearch(searchCriteria) {
    if (status === 'loading') return; // ignore duplicate submissions
    setCriteria(searchCriteria);
    setStatus('loading');
    setErrorMessage('');
    try {
      const data = await searchRestaurants(searchCriteria);
      setResults(data.results);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  }

  function resetSearch() {
    setStatus('idle');
    setCriteria(null);
    setResults([]);
    setErrorMessage('');
  }

  return (
    <>
      <Header />
      <main className="container page">
        <section className="intro">
          <h1>Find the closest restaurant, even when nothing matches exactly.</h1>
          <p>
            Search by cuisine, city, price, and rating. When no restaurant fits every choice,
            SmartBase suggests the nearest options and tells you why.
          </p>
          {USE_MOCK && <p className="demo-banner">Demo mode: showing sample restaurants, not real data.</p>}
        </section>

        <SearchForm loading={status === 'loading'} onSearch={runSearch} onReset={resetSearch} />

        <section className="results-area" aria-labelledby="results-heading">
          <h2 id="results-heading" className="visually-hidden">Results</h2>

          {status === 'idle' && <HowItWorks />}

          {status === 'loading' && (
            <StatusPanel title="Searching restaurants…" loading />
          )}

          {status === 'error' && (
            <StatusPanel title="The search didn't finish" tone="error"
              action={{ label: 'Retry', onClick: () => runSearch(criteria) }}>
              {errorMessage}
            </StatusPanel>
          )}

          {status === 'success' && (
            <>
              <ResultsSummary criteria={criteria} results={results} />
              {results.length === 0 ? (
                <StatusPanel title="No restaurants found">
                  Nothing matched or came close to this search. Try a different cuisine or
                  city, a higher maximum price, or a lower minimum rating.
                </StatusPanel>
              ) : (
                <ResultsList results={results} />
              )}
            </>
          )}
        </section>
      </main>
      <footer className="footer">
        <div className="container">SmartBase, CS 360 Database Systems, University of Idaho</div>
      </footer>
    </>
  );
}
