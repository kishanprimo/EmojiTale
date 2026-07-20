import { createSlice } from "@reduxjs/toolkit";

import { getXPHistory } from "./xpHistoryThunk";

import {
    XPHistoryItem,
} from "@/types/UserTypes/xpHistoryTypes";

interface XPHistoryState {
    history: Record<number, XPHistoryItem[]>;

    pagination: {
        total: number;
        page: number;
        limit: number;
    } | null;

    loading: boolean;

    error: string | null;
}

const initialState: XPHistoryState = {
    history: {},

    pagination: null,

    loading: false,

    error: null,
};

const xpHistorySlice = createSlice({
    name: "xpHistory",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(getXPHistory.pending, (state) => {
                state.loading = true;

                state.error = null;
            })

            .addCase(getXPHistory.fulfilled, (state, action) => {
                state.loading = false;

                const history =
                    action.payload.data.xp_history ?? [];

                if (history.length > 0) {
                    state.history[history[0].user_id] =
                        history;
                }

                state.pagination =
                    action.payload.data.pagination;
            })

            .addCase(getXPHistory.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export default xpHistorySlice.reducer;