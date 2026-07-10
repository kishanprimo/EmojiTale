import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";

import {
    UpdateAvatarPayload,
    UpdateAvatarResponse,
} from "@/types/AvatarTypes/updateAvatarTypes";

export const updateAvatar = createAsyncThunk<
    UpdateAvatarResponse,
    UpdateAvatarPayload,
    {
        rejectValue: string;
    }
>(
    "avatar/updateAvatar",

    async (
        { avatarId, formData },
        { rejectWithValue }
    ) => {

        try {

            const response =
                await axios.put(
                    `/admin/avatars/${avatarId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

            return response.data;

        } catch (error: any) {

            return rejectWithValue(
                error?.response?.data?.message ||
                "Failed to update avatar"
            );

        }

    }
);