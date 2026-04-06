import React from "react";
import { useState } from "react";
import { RootState } from '../redux/store';
import { UserDetails } from "./userDetails";
import { FacePalette } from "./facePalette";
import '../styles/skinDetection.css';
import { useSelector } from "react-redux";

export const SkinDetection = ({image : string,data: any}) => {
  const imageData = useSelector((state: RootState) => state.imageReducer.imageData);
  const {colorCode, skinTone,colorPalette} = imageData.data;
  const mockColorPalette =["#313131","#FF00FF","#EFEFEF","#FFD700"]
  return (
    //Use reusable cards for better structure.
    <div style={{margin:'50px 0px 50px 0px',width:'1500px'}}>
      <div className="left-panel-card">
        <UserDetails colorCode={colorCode} skinTone={skinTone}></UserDetails>
        <FacePalette colorPalette={mockColorPalette}></FacePalette>
        {/* <div className="buttons-section">
          <div className="cta-button-blue">Generate Analysis</div>
          <div className="cta-button-gray">Save Profile</div>
        </div> */}
      </div>
      {/* Warm Tone suggestions */}
      {/* cool tone suggestions */}

      {/* TO-DO: Get independent components, lift state in redux, make the components dynamic */}
    </div>
  )
}