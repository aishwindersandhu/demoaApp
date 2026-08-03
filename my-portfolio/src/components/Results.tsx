import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SkinDetection } from "../components/skinDetectionPanel";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { LoadingScreen } from "./LoadingScreen";

/**
 * Route target for `/results`. Shows a loading screen while the backend
 * analysis request is in flight, a fallback if no data is available
 * (e.g. direct navigation without an upload), or the SkinDetection dashboard.
 */
export const ResultsPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const bg = theme === 'light' ? '#F7F4EF' : '#1a1a1a';
  const color = theme === 'light' ? '#000000' : '#F7F4EF';

  const data = useSelector((state: RootState) => state.imageReducer.imageData);
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state.utilsReducer.isLoading,
  }));

  if (isLoading) return <LoadingScreen />;

  if (!data) {
    return (
      <div style={{ padding: "20px" }}>
        <h3>No analysis found</h3>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", background: bg, color: color }}>
      <SkinDetection />
    </div>
  );
};