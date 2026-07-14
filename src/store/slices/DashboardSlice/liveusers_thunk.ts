import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { DashboardResponse } from "@/types/DashboardTypes/liveusers_types";

export const getDashboard = createApiThunk<DashboardResponse, void>(
    "dashboard/getDashboard",
    () => axios.get("/admin/dashboard"),
);
