import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { MemberPayload, MemberResponse } from "@/types/UserTypes/memberTypes";

export const getMembers = createApiThunk<MemberResponse, MemberPayload>(
    "members/getMembers",
    (payload) => axios.post("/admin/users/members", payload),
);
