import { AsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface MutationState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const getInitialState = (): MutationState => ({
    loading: false,
    success: false,
    error: null,
});

export const createMutationSlice = <Returned, Arg>(
    name: string,
    thunk: AsyncThunk<Returned, Arg, { rejectValue: string }>,
) =>
    createSlice({
        name,
        initialState: getInitialState(),
        reducers: {
            reset(state) {
                state.loading = false;
                state.success = false;
                state.error = null;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.loading = true;
                    state.success = false;
                    state.error = null;
                })
                .addCase(thunk.fulfilled, (state) => {
                    state.loading = false;
                    state.success = true;
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.loading = false;
                    state.success = false;
                    state.error = action.payload ?? "Something went wrong";
                });
        },
    });
