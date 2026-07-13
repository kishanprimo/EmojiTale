import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { EmojiPayload, EmojiResponse } from "@/types/EmojiTypes/emojiTypes";

export const getEmojis = createAsyncThunk<
    EmojiResponse,
    EmojiPayload,
    { rejectValue: string }
>(
    "emojis/getEmojis",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get("/admin/emoji", { params: payload });
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
