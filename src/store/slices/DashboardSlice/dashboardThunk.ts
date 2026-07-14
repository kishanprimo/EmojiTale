import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";

import {
    DashboardResponse,
} from "@/types/DashboardTypes/dashboardTypes";

export const getDashboardStats =
    createApiThunk<DashboardResponse, void>(
        "dashboard/getDashboardStats",
        () => axios.get("/admin/dashboard")
    );