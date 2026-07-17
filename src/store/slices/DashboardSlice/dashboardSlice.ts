import { createSlice } from "@reduxjs/toolkit";

import { getDashboardStats, getUserGraph, getMemberGraph } from "./dashboardThunk";

import { DashboardStats, GraphPeriod, GraphPoint } from "@/types/DashboardTypes/dashboardTypes";

interface DashboardState {
    stats: DashboardStats;

    loading: boolean;

    error: string | null;

    userGraph: GraphPoint[];
    userGraphPeriod: GraphPeriod;
    userGraphLoading: boolean;

    memberGraph: GraphPoint[];
    memberGraphPeriod: GraphPeriod;
    memberGraphLoading: boolean;
}

const initialState: DashboardState = {
    stats: {
        total_users: 0,
        total_stories: 0,
        total_revenue: 0,
    },

    loading: false,

    error: null,

    userGraph: [],
    userGraphPeriod: "month",
    userGraphLoading: false,

    memberGraph: [],
    memberGraphPeriod: "day",
    memberGraphLoading: false,
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
            })

            .addCase(getUserGraph.pending, (state) => {
                state.userGraphLoading = true;
            })

            .addCase(getUserGraph.fulfilled, (state, action) => {
                state.userGraphLoading = false;

                state.userGraph = action.payload.data.data;
                state.userGraphPeriod = action.payload.data.period;
            })

            .addCase(getUserGraph.rejected, (state) => {
                state.userGraphLoading = false;
            })

            .addCase(getMemberGraph.pending, (state) => {
                state.memberGraphLoading = true;
            })

            .addCase(getMemberGraph.fulfilled, (state, action) => {
                state.memberGraphLoading = false;

                state.memberGraph = action.payload.data.data;
                state.memberGraphPeriod = action.payload.data.period;
            })

            .addCase(getMemberGraph.rejected, (state) => {
                state.memberGraphLoading = false;
            });
    },
});

export default dashboardSlice.reducer;
