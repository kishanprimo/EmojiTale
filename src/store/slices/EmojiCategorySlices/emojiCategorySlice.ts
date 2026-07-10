import { createSlice } from "@reduxjs/toolkit";
import { getEmojiCategories } from "./emojiCategoryThunk";
import { EmojiCategoryItem, EmojiCategoryPagination } from "@/types/EmojiCategoryTypes/emojiCategoryTypes";

interface EmojiCategoryState {
    categories: EmojiCategoryItem[];
    pagination: EmojiCategoryPagination;
    loading: boolean;
    error: string | null;
}

const initialState: EmojiCategoryState = {
    categories: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const emojiCategorySlice = createSlice({
    name: "emojiCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmojiCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmojiCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.data.data;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getEmojiCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default emojiCategorySlice.reducer;
