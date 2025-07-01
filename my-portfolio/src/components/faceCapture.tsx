import { useState, useRef, useCallback, useEffect } from "react";
import { updateImage } from "../reducers/imageSlice";
import { useDispatch } from 'react-redux';
import '../styles/faceCapture.css';
import Webcam from "react-webcam";
import { base64ToBlob } from '../utils/utils';

const FaceCapture = ({ handleWebImage }) => {
  const dispatch = useDispatch();
  const webcamRef = useRef<any>(null); //Ref for camera 
  const [isWebcamOpen, setIsWebcamOpen] = useState(false); // State to toggle webcam
  const [mirrored, setMirrored] = useState(true); //State for mirroring the image

  const saveImage = useCallback(() => {
    if (webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      //store it in redux store or make an api call in case of storing it in DB
      //dispatch relevant actions
      const imageToFile = base64ToBlob(imageSrc); // convert image to file type
      dispatch(updateImage(imageSrc));
      handleWebImage(imageToFile)
      setIsWebcamOpen(false);
    }
  }, [webcamRef]);

  return (
    <div >
      <div>
        <button
          className='face-capture-buttons'
          onClick={() => {
            //if there's an exisiting image src, clear it before capturing a new one.
            dispatch(updateImage(''));
            setIsWebcamOpen(true);
          }}>Open Webcam</button>
        <button
          className='face-capture-buttons'
          onClick={() => saveImage()}>Click Image</button>
        <input type="checkbox"
          checked={mirrored}
          onClick={(e) => {
            setMirrored(e.target.checked);
          }}
          name="Mirror Image"
          value="mirror" />
        <label style={{ color: 'black', fontSize: '12px' }}>Mirror Image</label>
      </div>
      <div>
        {
          isWebcamOpen && (
            <Webcam
              ref={webcamRef}
              height={200}
              width={300}
              mirrored={mirrored}>
            </Webcam>
          )
        }
      </div >
    </div >
  )
}
export default FaceCapture;