import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
| Add JWT token here later.
*/

api.interceptors.request.use(
  (config) => {
    // Example:
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    //
    return config;
  },
  (error) => Promise.reject(error),
);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
| Handle API errors globally.
*/

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example:
    // if (error.response?.status === 401) {
    //   Redirect to login
    // }

    return Promise.reject(error);
  },
);

export default api;
