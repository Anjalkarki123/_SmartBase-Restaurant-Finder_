// Shown before the first search, so new users understand what SmartBase does.
const STEPS = [
  { title: 'You search', text: 'Choose a cuisine and a city, and optionally a price and rating.' },
  { title: 'We relax the search', text: 'If nothing fits exactly, we look at nearby cities, similar cuisines, and close prices and ratings.' },
  { title: 'You get ranked matches', text: 'Exact matches come first. Every alternative explains why it was suggested.' },
];

export default function HowItWorks() {
  return (
    <section className="how" aria-labelledby="how-title">
      <h2 id="how-title">How SmartBase finds a match</h2>
      <ol className="steps">
        {STEPS.map((step, index) => (
          <li key={step.title} className="step">
            <span className="step-number" aria-hidden="true">{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
