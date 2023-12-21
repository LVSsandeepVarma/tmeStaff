import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: ""
};

export const passwordHash = createSlice({
    name: 'loader',
    initialState,
    reducers: {
      // Action to update userInfo
      setHash: (state,action) =>{
        state.value = action.payload
      },

    },
  });
  
  export const { setHash } = passwordHash.actions;
  export default passwordHash.reducer;