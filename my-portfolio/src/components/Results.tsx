import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SkinDetection } from "../components/skinDetectionPanel";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { LoadingScreen } from "./LoadingScreen";

/**
 * Route target for `/results`. Shows a loading screen while the backend
 * analysis request is in flight, an error state if analysis failed or found
 * no usable face, a fallback if no analysis was ever run (e.g. direct
 * navigation to this route), or the SkinDetection dashboard.
 */
export const ResultsPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const bg = theme === 'light' ? '#F7F4EF' : '#1a1a1a';
  const color = theme === 'light' ? '#000000' : '#F7F4EF';

  const data = useSelector((state: RootState) => state.imageReducer.imageData);
  const { isLoading, analysisError } = useSelector((state: RootState) => ({
    isLoading: state.utilsReducer.isLoading,
    analysisError: state.utilsReducer.analysisError,
  }));

  if (isLoading) return <LoadingScreen />;

  if (analysisError) {
    return (
      <div style={{
        minHeight: "100vh", background: bg, color: color,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "48px 24px", textAlign: "center", gap: 16,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, margin: 0 }}>
          Couldn't analyse that photo
        </h3>
        <p style={{ maxWidth: 380, opacity: 0.75, margin: 0, lineHeight: 1.6 }}>{analysisError}</p>
        <button onClick={() => navigate("/")} style={{
          marginTop: 8, padding: "12px 24px", borderRadius: 12, border: "none",
          background: "var(--text-primary)", color: "var(--btn-primary-fg)",
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, cursor: "pointer",
        }}>
          Try another photo
        </button>
      </div>
    );
  }

  if (!data?.data?.colorCode) {
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