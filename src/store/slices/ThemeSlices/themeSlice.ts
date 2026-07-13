import { createSlice } from "@reduxjs/toolkit";
import { getThemes } from "./themeThunk";
import { ThemeItem, ThemePagination } from "@/types/ThemeTypes/themeTypes";

interface ThemeState {
    themes: ThemeItem[];
    pagination: ThemePagination;
    loading: boolean;
    error: string | null;
}

const initialState: ThemeState = {
    themes: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const themeSlice = createSlice({
    name: "themes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getThemes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getThemes.fulfilled, (state, action) => {
                state.loading = false;
                state.themes = action.payload.data.records;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getThemes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default themeSlice.reducer;
