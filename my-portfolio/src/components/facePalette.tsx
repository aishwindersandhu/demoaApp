import React from "react";
import '../styles/facePalette.css';
import { FaceDetails } from "../interfaces/imageDataInterface";


export const FacePalette = ({ colorPalette }: FaceDetails) => {
  return (
    <div className="palette-section">
      <div style={{ textAlign: 'left', marginLeft: '10px' }} className="card-headers"> Your Palette</div>
      <div style={{ display: 'flex', marginLeft: '10px' }}>
        {
          colorPalette.map((color) => {
            return (
              <React.Fragment>
                <div> <div className="palette-color-pan" style={{ backgroundColor: color }}></div><div className="palette-pan-name">Color type</div></div>
              </React.Fragment>
            )
          })
        }
      </div>

    </div>
  );
}