import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "./notificationThunk";
import { NotificationItem, NotificationPagination } from "@/types/NotificationTypes/notificationTypes";

interface NotificationState {
    notifications: NotificationItem[];
    pagination: NotificationPagination;
    loading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload.data.records;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default notificationSlice.reducer;
