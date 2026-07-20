import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { MemberLevelConfigResponse } from "@/types/MemberConfigTypes/member_level_config_types";

export const getMemberLevelConfigs = createApiThunk<
    MemberLevelConfigResponse,
    void
>(
    "memberConfig/getMemberLevelConfigs",
    () => axios.get("/admin/member-level-config"),
);