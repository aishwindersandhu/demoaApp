import React from "react";
import '../styles/facePalette.css';



export const FacePalette = () => {
  return (
  <div className="palette-section">
    <div style={{ textAlign: 'left', marginLeft: '10px' }} className="card-headers"> Your Palette</div>
    <div style={{ display: 'flex', marginLeft: '10px' }}>
      <div> <div className="palette-color-pan"></div><div className="palette-pan-name">Base</div></div>
      <div> <div className="palette-color-pan"></div> <div className="palette-pan-name">Conceal</div></div>
      <div>
        <div className="palette-color-pan"></div>
        <div className="palette-pan-name">Contour</div>
      </div>
    </div>
  </div>
  );
}