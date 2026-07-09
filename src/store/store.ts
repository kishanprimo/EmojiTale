import authReducer from "./slices/AuthSlice/loginSlice";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice/userSlice";
import userDetailsReducer from "./slices/UserSlice/userDetailsSlice";
//import dashboardReducer from "./slices/DashboardSlice/liveusers_slice";
import memberReducer from "./slices/UserSlice/memberSlice";
import newsLetterReducer from "./slices/NewsLetterSlice/newsLetterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    members: memberReducer,
    userDetails: userDetailsReducer,
    //dashboard: dashboardReducer,
    newsletter: newsLetterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;