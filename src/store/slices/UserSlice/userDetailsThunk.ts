import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UserDetailsPayload, UserDetailsResponse } from "@/types/UserTypes/userDetailsTypes";

export const getUserDetails = createApiThunk<UserDetailsResponse, UserDetailsPayload>(
    "userDetails/getUserDetails",
    (payload) => axios.post("/admin/user-details", payload),
);
