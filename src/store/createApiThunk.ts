import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse, isAxiosError } from "axios";

export const createApiThunk = <Res, Arg = void>(
    type: string,
    request: (arg: Arg) => Promise<AxiosResponse<Res>>,
    fallbackMessage = "Something went wrong",
) =>
    createAsyncThunk<Res, Arg, { rejectValue: string }>(
        type,
        async (arg, { rejectWithValue }) => {
            try {
                const response = await request(arg);
                return response.data;
            } catch (error) {
                const message = isAxiosError(error)
                    ? error.response?.data?.message
                    : null;
                return rejectWithValue(
                    typeof message === "string" ? message : fallbackMessage,
                );
            }
        },
    );
