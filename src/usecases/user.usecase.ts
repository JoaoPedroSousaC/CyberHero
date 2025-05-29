import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/users.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({ email, name, password, totalpoints = 0, paypoints = 0, doneQuiz = [] }: UserCreate): Promise<User> {
        const exists = await this.userRepository.findByEmail(email);
        if (exists) throw new Error("User already exists");

        return await this.userRepository.create({
            email,
            name,
            password,
            totalpoints,
            paypoints,
            doneQuiz,
        });
    }

    async get(id: string): Promise<User | null> {
        return await this.userRepository.get(id);
    }

    async getByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
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
