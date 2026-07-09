import { createSlice } from "@reduxjs/toolkit";

import { getUsers } from "./userThunk";

import { UserCards, UserItem, UserPagination } from "@/types/UserTypes/userTypes";

interface UserState {
    cards: UserCards;
    users: UserItem[];
    pagination: UserPagination;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {

    cards: {
        total_users: { total: 0, thisMonth: 0, lastMonth: 0, percentChange: 0 },
        active_users: { total: 0, thisMonth: 0, lastMonth: 0, percentChange: 0 },
        total_domains: { total: 0 },
        total_conversations: { total: 0, thisMonth: 0, lastMonth: 0, percentChange: 0 },
    },

    users: [],

    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    },

    loading: false,

    error: null,
};

const userSlice = createSlice({

    name: "users",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getUsers.fulfilled, (state, action) => {

                state.loading = false;

                // Keep cards static for now

                state.users = action.payload.data.records;
                state.pagination = action.payload.data.pagination;
            })

            .addCase(getUsers.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export default userSlice.reducer;