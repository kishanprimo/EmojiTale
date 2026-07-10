import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedAvatar {
    avatar_id: number;
    name: string;
    avatar_gender: "male" | "female";
    status: boolean;
    avatar_media: string | null;
}

interface SelectedAvatarState {
    avatar: SelectedAvatar | null;
}

const initialState: SelectedAvatarState = {
    avatar: null,
};

const selectedAvatarSlice = createSlice({
    name: "selectedAvatar",
    initialState,
    reducers: {
        setSelectedAvatar: (
            state,
            action: PayloadAction<SelectedAvatar>
        ) => {
            state.avatar = action.payload;
        },

        clearSelectedAvatar: (state) => {
            state.avatar = null;
        },
    },
});

export const {
    setSelectedAvatar,
    clearSelectedAvatar,
} = selectedAvatarSlice.actions;

export default selectedAvatarSlice.reducer;