import { useState } from "react";
import { apiUrl } from "../config/routes.config";
import { PatientsResponse, PatientStatus } from "../interfaces";
import { api } from "./api.service";
import { useQuery } from "@tanstack/react-query";

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