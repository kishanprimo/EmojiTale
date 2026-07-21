import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { ReportListResponse } from "@/types/ReportTypes/reportTypes";

export const getReports = createApiThunk<ReportListResponse, { page: number; limit: number }>(
    "reports/getReports",
    (payload) => axios.get("/admin/get-all-reports", { params: payload }),
);
