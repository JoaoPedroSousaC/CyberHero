export interface Jogo {
    id: string;
    name: string;
    descricao: string;
    points: number;
    createdAt: string;
    updatedAt: string;
}

export interface JogoCreate {
    name: string;
    descricao: string;
    points: number;
}

export interface JogoUpdate {
    name?: string;
    descricao?: string;
    points?: number;
}

export interface JogoRepository {
    create(data: JogoCreate): Promise<Jogo>;
    get(id: string): Promise<Jogo | null>;
    update(id: string, data: JogoUpdate): Promise<Jogo>;
    delete(id: string): Promise<void>;
}
