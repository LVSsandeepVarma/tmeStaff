import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer  from "../slice/userInfoSlice";
import loaderReducer from "../slice/loaderSlice";
import passwordHashReducer from "../slice/passwordHashSlice";
import tokenExpireReducer from "../slice/tokenExpireSlice";
export const store = configureStore({
    reducer: {
      userInfoReducer,
      loaderReducer,
      passwordHashReducer,
      tokenExpireReducer
    
    },
  });

// export const wrapper = createWrapper(Store);