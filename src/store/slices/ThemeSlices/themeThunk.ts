import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { ThemePayload, ThemeResponse } from "@/types/ThemeTypes/themeTypes";

export const getThemes = createAsyncThunk<
    ThemeResponse,
    ThemePayload,
    { rejectValue: string }
>(
    "themes/getThemes",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get("/admin/themes", { params: payload });
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
