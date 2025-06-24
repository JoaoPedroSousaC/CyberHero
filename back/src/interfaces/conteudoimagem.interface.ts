export interface ConteudoImagem {
    id: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export interface ConteudoImagemCreate {
    url: string;
}

export interface ConteudoImagemUpdate {
    url?: string;
}

export interface ConteudoImagemRepository {
    create(data: ConteudoImagemCreate): Promise<ConteudoImagem>;
    get(id: string): Promise<ConteudoImagem | null>;
    update(id: string, data: ConteudoImagemUpdate): Promise<ConteudoImagem>;
    delete(id: string): Promise<void>;
}
