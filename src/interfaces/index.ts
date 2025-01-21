export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MAINTENANCE = 'MAINTENANCE', 
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

export interface PatientFormValues {
    name: string
    rut: string    
}
export interface PatientsResponse {
    patients: Patient[];
    metadata: Metadata
}

export enum PatientStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
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