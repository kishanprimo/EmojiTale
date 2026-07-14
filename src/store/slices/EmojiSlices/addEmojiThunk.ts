import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { AddEmojiResponse } from "@/types/EmojiTypes/emojiFormTypes";

export const addEmoji = createApiThunk<AddEmojiResponse, FormData>(
    "emoji/addEmoji",
    (formData) =>
        axios.post("/admin/emoji", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
);
