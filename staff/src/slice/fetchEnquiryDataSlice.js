export const fetchedEnquiry = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
      // Action to update userInfo
      setUserInfo: (state,action) =>{
        state.value = action.payload
      }
    },
  });
  
  export const { setUserInfo } = userInfo.actions;
//   export const selectComments = (state) => state.comments.value;
  export default fetchedEnquiry.reducer;