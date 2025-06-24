import { ConteudoImagem, ConteudoImagemCreate, ConteudoImagemUpdate, ConteudoImagemRepository} from "../interfaces/conteudoimagem.interface";
import { ConteudoImagemRepositoryPrisma } from "../repositories/conteudoimagem.repository";

class ConteudoImagemUseCase {
    private ConteudoImagemRepository: ConteudoImagemRepository;

    constructor() {
        this.ConteudoImagemRepository = new ConteudoImagemRepositoryPrisma();
    }

    async create({ url }: ConteudoImagemCreate): Promise<ConteudoImagem> {
        const exists = await this.ConteudoImagemRepository.findByUrl(url);
        if (exists) throw new Error("ConteudoImagem already exists");

        return await this.ConteudoImagemRepository.create({
            url
        });
    }

    async get(id: string): Promise<ConteudoImagem | null> {
        return await this.ConteudoImagemRepository.get(id);
    }

    async getBytitulo(titulo: string): Promise<ConteudoImagem | null> {
        return await this.ConteudoImagemRepository.findByUrl(url);
    }

    async update(id: string, data: ConteudoImagemUpdate): Promise<ConteudoImagem> {
        const ConteudoImagem = await this.ConteudoImagemRepository.get(id);
        if (!ConteudoImagem) throw new Error("ConteudoImagem not found");

        return await this.ConteudoImagemRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        const ConteudoImagem = await this.ConteudoImagemRepository.get(id);
        if (!ConteudoImagem) throw new Error("ConteudoImagem not found");

        await this.ConteudoImagemRepository.delete(id);
    }
}

export { ConteudoImagemUseCase };