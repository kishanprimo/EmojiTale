export interface GrowthStats {
    this_month: number;
    last_month: number;
    change_percent: number;
    trend: "up" | "down" | "flat";
}

export interface DashboardStats {
    total_users: number;
    total_stories: number;
    total_revenue: number;
    users_growth?: GrowthStats;
    stories_growth?: GrowthStats;
    revenue_growth?: GrowthStats;
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