import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import '../styles/colorAnalysis.css';
import { AnalysisCard } from "./AnalysisCard";
import { VerticalStrips } from "./Cards/VerticalStrip";
import '../styles/dashboard.css';


export const ColorAnalysis = () => {
  const imageData = useSelector((state: RootState) => state.imageReducer.imageData);
  const {warm_palette,cool_palette,dark_palette} = imageData.data.profile;


  return (<div className="card-container">
   <div className="card-main-title">Colour analysis</div>
   <div className="card-main-sub">Based on your skin tone</div>
    <div className="analysis-card-container">
      <AnalysisCard value={94} title={'Color match'}></AnalysisCard>
      <AnalysisCard value={12} title={'Wear Colors'}></AnalysisCard>
      <AnalysisCard value={6} title={'Avoid Colors'}></AnalysisCard>
    </div>
     {/*TO-DO: Make it a fun way to show random cards */}
      <div className="dashboard-card-wrapper">
        <VerticalStrips palette={warm_palette} title={'Warm Colors'}></VerticalStrips>
      <VerticalStrips palette={cool_palette} title={'Cool Colors'}></VerticalStrips>
      <VerticalStrips palette={dark_palette} title={'Dark Colors'}></VerticalStrips>
      </div>
  </div>)
}