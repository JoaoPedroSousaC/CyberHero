export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    points: bigint;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
    points: bigint;
}

export interface UserUpdate {
    name?: string;
    email?: string;
    password?: string;
    points?: bigint;
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    get(id: string): Promise<User | null>;
    update(id: string, data: UserUpdate): Promise<User>;
    delete(id: string): Promise<void>;
}
