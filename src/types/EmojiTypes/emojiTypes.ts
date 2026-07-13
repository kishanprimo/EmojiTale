export interface EmojiPayload {
    page: number;
    limit: number;
    search?: string;
    emoji_category_id?: number;
}

export interface EmojiCategory {
    emoji_category_id: number;
    name: string;
}

export interface EmojiItem {
    emoji_id: number;
    emoji_url: string;
    emoji_category_id: number;
    emoji_name: string;
    createdAt: string;
    updatedAt: string;
    category?: EmojiCategory;
}

export interface EmojiPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface EmojiResponse {
    success: boolean;
    message: string;
    data: {
        records: EmojiItem[];
        pagination: EmojiPagination;
    };
}
