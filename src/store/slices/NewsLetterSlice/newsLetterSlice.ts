import { createSlice } from "@reduxjs/toolkit";
import { getNewsLetters } from "./newsLetterThunk";
import { NewsLetterItem, NewsLetterPagination } from "@/types/NewsLetterTypes/newsLetterTypes";

interface NewsLetterState {
    subscribers: NewsLetterItem[];
    pagination: NewsLetterPagination;
    loading: boolean;
    error: string | null;
}

const initialState: NewsLetterState = {
    subscribers: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const newsLetterSlice = createSlice({
    name: "newsletter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNewsLetters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNewsLetters.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribers = action.payload.data.records;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getNewsLetters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default newsLetterSlice.reducer;
