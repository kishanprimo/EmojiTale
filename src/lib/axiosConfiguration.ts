import axios from "axios";

import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {

    const token = Cookies.get("emotale_admin_token");

    console.log("================================");
    console.log("REQUEST URL :", config.url);
    console.log("TOKEN FROM COOKIE :", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

        console.log(
            "AUTH HEADER :",
            config.headers.Authorization
        );
    } else {
        console.log("NO TOKEN FOUND");
    }

    console.log("================================");

    return config;
});

api.interceptors.response.use(

    (response) => {

        console.log("========== API SUCCESS ==========");
        console.log("URL :", response.config.url);
        console.log("STATUS :", response.status);
        console.log("DATA :", response.data);

        return response;
    },

    (error) => {

        console.log("========== API ERROR ==========");
        console.log("URL :", error.config?.url);
        console.log("STATUS :", error.response?.status);
        console.log("DATA :", error.response?.data);

        if (error.response?.status === 401) {

            console.log(
                "401 RECEIVED - REMOVING COOKIE"
            );

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