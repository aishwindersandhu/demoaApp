import React from "react";
import { useState } from "react";
import { UserDetails } from "./userDetails";
import { FacePalette } from "./facePalette";
import '../styles/skinDetection.css';

export const SkinDetection = () => {
  return (
    //Use reusable cards for better structure.
    <div>
      <div className="left-panel-card">
        <UserDetails></UserDetails>
        <FacePalette></FacePalette>
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