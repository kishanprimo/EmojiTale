export interface AddEmojiCategoryResponse {
    success: boolean;
    message: string;
    data: {
        emoji_category_id: number;
        name: string;
        is_premium: boolean;
        emoji_category_image: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface UpdateEmojiCategoryPayload {
    categoryId: number;
    formData: FormData;
}

export interface UpdateEmojiCategoryResponse {
    success: boolean;
    message: string;
    data: {
        emoji_category_id: number;
        name: string;
        is_premium: boolean;
        emoji_category_image: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface SelectedEmojiCategory {
    emoji_category_id: number;
    name: string;
    is_premium: boolean;
    emoji_category_image: string;
}
