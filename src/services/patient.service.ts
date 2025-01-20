import { useState } from "react";
import { apiUrl } from "../config/routes.config";
import { Patient, PatientFormValues, PatientsResponse, PatientStatus } from "../interfaces";
import { api } from "./api.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { usePatientModalStore } from "../store/usePatientModalStore";
import { isAxiosError } from "axios";

interface PatientFilter {
    status?: PatientStatus
    id?: number,
    page?: number,
    limit?: number,
}

const getPatients = async ({id, page, status, limit }: PatientFilter): Promise<PatientsResponse> => {
    const params = new URLSearchParams();

    if (status) {
        params.append('status', status);
    }

    if (id) {
        params.append('id', `${id}`);
    }

    if (page) {
        params.append('page', `${page}`);
    }

    if (limit) {
        params.append('limit', `${limit}`);
    }

    const { data } = await api.get<PatientsResponse>(apiUrl.patient, {
        params,
    });

    return data;
}

interface Props {
    id?: number;
    status?: PatientStatus
    limit?: number;
}

export const usePatients = ({ id, status, limit }: Props) => {
    
    const [page, setPage] = useState(1);

    const patientsQuery = useQuery({
        queryKey: ['patient', { id, status, page, limit }],
        queryFn: () => getPatients({ id, page, status, limit }),
        staleTime: 1000 * 60,
    });

    const nextPage = () => {
        if (!patientsQuery.data?.metadata.nextPage) {
            return;
        }
        
        setPage(patientsQuery.data?.metadata.nextPage)
    }

    const prevPage = () => {
        if (!patientsQuery.data?.metadata.prevPage) {
            return;
        }
        
        setPage(patientsQuery.data?.metadata.prevPage)
    }

    return {
        ...patientsQuery,
        page,
        nextPage,
        prevPage,
    }

}

const createPatient = async ({ name, rut }: PatientFormValues): Promise<Patient> => {
    const { data } = await api.post(apiUrl.patient, { name, rut })
    return data;
}

export const useCreatePatient = () => {

    const queryClient = useQueryClient();
    const handleClose = usePatientModalStore((state) => state.handleClose);

    return useMutation({
        mutationFn: createPatient,
        mutationKey: ['createPatient'],
        onSuccess: () => {
            handleClose();
            toast.success('Paciente creado correctamente');
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            return toast.error(error.response?.data.message);
          }

          toast.error("Ocurrió un error inesperado");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['patient'] });
        }
    });
}

