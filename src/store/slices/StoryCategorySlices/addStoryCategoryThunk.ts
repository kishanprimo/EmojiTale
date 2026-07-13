import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { AddStoryCategoryResponse } from "@/types/StoryCategoryTypes/storyCategoryTypes";

export const addStoryCategory = createAsyncThunk<
    AddStoryCategoryResponse,
    FormData,
    { rejectValue: string }
>(
    "addStoryCategory/addStoryCategory",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/story-category/create", formData, {
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
