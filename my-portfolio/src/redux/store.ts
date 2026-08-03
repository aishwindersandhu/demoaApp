import { configureStore } from "@reduxjs/toolkit";
import imageReducer from '../reducers/imageSlice';
import utilsReducer from "../reducers/utilSlice";
import { imageApi } from "../api/imageAPI";

/**
 * Global Redux store.
 * Combines the app's own slices (image data, UI state) with the RTK Query
 * API slice, whose middleware powers caching, loading and error tracking
 * for the generated hooks in api/imageAPI.ts.
 */
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

// Root state/dispatch types, used by useSelector<RootState> and typed dispatch across the app.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


