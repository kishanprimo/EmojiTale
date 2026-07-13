import { createSlice } from "@reduxjs/toolkit";
import { getStoryCategories } from "./storyCategoryThunk";
import { StoryCategoryItem, StoryCategoryPagination } from "@/types/StoryCategoryTypes/storyCategoryTypes";

interface StoryCategoryState {
    categories: StoryCategoryItem[];
    pagination: StoryCategoryPagination;
    loading: boolean;
    error: string | null;
}

const initialState: StoryCategoryState = {
    categories: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const storyCategorySlice = createSlice({
    name: "storyCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStoryCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStoryCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.data.categories;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getStoryCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default storyCategorySlice.reducer;
