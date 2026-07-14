import authReducer from "./slices/AuthSlice/loginSlice";
import emojiReducer from "./slices/EmojiSlices/emojiSlice";
import addEmojiReducer from "./slices/EmojiSlices/addEmojiSlice";
import updateEmojiReducer from "./slices/EmojiSlices/updateEmojiSlice";
import selectedEmojiReducer from "./slices/EmojiSlices/selectedEmojiSlice";
import themeReducer from "./slices/ThemeSlices/themeSlice";
import addThemeReducer from "./slices/ThemeSlices/addThemeSlice";
import updateThemeReducer from "./slices/ThemeSlices/updateThemeSlice";
import selectedThemeReducer from "./slices/ThemeSlices/selectedThemeSlice";
import adminStoryReducer from "./slices/AdminStorySlices/adminStorySlice";
import generateStoryReducer from "./slices/AdminStorySlices/generateStorySlice";
import storyCategoryReducer from "./slices/StoryCategorySlices/storyCategorySlice";
import addStoryCategoryReducer from "./slices/StoryCategorySlices/addStoryCategorySlice";
import notificationReducer from "./slices/NotificationSlices/notificationSlice";
import addNotificationReducer from "./slices/NotificationSlices/addNotificationSlice";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice/userSlice";
import userDetailsReducer from "./slices/UserSlice/userDetailsSlice";
import dashboardReducer from "./slices/DashboardSlice/liveusers_slice";
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

    dashboard: dashboardReducer,
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

    emojis: emojiReducer,
    addEmoji: addEmojiReducer,
    updateEmoji: updateEmojiReducer,
    selectedEmoji: selectedEmojiReducer,

    themes: themeReducer,
    addTheme: addThemeReducer,
    updateTheme: updateThemeReducer,
    selectedTheme: selectedThemeReducer,

    adminStory: adminStoryReducer,
    generateStory: generateStoryReducer,
    storyCategory: storyCategoryReducer,
    addStoryCategory: addStoryCategoryReducer,
    notifications: notificationReducer,
    addNotification: addNotificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;