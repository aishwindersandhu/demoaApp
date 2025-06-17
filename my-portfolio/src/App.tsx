import './App.css';
import FaceCapture from './components/faceCapture';
import CardComponent from './components/cardComponent';
import { UserImage } from './components/userUpload';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage,getImageData, } from './reducers/imageSlice';
import { displayLoader,displayCards } from './reducers/utilSlice';
import { RootState } from './redux/store';
import { useUploadImageMutation } from './api/imageAPI';


function App() {
  const dispatch = useDispatch();
  const [isCaptureImage, setSelectedOption] = useState<boolean>(false);
  const userImageRef = useRef<HTMLInputElement>(null);
  const { imageSrc: imageSrc  }  = useSelector((state: RootState) => ({
  imageSrc: state.imageReducer.imageLink,
}));
const { isLoading: isLoading, showCards: showCards  }  = useSelector((state: RootState) => ({
  isLoading: state.utilsReducer.isLoading,
  showCards: state.utilsReducer.showCards,
}));
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
  const handleWebImage = (data) =>{
    setFileData(data);
  }
  const analyzePicture = (fileData) => {
    //Show loader, till server responds with data
    dispatch(displayLoader(!isLoading));
    //Making API call with file Data.
    uploadImage(fileData).then((res) => {
      if (res && Object.keys(res).length !== 0) {
        //disable the loader when data analysis received.
        dispatch(displayLoader(false));
        dispatch(displayCards(true));
        //dispatch card displays
        dispatch(getImageData(res.data));
      }
    });
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
              {isCaptureImage && <FaceCapture handleWebImage={handleWebImage}></FaceCapture>}
            </div>
            {/*Preview Image */}
            <UserImage></UserImage>
          </div>
          <button
            className={ctaButtonClass}
            onClick={() => { analyzePicture(fileData) }}
          >Analyze Picture</button>
          {/* Display data details: Skin tone and face shape, eye shape */}
          {/* Display in card layout */}
          {showCards && <CardComponent></CardComponent>}
        </div>
      </div>


    </>
  )
}

export default App
