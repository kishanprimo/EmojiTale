import axios from "axios";

import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
    const token = Cookies.get("emotale_admin_token");    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
            Cookies.remove("emotale_admin_token");
            localStorage.removeItem("emotale_admin");
            if (!window.location.pathname.startsWith("/login")) {
                window.location.replace("/login");
            }
        }
        return Promise.reject(error);
    }
);

export default api;