import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false
};

export const tokenExpire = createSlice({
    name: 'tokenExpire',
    initialState,
    reducers: {
      // Action to update userInfo
      expireTokenTrue: (state) =>{
        state.value = true
      },
      expireTokenFalse: (state) =>{
        state.value = false
      }
    },
  });
  
  export const { expireTokenTrue, expireTokenFalse } = tokenExpire.actions;
  export default tokenExpire.reducer;