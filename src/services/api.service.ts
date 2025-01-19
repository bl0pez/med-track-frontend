import axios from 'axios';
import { envs } from '../config/envs.config';
import { useAuthStore } from '../store/useAuthStore';

const codeManagerApi = axios.create({
    baseURL: envs.backend_url,
    headers: {
        'Content-Type': 'application/json',
    },
});

codeManagerApi.interceptors.request.use(function (config) {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export {
    codeManagerApi,
};