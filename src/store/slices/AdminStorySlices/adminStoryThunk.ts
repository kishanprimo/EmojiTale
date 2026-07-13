import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { AdminStoryPayload, AdminStoryResponse } from "@/types/AdminStoryTypes/adminStoryTypes";

export const getAdminStories = createAsyncThunk<
    AdminStoryResponse,
    AdminStoryPayload,
    { rejectValue: string }
>(
    "adminStory/getAdminStories",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/admin-story/all", payload);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
