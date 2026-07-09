export interface UserDetailsPayload {
    user_id: number;
}

export interface OwnerDetails {
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    is_online: boolean;
}

export interface AgentDetails {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    is_active: boolean;
    is_invite_accepted: boolean;
}

export interface UserDetailsResponse {
    success: boolean;
    message: string;
    data: {
        user: OwnerDetails;
        agents: AgentDetails[];
    };
    statusCode: number;
}