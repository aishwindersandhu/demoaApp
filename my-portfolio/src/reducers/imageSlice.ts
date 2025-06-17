import { createSlice } from "@reduxjs/toolkit";

//Define initial state
const initialState = {
  //state variable that holds value
  imageLink: "",
  imageData : [],
}

const imageReducer = createSlice({
  name: "image",
  initialState,
  reducers: {
    //actions that updates state variables.
    updateImage: (state, action) => { 
      console.log(action,action.payload,"update Image store");
      state.imageLink = action.payload;
     },
     getImageData :(state,action) =>{
      console.log(action.payload,"image data");
      state.imageData = action.payload;
     }
  }
});

//export actions
export const { updateImage,getImageData} = imageReducer.actions;

//export reducer 
export default imageReducer.reducer;