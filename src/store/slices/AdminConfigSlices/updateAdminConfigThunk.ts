import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UpdateAdminConfigPayload, UpdateAdminConfigResponse } from "@/types/AdminConfigTypes/adminConfigTypes";

export const updateAdminConfig = createApiThunk<UpdateAdminConfigResponse, UpdateAdminConfigPayload>(
    "adminConfig/updateAdminConfig",
    (payload) => axios.post("/admin/config/update", payload),
    "Failed to update config",
);
