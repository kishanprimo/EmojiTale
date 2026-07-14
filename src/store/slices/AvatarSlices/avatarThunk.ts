import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { AvatarPayload, AvatarResponse } from "@/types/AvatarTypes/avatarTypes";

export const getAvatars = createApiThunk<AvatarResponse, AvatarPayload>(
    "avatars/getAvatars",
    (payload) => axios.get("/admin/avatars", { params: payload }),
);
