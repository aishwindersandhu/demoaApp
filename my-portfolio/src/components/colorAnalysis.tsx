import { RootState } from "../redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import '../styles/colorAnalysis.css';
import { AnalysisCard } from "./AnalysisCard";

export const ColorAnalysis = () =>{
 const {showBoard} = useSelector((state: RootState)=> state.utilsReducer.showBoard);
return (<div className="card-container">
  Color Analysis{showBoard}
  <div><AnalysisCard value={94} title={'Color match'}></AnalysisCard></div>
  </div>)
}