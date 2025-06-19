import { createSlice } from "@reduxjs/toolkit";

interface FaceDetails {
  skinTone: string;
  faceShape: string;
  colorCode: string;

}
interface ImageData {
  data: FaceDetails;

}
interface ImageReducerState {
  imageLink: string;
  imageData: ImageData;

}
//Define initial state
const initialState: ImageReducerState = {
  //state variable that holds value
  imageLink: "",
  imageData: {
    data:{
      skinTone: '',
      colorCode:'',
      faceShape:''
    }
  },
}

const imageReducer = createSlice({
  name: "image",
  initialState,
  reducers: {
    //actions that updates state variables.
    updateImage: (state, action) => {
      console.log(action, action.payload, "update Image store");
      state.imageLink = action.payload;
    },
    getImageData: (state, action) => {
      console.log(action.payload, "image data");
      state.imageData = action.payload;
    }
  }
});

//export actions
export const { updateImage, getImageData } = imageReducer.actions;

//export reducer 
export default imageReducer.reducer;