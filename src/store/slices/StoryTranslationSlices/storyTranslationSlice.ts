import { createSlice } from "@reduxjs/toolkit";
import {
    getAdminStoryByLanguage,
    updateStoryMediaTranslation,
    updateStoryTitleTranslation,
} from "./storyTranslationThunk";
import { AdminStoryItem } from "@/types/AdminStoryTypes/adminStoryTypes";
 
interface StoryTranslationState {
    story: AdminStoryItem | null;
    loading: boolean;
    saving: boolean;
    error: string | null;
}
 
const initialState: StoryTranslationState = {
    story: null,
    loading: false,
    saving: false,
    error: null,
};
 
const storyTranslationSlice = createSlice({
    name: "storyTranslation",
    initialState,
    reducers: {
        resetStoryTranslation: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminStoryByLanguage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdminStoryByLanguage.fulfilled, (state, action) => {
                state.loading = false;
                state.story = action.payload.data.story;
            })
            .addCase(getAdminStoryByLanguage.rejected, (state, action) => {
                state.loading = false;
                state.story = null;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(updateStoryTitleTranslation.pending, (state) => {
                state.saving = true;
            })
            .addCase(updateStoryTitleTranslation.fulfilled, (state) => {
                state.saving = false;
            })
            .addCase(updateStoryTitleTranslation.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(updateStoryMediaTranslation.pending, (state) => {
                state.saving = true;
            })
            .addCase(updateStoryMediaTranslation.fulfilled, (state) => {
                state.saving = false;
            })
            .addCase(updateStoryMediaTranslation.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});
 
export const { resetStoryTranslation } = storyTranslationSlice.actions;
 
export default storyTranslationSlice.reducer;