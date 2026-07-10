import { createSlice } from "@reduxjs/toolkit";

import { getAvatars } from "./avatarThunk";

import {
    AvatarItem,
    AvatarPagination,
} from "@/types/AvatarTypes/avatarTypes";

interface AvatarState {

    avatars: AvatarItem[];

    pagination: AvatarPagination;

    loading: boolean;

    error: string | null;

}

const initialState: AvatarState = {

    avatars: [],

    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    },

    loading: false,

    error: null,

};

const avatarSlice = createSlice({

    name: "avatars",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(getAvatars.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(getAvatars.fulfilled, (state, action) => {

                state.loading = false;

                state.avatars =
                    action.payload.data.records;

                state.pagination =
                    action.payload.data.pagination;

            })

            .addCase(getAvatars.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload ||
                    "Something went wrong";

            });

    },

});

export default avatarSlice.reducer;