import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SkinDetection } from "../components/skinDetectionPanel";
import { useNavigate } from "react-router-dom";

export const ResultsPage = () => {
  const navigate = useNavigate();

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
    <div style={{ display: "flex"}}>
      {/* Left Panel */}
      <SkinDetection image={imageSrc} data={data} />

      {/* You can add Right Panel later */}
    </div>
  );
}