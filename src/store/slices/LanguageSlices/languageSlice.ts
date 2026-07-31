import { createSlice } from "@reduxjs/toolkit";
import { getLanguages } from "./languageThunk";
import { LanguageItem, LanguagePagination } from "@/types/LanguageTypes/languageTypes";

interface LanguageState {
    languages: LanguageItem[];
    pagination: LanguagePagination;
    loading: boolean;
    error: string | null;
}

const initialState: LanguageState = {
    languages: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    loading: false,
    error: null,
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLanguages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLanguages.fulfilled, (state, action) => {
                state.loading = false;
                state.languages = action.payload.data.languages;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(getLanguages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default languageSlice.reducer;
