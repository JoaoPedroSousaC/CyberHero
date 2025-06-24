export interface ConteudoEducativo {
    id: string;
    name: string;
    titulo: string;
    texto: string;
    createdAt: string;
    updatedAt: string;
}

export interface ConteudoEducativoCreate {
    name: string;
    titulo: string;
    texto: string;
}

export interface ConteudoEducativoUpdate {
    name?: string;
    titulo?: string;
    texto?: string;
}

export interface ConteudoEducativoRepository {
    create(data: ConteudoEducativoCreate): Promise<ConteudoEducativo>;
    get(id: string): Promise<ConteudoEducativo | null>;
    update(id: string, data: ConteudoEducativoUpdate): Promise<ConteudoEducativo>;
    delete(id: string): Promise<void>;
}
