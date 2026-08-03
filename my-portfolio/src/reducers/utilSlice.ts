import { createSlice } from '@reduxjs/toolkit';

// Cross-cutting UI state: loading spinner visibility, whether result cards
// are shown, and which board tab (Colours/Makeup/Products) is active.
const initialState = {
  //state variable that holds value
  isLoading: false,
  showCards: false,
  showBoard:''
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
    }
  }
});

//export actions
export const { displayLoader,displayCards,displayBoard} = utilsReducer.actions;
//export reducer
export default utilsReducer.reducer;