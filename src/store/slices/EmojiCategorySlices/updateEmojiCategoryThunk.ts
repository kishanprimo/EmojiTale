import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UpdateEmojiCategoryPayload, UpdateEmojiCategoryResponse } from "@/types/EmojiCategoryTypes/emojiCategoryFormTypes";

export const updateEmojiCategory = createApiThunk<UpdateEmojiCategoryResponse, UpdateEmojiCategoryPayload>(
    "emojiCategory/updateEmojiCategory",
    ({ categoryId, formData }) =>
        axios.put(`/admin/emoji-category/${categoryId}`, formData),
        // Content-Type header intentionally NOT set —
        // axios/browser auto-detects FormData and sets
        // "multipart/form-data; boundary=----WebKitFormBoundaryXXXX"
        // A manually-set header without boundary breaks multer's parser
        // and silently drops all text fields (translations, is_premium, etc.)
);