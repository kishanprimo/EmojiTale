export interface UserViewAvatar {
    avatar_id: number;
    name: string;
    avatar_media: string;
    avatar_gender: string;
}

export interface UserViewPlan {
    plan_id: number;
    plan_type: string;
    price: number;
    currency: string;
    revenuecat_product_id: string;
}

export interface UserViewSubscription {
    subscription_id: number;
    status: string;
    start_date: string;
    end_date: string;
    platform: string;
}

export interface UserViewCurrentPlan {
    tier: string;
    tier_label: string;
    plan: UserViewPlan | null;
    subscription: UserViewSubscription | null;
}

export interface UserViewData {
    user_id: number;
    email: string;
    fullname: string;
    username: string;
    age: number | null;
    gender: string | null;
    is_premium: boolean;
    xp: number;
    is_deleted: boolean;
    is_profile_completed: boolean;
    subscription_expires_at: string | null;
    revenuecat_customer_id: string | null;
    login_type: string;
    avatar_id: number | null;
    device_token: string | null;
    referral_code: string | null;
    referred_by: number | null;
    createdAt: string;
    updatedAt: string;
    avatar: UserViewAvatar | null;
    current_plan: UserViewCurrentPlan;
}

export interface UserViewResponse {
    success: boolean;
    data: UserViewData;
    message: string;
    toast: boolean;
    timestamp: string;
}
