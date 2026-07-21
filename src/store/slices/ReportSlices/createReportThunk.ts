import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { CreateReportResponse } from "@/types/ReportTypes/reportTypes";

export const createReport = createApiThunk<CreateReportResponse, { report_text: string }>(
    "reports/createReport",
    (payload) => axios.post("/admin/create-report", payload),
);
