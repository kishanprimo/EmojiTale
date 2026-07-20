export interface XPHistoryPayload {
    userId: number;
    page: number;
    limit: number;
}

export interface XPHistoryItem {
    xp_transaction_id: number;
    user_id: number;

    amount: number;

    balance_after: number;

    type: string;

    status: string;

    revenuecat_event_id: string | null;

    transaction_id: string | null;

    product_id: string | null;

    price: string | null;

    currency: string | null;

    note: string | null;

    createdAt: string;

    updatedAt: string;
}

export interface XPHistoryResponse {
    success: boolean;

    message: string;

    data: {
        xp_history: XPHistoryItem[];

        pagination: {
            total: number;
            page: number;
            limit: number;
        };
    };
}