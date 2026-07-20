export interface MemberLevelConfigItem {
    config_id: number;
    level: number;
    level_image: string;
    stories_required: number;
    title: string;
    is_active: boolean;
    description: string;
    display_order: number;
    createdAt: string;
    updatedAt: string;
}

export interface MemberLevelConfigResponse {
    success: boolean;
    message: string;
    data: MemberLevelConfigItem[];
}