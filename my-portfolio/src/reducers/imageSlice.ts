import { createSlice } from "@reduxjs/toolkit";
import { ImageReducerState } from "../interfaces/imageDataInterface";

// Define initial state for the "image" slice: the captured/uploaded photo,
// the analysis result returned by the backend, and a per-visit session id.
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
  // Random per-page-load id sent to the backend so recommendation calls can be tied to this session.
  sessionId: crypto.randomUUID(),
}

/** Slice holding the captured image URL and the face-analysis result returned by the backend. */
const imageReducer = createSlice({
  name: "image",
  initialState,
  reducers: {
    //actions that updates state variables.
    /** Stores the local preview URL/data-URL of the captured or uploaded photo. */
    updateImage: (state, action) => {
      state.imageLink = action.payload;
    },
    /** Stores the backend's face-analysis response (skin tone, palette, profile). */
    getImageData: (state, action) => {
      state.imageData = action.payload;
    }
  }
});
//export actions
export const { updateImage, getImageData } = imageReducer.actions;
//export reducer
export default imageReducer.reducer;