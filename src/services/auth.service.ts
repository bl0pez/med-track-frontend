import { useMutation } from '@tanstack/react-query'
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