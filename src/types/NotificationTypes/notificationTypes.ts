export interface NotificationAdmin {
    admin_id: number;
    full_name: string;
    email: string;
}

export interface NotificationItem {
    broadcast_id: number;
    admin_id: number;
    title: string;
    message: string;
    platform: string;
    extraData: any;
    createdAt: string;
    updatedAt: string;
    admin: NotificationAdmin;
}

export interface NotificationPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface NotificationResponse {
    success: boolean;
    message: string;
    data: {
        records: NotificationItem[];
        pagination: NotificationPagination;
    };
}

export interface CreateNotificationPayload {
    title: string;
    message: string;
    platform: "ios" | "android" | "all";
}
