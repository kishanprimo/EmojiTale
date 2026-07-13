export interface AddEmojiPayload {
    formData: FormData;
}

export interface AddEmojiResponse {
    success: boolean;
    message: string;
    data: {
        emoji_id: number;
        emoji_url: string;
        emoji_category_id: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface UpdateEmojiPayload {
    emojiId: number;
    formData: FormData;
}

export interface UpdateEmojiResponse {
    success: boolean;
    message: string;
    data: {
        emoji_id: number;
        emoji_url: string;
        emoji_category_id: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface SelectedEmoji {
    emoji_id: number;
    emoji_url: string;
    emoji_category_id: number;
}
