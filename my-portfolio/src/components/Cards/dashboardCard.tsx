import React from "react";
import '../../styles/dashboard.css';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const VerticalStrips =() =>{
   const  imageData = useSelector((state: RootState) => state.imageReducer.imageData);
    const {profile} = imageData.data;
    const {warm_palette} = profile;

    const getColors = () =>{
      const divList = <div style={{display:'flex'}}>
        {
          warm_palette.map((item)=>{
           return <div style={{backgroundColor: item.hex}} className="color-strip">
            <div className="color-strip-info">
              <div className="color-strip-name">{item.name}</div>
              <div className="color-strip-hex">{item.hex}</div></div>
            </div>;
      })
        }
      </div>
      return divList;
    }
  return (
    <div className="dashboard-card-wrapper">
      <div className="dashboard-card">
          {/* Vertical color rendering from props */}
          {
            warm_palette.length !== 0 ? (
              <div>
                {getColors()}
                <div className="color-type-strip">Warm Colors</div>
              </div>
            ) : null
          }
      </div>
    </div>
  )
}