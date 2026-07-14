export interface AdminConfigItem {
    config_id: number;
    key: string;
    value: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminConfigResponse {
    success: boolean;
    message: string;
    data: AdminConfigItem[];
}

export interface UpdateAdminConfigPayload {
    key: string;
    value: string | number;
}

export interface UpdateAdminConfigResponse {
    success: boolean;
    message: string;
}
