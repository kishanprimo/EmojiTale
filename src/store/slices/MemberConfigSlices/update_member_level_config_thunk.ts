import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import {
    UpdateMemberLevelConfigPayload,
    UpdateMemberLevelConfigResponse,
} from "@/types/MemberConfigTypes/update_member_level_config_types";

export const updateMemberLevelConfig = createApiThunk<
    UpdateMemberLevelConfigResponse,
    UpdateMemberLevelConfigPayload
>(
    "memberConfig/updateMemberLevelConfig",
    (payload) => {
        const formData = new FormData();

        formData.append("configId", String(payload.configId));

        if (payload.level !== undefined)
            formData.append("level", String(payload.level));

        if (payload.stories_required !== undefined)
            formData.append("stories_required", String(payload.stories_required));

        if (payload.title !== undefined)
            formData.append("title", payload.title);

        if (payload.description !== undefined)
            formData.append("description", payload.description);

        if (payload.display_order !== undefined)
            formData.append("display_order", String(payload.display_order));

        if (payload.is_active !== undefined)
            formData.append("is_active", String(payload.is_active));

        if (payload.level_image)
            formData.append("level_image", payload.level_image);

        return axios.put("/admin/member-level-config", formData);
    }
);
