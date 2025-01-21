import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../config/routes.config"
import { api } from "./api.service"
import { SystemMetrics } from "../interfaces";

const getSystemMetrics = async (): Promise<SystemMetrics[]> => {
    const { data } = await api.get(apiUrl.systemMetrics);
    return data;
}

export const useSystemMetrics = () => {
    return useQuery({
        queryKey: ['systemMetrics'],
        queryFn: getSystemMetrics,
        refetchInterval: 10000,
    });
}

