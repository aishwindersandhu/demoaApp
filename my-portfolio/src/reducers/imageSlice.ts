import { createSlice } from "@reduxjs/toolkit";
import { List } from "postcss/lib/list";

interface FaceDetails {
  skinTone: string;
  faceShape: string;
  colorCode: string;
  colorPalette : Array<List>;
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
      faceShape:'',
      colorPalette: []
    }
  },
}
const imageReducer = createSlice({
  name: "image",
  initialState,
  reducers: {
    //actions that updates state variables.
    updateImage: (state, action) => {
      state.imageLink = action.payload;
    },
    getImageData: (state, action) => {
      state.imageData = action.payload;
    }
  }
});
//export actions
export const { updateImage, getImageData } = imageReducer.actions;
//export reducer 
export default imageReducer.reducer;