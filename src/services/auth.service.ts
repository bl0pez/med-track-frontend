import { useMutation, useQuery } from '@tanstack/react-query'
import { apiUrl } from "../config/routes.config"
import { api } from "./api.service"
import { LoginFormValues, LoginResponse } from '../interfaces'

const login = async ({
    email,
    password
}: LoginFormValues): Promise<LoginResponse> => {
    const { data } = await api.post(apiUrl.login, { email, password })
    return data;
}

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        mutationKey: ['login']
    });
}

const refreshToken = async (): Promise<LoginResponse> => {
    const { data } = await api.get(apiUrl.refreshToken);
    return data;
};

export const useRefreshToken = () => {
    return useQuery({
        queryKey: ['refreshToken'],
        queryFn: refreshToken,
        staleTime: 1000 * 60 * 60,
        retry: false
    });
}