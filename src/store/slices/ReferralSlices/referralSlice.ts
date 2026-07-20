import { createSlice } from "@reduxjs/toolkit";
import { getReferrals } from "./referralThunk";
import { ReferralItem, ReferralPagination } from "@/types/ReferralTypes/referralTypes";

interface ReferralState {
    referrals: ReferralItem[];
    pagination: ReferralPagination;
    loading: boolean;
    error: string | null;
}

const initialState: ReferralState = {
    referrals: [],
    pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const referralSlice = createSlice({
    name: "referral",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReferrals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReferrals.fulfilled, (state, action) => {
                state.loading = false;
                state.referrals = action.payload.data.referrals;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getReferrals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default referralSlice.reducer;
