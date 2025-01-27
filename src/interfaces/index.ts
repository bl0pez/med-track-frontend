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
    totalPages:  number;
    currentPage: number;
    totalRows:   number;
    nextPage:    number | null;
    prevPage:    number | null;
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

export interface SearchTankByCodeResponse {
    id:           number;
    number_tank:  string;
    request_type: string;
    capacity:     string;
    status:       string;
    patient_id:   number;
    service_id:   null;
    external_id:  null;
    deliveredAt:  Date;
    returnedAt:   null;
    createdAt:    Date;
    updatedAt:    Date;
    patient:      Patient | null;
    service:      Service | null;
}

export interface Service {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface PatientsResponse {
    patients:     Patient[];
    metadata: Metadata;
}

export interface Patient {
    id:          number;
    name:        string;
    rut:         string;
    status:      PatientStatus;
    createdBy:   number;
    closedBy:    null;
    closedAt:    null;
    createdAt:   Date;
    updatedAt:   Date;
    createdUser: CreatedUser;
}

export interface CreatedUser {
    id:   number;
    name: string;
}

export interface Metadata {
    totalPages:         number;
    totalFilteredPages: number;
    currentPage:        number;
    totalRows:          number;
    totalItems:         number;
    nextPage:           null | number;
    prevPage:           null | number;
}
