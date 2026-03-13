import React from "react";
import { useState } from "react";
import '../styles/skinDetection.css'

export const SkinDetection = () => {
  return (
    //Use reusable cards for better structure.
    <div>
      <div className="left-panel-card">
        {/* user section */}
        <div className="user-section">
          <div className="user-image">
            <div className="skin-tone"></div>
          </div>
          <div style={{ width: '50%' }}>
            <div>Shade name</div>
            <div>Shade Hex </div>
            <div>UnderTone </div>
          </div>
          <div></div>
        </div>
          {/* Palette section */}
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
        {/* CTA buttons */}
        <div className="buttons-section">
            <div className="cta-button-blue">Generate Analysis</div>
            <div className="cta-button-gray">Save Profile</div>
        </div>
      </div>
      {/* Warm Tone suggestions */}
      {/* cool tone suggestions */} 

      {/* TO-DO: Get independent components, lift state in redux, make the components dynamic */}
    </div>
  )
}