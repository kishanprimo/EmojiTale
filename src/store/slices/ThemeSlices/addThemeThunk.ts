import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { AddThemeResponse } from "@/types/ThemeTypes/themeFormTypes";

export const addTheme = createAsyncThunk<
    AddThemeResponse,
    FormData,
    { rejectValue: string }
>(
    "theme/addTheme",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/admin/themes", formData, {
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
