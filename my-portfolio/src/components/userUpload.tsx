import { useState, useRef } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { displayLoader } from '../reducers/utilSlice';
import '../styles/userUpload.css';

export const UserImage = () => {
  //consume state variable and display it to user.
  const imageSrc = useSelector((state: RootState) => { return state.imageReducer.imageLink });
  const isLoading = useSelector((state: RootState) => { return state.utilsReducer.isLoading });

  return (
    <div >
      {
        imageSrc && !isLoading && (<img
          src={imageSrc} alt='Image Preview' height={200} width={300}
          style={{ display: 'inline-flex' }} />)
      }
      {
        isLoading && (
          <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
            <div className='flex items-center justify-center h-[200px] bg-gray-100 w-[300px]'>
              <div
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
              </div>
            </div></div>
        )
      }

    </div>
  )
}