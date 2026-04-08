import React from "react";
import { FaceDetails } from "../interfaces/imageDataInterface";
import '../styles/facePalette.css';

// Labels for the 4 swatches — index 3 is derived (highlight)
const SWATCH_LABELS = ['Conceal', 'Base', 'Contour', 'Highlight'];

// Derive a highlight from the base colour by lightening it slightly
const deriveHighlight = (baseHex: string): string => {
  try {
    const r = parseInt(baseHex.slice(1, 3), 16);
    const g = parseInt(baseHex.slice(3, 5), 16);
    const b = parseInt(baseHex.slice(5, 7), 16);
    const lighten = (c: number) => Math.min(255, Math.round(c + (255 - c) * 0.45));
    return `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;
  } catch {
    return '#E8C98A';
  }
};

export const FacePalette = ({ colorPalette }: FaceDetails) => {
  // colorPalette is ["#F2C89B", "#BD8453", "#8B5E3C"] from your backend
  // We derive the 4th (highlight) from the base (index 1)
  const swatches = [
    ...colorPalette,
    //  deriveHighlight(colorPalette[1] ?? '#BD8453'),
  ];

  return (
    <div className="fp-section">
      <div>
        {swatches.map((color, index) => (
          <div key={index} style={{display:'flex',margin:'10px 15px'}}>
            <div
              className="fp-swatch-color"
              style={{ background: color }}
              aria-label={`${SWATCH_LABELS[index]}: ${color}`}
            />
            <div className="fp-swatch-label">{SWATCH_LABELS[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};