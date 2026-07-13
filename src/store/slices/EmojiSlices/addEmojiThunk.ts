import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { AddEmojiResponse } from "@/types/EmojiTypes/emojiFormTypes";

export const addEmoji = createAsyncThunk<
    AddEmojiResponse,
    FormData,
    { rejectValue: string }
>(
    "emoji/addEmoji",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/admin/emoji", formData, {
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
