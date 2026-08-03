import { useEffect } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { displayLoader } from '../reducers/utilSlice';
import '../styles/userUpload.css';

/** Simple image preview with a loading overlay, driven by Redux image/loading state. */
export const UserImage = () => {
  //consume state variable and display it to user.
  const imageSrc = useSelector((state: RootState) => { return state.imageReducer.imageLink });
  const isLoading = useSelector((state: RootState) => { return state.utilsReducer.isLoading });

  useEffect(() => {
    displayLoader(isLoading);
  }, [isLoading])
  return (
    <div className="image-upload-div">
      {
        imageSrc && <div className="w-[300px] h-[200px] overflow-hidden rounded shadow">
          <img
            src={imageSrc}
            alt='Image Preview'
            className="w-full h-full object-none object-center"
          />
        </div>
      }
      {isLoading && (
        <>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* Spinner */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </>
      )}
    </div>
  )
}