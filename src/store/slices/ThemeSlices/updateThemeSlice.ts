import { createSlice } from "@reduxjs/toolkit";
import { updateTheme } from "./updateThemeThunk";

interface UpdateThemeState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: UpdateThemeState = {
    loading: false,
    success: false,
    error: null,
};

const updateThemeSlice = createSlice({
    name: "updateTheme",
    initialState,
    reducers: {
        resetUpdateTheme(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateTheme.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(updateTheme.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateTheme.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload ?? "Something went wrong";
            });
    },
});

export const { resetUpdateTheme } = updateThemeSlice.actions;
export default updateThemeSlice.reducer;
