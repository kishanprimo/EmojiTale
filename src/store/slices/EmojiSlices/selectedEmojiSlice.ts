import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedEmoji } from "@/types/EmojiTypes/emojiFormTypes";

interface SelectedEmojiState {
    emoji: SelectedEmoji | null;
}

const initialState: SelectedEmojiState = {
    emoji: null,
};

const selectedEmojiSlice = createSlice({
    name: "selectedEmoji",
    initialState,
    reducers: {
        setSelectedEmoji(state, action: PayloadAction<SelectedEmoji>) {
            state.emoji = action.payload;
        },
        clearSelectedEmoji(state) {
            state.emoji = null;
        },
    },
});

export const { setSelectedEmoji, clearSelectedEmoji } = selectedEmojiSlice.actions;
export default selectedEmojiSlice.reducer;
