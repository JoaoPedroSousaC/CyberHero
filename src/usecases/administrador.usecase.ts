import { Administrador, AdministradorCreate, AdministradorUpdate, AdministradorRepository} from "../interfaces/administrador.interface";
import { AdministradorRepositoryPrisma } from "../repositories/administrador.repository";

class AdministradorUseCase {
    private administradorRepository: AdministradorRepository;

    constructor() {
        this.administradorRepository = new AdministradorRepositoryPrisma();
    }

    async create({ email, name, password }: AdministradorCreate): Promise<Administrador> {
        const exists = await this.administradorRepository.findByEmail(email);
        if (exists) throw new Error("Administrador already exists");

        return await this.administradorRepository.create({
            email,
            name,
            password
        });
    }

    async get(id: string): Promise<Administrador | null> {
        return await this.administradorRepository.get(id);
    }

    async getByEmail(email: string): Promise<Administrador | null> {
        return await this.administradorRepository.findByEmail(email);
    }

    async update(id: string, data: AdministradorUpdate): Promise<Administrador> {
        const administrador = await this.administradorRepository.get(id);
        if (!administrador) throw new Error("Administrador not found");

        return await this.administradorRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        const administrador = await this.administradorRepository.get(id);
        if (!administrador) throw new Error("Administrador not found");

        await this.administradorRepository.delete(id);
    }
}

export { AdministradorUseCase };