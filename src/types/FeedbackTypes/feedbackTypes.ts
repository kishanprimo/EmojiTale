export interface FeedbackItem {
    feedback_id: number;
    user_id: number;
    feedback_type: string;
    subject: string;
    message: string;
    overall_rating: number;
    is_resolved: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FeedbackPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface FeedbackResponse {
    success: boolean;
    message: string;
    data: {
        feedbacks: FeedbackItem[];
        pagination: FeedbackPagination;
    };
}
