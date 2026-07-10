import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { UpdateEmojiCategoryPayload, UpdateEmojiCategoryResponse } from "@/types/EmojiCategoryTypes/emojiCategoryFormTypes";

export const updateEmojiCategory = createAsyncThunk<
    UpdateEmojiCategoryResponse,
    UpdateEmojiCategoryPayload,
    { rejectValue: string }
>(
    "emojiCategory/updateEmojiCategory",
    async ({ categoryId, ...body }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/admin/emoji-category/${categoryId}`, body);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
