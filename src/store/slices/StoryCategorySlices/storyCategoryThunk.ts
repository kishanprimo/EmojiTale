import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { StoryCategoryResponse } from "@/types/StoryCategoryTypes/storyCategoryTypes";

export const getStoryCategories = createAsyncThunk<
    StoryCategoryResponse,
    { page: number; limit: number },
    { rejectValue: string }
>(
    "storyCategory/getStoryCategories",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/story-category/all", payload);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
