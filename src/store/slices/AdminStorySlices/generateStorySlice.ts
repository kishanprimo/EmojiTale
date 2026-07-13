import { createSlice } from "@reduxjs/toolkit";
import { generateAdminStory } from "./generateStoryThunk";

interface GenerateStoryState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: GenerateStoryState = {
    loading: false,
    success: false,
    error: null,
};

const generateStorySlice = createSlice({
    name: "generateStory",
    initialState,
    reducers: {
        resetGenerateStory(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateAdminStory.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(generateAdminStory.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(generateAdminStory.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload ?? "Something went wrong";
            });
    },
});

export const { resetGenerateStory } = generateStorySlice.actions;
export default generateStorySlice.reducer;
