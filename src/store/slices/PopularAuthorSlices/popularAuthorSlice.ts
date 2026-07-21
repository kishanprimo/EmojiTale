import { createSlice } from "@reduxjs/toolkit";
import { getPopularAuthors } from "./popularAuthorThunk";
import { PopularAuthorItem, PopularAuthorMeta } from "@/types/PopularAuthorTypes/popularAuthorTypes";

interface PopularAuthorState {
    authors: PopularAuthorItem[];
    meta: PopularAuthorMeta;
    loading: boolean;
    error: string | null;
}

const initialState: PopularAuthorState = {
    authors: [],
    meta: { page: 1, limit: 5, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const popularAuthorSlice = createSlice({
    name: "popularAuthors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPopularAuthors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPopularAuthors.fulfilled, (state, action) => {
                state.loading = false;
                state.authors = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(getPopularAuthors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default popularAuthorSlice.reducer;
