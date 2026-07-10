import { createSlice } from "@reduxjs/toolkit";
import { addEmojiCategory } from "./addEmojiCategoryThunk";

interface AddEmojiCategoryState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: AddEmojiCategoryState = {
    loading: false,
    success: false,
    error: null,
};

const addEmojiCategorySlice = createSlice({
    name: "addEmojiCategory",
    initialState,
    reducers: {
        resetAddEmojiCategory(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addEmojiCategory.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(addEmojiCategory.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addEmojiCategory.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload ?? "Something went wrong";
            });
    },
});

export const { resetAddEmojiCategory } = addEmojiCategorySlice.actions;
export default addEmojiCategorySlice.reducer;
