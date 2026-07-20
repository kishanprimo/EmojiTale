export interface UpdateMemberLevelConfigPayload {
    configId: number;
    level?: number;
    stories_required?: number;
    title?: string;
    description?: string;
    display_order?: number;
    is_active?: boolean;
    level_image?: File | null;
}

export interface UpdatedMemberLevelConfig {
    config_id: number;
    level: number;
    stories_required: number;
    title: string;
    description: string;
    display_order: number;
    is_active: boolean;
    level_image: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateMemberLevelConfigResponse {
    success: boolean;
    message: string;
    data: UpdatedMemberLevelConfig;
}
