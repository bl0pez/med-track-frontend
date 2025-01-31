import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiUrl } from "../config/routes.config";
import { CylinderFormValues, CylindersResponse, CylinderTransactionFormValues } from "../interfaces";
import { api } from "./api.service";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

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
    },
    create: async (values: CylinderFormValues) => {
        const { data } = await api.post<CylinderFormValues>(apiUrl.cylinders, values);
        return data;
    }
}

export const useCylinders = (cylinderFilter: CylinderFilter) => {
    return useQuery<CylindersResponse, Error>({
        queryKey: [apiUrl.cylinders, cylinderFilter],
        queryFn: () => cylinders.findAll(cylinderFilter),
    });
}

export const useCreateCylinder = () => {

    const queryClient = useQueryClient();

    return useMutation<CylinderFormValues, Error, CylinderFormValues>({
        mutationFn: cylinders.create,
        mutationKey: [apiUrl.cylinders],
        onSuccess: () => {
            toast.success("Cilindro agregado correctamente");
        },
        onError: (error) => {
                  if (isAxiosError(error)) {
                    return toast.error(error.response?.data.message);
                  }
            
                  toast.error("Ocurrió un error inesperado")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [apiUrl.cylinders] });
            queryClient.invalidateQueries({ queryKey: [apiUrl.systemMetrics] });
            queryClient.invalidateQueries({ queryKey: [apiUrl.patients ]});
        }

    })
}


const cylinder_transaction = {
    create: async (values: CylinderTransactionFormValues) => {
        const { data } = await api.post(apiUrl.cylinderTransaction, values);
        return data;
    }
}

export const useCreateCylinderTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cylinder_transaction.create,
        mutationKey: [apiUrl.cylinderTransaction],
        onSuccess: () => {
            toast.success("Cilindro agregado correctamente");
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }

            toast.error("Ocurrió un error inesperado");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [apiUrl.cylinders] });
            queryClient.invalidateQueries({ queryKey: [apiUrl.systemMetrics] });
            queryClient.invalidateQueries({ queryKey: [apiUrl.patients] });
        }
    })
}