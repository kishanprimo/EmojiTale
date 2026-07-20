export interface AddMemberLevelConfigPayload {
    level: number;
    stories_required: number;
    title: string;
    description: string;
    display_order: number;
    is_active: boolean;
    level_image: File;
}

export interface MemberLevelConfigItem {
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

export interface AddMemberLevelConfigResponse {
    success: boolean;
    message: string;
    data: MemberLevelConfigItem;
}