import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UpdateEmojiCategoryPayload, UpdateEmojiCategoryResponse } from "@/types/EmojiCategoryTypes/emojiCategoryFormTypes";

export const updateEmojiCategory = createApiThunk<UpdateEmojiCategoryResponse, UpdateEmojiCategoryPayload>(
    "emojiCategory/updateEmojiCategory",
    ({ categoryId, ...body }) => axios.put(`/admin/emoji-category/${categoryId}`, body),
);
