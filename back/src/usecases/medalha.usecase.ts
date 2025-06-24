import { Medalha, MedalhaCreate, MedalhaUpdate, MedalhaRepository} from "../interfaces/medalha.interface";
import { MedalhaRepositoryPrisma } from "../repositories/medalha.repository";

class MedalhaUseCase {
    private MedalhaRepository: MedalhaRepository;

    constructor() {
        this.MedalhaRepository = new MedalhaRepositoryPrisma();
    }

    async create({ descricao, name, icon }: MedalhaCreate): Promise<Medalha> {
        const exists = await this.MedalhaRepository.findByDescricao(descricao);
        if (exists) throw new Error("Medalha already exists");

        return await this.MedalhaRepository.create({
            descricao,
            name,
            icon
        });
    }

    async get(id: string): Promise<Medalha | null> {
        return await this.MedalhaRepository.get(id);
    }

    async getBydescricao(descricao: string): Promise<Medalha | null> {
        return await this.MedalhaRepository.findByDescricao(descricao);
    }

    async update(id: string, data: MedalhaUpdate): Promise<Medalha> {
        const Medalha = await this.MedalhaRepository.get(id);
        if (!Medalha) throw new Error("Medalha not found");

        return await this.MedalhaRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        const Medalha = await this.MedalhaRepository.get(id);
        if (!Medalha) throw new Error("Medalha not found");

        await this.MedalhaRepository.delete(id);
    }
}

export { MedalhaUseCase };