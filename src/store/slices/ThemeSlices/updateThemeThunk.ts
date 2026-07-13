import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { UpdateThemePayload, UpdateThemeResponse } from "@/types/ThemeTypes/themeFormTypes";

export const updateTheme = createAsyncThunk<
    UpdateThemeResponse,
    UpdateThemePayload,
    { rejectValue: string }
>(
    "theme/updateTheme",
    async ({ themeId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/admin/themes/${themeId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
