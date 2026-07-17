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

export type GraphPeriod = "day" | "week" | "month" | "year";

export interface GraphPoint {
    label: string;
    count: number;
}

export interface GraphParams {
    period: GraphPeriod;
    date_from?: string;
    date_to?: string;
}

export interface GraphResponse {
    success: boolean;
    message: string;
    data: {
        period: GraphPeriod;
        data: GraphPoint[];
    };
}