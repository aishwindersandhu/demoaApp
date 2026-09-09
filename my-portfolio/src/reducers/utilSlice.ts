import { createSlice } from '@reduxjs/toolkit';

// Cross-cutting UI state: loading spinner visibility, whether result cards
// are shown, and which board tab (Colours/Makeup/Products) is active.
const initialState = {
  //state variable that holds value
  isLoading: false,
  showCards: false,
  showBoard:'',
  // User-facing message when analysis fails or can't produce a usable result
  // (no face detected, backend error, etc). Null when there's no error to show.
  analysisError: null as string | null,
}

/** Slice holding UI-only state that isn't tied to analysis data (loading, active tab, etc). */
const utilsReducer = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    //actions that update the state variables.
    /** Toggles the app-wide loading indicator. */
    displayLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    /** Toggles visibility of the results cards section. */
    displayCards:(state,action) =>{
      state.showCards = action.payload
    },
    /** Sets which board tab (Colours/Makeup/Products) is currently active. */
    displayBoard:(state,action) =>{
      state.showBoard = action.payload
    },
    /** Sets/clears the user-facing analysis error message (null clears it). */
    setAnalysisError:(state,action) =>{
      state.analysisError = action.payload
    }
  }
});

//export actions
export const { displayLoader,displayCards,displayBoard,setAnalysisError} = utilsReducer.actions;
//export reducer
export default utilsReducer.reducer;