import { createSlice } from "@reduxjs/toolkit";
import { updateEmoji } from "./updateEmojiThunk";

interface UpdateEmojiState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: UpdateEmojiState = {
    loading: false,
    success: false,
    error: null,
};

const updateEmojiSlice = createSlice({
    name: "updateEmoji",
    initialState,
    reducers: {
        resetUpdateEmoji(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateEmoji.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(updateEmoji.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateEmoji.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload ?? "Something went wrong";
            });
    },
});

export const { resetUpdateEmoji } = updateEmojiSlice.actions;
export default updateEmojiSlice.reducer;
