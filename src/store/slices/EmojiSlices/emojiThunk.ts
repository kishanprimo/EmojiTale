import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { EmojiPayload, EmojiResponse } from "@/types/EmojiTypes/emojiTypes";

export const getEmojis = createApiThunk<EmojiResponse, EmojiPayload>(
    "emojis/getEmojis",
    (payload) => axios.get("/admin/emoji", { params: payload }),
);
