import { useState, useRef, useCallback, useEffect } from "react";
import { updateImage } from "../reducers/imageSlice";
import { useDispatch } from 'react-redux';
import Webcam from "react-webcam";

const FaceCapture = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef<any>(null); //Ref for camera 
  const [isWebcamOpen, setIsWebcamOpen] = useState(false); // State to toggle webcam
  const [imgSrc, setImgSrc] = useState(null); // State to store the captured image
  const [mirrored, setMirrored] = useState(false); //State for mirroring the image

  const saveImage = useCallback(() => {
    if (webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      //store it in redux store or make an api call in case of storing it in DB
      setImgSrc(imageSrc);
      //dispatch relevant actions
      dispatch(updateImage(imageSrc));
      setIsWebcamOpen(false);
    }
  }, [webcamRef]);

  return (
    <div>
      <div>
        <button onClick={() => setIsWebcamOpen(true)}>Open Webcam</button>
        <button onClick={() => saveImage()}>Click Image</button>
        <input type="checkbox"
          checked={mirrored}
          onClick={(e) => {
            setMirrored(e.target.checked);
          }}
          name="Mirror Image"
          value="mirror" />
        <label style={{ color: 'black' }}>Mirror Image</label>

      </div>
      <div>
        {/* opens everytime you click open webcam, gives an opportunity to click a new picture */}
        {
          isWebcamOpen && (
            <Webcam
              ref={webcamRef}
              mirrored={mirrored}>
            </Webcam>
          )
        }
        {/* {
          !isWebcamOpen && imgSrc && (<img src={imgSrc}></img>)
        } */}

      </div >
    </div >
  )
}

export default FaceCapture;