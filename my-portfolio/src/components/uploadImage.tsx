
import '../App.css';
import FaceCapture from './faceCapture';
// import CardComponent from './components/cardComponent';\
import { UserImage } from './userUpload';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage, getImageData } from '../reducers/imageSlice';
import { displayLoader, displayCards } from '../reducers/utilSlice';
import { RootState } from '../redux/store';
import { useUploadImageMutation } from '../api/imageAPI';
import { useNavigate } from 'react-router-dom';

export const UploadImage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCaptureImage, setSelectedOption] = useState<boolean>(false);
  const userImageRef = useRef<HTMLInputElement>(null);
  const { imageSrc: imageSrc } = useSelector((state: RootState) => ({ imageSrc: state.imageReducer.imageLink, }));
  const { isLoading: isLoading} = useSelector((state: RootState) => ({ isLoading: state.utilsReducer.isLoading, showCards: state.utilsReducer.showCards, }));
  const [fileData, setFileData] = useState<File>();
  const [uploadImage] = useUploadImageMutation();


  const uploadUserImage = () => {
    setSelectedOption(false); // turn off the camera if open forcefully 
    userImageRef.current?.click();
  }
  const handleImageUpload = () => {
    if (userImageRef.current !== null) {
      const fileInput = userImageRef.current.files ? userImageRef.current.files[0] : undefined;
      const imageURL = fileInput ? URL.createObjectURL(fileInput) : '';
      dispatch(updateImage(imageURL));
      setFileData(fileInput);
    }
  }
  const handleWebImage = (data: File) => { setFileData(data); }

  const analyzePicture = (fileData: File) => {
    //Show loader, till server responds with data 
    dispatch(displayLoader(!isLoading));
    // //Making API call with file Data. 
    uploadImage(fileData).then((res) => {
      if (res && Object.keys(res).length !== 0) {
        //disable the loader when data analysis received. 
        dispatch(displayLoader(false));
        dispatch(displayCards(true));
        //dispatch card displays 
        dispatch(getImageData(res.data));
      }
    });
    navigate('/results');
  }

  const ctaButtonClass = imageSrc !== '' ? 'cta-button' : 'cta-button-disabled';
  return (<div className='app-body'>
    <div className='header'>Face Analyzer</div>

    <div>
      <button
        className='image-buttons'
        onClick={() => setSelectedOption(!isCaptureImage)}
      >
        CAPTURE IMAGE
      </button>

      <button
        className='image-buttons'
        onClick={uploadUserImage}
      >
        UPLOAD IMAGE
      </button>

      <input
        type='file'
        ref={userImageRef}
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      <div className="image-upload-div">
        {isCaptureImage && (
          <FaceCapture handleWebImage={handleWebImage} />
        )}
      </div>

      <UserImage />

      <button
        className={ctaButtonClass}
        onClick={()=>{fileData && analyzePicture(fileData)}}
      >
        Analyze Picture
      </button>
    </div>
  </div>)
}