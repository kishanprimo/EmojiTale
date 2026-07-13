import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedTheme } from "@/types/ThemeTypes/themeFormTypes";

interface SelectedThemeState {
    theme: SelectedTheme | null;
}

const initialState: SelectedThemeState = {
    theme: null,
};

const selectedThemeSlice = createSlice({
    name: "selectedTheme",
    initialState,
    reducers: {
        setSelectedTheme(state, action: PayloadAction<SelectedTheme>) {
            state.theme = action.payload;
        },
        clearSelectedTheme(state) {
            state.theme = null;
        },
    },
});

export const { setSelectedTheme, clearSelectedTheme } = selectedThemeSlice.actions;
export default selectedThemeSlice.reducer;
