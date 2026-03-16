import '../styles/userDetails.css';
import { FaceDetails } from "../interfaces/imageDataInterface";

export const UserDetails = ({ colorCode, skinTone }: FaceDetails) => {
  return (
    <div className="user-section">
      <div className="user-image">
        <div className="skin-tone" style={{ backgroundColor: colorCode }}></div>
      </div>
      <div className="user-skin-details">
        <div className="user-skin-shade">{skinTone}</div>
        <div className="user-skin-hex">{colorCode}</div>
        <div className="user-undertone">Warm Undertone</div>
      </div>
      <div></div>
    </div>
  );
}