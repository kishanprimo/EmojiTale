import { createSlice } from "@reduxjs/toolkit";
import { getMemberLevelConfigs } from "./member_level_config_thunk";
import { MemberLevelConfigItem } from "@/types/MemberConfigTypes/member_level_config_types";

interface MemberLevelConfigState {
    configs: MemberLevelConfigItem[];
    loading: boolean;
    error: string | null;
}

const initialState: MemberLevelConfigState = {
    configs: [],
    loading: false,
    error: null,
};

const memberLevelConfigSlice = createSlice({
    name: "memberLevelConfig",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMemberLevelConfigs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMemberLevelConfigs.fulfilled, (state, action) => {
                state.loading = false;
                state.configs = action.payload.data;
            })
            .addCase(getMemberLevelConfigs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default memberLevelConfigSlice.reducer;