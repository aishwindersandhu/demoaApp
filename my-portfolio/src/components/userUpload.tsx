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
        imageSrc  && (<img
          src={imageSrc} alt='Image Preview' height={200} width={300}
          style={{ display: 'inline-flex',height:'220px !important'}} />)
      }
      {
        isLoading && <div className="absolute bg-black/40 h-[225px] w-[300px] " style={{marginTop:'-15%', marginLeft:'23%'}}>
      </div>
      }
      {
        isLoading && (
          <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
            <div className='flex items-center justify-center h-[200px] w-[300px]' style={{marginTop:'-22%'}}>
              <div
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
              </div>
            </div></div>
        )
      }

    </div>
  )
}