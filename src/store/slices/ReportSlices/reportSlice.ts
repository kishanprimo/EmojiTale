import { createSlice } from "@reduxjs/toolkit";
import { getReports } from "./reportThunk";
import { ReportItem, ReportPagination } from "@/types/ReportTypes/reportTypes";

interface ReportState {
    reports: ReportItem[];
    pagination: ReportPagination;
    loading: boolean;
    error: string | null;
}

const initialState: ReportState = {
    reports: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1, hasNext: false, hasPrev: false },
    loading: false,
    error: null,
};

const reportSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReports.fulfilled, (state, action) => {
                state.loading = false;
                state.reports = action.payload.data.reports;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default reportSlice.reducer;
