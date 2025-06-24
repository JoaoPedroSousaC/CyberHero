export interface MedalhaDisponivelNaLoja {
    id: string;
    preco: number;
    createdAt: string;
    updatedAt: string;
}

export interface MedalhaDisponivelNaLojaCreate {
    preco: number;
}

export interface MedalhaDisponivelNaLojaUpdate {
    preco?: number;
}

export interface MedalhaDisponivelNaLojaRepository {
    create(data: MedalhaDisponivelNaLojaCreate): Promise<MedalhaDisponivelNaLoja>;
    get(id: string): Promise<MedalhaDisponivelNaLoja | null>;
    update(id: string, data: MedalhaDisponivelNaLojaUpdate): Promise<MedalhaDisponivelNaLoja>;
    delete(id: string): Promise<void>;
}
