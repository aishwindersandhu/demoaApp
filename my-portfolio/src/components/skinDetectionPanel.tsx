import { RootState } from '../redux/store';
import { UserDetails } from "./userDetails";
import { FacePalette } from "./facePalette";
import { UserTabs } from "./UserTabs";
import '../styles/skinDetection.css';
import { useSelector } from "react-redux";
import { useTheme } from '../ThemeContext';

export const SkinDetection = ({image : string,data: any}) => {
  const imageData = useSelector((state: RootState) => state.imageReducer.imageData);
  const {theme,toggleTheme} = useTheme();
  
  const {colorCode, skinTone,colorPalette} = imageData.data;
  const mockColorPalette =["#313131","#FF00FF","#EFEFEF","#FFD700"]
  return (
    //Use reusable cards for better structure.
    <div style={{width:'1500px', height:'600px'}}>
      <div className="left-panel-card">
        <UserDetails colorCode={colorCode} skinTone={skinTone}></UserDetails>
        <FacePalette colorPalette={mockColorPalette}></FacePalette>
        <UserTabs></UserTabs>
      </div>
    </div>
  )
}