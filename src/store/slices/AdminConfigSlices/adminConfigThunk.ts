import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { AdminConfigResponse } from "@/types/AdminConfigTypes/adminConfigTypes";

export const getAdminConfigs = createApiThunk<AdminConfigResponse, void>(
    "adminConfig/getAdminConfigs",
    () => axios.get("/admin/config/"),
);
