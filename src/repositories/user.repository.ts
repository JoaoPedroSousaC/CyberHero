import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/users.interface";
import { RegisterInput } from "../utils/jwt"

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

    async saveSession(userId: string, refreshToken: string, expiresAt: Date): Promise<void> {
        await prisma.session.create({
            data: {
                userId,
                refreshToken,
                expiresAt,
            },
        })
    }

    async findSessionByToken(refreshToken: string): Promise<Session | null> {
        return prisma.session.findUnique({ where: { refreshToken } })
    }

    async deleteSessionByToken(refreshToken: string): Promise<void> {
        await prisma.session.delete({ where: { refreshToken } })
    }

    async deleteAllSessionsForUser(userId: string): Promise<void> {
        await prisma.session.deleteMany({ where: { userId } })
    }
}

export { UserRepositoryPrisma };
