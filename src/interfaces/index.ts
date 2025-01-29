export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    OPERATOR = 'OPERATOR',
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

// =================================
// CYLINDERS
// =================================
export interface CylindersResponse {
    cylinders: Cylinder[];
    metadata:  Metadata;
}
export interface Cylinder {
    id:           number;
    serialNumber: string;
    capacity:     CylinderCapacity;
    status:       CylinderStatus;
    createdAt:    Date;
    updatedAt:    Date;
}

export enum CylinderCapacity {
    SIX_M3 = "SIX_M3",
    TEN_M3 = "TEN_M3",
    THREE_M3 = "THREE_M3",
}

export enum CylinderStatus {
    IN_STOCK = 'IN_STOCK',
    DELIVERED = 'DELIVERED',
    RETURNED = 'RETURNED',
}
