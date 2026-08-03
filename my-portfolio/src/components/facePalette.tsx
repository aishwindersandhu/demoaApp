import { FaceDetails } from "../interfaces/imageDataInterface";
import '../styles/facePalette.css';
import { CopyButton } from "./copyButton";

// Labels for the 4 swatches — index 3 is derived (highlight)
const SWATCH_LABELS = ['Conceal', 'Base', 'Contour', 'Highlight'];



/** Displays the 4 recommended makeup swatches (Conceal/Base/Contour/Highlight) with copyable hex codes. */
export const FacePalette = ({ colorPalette }: FaceDetails) => {
  // Copied so the source array from Redux state isn't mutated by consumers.
  const swatches = [
    ...colorPalette,
  ];

  return (
    <div className="fp-section">
      <div>
        {swatches.map((color, index) => (
          <div key={index} style={{ display: 'flex', margin: '10px 15px' }}>
            <div
              className="fp-swatch-color"
              style={{ background: color }}
              aria-label={`${SWATCH_LABELS[index]}: ${color}`}
            />
            <div className="fp-swatch-label">
              <div>
                <div>{SWATCH_LABELS[index]} </div>
                <div>{color}</div>
              </div>
              <CopyButton hex={color}></CopyButton>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
};