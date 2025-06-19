import { useEffect } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { displayLoader } from '../reducers/utilSlice';
import '../styles/userUpload.css';

export const UserImage = () => {
  //consume state variable and display it to user.
  const imageSrc = useSelector((state: RootState) => { return state.imageReducer.imageLink });
  const isLoading = useSelector((state: RootState) => { return state.utilsReducer.isLoading });

  useEffect(() => {
    displayLoader(isLoading);
  }, [isLoading])
  return (
    
    <div className ="image-upload-div">
      <div className="w-[300px] h-[200px] overflow-hidden">
        {
        imageSrc && (<img
          src={imageSrc} alt='Image Preview'
          className="w-full h-full object-none object-center"
           />)
      }
</div>
      
      {
        isLoading && <div className="absolute bg-black/40 h-[225px] w-[300px] ">
        </div>
      }
      {
        isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='flex items-center justify-center'>
              <div
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
              </div>
            </div></div>
        )
      }

    </div>
  )
}