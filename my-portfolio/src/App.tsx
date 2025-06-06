import './App.css';
import FaceCapture from './components/faceCapture';
import { UserImage } from './components/userUpload';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage } from './reducers/imageSlice';
import { displayLoader } from './reducers/utilSlice';
import { RootState } from './redux/store';


function App() {
  const dispatch = useDispatch();
  const [isCaptureImage, setSelectedOption] = useState<boolean>(false);
  const userImageRef = useRef<HTMLInputElement>(null);
  const imageSrc = useSelector((state: RootState) => { return state.imageReducer.imageLink })
  const isLoading = useSelector((state: RootState) => { return state.utilsReducer.isLoading })

  const uploadUserImage = () => {
    setSelectedOption(false); // turn off the camera if open forcefully
    userImageRef.current?.click();
  }
  const handleImageUpload = () => {
    if (userImageRef.current !== null) {
      const fileInput = userImageRef.current.files ? userImageRef.current.files[0] : null;
      const imageURL = fileInput ? URL.createObjectURL(fileInput) : '';
      dispatch(updateImage(imageURL));
    }
  }
  const analyzePicture = () => {
    //send image to server for analyzing
    //Show loader, till server responds with data
    dispatch(displayLoader(!isLoading));
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
          {isCaptureImage && <FaceCapture></FaceCapture>}
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
