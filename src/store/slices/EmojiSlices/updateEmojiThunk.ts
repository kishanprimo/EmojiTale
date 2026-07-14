import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UpdateEmojiPayload, UpdateEmojiResponse } from "@/types/EmojiTypes/emojiFormTypes";

export const updateEmoji = createApiThunk<UpdateEmojiResponse, UpdateEmojiPayload>(
    "emoji/updateEmoji",
    ({ emojiId, formData }) =>
        axios.put(`/admin/emoji/${emojiId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
);
