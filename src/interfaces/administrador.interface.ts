export interface Administrador {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdministradorCreate {
    name: string;
    email: string;
    password: string;
}

export interface AdministradorUpdate {
    name?: string;
    email?: string;
    password?: string;
}

export interface AdministradorRepository {
    create(data: AdministradorCreate): Promise<Administrador>;
    findByEmail(email: string): Promise<Administrador | null>;
    get(id: string): Promise<Administrador | null>;
    update(id: string, data: AdministradorUpdate): Promise<Administrador>;
    delete(id: string): Promise<void>;
}
