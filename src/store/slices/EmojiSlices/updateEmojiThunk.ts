import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { UpdateEmojiPayload, UpdateEmojiResponse } from "@/types/EmojiTypes/emojiFormTypes";

export const updateEmoji = createAsyncThunk<
    UpdateEmojiResponse,
    UpdateEmojiPayload,
    { rejectValue: string }
>(
    "emoji/updateEmoji",
    async ({ emojiId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/admin/emoji/${emojiId}`, formData, {
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
