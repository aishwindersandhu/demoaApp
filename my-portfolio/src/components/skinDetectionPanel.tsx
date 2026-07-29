import { RootState } from '../redux/store';
import { UserDetails } from "./userDetails";
import { FacePalette } from "./facePalette";
import { UserTabs } from "./UserTabs";
import '../styles/skinDetection.css';
import { useSelector } from "react-redux";
import { useTheme } from '../ThemeContext';
import { ColorAnalysis } from './colorAnalysis';
import { ProductRecommendations } from './productRecommendations';

export const SkinDetection = () => {
  const imageData = useSelector((state: RootState) => state.imageReducer.imageData);
  const showBoard = useSelector((state: RootState) => state.utilsReducer.showBoard);
  const { theme, toggleTheme } = useTheme();

  const { colorCode, skinTone, colorPalette,profile } = imageData.data;

  const getBoard = () => {
    if (showBoard === 'Products') return <ProductRecommendations></ProductRecommendations>;
    return <ColorAnalysis></ColorAnalysis>;
  }
  // const mockColorPalette = ["#313131", "#FF00FF", "#EFEFEF", "#FFD700"]
  return (
    //Use reusable cards for better structure.
    <div style={{ width: '1600px', height: '800px', display: 'flex' }}>
      <div className="left-panel-card">
        <UserDetails colorCode={colorCode} skinTone={skinTone} undertone={profile.undertone}></UserDetails>
        <FacePalette colorPalette={colorPalette}></FacePalette>
        <UserTabs></UserTabs>
        <button className="theme-toggle" onClick={toggleTheme}>
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor"  strokeWidth="1.2" 
            style={{height:'30px',marginLeft:'10px', marginRight:'10px'}}
          ><path d="M9 5.8A4 4 0 1 1 5.2 2a3 3 0 0 0 3.8 3.8z"></path></svg>
            <p>{theme === 'light' ? 'Dark' : 'Light'} mode</p>
          </button>
      </div>
      {getBoard()}
    </div>
  )
}