export interface UserPayload {
    page: number;
    limit: number;
    search: string;
}

export interface UserItem {
    user_id: number;
    email: string;
    fullname: string | null;
    username: string | null;
    is_premium: boolean;
    xp: number;
    is_deleted: boolean;
    subscription_expires_at: string | null;
    revenuecat_customer_id: string | null;
    login_type: string;
    createdAt: string;
    avatar: string | null;
}

export interface CardStat {
    total: number;
    thisMonth?: number;
    lastMonth?: number;
    percentChange?: number;
}

export interface UserCards {
    total_users: CardStat;
    active_users: CardStat;
    total_domains: {
        total: number;
    };
    total_conversations: CardStat;
}

export interface UserPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface UserResponse {
    success: boolean;
    message: string;
    data: {
        records: UserItem[];
        pagination: UserPagination;
    };
}