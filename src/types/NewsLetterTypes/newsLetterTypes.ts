export interface NewsLetterPayload {
    page: number;
    limit: number;
    search?: string;
}

export interface NewsLetterItem {
    subscriber_id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface NewsLetterPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface NewsLetterResponse {
    success: boolean;
    message: string;
    data: {
        records: NewsLetterItem[];
        pagination: NewsLetterPagination;
    };
}
