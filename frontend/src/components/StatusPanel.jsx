// One box used for the initial, loading, error and no-results states.
export default function StatusPanel({ title, children, tone, loading, action }) {
  return (
    <div className={`status ${tone === 'error' ? 'status-error' : ''}`}
      role={tone === 'error' ? 'alert' : 'status'}>
      {loading && <span className="spinner" aria-hidden="true" />}
      <div>
        <p className="status-title">{title}</p>
        {children && <p className="status-text">{children}</p>}
        {action && (
          <button type="button" className="button" onClick={action.onClick}>{action.label}</button>
        )}
      </div>
    </div>
  );
}
