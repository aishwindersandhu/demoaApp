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
           return <div style={{backgroundColor: item.hex, flex:1, 
    width: '30px', height: '140px'}}>
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
              <div>{getColors()}</div>
            ) : null
          }
      </div>
    </div>
  )
}