import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false
};

export const loader = createSlice({
    name: 'loader',
    initialState,
    reducers: {
      // Action to update userInfo
      setLoaderTrue: (state) =>{
        state.value = true
      },
      setLoaderFalse: (state) =>{
        state.value = false
      }
    },
  });
  
  export const { setLoaderTrue, setLoaderFalse } = loader.actions;
  export default loader.reducer;