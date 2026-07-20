export interface ReferralUser {
    user_id: number;
    email: string;
    name: string;
    username: string;
    avatar_id: number | null;
}

export interface ReferredUser extends ReferralUser {
    xp: number;
    createdAt: string;
}

export interface ReferralItem {
    referral_id: number;
    referrer_id: number;
    referred_user_id: number;
    referral_code: string;
    reward_granted: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
    referrer: ReferralUser;
    referred_user: ReferredUser;
}

export interface ReferralPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ReferralResponse {
    success: boolean;
    message: string;
    data: {
        referrals: ReferralItem[];
        pagination: ReferralPagination;
    };
}
