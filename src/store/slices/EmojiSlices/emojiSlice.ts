import { createSlice } from "@reduxjs/toolkit";
import { getEmojis } from "./emojiThunk";
import { EmojiItem, EmojiPagination } from "@/types/EmojiTypes/emojiTypes";

interface EmojiState {
    emojis: EmojiItem[];
    pagination: EmojiPagination;
    loading: boolean;
    error: string | null;
}

const initialState: EmojiState = {
    emojis: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const emojiSlice = createSlice({
    name: "emojis",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmojis.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmojis.fulfilled, (state, action) => {
                state.loading = false;
                state.emojis = action.payload.data.records;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getEmojis.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default emojiSlice.reducer;
