import { configureStore } from "@reduxjs/toolkit";
import imageReducer from '../reducers/imageSlice';
import utilsReducer from "../reducers/utilSlice";
import { imageApi } from "../api/imageAPI";

export const store = configureStore({
  //Add reducers here 
  reducer: {
    imageReducer: imageReducer,
    utilsReducer: utilsReducer,
    [imageApi.reducerPath]: imageApi.reducer
  },
  middleware:(getDefaultMiddleWare) => 
    getDefaultMiddleWare().concat(imageApi.middleware),//return the middleware array
});

//Export root states and type checks for typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


