import React from "react";
import { useState } from "react";
import { RootState } from '../redux/store';
import { UserDetails } from "./userDetails";
import { FacePalette } from "./facePalette";
import '../styles/skinDetection.css';
import { useSelector } from "react-redux";

export const SkinDetection = () => {
  const imageData = useSelector((state: RootState) => state.imageReducer.imageData);
  const {colorCode, skinTone,colorPalette} = imageData.data;
  return (
    //Use reusable cards for better structure.
    <div>
      <div className="left-panel-card">
        <UserDetails colorCode={colorCode} skinTone={skinTone}></UserDetails>
        <FacePalette colorPalette={colorPalette}></FacePalette>
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