import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { EmojiCategoryPayload, EmojiCategoryResponse } from "@/types/EmojiCategoryTypes/emojiCategoryTypes";

export const getEmojiCategories = createApiThunk<EmojiCategoryResponse, EmojiCategoryPayload>(
    "emojiCategories/getEmojiCategories",
    (payload) => axios.get("/admin/emoji-category", { params: payload }),
);
