import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import {
    AddMemberLevelConfigPayload,
    AddMemberLevelConfigResponse,
} from "@/types/MemberConfigTypes/add_member_level_config_types";

export const addMemberLevelConfig = createApiThunk<
    AddMemberLevelConfigResponse,
    AddMemberLevelConfigPayload
>(
    "memberConfig/addMemberLevelConfig",
    (payload) => {
        const formData = new FormData();

        formData.append("level", String(payload.level));
        formData.append(
            "stories_required",
            String(payload.stories_required)
        );
        formData.append("title", payload.title);
        formData.append("description", payload.description);
        formData.append(
            "display_order",
            String(payload.display_order)
        );
        formData.append(
            "is_active",
            String(payload.is_active)
        );
        formData.append("level_image", payload.level_image);

        return axios.post(
            "/admin/member-level-config",
            formData
        );
    }
);