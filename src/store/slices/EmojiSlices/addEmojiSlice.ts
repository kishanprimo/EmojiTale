import { createSlice } from "@reduxjs/toolkit";
import { addEmoji } from "./addEmojiThunk";

interface AddEmojiState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: AddEmojiState = {
    loading: false,
    success: false,
    error: null,
};

const addEmojiSlice = createSlice({
    name: "addEmoji",
    initialState,
    reducers: {
        resetAddEmoji(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addEmoji.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(addEmoji.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addEmoji.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload ?? "Something went wrong";
            });
    },
});

export const { resetAddEmoji } = addEmojiSlice.actions;
export default addEmojiSlice.reducer;
