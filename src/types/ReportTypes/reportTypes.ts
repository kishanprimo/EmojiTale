export interface ReportItem {
    report_id: number;
    report_text: string;
    created_at: string;
    updated_at: string;
}

export interface ReportPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface ReportListResponse {
    success: boolean;
    message: string;
    data: {
        reports: ReportItem[];
        pagination: ReportPagination;
    };
}

export interface CreateReportResponse {
    success: boolean;
    message: string;
    data: ReportItem;
}
