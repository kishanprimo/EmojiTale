import { createSlice } from "@reduxjs/toolkit";
import { getUserById } from "./userViewThunk";
import { UserViewData } from "@/types/UserTypes/userViewTypes";

interface UserViewState {
    user: UserViewData | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserViewState = {
    user: null,
    loading: false,
    error: null,
};

const userViewSlice = createSlice({
    name: "userView",
    initialState,
    reducers: {
        clearUserView: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { clearUserView } = userViewSlice.actions;
export default userViewSlice.reducer;
