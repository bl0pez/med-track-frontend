enum Role {
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
