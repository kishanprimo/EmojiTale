import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { PlanPayload, PlanResponse } from "@/types/PlanTypes/planTypes";

export const getPlans = createApiThunk<PlanResponse, PlanPayload>(
    "plans/getPlans",
    (payload) => axios.post("/admin/xp-store", payload),
);
