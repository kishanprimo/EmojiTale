import { createSlice } from "@reduxjs/toolkit";

import { getMembers } from "./memberThunk";

import {
    MemberItem,
} from "@/types/UserTypes/memberTypes";

interface MemberState {
    members: Record<number, MemberItem[]>;

    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    } | null;

    loading: boolean;

    error: string | null;
}

const initialState: MemberState = {
    members: {},

    pagination: null,

    loading: false,

    error: null,
};

const memberSlice = createSlice({

    name: "members",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(getMembers.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(getMembers.fulfilled, (state, action) => {

                state.loading = false;
                const members = action.payload.data.members ?? [];

                if (members.length > 0) {
                    state.members[members[0].user_id] = members;
                }

                state.pagination = action.payload.data.pagination;
            })

            .addCase(getMembers.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload || "Something went wrong";

            });

    }

});

export default memberSlice.reducer;