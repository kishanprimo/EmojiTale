import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { EmojiCategoryPayload, EmojiCategoryResponse } from "@/types/EmojiCategoryTypes/emojiCategoryTypes";

export const getEmojiCategories = createAsyncThunk<
    EmojiCategoryResponse,
    EmojiCategoryPayload,
    { rejectValue: string }
>(
    "emojiCategories/getEmojiCategories",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get("/admin/emoji-category", { params: payload });
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
