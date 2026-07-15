export interface AdminStoryPayload {
    page: number;
    limit: number;
    search?: string;
    storycategory_id?: number;
    is_active?: boolean;
}

export interface AdminStoryCategory {
    storycategory_id: number;
    storycategory_name: string;
    storycategory_image: string;
    storycategory_description: string;
    createdAt: string;
    updatedAt: string;
}

export interface StoryMediaItem {
    storymedia_id: number;
    adminstory_id: number;
    image: string;
    content: string;
    sort_order: number;
    createdAt: string;
    updatedAt: string;
}

export interface AdminStoryItem {
    adminstory_id: number;
    title: string;
    storycategory_id: number;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    category: AdminStoryCategory;
    media: StoryMediaItem[];
}

export interface AdminStoryPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface AdminStoryResponse {
    success: boolean;
    message: string;
    data: {
        stories: AdminStoryItem[];
        pagination: AdminStoryPagination;
    };
}

export interface GenerateStoryResponse {
    success: boolean;
    message: string;
    data: {
        story: AdminStoryItem;
    };
}
