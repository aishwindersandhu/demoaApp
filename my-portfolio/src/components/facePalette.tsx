import React from "react";
import '../styles/facePalette.css';
import { FaceDetails } from "../interfaces/imageDataInterface";


export const FacePalette = ({ colorPalette }: FaceDetails) => {
  const colorTypeLiterals = ['Conceal', 'Base','Contour'];
  const getColorPalette = () =>{ 
    const faceArr = 
     colorPalette.map((color,index) => {
            return (
              <React.Fragment>
                <div> <div className="palette-color-pan" style={{ backgroundColor: color }}></div>
                <div className="palette-pan-name">{colorTypeLiterals[index]}</div></div>
              </React.Fragment>
            )
          });
      return faceArr;
  }
  return (
    <div className="palette-section">
      <div style={{ textAlign: 'left', marginLeft: '10px' }} className="card-headers"> Your Palette</div>
      <div style={{ display: 'flex', marginLeft: '10px' }}>
        {getColorPalette()}
      </div>

    </div>
  );
}