import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!config.url.includes("register") && token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        };
    }

    console.log("Calling:", config.url);
    console.log(
        "Authorization Header:",
        config.headers?.Authorization || "None"
    );

    return config;
});

export default instance;

instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        console.log(data.data.user);
        console.log(data.data.token);
        return response;
    },
    (error) => {
        const { response } = error;

        throw error;
    }
);
