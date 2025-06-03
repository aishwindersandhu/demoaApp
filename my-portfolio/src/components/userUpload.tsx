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
        imageSrc && !isLoading && (<img src={imageSrc} alt='Image Preview' height={200} width={300} />)
      }
      {
        isLoading && (
          <div  className="w-10 h-10 border-4 border-black border-t-white bg-red-100 rounded-full animate-spin">

          </div>
          
        )
      }
    </div>
  )
}