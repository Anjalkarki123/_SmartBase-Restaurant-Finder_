/* The About tab: what SmartBase does, in plain words. */
export default function AboutPage({ onFindRestaurants }) {
  return (
    <main className="container page">
      <article className="about">
        <h1>About SmartBase</h1>
        <p>
          Most restaurant searches give you nothing when no place matches every choice.
          SmartBase still finds you somewhere to eat.
        </p>

        <h2>How a search works</h2>
        <ol className="about-steps">
          <li>
            <strong>You choose</strong> a cuisine and a city, and if you like, a price and a minimum rating.
          </li>
          <li>
            <strong>Exact matches come first</strong>, with the highest rated at the top.
          </li>
          <li>
            <strong>If few places match</strong>, SmartBase relaxes one part of your search, such as
            a nearby city or a similar cuisine, and shows what it changed.
          </li>
        </ol>

        <h2>Saving restaurants</h2>
        <p>
          Tap the bookmark on any restaurant to save it. Your saved restaurants are tied to your
          Google account, so they are there the next time you sign in.
        </p>

        <h2>Your account</h2>
        <p>
          You sign in with Google. SmartBase stores your name, email address and profile photo,
          and never sees your password.
        </p>

        <button type="button" className="primary-button" onClick={onFindRestaurants}>
          Find restaurants
        </button>
      </article>
    </main>
  );
}