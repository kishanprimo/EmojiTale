import { createSlice } from "@reduxjs/toolkit";

import { getMemberStories } from "./memberStoriesThunk";

import {
    MemberStoryItem,
} from "@/types/UserTypes/memberStoriesTypes";

interface MemberStoriesState {

    stories: Record<number, MemberStoryItem[]>;

    pagination: {

        total: number;

        page: number;

        limit: number;

        totalPages: number;

    } | null;

    loading: boolean;

    error: string | null;
}

const initialState: MemberStoriesState = {

    stories: {},

    pagination: null,

    loading: false,

    error: null,

};

const memberStoriesSlice = createSlice({

    name: "memberStories",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(getMemberStories.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(getMemberStories.fulfilled, (state, action) => {

                state.loading = false;

                const stories =
                    action.payload.data.stories ?? [];

                if (stories.length > 0) {

                    state.stories[
                        stories[0].user_id
                    ] = stories;

                }

                state.pagination =
                    action.payload.data.pagination;

            })

            .addCase(getMemberStories.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload ||
                    "Something went wrong";

            });

    },

});

export default memberStoriesSlice.reducer;