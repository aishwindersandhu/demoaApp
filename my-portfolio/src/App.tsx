import './App.css';
import FaceCapture from './components/faceCapture';
import { UserImage } from './components/userUpload';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateImage } from './reducers/imageSlice';


function App() {
  const dispatch = useDispatch();
  const [isCaptureImage, setSelectedOption] = useState<boolean>(false);
  const userImageRef = useRef<HTMLInputElement>(null);
  const uploadUserImage = () => {
    userImageRef.current?.click();
  }
  const handleImageUpload = () => {
    if (userImageRef.current !== null) {
      const fileInput = userImageRef.current.files ? userImageRef.current.files[0] : null;
      const imageURL = fileInput ? URL.createObjectURL(fileInput) : '';
      console.log(imageURL, "imageURL");
      dispatch(updateImage(imageURL));
    }
  }

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
          {/* will update image from the facecapture component */}
          {isCaptureImage && <FaceCapture></FaceCapture>} 
            {/*Preview Image */}
            <UserImage></UserImage>
        </div>
      </div>


    </>
  )
}

export default App
