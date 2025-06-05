import { MedalhaDisponivelNaLoja, MedalhaDisponivelNaLojaCreate, MedalhaDisponivelNaLojaUpdate, MedalhaDisponivelNaLojaRepository} from "../interfaces/medalhadisponivelnaloja.interface";
import { MedalhaDisponivelNaLojaRepositoryPrisma } from "../repositories/medalhadisponivelnaloja.repository";

class MedalhaDisponivelNaLojaUseCase {
    private MedalhaDisponivelNaLojaRepository: MedalhaDisponivelNaLojaRepository;

    constructor() {
        this.MedalhaDisponivelNaLojaRepository = new MedalhaDisponivelNaLojaRepositoryPrisma();
    }

    async create({ preco }: MedalhaDisponivelNaLojaCreate): Promise<MedalhaDisponivelNaLoja> {
        const exists = await this.MedalhaDisponivelNaLojaRepository.findByPreco(preco);
        if (exists) throw new Error("MedalhaDisponivelNaLoja already exists");

        return await this.MedalhaDisponivelNaLojaRepository.create({
            preco,
        });
    }

    async get(id: string): Promise<MedalhaDisponivelNaLoja | null> {
        return await this.MedalhaDisponivelNaLojaRepository.get(id);
    }

    async getByPreco(preco: string): Promise<MedalhaDisponivelNaLoja | null> {
        return await this.MedalhaDisponivelNaLojaRepository.findByPreco(preco);
    }

    async update(id: string, data: MedalhaDisponivelNaLojaUpdate): Promise<MedalhaDisponivelNaLoja> {
        const MedalhaDisponivelNaLoja = await this.MedalhaDisponivelNaLojaRepository.get(id);
        if (!MedalhaDisponivelNaLoja) throw new Error("MedalhaDisponivelNaLoja not found");

        return await this.MedalhaDisponivelNaLojaRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        const MedalhaDisponivelNaLoja = await this.MedalhaDisponivelNaLojaRepository.get(id);
        if (!MedalhaDisponivelNaLoja) throw new Error("MedalhaDisponivelNaLoja not found");

        await this.MedalhaDisponivelNaLojaRepository.delete(id);
    }
}

export { MedalhaDisponivelNaLojaUseCase };