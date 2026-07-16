export interface SubscriptionUser {
    user_id: number;
    email: string;
    fullname: string | null;
    username: string;
}

export interface SubscriptionPlan {
    plan_id: number;
    plan_type: string;
    product_type: string;
    price: string;
    currency: string;
    revenuecat_product_id: string;
}

export interface SubscriptionItem {
    subscription_id: number;
    user_id: number;
    plan_id: number;
    start_date: string;
    end_date: string;
    transaction_id: string;
    status: string;
    platform: string;
    renewal_count: number;
    entitlement_name: string;
    cancellation_reason: string | null;
    createdAt: string;
    updatedAt: string;
    user: SubscriptionUser;
    plan: SubscriptionPlan;
}

export interface SubscriptionPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface SubscriptionResponse {
    success: boolean;
    message: string;
    data: {
        records: SubscriptionItem[];
        pagination: SubscriptionPagination;
    };
}
