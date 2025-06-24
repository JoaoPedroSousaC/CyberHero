import { ConteudoEducativo, ConteudoEducativoCreate, ConteudoEducativoUpdate, ConteudoEducativoRepository} from "../interfaces/conteudoeducativo.interface";
import { ConteudoEducativoRepositoryPrisma } from "../repositories/conteudoeducativo.repository";

class ConteudoEducativoUseCase {
    private ConteudoEducativoRepository: ConteudoEducativoRepository;

    constructor() {
        this.ConteudoEducativoRepository = new ConteudoEducativoRepositoryPrisma();
    }

    async create({ titulo, name, texto }: ConteudoEducativoCreate): Promise<ConteudoEducativo> {
        const exists = await this.ConteudoEducativoRepository.findByTitulo(titulo);
        if (exists) throw new Error("ConteudoEducativo already exists");

        return await this.ConteudoEducativoRepository.create({
            titulo,
            name,
            texto
        });
    }

    async get(id: string): Promise<ConteudoEducativo | null> {
        return await this.ConteudoEducativoRepository.get(id);
    }

    async getBytitulo(titulo: string): Promise<ConteudoEducativo | null> {
        return await this.ConteudoEducativoRepository.findByTitulo(titulo);
    }

    async update(id: string, data: ConteudoEducativoUpdate): Promise<ConteudoEducativo> {
        const ConteudoEducativo = await this.ConteudoEducativoRepository.get(id);
        if (!ConteudoEducativo) throw new Error("ConteudoEducativo not found");

        return await this.ConteudoEducativoRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        const ConteudoEducativo = await this.ConteudoEducativoRepository.get(id);
        if (!ConteudoEducativo) throw new Error("ConteudoEducativo not found");

        await this.ConteudoEducativoRepository.delete(id);
    }
}

export { ConteudoEducativoUseCase };