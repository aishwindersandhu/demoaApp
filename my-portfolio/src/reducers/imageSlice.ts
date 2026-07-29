import { createSlice } from "@reduxjs/toolkit";
import { ImageReducerState } from "../interfaces/imageDataInterface";

//Define initial state
const initialState: ImageReducerState = {
  //state variable that holds value
  imageLink: "",
  imageData: {
    data:{
      skinTone: '',
      colorCode:'',
      faceShape:'',
      colorPalette: [],
      profile:{
        undertone: '',
        cool_palette:[],
        dark_palette:[],
        warm_palette:[],
        jewel_tones:[],
        skinTone:''
      }
    }
  },
  sessionId: crypto.randomUUID(),
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