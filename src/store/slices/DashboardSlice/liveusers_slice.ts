import { createSlice } from "@reduxjs/toolkit";
import { getDashboard } from "./liveusers_thunk";
import { DashboardData } from "@/types/DashboardTypes/liveusers_types";

interface DashboardState {
    data: DashboardData;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    data: {
        daywise_active_users: {
            chart: [],
        },
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
            .addCase(getDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default dashboardSlice.reducer;
