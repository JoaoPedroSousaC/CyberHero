import { Loja, LojaCreate, LojaUpdate, LojaRepository} from "../interfaces/loja.interface";
import { LojaRepositoryPrisma } from "../repositories/loja.repository";

class LojaUseCase {
    private LojaRepository: LojaRepository;

    constructor() {
        this.LojaRepository = new LojaRepositoryPrisma();
    }

    async create({ name }: LojaCreate): Promise<Loja> {
        const exists = await this.LojaRepository.findByName(name);
        if (exists) throw new Error("Loja already exists");

        return await this.LojaRepository.create({
            name,
        });
    }

    async get(id: string): Promise<Loja | null> {
        return await this.LojaRepository.get(id);
    }

    async getByName(name: string): Promise<Loja | null> {
        return await this.LojaRepository.findByName(name);
    }

    async update(id: string, data: LojaUpdate): Promise<Loja> {
        const Loja = await this.LojaRepository.get(id);
        if (!Loja) throw new Error("Loja not found");

        return await this.LojaRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        const Loja = await this.LojaRepository.get(id);
        if (!Loja) throw new Error("Loja not found");

        await this.LojaRepository.delete(id);
    }
}

export { LojaUseCase };