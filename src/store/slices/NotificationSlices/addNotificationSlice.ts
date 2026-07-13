import { createSlice } from "@reduxjs/toolkit";
import { createNotification } from "./addNotificationThunk";

interface AddNotificationState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: AddNotificationState = {
    loading: false,
    success: false,
    error: null,
};

const addNotificationSlice = createSlice({
    name: "addNotification",
    initialState,
    reducers: {
        resetAddNotification: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNotification.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(createNotification.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { resetAddNotification } = addNotificationSlice.actions;
export default addNotificationSlice.reducer;
