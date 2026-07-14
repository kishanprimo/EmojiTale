import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { AddEmojiCategoryPayload, AddEmojiCategoryResponse } from "@/types/EmojiCategoryTypes/emojiCategoryFormTypes";

export const addEmojiCategory = createApiThunk<AddEmojiCategoryResponse, AddEmojiCategoryPayload>(
    "emojiCategory/addEmojiCategory",
    (payload) => axios.post("/admin/emoji-category", payload),
);
