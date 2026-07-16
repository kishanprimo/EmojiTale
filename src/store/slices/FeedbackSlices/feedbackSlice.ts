import { createSlice } from "@reduxjs/toolkit";
import { getFeedbacks } from "./feedbackThunk";
import { FeedbackItem, FeedbackPagination } from "@/types/FeedbackTypes/feedbackTypes";

interface FeedbackState {
    feedbacks: FeedbackItem[];
    pagination: FeedbackPagination;
    loading: boolean;
    error: string | null;
}

const initialState: FeedbackState = {
    feedbacks: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeedbacks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks = action.payload.data.feedbacks;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getFeedbacks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default feedbackSlice.reducer;
