import { useQuery } from "@tanstack/react-query";
import { api } from "./api.service";
import { apiUrl } from "../config/routes.config";
import { TanksSearchResponse } from "../interfaces";

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