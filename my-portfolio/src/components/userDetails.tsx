import { FaceDetails } from "../interfaces/imageDataInterface";
import '../styles/userDetails.css';

export const UserDetails = ({ colorCode, skinTone }: FaceDetails) => {

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
    </div>
  );
};