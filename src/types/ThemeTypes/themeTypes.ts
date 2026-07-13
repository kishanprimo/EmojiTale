export interface ThemePayload {
    page: number;
    limit: number;
    theme_name?: string;
}

export interface ThemeItem {
    theme_id: number;
    theme_name: string;
    theme_name_subtitle: string;
    theme_image: string;
    createdAt: string;
    updatedAt: string;
}

export interface ThemePagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ThemeResponse {
    success: boolean;
    message: string;
    data: {
        records: ThemeItem[];
        pagination: ThemePagination;
    };
}
