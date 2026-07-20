import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";

import {
    MemberStoriesPayload,
    MemberStoriesResponse,
} from "@/types/UserTypes/memberStoriesTypes";

export const getMemberStories = createApiThunk<
    MemberStoriesResponse,
    MemberStoriesPayload
>(
    "memberStories/getMemberStories",
    (payload) =>
        axios.post(
            "/admin/users/member-stories",
            payload
        )
);