import { createSlice } from "@reduxjs/toolkit";
import { getAdminStories } from "./adminStoryThunk";
import { AdminStoryItem, AdminStoryPagination } from "@/types/AdminStoryTypes/adminStoryTypes";

interface AdminStoryState {
    stories: AdminStoryItem[];
    pagination: AdminStoryPagination;
    loading: boolean;
    error: string | null;
}

const initialState: AdminStoryState = {
    stories: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const adminStorySlice = createSlice({
    name: "adminStory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdminStories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdminStories.fulfilled, (state, action) => {
                state.loading = false;
                state.stories = action.payload.data.stories;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getAdminStories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default adminStorySlice.reducer;
