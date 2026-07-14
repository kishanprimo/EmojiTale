import { createSlice } from "@reduxjs/toolkit";
import { getAdminConfigs } from "./adminConfigThunk";
import { AdminConfigItem } from "@/types/AdminConfigTypes/adminConfigTypes";

interface AdminConfigState {
    configs: AdminConfigItem[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminConfigState = {
    configs: [],
    loading: false,
    error: null,
};

const adminConfigSlice = createSlice({
    name: "adminConfig",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdminConfigs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdminConfigs.fulfilled, (state, action) => {
                state.loading = false;
                state.configs = action.payload.data;
            })
            .addCase(getAdminConfigs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default adminConfigSlice.reducer;
