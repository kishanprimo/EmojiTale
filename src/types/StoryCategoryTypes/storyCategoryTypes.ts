export interface StoryCategoryItem {
    storycategory_id: number;
    storycategory_image: string;
    storycategory_name: string;
    storycategory_description: string;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface StoryCategoryPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface StoryCategoryResponse {
    success: boolean;
    message: string;
    data: {
        categories: StoryCategoryItem[];
        pagination: StoryCategoryPagination;
    };
}

export interface AddStoryCategoryResponse {
    success: boolean;
    message: string;
    data: { category: StoryCategoryItem };
}

export interface UpdateStoryCategoryResponse {
    success: boolean;
    message: string;
    data: { category: StoryCategoryItem };
}

export interface DeleteStoryCategoryResponse {
    success: boolean;
    message: string;
    data: null;
}
