import { useMutation } from '@tanstack/react-query'
import { apiUrl } from "../config/routes.config"
import { api } from "./api.service"
import { LoginFormValues, LoginResponse } from '../interfaces'

const login = ({
    email,
    password
}: LoginFormValues): Promise<LoginResponse> => {
    return api.post(apiUrl.login, { email, password })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        mutationKey: ['login']
    });
}