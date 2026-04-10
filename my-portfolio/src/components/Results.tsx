import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SkinDetection } from "../components/skinDetectionPanel";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export const ResultsPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const bg = theme === 'light' ? '#F7F4EF' : '#1a1a1a';
  const color = theme === 'light' ? '#000000' : '#F7F4EF';


  const data = useSelector(
    (state: RootState) => state.imageReducer.imageData
  );


  //Handle refresh case
  if (!data) {
    return (
      <div style={{ padding: "20px" }}>
        <h3>No analysis found</h3>
        <button onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", background: bg, color: color }}>
        <SkinDetection /> 
      </div>
    </div>

  );
}