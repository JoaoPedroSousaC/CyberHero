import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/users.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({ email, name, password, points }: UserCreate): Promise<User> {
        const exists = await this.userRepository.findByEmail(email);
        if (exists) throw new Error("User already exists");

        return await this.userRepository.create({ email, name, password, points });
    }

    async get(id: string): Promise<User | null> {
        return await this.userRepository.get(id);
    }

    async update(id: string, data: UserUpdate): Promise<User> {
        const user = await this.userRepository.get(id);
        if (!user) throw new Error("User not found");

        return await this.userRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        const user = await this.userRepository.get(id);
        if (!user) throw new Error("User not found");

        await this.userRepository.delete(id);
    }
}

export { UserUseCase };
