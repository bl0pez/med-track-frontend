import { Box, Button, TableCell, TableRow, TextField, Typography } from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PlusIcon from '@mui/icons-material/Add'
import { useState } from "react";
import { usePatients } from "../services/patient.service";
import { MainTable, MainTableBody, MainTableHead, MainTablePagination } from "../components/CustomTable";
import { PatientStatus } from "../interfaces";
import dayjs from "dayjs";
import { usePatientModalStore } from "../store/usePatientModalStore";
import PatientModal from "../components/PatientModal";

const columns = [
    "ID",
    "Rut",
    "Nombre",
    "Estado",
    "Ingreso",
]

export default function PatientPage() {
    const [limit, setLimit] = useState(5);

    const { data, isLoading, refetch } = usePatients({
        limit: limit
    });

    const handleOpen = usePatientModalStore(state => state.handleOpen);

    return (
        <Box sx={{ mb: 4, ml: 2, pt: 2 }}>
            <Typography variant="h4">Pacientes</Typography>
            <Box sx={{ mt: 4 }}>
                <Box>
                    <Box sx={{ display: 'flex', gap: 2, marginTop: 2, marginBottom: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField label="Buscar" variant="outlined" size="small" />
                            <Button size="small" variant="contained" onClick={() => refetch()} startIcon={<PersonSearchIcon />} >
                                Buscar
                            </Button>
                        </Box>

                        <Button
                            onClick={() => handleOpen('add')}
                            size="small"
                            variant="contained"
                            startIcon={<PlusIcon />}
                        >
                            Agregar
                        </Button>


                    </Box>
                </Box>


                <MainTable>
                    <MainTableHead columns={columns} />

                    <MainTableBody
                        isLoading={isLoading}
                        text="No se encontraron pacientes"
                        colSpan={columns.length}
                        itemsCount={data?.metadata.count}
                    >
                        {
                            data?.patients.map((patient) => (
                                <TableRow key={patient.id}>
                                    <TableCell>{patient.id}</TableCell>
                                    <TableCell>{patient.rut}</TableCell>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.status === PatientStatus.ACTIVE ? "Activo" : "Inactivo"}</TableCell>
                                    <TableCell>{dayjs(patient.createdAt).format('DD/MM/YYYY')}</TableCell>
                                </TableRow>
                            ))
                        }
                    </MainTableBody>
                </MainTable>

                <MainTablePagination 
                    itemCount={data?.metadata.count || 0}
                    page={data?.metadata.currentPage || 1}
                    limit={limit}
                    handleChangeLimit={(value) => setLimit(value)}
                    handleChangePage={() => {}}
                />
            </Box>

            <PatientModal />

        </Box>
    );
}