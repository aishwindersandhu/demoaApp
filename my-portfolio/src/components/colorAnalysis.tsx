import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import '../styles/colorAnalysis.css';
import { AnalysisCard } from "./AnalysisCard";
import { VerticalStrips } from "./Cards/dashboardCard";


export const ColorAnalysis = () => {
  const { showBoard } = useSelector((state: RootState) => state.utilsReducer.showBoard);

  return (<div className="card-container">
   <div className="card-main-title">Colour analysis</div>
   <div className="card-main-sub">Based on your skin tone</div>
    <div className="analysis-card-container">
      <AnalysisCard value={94} title={'Color match'}></AnalysisCard>
      <AnalysisCard value={12} title={'Wear Colors'}></AnalysisCard>
      <AnalysisCard value={6} title={'Avoid Colors'}></AnalysisCard>
    </div>
     {/*TO-DO: Make it a fun way to show random cards */}
      <VerticalStrips></VerticalStrips>
  </div>)
}