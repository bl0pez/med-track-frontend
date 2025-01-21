export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MAINTENANCE = 'MAINTENANCE', 
}

export enum TankStatus {
    DELIVERED = 'DELIVERED',
    RETURNED = 'RETURNED',
    RECHARGE = 'RECHARGE',
}

export enum TankCapacity {
    SIX_M2 = "SIX_M2",
    TEN_M2 = "TEN_M2",
    THREE_M3 = "THREE_M3",
}

export enum TankRequestType {
    PATIENT = "PATIENT",
    SERVICE = "SERVICE",
    EXTERNAL = "EXTERNAL",
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

export interface TanksSearchResponse {
    tanks: Tank[];
    metadata: Metadata
}

export interface PatientFormValues {
    name: string
    rut: string    
}
export interface PatientsResponse {
    patients: Patient[];
    metadata: Metadata
}
export interface Tank {
    id:           number;
    number_tank:  string;
    request_type: TankRequestType;
    capacity:     TankCapacity;
    status:       TankStatus;
    patient_id:   number | null;
    service_id:   number | null;    
    external_id:  number | null;
    deliveredAt:  Date;
    returnedAt:   Date | null;
    createdAt:    Date;
    updatedAt:    Date;
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
    tanks?:     Tank[];
}

export interface Metadata {
    size: number;
    count: number;
    currentPage: number;
    nextPage: number | null,
    prevPage: number | null,
}

export interface SystemMetrics {
    id:                      number;
    total_patients_active:   number;
    total_patients_inactive: number;
    total_tanks_delivered:   number;
    total_tanks_returned:    number;
    total_tanks_recharge:    number;
    createdAt:               Date;
    updatedAt:               Date;
}
