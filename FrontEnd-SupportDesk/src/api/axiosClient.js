import axios from "axios";

const API_BASE_URL = ""; // Gateway URL

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

// Attach JWT automatically
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
