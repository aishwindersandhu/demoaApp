import './App.css';
import FaceCapture from './components/faceCapture';
import { UserImage } from './components/userUpload';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage } from './reducers/imageSlice';
import { displayLoader } from './reducers/utilSlice';
import { RootState } from './redux/store';
import { useUploadImageMutation } from './api/imageAPI';


function App() {
  const dispatch = useDispatch();
  const [isCaptureImage, setSelectedOption] = useState<boolean>(false);
  const userImageRef = useRef<HTMLInputElement>(null);
  const imageSrc = useSelector((state: RootState) => { return state.imageReducer.imageLink });
  const isLoading = useSelector((state: RootState) => { return state.utilsReducer.isLoading });
  const [fileData, setFileData] = useState<File> ();
  const [uploadImage] = useUploadImageMutation();

  const uploadUserImage = () => {
    setSelectedOption(false); // turn off the camera if open forcefully
    userImageRef.current?.click();
  }
  const handleImageUpload = () => {
    if (userImageRef.current !== null) {
      const fileInput = userImageRef.current.files ? userImageRef.current.files[0] : null;
      const imageURL = fileInput ? URL.createObjectURL(fileInput) : '';
      dispatch(updateImage(imageURL));
      setFileData(fileInput);
    }
  }
  const analyzePicture = () => {
    //send image to server for analyzing
    //Show loader, till server responds with data
    dispatch(displayLoader(!isLoading));
    //take this into a utils file where and return processed data.
    uploadImage(fileData).then((res) => {
      if (res) {
        dispatch(displayLoader(false));//disable the loader when data analysis received.
        console.log(res.data, "response");
      }
    });
    //TO:DO - make an api call and send image for processing
  }
  const ctaButtonClass = imageSrc !== '' ? 'cta-button' : 'cta-button-disabled';
  return (
    <>
      <div id="app-title" className='app-body'>
        <title> Beauty Profile Analyzer</title>
        <div className='header'> Beauty Profile Analyzer</div>
        <div>
          <button
            className='image-buttons'
            onClick={() => { setSelectedOption(!isCaptureImage) }}
          >CAPTURE IMAGE</button>
          <button
            className='image-buttons'
            onClick={() => { uploadUserImage() }}>UPLOAD IMAGE</button>
          <input type='file'
            ref={userImageRef}
            accept="image/*"
            onChange={() => { handleImageUpload() }}
            style={{ display: 'none' }}
          ></input>
          <div>
            {/* will update image from the facecapture component */}
            <div className="face-capture-div">
              {isCaptureImage && <FaceCapture></FaceCapture>}
            </div>

            {/*Preview Image */}
            <UserImage></UserImage>
          </div>
          <button
            className={ctaButtonClass}
            onClick={() => { analyzePicture() }}
          >Analyze Picture</button>
          {/* Display data details: Skin tone and face shape, eye shape */}
          {/* Display in card layout */}
        </div>
      </div>


    </>
  )
}

export default App
