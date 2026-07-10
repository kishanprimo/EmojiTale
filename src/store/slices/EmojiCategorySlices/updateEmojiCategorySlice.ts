import { createSlice } from "@reduxjs/toolkit";
import { updateEmojiCategory } from "./updateEmojiCategoryThunk";

interface UpdateEmojiCategoryState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: UpdateEmojiCategoryState = {
    loading: false,
    success: false,
    error: null,
};

const updateEmojiCategorySlice = createSlice({
    name: "updateEmojiCategory",
    initialState,
    reducers: {
        resetUpdateEmojiCategory(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateEmojiCategory.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(updateEmojiCategory.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateEmojiCategory.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload ?? "Something went wrong";
            });
    },
});

export const { resetUpdateEmojiCategory } = updateEmojiCategorySlice.actions;
export default updateEmojiCategorySlice.reducer;
