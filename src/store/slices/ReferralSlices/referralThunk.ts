import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { ReferralResponse } from "@/types/ReferralTypes/referralTypes";

export const getReferrals = createApiThunk<ReferralResponse, { page: number; limit: number }>(
    "referral/getReferrals",
    (payload) => axios.get("/admin/referrals", { params: payload }),
);
