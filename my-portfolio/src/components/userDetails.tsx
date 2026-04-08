import { useTheme } from '../ThemeContext';
import { FaceDetails } from "../interfaces/imageDataInterface";
import '../styles/userDetails.css';

export const UserDetails = ({ colorCode, skinTone }: FaceDetails) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="ud-row">
      {/* Avatar filled with detected tone */}
      <div className="ud-avatar" style={{ background: colorCode }}>
        <div className="ud-avatar-ring" style={{ borderColor: colorCode }} />
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="12" r="6" fill="rgba(255,255,255,0.6)" />
          <path d="M4 30c0-7 5-11 12-11s12 4 12 11" fill="rgba(255,255,255,0.6)" />
        </svg>
      </div>

      <div className="ud-info">
        <h2 className="ud-name">{skinTone}</h2>
        <p className="ud-hex">{colorCode}</p>
        <p className="ud-pill">
          <span className="ud-dot" style={{ background: colorCode }} />
          Warm undertone
        </p>
      </div>

      {/* Theme toggle lives here, top-right of the hero */}
      {/* <button
        className="ud-theme-btn"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.2 3.2l1 1M11.8 11.8l1 1M11.8 3.2l-1 1M3.2 11.8l1 1" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M12 8.8A5 5 0 1 1 7.2 4a4 4 0 0 0 4.8 4.8z" />
          </svg>
        )}
      </button> */}
    </div>
  );
};