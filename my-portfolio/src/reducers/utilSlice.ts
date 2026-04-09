import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //state variable that holds value
  isLoading: false,
  showCards: false,
  showBoard:''
}
const utilsReducer = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    //actions that update the state variables.
    displayLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    displayCards:(state,action) =>{
      state.showCards = action.payload
    },
    displayBoard:(state,action) =>{
      state.showBoard = action.payload
    }
  }
});

//export actions
export const { displayLoader,displayCards,displayBoard} = utilsReducer.actions;
//export reducer
export default utilsReducer.reducer;