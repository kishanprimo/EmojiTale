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
import updateAdminStoryReducer from "./slices/AdminStorySlices/updateAdminStorySlice";
import deleteAdminStoryReducer from "./slices/AdminStorySlices/deleteAdminStorySlice";
import storyCategoryReducer from "./slices/StoryCategorySlices/storyCategorySlice";
import addStoryCategoryReducer from "./slices/StoryCategorySlices/addStoryCategorySlice";
import updateStoryCategoryReducer from "./slices/StoryCategorySlices/updateStoryCategorySlice";
import deleteStoryCategoryReducer from "./slices/StoryCategorySlices/deleteStoryCategorySlice";
import notificationReducer from "./slices/NotificationSlices/notificationSlice";
import addNotificationReducer from "./slices/NotificationSlices/addNotificationSlice";
import adminConfigReducer from "./slices/AdminConfigSlices/adminConfigSlice";
import updateAdminConfigReducer from "./slices/AdminConfigSlices/updateAdminConfigSlice";
import feedbackReducer from "./slices/FeedbackSlices/feedbackSlice";
import subscriptionReducer from "./slices/SubscriptionSlices/subscriptionSlice";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice/userSlice";
import userDetailsReducer from "./slices/UserSlice/userDetailsSlice";
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
import dashboardReducer from "./slices/DashboardSlice/dashboardSlice";
import memberLevelConfigReducer from "./slices/MemberConfigSlices/member_level_config_slice";
import referralReducer from "./slices/ReferralSlices/referralSlice";
import userViewReducer from "./slices/UserSlice/userViewSlice";
import addMemberLevelConfigReducer from "./slices/MemberConfigSlices/add_member_level_config_slice";
import updateMemberLevelConfigReducer from "./slices/MemberConfigSlices/update_member_level_config_slice";
import memberStoriesReducer from "./slices/UserSlice/memberStoriesSlice";
import xpHistoryReducer from "./slices/UserSlice/xpHistorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    dashboard: dashboardReducer,

    users: userReducer,
    members: memberReducer,
    userDetails: userDetailsReducer,


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
    updateAdminStory: updateAdminStoryReducer,
    deleteAdminStory: deleteAdminStoryReducer,
    storyCategory: storyCategoryReducer,
    addStoryCategory: addStoryCategoryReducer,
    updateStoryCategory: updateStoryCategoryReducer,
    deleteStoryCategory: deleteStoryCategoryReducer,
    notifications: notificationReducer,
    addNotification: addNotificationReducer,
    adminConfig: adminConfigReducer,
    updateAdminConfig: updateAdminConfigReducer,
    feedback: feedbackReducer,
    subscription: subscriptionReducer,

    memberLevelConfig: memberLevelConfigReducer,
    addMemberLevelConfig: addMemberLevelConfigReducer,
    updateMemberLevelConfig: updateMemberLevelConfigReducer,
    referrals: referralReducer,
    userView: userViewReducer,
    memberStories: memberStoriesReducer,
    xpHistory: xpHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;