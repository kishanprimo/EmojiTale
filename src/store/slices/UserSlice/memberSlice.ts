import { createSlice } from "@reduxjs/toolkit";

import { getMembers } from "./memberThunk";

import {
    MemberItem,
} from "@/types/UserTypes/memberTypes";

interface MemberState {

    members: Record<number, MemberItem[]>;

    loading: boolean;

    error: string | null;
}

const initialState: MemberState = {

    members: {},

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

                const rows = action.payload.data.rows;

                if (rows.length > 0) {

                    state.members[rows[0].user_id] = rows;

                }

            })

            .addCase(getMembers.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload || "Something went wrong";

            });

    }

});

export default memberSlice.reducer;