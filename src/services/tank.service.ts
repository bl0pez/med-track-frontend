import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api.service";
import { apiUrl } from "../config/routes.config";
import { SearchTankByCodeResponse, Tank, TankRegisterFormValues, TanksSearchResponse } from "../interfaces";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useModalStore } from "../store/useModalStore";

interface SearchTanksParams {
    search: string;
    type: "patient" | "service" | "external";
    id: number;
}

const searchTanks = async ({ id, search, type }: SearchTanksParams) => {
    const { data } = await api.get<TanksSearchResponse>(apiUrl.searchTank, {
        params: {
            search,
            [`${type}_id`]: id
        }
    });

    return data;
}

export const useSearchTanks = (search: string, type: "patient" | "service" | "external", id: number) => {
    return useQuery({
        queryKey: ['searchTanks', { search, type, id }],
        queryFn: () => searchTanks({ search, type, id }),
        staleTime: 1000 * 60,
    });
}

const searchTankByCode = async (code: string) => {
    const { data } = await api.get<SearchTankByCodeResponse>(`${apiUrl.searchTankByCode}/${code}`);
    return data;
}

export const useSearchTankByCode = (code: string) => {
    return useQuery({
        queryKey: ['searchTankByCode', code],
        queryFn: () => searchTankByCode(code),
    });
}

const closeTank = async (tankId: number) => {
    return await api.patch<Tank>(`${apiUrl.tank}/${tankId}/close`);
}

export const useCloseTank = () => {

    const queryClient = useQueryClient();
    const handleClose = useModalStore((state) => state.handleClose);

    return useMutation({
        mutationFn: (tankId: number) => closeTank(tankId),
        mutationKey: ['closeTank'],
        onSuccess: () => {
            toast.success('Tanque cerrado correctamente');
            handleClose();
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }

            toast.error('Ocurrió un error al cerrar el tanque');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['patient'] });
            queryClient.invalidateQueries({ queryKey: ['searchTanks'] });
            queryClient.invalidateQueries({ queryKey: ['systemMetrics'] });
        }
    })
}

const createTank = async (data: TankRegisterFormValues) => {
    return await api.post<Tank>(apiUrl.tank, data);
}

export const useCreateTank = () => {
    const queryClient = useQueryClient();
    const handleClose = useModalStore((state) => state.handleClose);

    return useMutation({
        mutationFn: (data: TankRegisterFormValues) => createTank(data),
        mutationKey: ['createTank'],
        onSuccess: () => {
            toast.success('Tanque creado correctamente');
            handleClose();
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }

            toast.error('Ocurrió un error al crear el tanque');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['patient'] });
            queryClient.invalidateQueries({ queryKey: ['searchTanks'] });
            queryClient.invalidateQueries({ queryKey: ['systemMetrics'] });
        }
    })
}