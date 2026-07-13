import { createSlice } from "@reduxjs/toolkit";
import { addStoryCategory } from "./addStoryCategoryThunk";

interface AddStoryCategoryState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: AddStoryCategoryState = {
    loading: false,
    success: false,
    error: null,
};

const addStoryCategorySlice = createSlice({
    name: "addStoryCategory",
    initialState,
    reducers: {
        resetAddStoryCategory: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addStoryCategory.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(addStoryCategory.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addStoryCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { resetAddStoryCategory } = addStoryCategorySlice.actions;
export default addStoryCategorySlice.reducer;
