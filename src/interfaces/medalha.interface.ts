export interface Medalha {
    id: string;
    name: string;
    descricao: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
}

export interface MedalhaCreate {
    name: string;
    descricao: string;
    icon: string;
}

export interface MedalhaUpdate {
    name?: string;
    descricao?: string;
    icon?: string;
}

export interface MedalhaRepository {
    create(data: MedalhaCreate): Promise<Medalha>;
    get(id: string): Promise<Medalha | null>;
    update(id: string, data: MedalhaUpdate): Promise<Medalha>;
    delete(id: string): Promise<void>;
}
