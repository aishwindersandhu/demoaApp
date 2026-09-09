import '../styles/comingSoon.css';

// Same decorative gradient used on the loading/upload screens, kept here for brand consistency.
const TONE_STRIP = ["#F5CBA7", "#E59866", "#CA6F1E", "#A04000", "#784212", "#4A235A", "#2C1810"];

/** Empty-state placeholder for boards that don't have real content yet (currently: Products). */
export const ComingSoon = () => (
  <div className="card-container coming-soon">
    <div className="coming-soon-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--warn-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    </div>
    <div className="coming-soon-badge">In the works</div>
    <h2 className="coming-soon-title">Products, coming soon</h2>
    <p className="coming-soon-sub">
      A full product catalogue to browse alongside your personalised picks. In the meantime, check out your Makeup recommendations.
    </p>
    <div className="coming-soon-tone-strip">
      {TONE_STRIP.map((color, i) => (
        <span key={i} style={{ background: color }} />
      ))}
    </div>
  </div>
);
