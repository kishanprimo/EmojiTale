import { createSlice } from "@reduxjs/toolkit";
import { getSubscriptions } from "./subscriptionThunk";
import { SubscriptionItem, SubscriptionPagination } from "@/types/SubscriptionTypes/subscriptionTypes";

interface SubscriptionState {
    subscriptions: SubscriptionItem[];
    pagination: SubscriptionPagination;
    loading: boolean;
    error: string | null;
}

const initialState: SubscriptionState = {
    subscriptions: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSubscriptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubscriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions = action.payload.data.records;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getSubscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default subscriptionSlice.reducer;
