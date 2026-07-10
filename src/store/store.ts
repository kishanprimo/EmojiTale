import authReducer from "./slices/AuthSlice/loginSlice";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice/userSlice";
import userDetailsReducer from "./slices/UserSlice/userDetailsSlice";
//import dashboardReducer from "./slices/DashboardSlice/liveusers_slice";
import memberReducer from "./slices/UserSlice/memberSlice";
import newsLetterReducer from "./slices/NewsLetterSlice/newsLetterSlice";
import emojiCategoryReducer from "./slices/EmojiCategorySlices/emojiCategorySlice";
import addEmojiCategoryReducer from "./slices/EmojiCategorySlices/addEmojiCategorySlice";
import updateEmojiCategoryReducer from "./slices/EmojiCategorySlices/updateEmojiCategorySlice";
import selectedEmojiCategoryReducer from "./slices/EmojiCategorySlices/selectedEmojiCategorySlice";
import planReducer from "./slices/PlanSlices/planSlice";
import avatarReducer from "./slices/AvatarSlices/avatarSlice";
import addAvatarReducer from "./slices/AvatarSlices/addAvatarSlice";
import updateAvatarReducer from "@/store/slices/AvatarSlices/updateAvatarSlice";
import selectedAvatarReducer from "./slices/AvatarSlices/selectedAvatarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    users: userReducer,
    members: memberReducer,
    userDetails: userDetailsReducer,

    //dashboard: dashboardReducer,
    newsletter: newsLetterReducer,
    emojiCategories: emojiCategoryReducer,
    addEmojiCategory: addEmojiCategoryReducer,
    updateEmojiCategory: updateEmojiCategoryReducer,
    selectedEmojiCategory: selectedEmojiCategoryReducer,

    plans: planReducer,

    avatars: avatarReducer,
    addAvatar: addAvatarReducer,
    updateAvatar: updateAvatarReducer,
    selectedAvatar: selectedAvatarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;