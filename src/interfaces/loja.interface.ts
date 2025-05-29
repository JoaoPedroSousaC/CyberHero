export interface Loja {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface LojaCreate {
    name: string;
}

export interface LojaUpdate {
    name?: string;
}

export interface LojaRepository {
    create(data: LojaCreate): Promise<Loja>;
    get(id: string): Promise<Loja | null>;
    update(id: string, data: LojaUpdate): Promise<Loja>;
    delete(id: string): Promise<void>;
}
