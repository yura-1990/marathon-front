import axios from 'axios';
import Cookies from 'js-cookie';

type Token = string | undefined;

const token: Token = Cookies.get('auth_token');

const headers: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    ...(token && { 'Authorization': `Bearer ${token}` }),
};

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    headers,
});

axiosInstance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
