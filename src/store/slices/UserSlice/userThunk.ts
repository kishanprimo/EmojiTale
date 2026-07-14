import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UserPayload, UserResponse } from "@/types/UserTypes/userTypes";

export const getUsers = createApiThunk<UserResponse, UserPayload>(
    "users/getUsers",
    (payload) => axios.post("/admin/users", payload),
);
