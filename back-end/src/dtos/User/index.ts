export type UserDTO = {
    id?: string;
    name: string;
    email: string;
    password: string;
}

export interface UserAdminDTO {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: string;
}