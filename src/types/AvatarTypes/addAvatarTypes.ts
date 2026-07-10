export interface AddAvatarPayload {
    name: string;
    avatar_gender: "male" | "female";
    status: boolean;
    avatar_media: File;
}

export interface AddAvatarResponse {
    success: boolean;
    message: string;
    toast: boolean;
    timestamp: string;
    data: {
        avatar_id: number;
        avatar_media: string;
        name: string;
        avatar_gender: string;
        status: boolean;
        createdAt: string;
        updatedAt: string;
    };
}