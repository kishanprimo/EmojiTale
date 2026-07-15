import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { AddEmojiCategoryResponse } from "@/types/EmojiCategoryTypes/emojiCategoryFormTypes";

export const addEmojiCategory = createApiThunk<AddEmojiCategoryResponse, FormData>(
    "emojiCategory/addEmojiCategory",
    (formData) =>
        axios.post("/admin/emoji-category", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
);
