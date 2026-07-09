import { createSlice } from "@reduxjs/toolkit";

import { getUserDetails } from "./userDetailsThunk";

import {
    OwnerDetails,
    AgentDetails,
} from "@/types/UserTypes/userDetailsTypes";

interface UserDetailsState {

    user: OwnerDetails | null;

    agents: AgentDetails[];

    loading: boolean;

    error: string | null;
}

const initialState: UserDetailsState = {

    user: null,

    agents: [],

    loading: false,

    error: null,
};

const userDetailsSlice = createSlice({

    name: "userDetails",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(getUserDetails.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(getUserDetails.fulfilled, (state, action) => {

                state.loading = false;

                state.user = action.payload.data.user;

                state.agents = action.payload.data.agents;

            })

            .addCase(getUserDetails.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload || "Something went wrong";

            });

    },

});

export default userDetailsSlice.reducer;