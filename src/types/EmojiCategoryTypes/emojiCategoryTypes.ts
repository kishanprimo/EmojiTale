export interface EmojiCategoryPayload {
    page: number;
    limit: number;
    search?: string;
    isIslamic?: boolean;
}

export interface EmojiCategoryItem {
    emoji_category_id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface EmojiCategoryPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface EmojiCategoryResponse {
    success: boolean;
    message: string;
    data: {
        data: EmojiCategoryItem[];
        pagination: EmojiCategoryPagination;
    };
}
