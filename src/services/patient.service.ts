import { apiUrl } from "../config/routes.config";
import {
  Patient,
  PatientFormValues,
  PatientsResponse,
  PatientStatus,
} from "../interfaces";
import { api } from "./api.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useModalStore } from "../store/useModalStore";
import { isAxiosError } from "axios";

interface PatientFilter {
  status?: PatientStatus;
  search?: string;
  page?: number;
  limit?: number;
}

const getPatients = async ({
  search,
  page,
  status,
  limit,
}: PatientFilter): Promise<PatientsResponse> => {
  const params = new URLSearchParams();

  if (status) {
    params.append("status", status);
  }

  if (search) {
    params.append("search", `${search}`);
  }

  if (page) {
    params.append("page", `${page}`);
  }

  if (limit) {
    params.append("limit", `${limit}`);
  }

  const { data } = await api.get<PatientsResponse>(apiUrl.patients, {
    params,
  });

  return data;
};

interface Props {
  search?: string;
  status?: PatientStatus;
  limit?: number;
  page?: number;
}

export const usePatients = ({ search, status, limit, page }: Props) => {
  const patientsQuery = useQuery({
    queryKey: ["patients", { search, status, page: page, limit: limit }],
    queryFn: () => getPatients({ search, status, page: page, limit: limit }),
    initialData: {
      patients: [],
      metadata: {
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        totalFilteredPages: 0,
        totalRows: 0,
        nextPage: null,
        prevPage: null,
      },
    },
  });

  return {
    ...patientsQuery,
  };
};

const createPatient = async ({
  name,
  rut,
}: PatientFormValues): Promise<Patient> => {
  const { data } = await api.post(apiUrl.patients, { name, rut });
  return data;
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  const handleClose = useModalStore((state) => state.handleClose);

  return useMutation({
    mutationFn: createPatient,
    mutationKey: ["createPatient"],
    onSuccess: () => {
      handleClose();
      toast.success("Paciente creado correctamente");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }

      toast.error("Ocurrió un error inesperado");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["systemMetrics"] });
    },
  });
};

const getPatient = async (id: string): Promise<Patient> => {
  const { data } = await api.get<Patient>(`${apiUrl.patients}/${id}`);
  return data;
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ["patients", id],
    queryFn: () => getPatient(id),
    staleTime: 1000 * 60,
  });
};
