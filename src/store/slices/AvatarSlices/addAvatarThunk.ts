import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";

import {
    AddAvatarResponse,
} from "@/types/AvatarTypes/addAvatarTypes";

export const addAvatar = createAsyncThunk<
    AddAvatarResponse,
    FormData,
    {
        rejectValue: string;
    }
>(
    "avatar/addAvatar",

    async (formData, { rejectWithValue }) => {

        try {

            const response = await axios.post(
                "/admin/avatars",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
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