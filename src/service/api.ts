import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
});

const PUBLIC_ENDPOINTS = ["/users/login", "/users/register"];

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url));

    if (token && !isPublicEndpoint) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})


export default api