import { useState, useRef } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import '../styles/userUpload.css';

export const UserImage = () => {
  //consume state variable and display it to user.
  const imageSrc = useSelector((state: RootState) => { return state.imageReducer.imageLink });

  return (
    <div >
      {
        imageSrc && (<img src={imageSrc} alt='Image Preview' height={200} width={300}/>)
      }
    </div>
  )
}