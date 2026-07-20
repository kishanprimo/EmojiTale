import { createSlice } from "@reduxjs/toolkit";
import { updateMemberLevelConfig } from "./update_member_level_config_thunk";
import { UpdatedMemberLevelConfig } from "@/types/MemberConfigTypes/update_member_level_config_types";

interface UpdateMemberLevelConfigState {
    loading: boolean;
    success: boolean;
    error: string | null;
    config: UpdatedMemberLevelConfig | null;
}

const initialState: UpdateMemberLevelConfigState = {
    loading: false,
    success: false,
    error: null,
    config: null,
};

const updateMemberLevelConfigSlice = createSlice({
    name: "updateMemberLevelConfig",
    initialState,
    reducers: {
        resetUpdateMemberLevelConfig(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.config = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateMemberLevelConfig.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(
                updateMemberLevelConfig.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.config = action.payload.data;
                }
            )
            .addCase(
                updateMemberLevelConfig.rejected,
                (state, action) => {
                    state.loading = false;
                    state.success = false;
                    state.error =
                        action.payload || "Something went wrong";
                }
            );
    },
});

export const {
    resetUpdateMemberLevelConfig,
} = updateMemberLevelConfigSlice.actions;

export default updateMemberLevelConfigSlice.reducer;