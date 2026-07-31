export interface LanguageItem {
    language_id: number;
    code: string;
    name: string;
    flag: string | null;
    native_label: string;
    is_original: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface LanguagePagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface LanguageListResponse {
    success: boolean;
    message: string;
    data: {
        languages: LanguageItem[];
        pagination: LanguagePagination;
    };
}

export interface LanguagePayload {
    code: string;
    name: string;
    flag?: string | null;
    native_label: string;
    is_original?: boolean;
}

export interface AddLanguageResponse {
    success: boolean;
    message: string;
    data: LanguageItem;
}

export interface UpdateLanguageResponse {
    success: boolean;
    message: string;
    data: LanguageItem;
}

export interface DeleteLanguageResponse {
    success: boolean;
    message: string;
    data: null;
}
