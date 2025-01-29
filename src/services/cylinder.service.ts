import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../config/routes.config";
import { CylindersResponse } from "../interfaces";
import { api } from "./api.service";

export interface CylinderFilter {
    search?: string;
    page?: number;
    status?: string;
    limit?: number;
}

const cylinders = {
    findAll: async (cylinderFilter: CylinderFilter) => {
        const params = new URLSearchParams();

        if (cylinderFilter.status) {
            params.append("status", cylinderFilter.status);
        }

        if (cylinderFilter.search) {
            params.append("search", `${cylinderFilter.search}`);
        }

        if (cylinderFilter.page) {
            params.append("page", `${cylinderFilter.page}`);
        }

        if (cylinderFilter.limit) {
            params.append("limit", `${cylinderFilter.limit}`);
        }

        const { data } = await api.get<CylindersResponse>(apiUrl.cylinders, {
            params,
        });

        return data;
    }
}

export const useCylinders = (cylinderFilter: CylinderFilter) => {
    return useQuery<CylindersResponse, Error>({
        queryKey: [apiUrl.cylinders, cylinderFilter],
        queryFn: () => cylinders.findAll(cylinderFilter),
    });
}