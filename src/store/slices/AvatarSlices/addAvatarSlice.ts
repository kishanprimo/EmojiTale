import { createSlice } from "@reduxjs/toolkit";

import { addAvatar } from "./addAvatarThunk";

interface AddAvatarState {

    loading: boolean;

    success: boolean;

    error: string | null;

}

const initialState: AddAvatarState = {

    loading: false,

    success: false,

    error: null,

};

const addAvatarSlice = createSlice({

    name: "addAvatar",

    initialState,

    reducers: {

        resetAddAvatar(state) {

            state.loading = false;

            state.success = false;

            state.error = null;

        },

    },

    extraReducers: (builder) => {

        builder

            .addCase(addAvatar.pending, (state) => {

                state.loading = true;

                state.success = false;

                state.error = null;

            })

            .addCase(addAvatar.fulfilled, (state) => {

                state.loading = false;

                state.success = true;

            })

            .addCase(addAvatar.rejected, (state, action) => {

                state.loading = false;

                state.success = false;

                state.error =
                    action.payload ??
                    "Something went wrong";

            });

    },

});

export const {

    resetAddAvatar,

} = addAvatarSlice.actions;

export default addAvatarSlice.reducer;