export interface AvatarPayload {
    page: number;
    limit: number;
    search?: string;
    avatar_gender?: string;
    status?: boolean;
}

export interface AvatarItem {
    avatar_id: number;
    avatar_media: string | null;
    name: string;
    avatar_gender: "male" | "female";
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AvatarPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface AvatarResponse {
    success: boolean;
    message: string;
    data: {
        records: AvatarItem[];
        pagination: AvatarPagination;
    };
}