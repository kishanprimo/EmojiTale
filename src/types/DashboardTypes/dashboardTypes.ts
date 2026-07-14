export interface DashboardStats {
    total_users: number;
    total_stories: number;
    total_revenue: number;
}

export interface DashboardResponse {
    success: boolean;
    message: string;
    toast: boolean;
    timestamp: string;
    data: DashboardStats;
}