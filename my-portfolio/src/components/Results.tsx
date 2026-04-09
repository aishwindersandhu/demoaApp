import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SkinDetection } from "../components/skinDetectionPanel";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { ColorAnalysis } from "./colorAnalysis";

export const ResultsPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const bg = theme === 'light' ? '#F7F4EF' : '#1a1a1a';
  const color = theme === 'light' ? '#000000' : '#F7F4EF';


  const data = useSelector(
    (state: RootState) => state.imageReducer.imageData
  );

  const imageSrc = useSelector(
    (state: RootState) => state.imageReducer.imageLink
  );

  // ⚠️ Handle refresh case
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
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
      <div style={{ display: "flex", background: bg, color: color }}>
        <SkinDetection image={imageSrc} data={data} />
        <ColorAnalysis></ColorAnalysis>
      </div>
    </div>

  );
}