export enum Role {
    ADMIN = 'administrador',
    USER = 'usuario',
    MAINTENANCE = 'Turno de mantención', 
}

export interface User {
    id:        number;
    email:     string;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
    roles:     Role[];
}

export interface LoginFormValues {
    email: string
    password: string
}

export interface LoginResponse {
    user: User
    token: string
}

export interface PatientsResponse {
    patients: Patient[];
    metadata: Metadata
}

export enum PatientStatus {
    ACTIVE = 'activo',
    INACTIVE = 'inactivo',
}

export interface Patient {
    id:        number;
    name:      string;
    rut:       string;
    status:    PatientStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    size: number;
    count: number;
    currentPage: number;
    nextPage: number | null,
    prevPage: number | null,
}