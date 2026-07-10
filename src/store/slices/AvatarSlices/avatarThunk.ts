import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";

import {
    AvatarPayload,
    AvatarResponse,
} from "@/types/AvatarTypes/avatarTypes";

export const getAvatars = createAsyncThunk<
    AvatarResponse,
    AvatarPayload,
    {
        rejectValue: string;
    }
>(
    "avatars/getAvatars",

    async (payload, { rejectWithValue }) => {

        try {

            const response = await axios.get(
                "/admin/avatars",
                {
                    params: payload,
                }
            );

            return response.data;

        } catch (error: any) {

            const message =
                error.response?.data?.message;

            if (typeof message === "string") {

                return rejectWithValue(message);

            }

            return rejectWithValue(
                "Something went wrong"
            );

        }

    }
);