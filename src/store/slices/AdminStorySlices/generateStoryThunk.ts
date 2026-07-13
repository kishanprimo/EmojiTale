import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { GenerateStoryResponse } from "@/types/AdminStoryTypes/adminStoryTypes";

export const generateAdminStory = createAsyncThunk<
    GenerateStoryResponse,
    FormData,
    { rejectValue: string }
>(
    "adminStory/generateAdminStory",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/admin-story/generate", formData, {
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
