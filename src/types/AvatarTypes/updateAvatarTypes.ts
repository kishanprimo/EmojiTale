export interface UpdateAvatarPayload {
    avatarId: number;
    formData: FormData;
}

export interface UpdateAvatarData {
    avatar_id: number;
    avatar_media: string;
    name: string;
    avatar_gender: "male" | "female";
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateAvatarResponse {
    success: boolean;
    data: UpdateAvatarData;
    message: string;
    toast: boolean;
    timestamp: string;
}

export interface UpdateAvatarState {
    loading: boolean;
    success: boolean;
    error: string | null;
}