import { Jogo, JogoCreate, JogoUpdate, JogoRepository} from "../interfaces/jogo.interface";
import { JogoRepositoryPrisma } from "../repositories/jogo.repository";

class JogoUseCase {
    private JogoRepository: JogoRepository;

    constructor() {
        this.JogoRepository = new JogoRepositoryPrisma();
    }

    async create({ descricao, name, points }: JogoCreate): Promise<Jogo> {
        const exists = await this.JogoRepository.findByName(name);
        if (exists) throw new Error("Jogo already exists");

        return await this.JogoRepository.create({
            descricao,
            name,
            points
        });
    }

    async get(id: string): Promise<Jogo | null> {
        return await this.JogoRepository.get(id);
    }

    async getByName(name: string): Promise<Jogo | null> {
        return await this.JogoRepository.findByName(name);
    }

    async update(id: string, data: JogoUpdate): Promise<Jogo> {
        const Jogo = await this.JogoRepository.get(id);
        if (!Jogo) throw new Error("Jogo not found");

        return await this.JogoRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        const Jogo = await this.JogoRepository.get(id);
        if (!Jogo) throw new Error("Jogo not found");

        await this.JogoRepository.delete(id);
    }
}

export { JogoUseCase };