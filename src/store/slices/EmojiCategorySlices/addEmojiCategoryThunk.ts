import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { AddEmojiCategoryPayload, AddEmojiCategoryResponse } from "@/types/EmojiCategoryTypes/emojiCategoryFormTypes";

export const addEmojiCategory = createAsyncThunk<
    AddEmojiCategoryResponse,
    AddEmojiCategoryPayload,
    { rejectValue: string }
>(
    "emojiCategory/addEmojiCategory",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/admin/emoji-category", payload);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
