export interface FeedbackUser {
    user_id: number;
    email: string;
    fullname: string | null;
    username: string;
    mobile_number: string | null;
    country_code: string | null;
    avatar_id: number | null;
}

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
    user: FeedbackUser;
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
