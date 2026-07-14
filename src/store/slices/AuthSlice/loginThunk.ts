import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { LoginPayload, LoginResponse } from "@/types/AuthTypes/loginTypes";

export const loginAdmin = createApiThunk<LoginResponse, LoginPayload>(
    "auth/loginAdmin",
    (payload) => axios.post("/admin-auth/login", payload),
    "Login Failed",
);
