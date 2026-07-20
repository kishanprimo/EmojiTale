import { createSlice } from "@reduxjs/toolkit";
import { addMemberLevelConfig } from "./add_member_level_config_thunk";
import { MemberLevelConfigItem } from "@/types/MemberConfigTypes/add_member_level_config_types";

interface AddMemberLevelConfigState {
    loading: boolean;
    success: boolean;
    error: string | null;
    config: MemberLevelConfigItem | null;
}

const initialState: AddMemberLevelConfigState = {
    loading: false,
    success: false,
    error: null,
    config: null,
};

const addMemberLevelConfigSlice = createSlice({
    name: "addMemberLevelConfig",
    initialState,
    reducers: {
        resetAddMemberLevelConfig: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.config = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addMemberLevelConfig.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(addMemberLevelConfig.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.config = action.payload.data;
            })
            .addCase(addMemberLevelConfig.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export const { resetAddMemberLevelConfig } =
    addMemberLevelConfigSlice.actions;

export default addMemberLevelConfigSlice.reducer;