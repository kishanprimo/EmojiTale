import { createSlice } from "@reduxjs/toolkit";
import { addTheme } from "./addThemeThunk";

interface AddThemeState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: AddThemeState = {
    loading: false,
    success: false,
    error: null,
};

const addThemeSlice = createSlice({
    name: "addTheme",
    initialState,
    reducers: {
        resetAddTheme(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTheme.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(addTheme.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addTheme.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload ?? "Something went wrong";
            });
    },
});

export const { resetAddTheme } = addThemeSlice.actions;
export default addThemeSlice.reducer;
