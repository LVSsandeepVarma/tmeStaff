import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    "status": false,
    "data": {
        "staff": {},
        "enq_counts": {
            "new": 0,
            "ringing": 0,
            "postponed": 0,
            "notin": 0,
            "t_ring": 0,
            "t_post": 0,
            "remaining_count": 0
        },
        "new_enqs": [],
        "assigned_new": []
    },
    "message": ""
}
};

export const userInfo = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
      // Action to update userInfo
      setUserInfo: (state,action) =>{
        state.value = action.payload
      },
    },
  });
  
  export const { setUserInfo } = userInfo.actions;
//   export const selectComments = (state) => state.comments.value;
  export default userInfo.reducer;