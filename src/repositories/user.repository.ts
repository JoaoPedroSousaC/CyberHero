import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/users.interface";

class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        return await prisma.user.create({ data });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findFirst({ where: { email } });
    }

    async get(id: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { id } });
    }

    async update(id: string, data: UserUpdate): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }
}

export { UserRepositoryPrisma };
