import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { SubscriptionResponse } from "@/types/SubscriptionTypes/subscriptionTypes";

export const getSubscriptions = createApiThunk<SubscriptionResponse, { page: number; limit: number }>(
    "subscription/getSubscriptions",
    (payload) => axios.get("/admin/subscriptions", { params: payload }),
);
