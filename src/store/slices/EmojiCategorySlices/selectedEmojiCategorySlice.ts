import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedEmojiCategory } from "@/types/EmojiCategoryTypes/emojiCategoryFormTypes";

interface SelectedEmojiCategoryState {
    category: SelectedEmojiCategory | null;
}

const initialState: SelectedEmojiCategoryState = {
    category: null,
};

const selectedEmojiCategorySlice = createSlice({
    name: "selectedEmojiCategory",
    initialState,
    reducers: {
        setSelectedEmojiCategory(state, action: PayloadAction<SelectedEmojiCategory>) {
            state.category = action.payload;
        },
        clearSelectedEmojiCategory(state) {
            state.category = null;
        },
    },
});

export const { setSelectedEmojiCategory, clearSelectedEmojiCategory } = selectedEmojiCategorySlice.actions;
export default selectedEmojiCategorySlice.reducer;
