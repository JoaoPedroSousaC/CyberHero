export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    totalpoints: number;
    paypoints: number;
    doneQuiz: string[];
    createdAt: string;
    updatedAt: string;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
    totalpoints?: number;
    paypoints?: number;
    doneQuiz?: string[];
}

export interface UserUpdate {
    name?: string;
    email?: string;
    password?: string;
    totalpoints?: number;
    paypoints?: number;
    doneQuiz?: string[];
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    get(id: string): Promise<User | null>;
    update(id: string, data: UserUpdate): Promise<User>;
    delete(id: string): Promise<void>;
}
