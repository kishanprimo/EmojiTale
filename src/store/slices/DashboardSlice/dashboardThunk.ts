import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";

import {
    DashboardResponse,
    GraphResponse,
    GraphParams,
} from "@/types/DashboardTypes/dashboardTypes";

export const getDashboardStats =
    createApiThunk<DashboardResponse, void>(
        "dashboard/getDashboardStats",
        () => axios.get("/admin/dashboard")
    );

export const getUserGraph =
    createApiThunk<GraphResponse, GraphParams>(
        "dashboard/getUserGraph",
        (params) => axios.get("/admin/dashboard/user-graph", { params })
    );

export const getMemberGraph =
    createApiThunk<GraphResponse, GraphParams>(
        "dashboard/getMemberGraph",
        (params) => axios.get("/admin/dashboard/member-graph", { params })
    );