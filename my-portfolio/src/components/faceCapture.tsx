import { useState, useRef, useCallback } from "react";
import { updateImage } from "../reducers/imageSlice";
import { useSelector, useDispatch } from 'react-redux';
import Webcam from "react-webcam";

const FaceCapture = () => {
  const webcamRef = useRef<any>(null);//Ref for camera 
  // basically signalling that the ref can be anything other than null in future
  const dispatch = useDispatch();
  const [isWebcamOpen, setIsWebcamOpen] = useState(false); // State to toggle webcam
  const [imgSrc, setImgSrc] = useState(null); // State to store the captured image
  // const [mirrored, setMirrored] = useState(false); // State for mirroring

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
      1.Click to capture image
      2. Save Image on machine/api
      3. Read the image
      <div>
        <button onClick={() => setIsWebcamOpen(true)}>Open Webcam</button>
        {/* <button onClick={() => setIsWebcamOpen(false)}>Close Webcam</button> */}
        <button onClick={() => saveImage()}>Click Image</button>

      </div>
      <div>
        {/* opens everytime you click open webcam, gives an opportunity to click a new picture */}
        {
          isWebcamOpen && (
            <Webcam ref={webcamRef}>
            </Webcam>
          )
        }
        {
          !isWebcamOpen && imgSrc && (<img src={imgSrc}></img>)
        }

      </div >
    </div >
  )
}

export default FaceCapture;