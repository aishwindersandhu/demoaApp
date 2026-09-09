import '../styles/matchLoader.css';

const STEPS = ["Comparing your tone", "Filtering best shades", "Building your shelf"];

/** In-panel loading state shown on the Makeup board while product recommendations are being fetched. */
export const MatchLoader = () => (
  <div className="card-container match-loader">
    <div className="match-loader-spinner">
      <svg className="match-loader-spinner__svg" width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="23" fill="none" stroke="var(--border-soft)" strokeWidth="3" />
        <circle
          className="match-loader-spinner__arc"
          cx="28" cy="28" r="23"
          fill="none" stroke="var(--warn-accent)" strokeWidth="3"
          strokeDasharray="145" strokeDashoffset="145"
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
        />
      </svg>
      <div className="match-loader-spinner__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--warn-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>
    </div>

    <h2 className="match-loader-title">Finding your matches</h2>
    <p className="match-loader-sub">Comparing your tone against our product catalogue…</p>

    <div className="match-loader-steps">
      {STEPS.map((label, i) => (
        <div key={label} className="match-loader-step" style={{ animationDelay: `${i * 0.5}s` }}>
          <div className="match-loader-step__dot" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  </div>
);
