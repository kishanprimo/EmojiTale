import { createSlice } from "@reduxjs/toolkit";

import { getDashboardStats } from "./dashboardThunk";

import { DashboardStats } from "@/types/DashboardTypes/dashboardTypes";

interface DashboardState {
    stats: DashboardStats;

    loading: boolean;

    error: string | null;
}

const initialState: DashboardState = {
    stats: {
        total_users: 0,
        total_stories: 0,
        total_revenue: 0,
    },

    loading: false,

    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(getDashboardStats.pending, (state) => {
                state.loading = true;

                state.error = null;
            })

            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.loading = false;

                state.stats = action.payload.data;
            })

            .addCase(getDashboardStats.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload || "Something went wrong";
            });
    },
});

export default dashboardSlice.reducer;