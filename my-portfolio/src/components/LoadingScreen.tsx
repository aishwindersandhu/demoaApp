import "../styles/LoadingScreen.css"

// Decorative skin-tone gradient shown along the bottom of the loading screen.
const TONE_STRIP = ["#F5CBA7", "#E59866", "#CA6F1E", "#A04000", "#784212", "#4A235A", "#2C1810"];

// Text labels for the animated step list — purely visual, not tied to real backend progress.
const STEPS = [
  "Detecting skin regions",
  "Classifying undertone",
  "Building your colour palette",
];

/** Full-screen animated loading state shown while the face analysis request is in flight. */
export const LoadingScreen = () => (
  <div className="loading-screen">

    <div className="loading-spinner">
      <svg className="loading-spinner__svg" width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="30" fill="none" stroke="#EDE8E1" strokeWidth="3" />
        <circle
          className="loading-spinner__arc"
          cx="36" cy="36" r="30"
          fill="none" stroke="#8B6355" strokeWidth="3"
          strokeDasharray="188" strokeDashoffset="188"
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
      </svg>
      <div className="loading-spinner__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B6355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </div>
    </div>

    <div className="loading-text">
      <h2 className="loading-text__heading">Analysing your palette</h2>
      <p className="loading-text__sub">
        Detecting skin tone, undertone & contrast — this takes just a moment
      </p>
    </div>

    <div className="loading-steps">
      {STEPS.map((label, i) => (
        <div
          key={label}
          className="loading-step"
          style={{ animationDelay: `${i * 0.6}s` }}
        >
          <div className="loading-step__dot" />
          <span className="loading-step__label">{label}</span>
        </div>
      ))}
    </div>

    <div className="loading-tone-strip">
      {TONE_STRIP.map((color, i) => (
        <div key={i} className="loading-tone-strip__swatch" style={{ background: color }} />
      ))}
    </div>

  </div>
);