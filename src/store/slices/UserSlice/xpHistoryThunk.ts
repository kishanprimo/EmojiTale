import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";

import {
    XPHistoryPayload,
    XPHistoryResponse,
} from "@/types/UserTypes/xpHistoryTypes";

export const getXPHistory = createApiThunk<
    XPHistoryResponse,
    XPHistoryPayload
>(
    "xpHistory/getXPHistory",

    ({ userId, page, limit }) =>
        axios.get(`/admin/users/${userId}/xp-history`, {
            params: {
                page,
                limit,
            },
        })
);