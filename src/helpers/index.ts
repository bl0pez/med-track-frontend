import { CylinderCapacity, CylinderStatus, PatientStatus } from "../interfaces";


export const cylinderCapacity: { [key in CylinderCapacity]: string } = {
    [CylinderCapacity.THREE_M3]: '3m3',
    [CylinderCapacity.SIX_M3]: '6m3',
    [CylinderCapacity.TEN_M3]: '10m3',
}

export const cylinderStatus: { [key in CylinderStatus]: string } = {
    [CylinderStatus.DELIVERED]: 'Entregado',
    [CylinderStatus.IN_STOCK]: 'En stock',
    [CylinderStatus.RETURNED]: 'Devuelto',
}

export const patientStatus: { [key in PatientStatus]: string } = {
    [PatientStatus.ACTIVE]: 'Activo',
    [PatientStatus.INACTIVE]: 'Inactivo',
}