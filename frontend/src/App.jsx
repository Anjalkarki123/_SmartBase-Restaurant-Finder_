import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SearchForm, { EMPTY_FORM } from './components/SearchForm.jsx';
import ResultsSummary from './components/ResultsSummary.jsx';
import ResultsList from './components/ResultsList.jsx';
import StatusPanel from './components/StatusPanel.jsx';
import LoginPage from './components/LoginPage.jsx';
import SavedPage from './components/SavedPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import { getOptions, searchRestaurants } from './services/api.js';
import { getCurrentUser, signOut } from './services/auth.js';
import { getSaved, saveRestaurant, unsaveRestaurant } from './services/saved.js';
import { FALLBACK_CITIES, FALLBACK_CUISINES } from './config.js';

/*
 * App holds the page state:
 *   user          the signed-in Google user, or null
 *   authChecked   false until we know whether someone is already signed in
 *   view          'search' | 'saved' | 'about'
 *   status        'idle' | 'loading' | 'success' | 'error' for the search
 *   saved         the user's saved restaurants, newest first
 *
 * The app opens on the sign-in page. The other pages show only after sign-in.
 */
export default function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [view, setView] = useState('search');

  const [options, setOptions] = useState({ cuisines: [], cities: [] });
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState(false);

  const [searchForm, setSearchForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');
  const [criteria, setCriteria] = useState(null);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [saved, setSaved] = useState([]);
  const [savedStatus, setSavedStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [savedError, setSavedError] = useState('');
  const [notice, setNotice] = useState('');

  const savedIds = useMemo(() => new Set(saved.map((r) => String(r.id))), [saved]);

  // On start, ask the backend whether someone is already signed in (session cookie).
  useEffect(() => {
    let active = true;
    getCurrentUser().then((currentUser) => {
      if (!active) return;
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => {
      active = false;
    };
  }, []);

  // After sign-in, load the search options and the saved restaurants.
  useEffect(() => {
    if (!user) return undefined;
    let active = true;

    setOptionsLoading(true);
    getOptions()
      .then((loadedOptions) => {
        if (active) setOptions(loadedOptions);
      })
      .catch(() => {
        if (!active) return;
        setOptions({ cuisines: FALLBACK_CUISINES, cities: FALLBACK_CITIES });
        setOptionsError(true);
      })
      .finally(() => {
        if (active) setOptionsLoading(false);
      });

    loadSaved(() => active);

    return () => {
      active = false;
    };
  }, [user]);

  // Hide the small notice after a few seconds.
  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(''), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  function loadSaved(isActive = () => true) {
    setSavedStatus('loading');
    setSavedError('');
    getSaved()
      .then((list) => {
        if (!isActive()) return;
        setSaved(list);
        setSavedStatus('ready');
      })
      .catch((err) => {
        if (!isActive()) return;
        setSavedError(err.message);
        setSavedStatus('error');
      });
  }

  // Save or unsave right away on screen, then tell the backend. Undo if the backend fails.
  async function toggleSave(restaurant) {
    const id = String(restaurant.id);
    const wasSaved = savedIds.has(id);
    const before = saved;

    setSaved(wasSaved ? saved.filter((r) => String(r.id) !== id) : [restaurant, ...saved]);
    try {
      if (wasSaved) await unsaveRestaurant(id);
      else await saveRestaurant(id);
    } catch (err) {
      setSaved(before);
      setNotice(err.message);
    }
  }

  async function handleSignOut() {
    await signOut();
    setUser(null);
    setView('search');
    setSaved([]);
    setSearchForm(EMPTY_FORM);
    resetSearch();
  }

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

  // 1. Still checking whether someone is signed in.
  if (!authChecked) {
    return (
      <>
        <Header />
        <main className="container page">
          <StatusPanel title="Loading SmartBase…" loading />
        </main>
      </>
    );
  }

  // 2. Nobody signed in: the sign-in page comes first.
  if (!user) {
    return (
      <>
        <Header />
        <LoginPage onSignedIn={setUser} />
      </>
    );
  }

  const firstName = user.name ? user.name.split(' ')[0] : '';
  const header = (
    <Header user={user} view={view} savedCount={saved.length}
      onNavigate={setView} onSignOut={handleSignOut} />
  );
  const noticeBar = notice && <p className="notice" role="alert">{notice}</p>;

  // 3. Saved page.
  if (view === 'saved') {
    return (
      <>
        {header}
        {noticeBar}
        <SavedPage saved={saved} status={savedStatus} errorMessage={savedError}
          onRetry={() => loadSaved()} onToggleSave={toggleSave}
          onFindRestaurants={() => setView('search')} />
      </>
    );
  }

  // 4. About page.
  if (view === 'about') {
    return (
      <>
        {header}
        <AboutPage onFindRestaurants={() => setView('search')} />
      </>
    );
  }

  // 5. Search page.
  return (
    <>
      {header}
      {noticeBar}
      <section className="hero">
        <div className="container">
          <h1>{firstName ? `Hi ${firstName}, where do you want to eat?` : 'Where do you want to eat?'}</h1>
          <p className="hero-text">We'll find an exact match, or the closest restaurants and why.</p>
          <SearchForm
            form={searchForm}
            onFormChange={setSearchForm}
            loading={status === 'loading'}
            options={options}
            optionsLoading={optionsLoading}
            optionsError={optionsError}
            onSearch={runSearch}
            onReset={resetSearch}
          />
        </div>
      </section>

      <main className="container page">
        {status === 'idle' && (
          <div className="empty-state">
            <h2>Start with a cuisine and a city</h2>
            <p>Your results appear here. Use the bookmark on any restaurant to save it for later.</p>
          </div>
        )}

        {status === 'loading' && <StatusPanel title="Searching restaurants…" loading />}

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
                city, a higher price, or a lower rating.
              </StatusPanel>
            ) : (
              <ResultsList results={results} savedIds={savedIds} onToggleSave={toggleSave} />
            )}
          </>
        )}
      </main>
    </>
  );
}