import {
    createSlice,
} from "@reduxjs/toolkit";

import {
    updateAvatar,
} from "./updateAvatarThunk";

import {
    UpdateAvatarState,
} from "@/types/AvatarTypes/updateAvatarTypes";

const initialState: UpdateAvatarState = {

    loading: false,

    success: false,

    error: null,

};

const updateAvatarSlice =
    createSlice({

        name: "updateAvatar",

        initialState,

        reducers: {

            resetUpdateAvatar: (state) => {

                state.loading = false;

                state.success = false;

                state.error = null;

            },

        },

        extraReducers: (builder) => {

            builder

                .addCase(
                    updateAvatar.pending,
                    (state) => {

                        state.loading = true;

                        state.success = false;

                        state.error = null;

                    }
                )

                .addCase(
                    updateAvatar.fulfilled,
                    (state) => {

                        state.loading = false;

                        state.success = true;

                    }
                )

                .addCase(
                    updateAvatar.rejected,
                    (state, action) => {

                        state.loading = false;

                        state.success = false;

                        state.error =
                            action.payload ||
                            "Something went wrong";

                    }
                );

        },

    });

export const {

    resetUpdateAvatar,

} = updateAvatarSlice.actions;

export default updateAvatarSlice.reducer;