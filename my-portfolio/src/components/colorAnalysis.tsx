import { RootState } from "../redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export const ColorAnalysis = () =>{
 const {showBoard} = useSelector((state: RootState)=> state.utilsReducer.showBoard);
return (<div>Color Analysis{showBoard}</div>)
}