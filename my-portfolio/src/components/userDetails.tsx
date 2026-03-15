import React from "react";
import '../styles/userDetails.css';


export const UserDetails = () =>{
  return (
      <div className="user-section">
          <div className="user-image">
            <div className="skin-tone"></div>
          </div>
          <div className="user-skin-details">
            <div className="user-skin-shade">Medium Warm</div>
            <div className="user-skin-hex">#BD8453 </div>
            <div className="user-undertone">Warm Undertone</div>
          </div>
          <div></div>
        </div>
  );
}