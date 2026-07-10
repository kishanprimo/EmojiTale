export interface AddEmojiCategoryPayload {
    name: string;
    isIslamic?: boolean;
}

export interface AddEmojiCategoryResponse {
    success: boolean;
    message: string;
    data: {
        emoji_category_id: number;
        name: string;
        isIslamic: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

export interface UpdateEmojiCategoryPayload {
    categoryId: number;
    name?: string;
    isIslamic?: boolean;
}

export interface UpdateEmojiCategoryResponse {
    success: boolean;
    message: string;
    data: {
        emoji_category_id: number;
        name: string;
        isIslamic: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

export interface SelectedEmojiCategory {
    emoji_category_id: number;
    name: string;
}
