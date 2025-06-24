import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/users.interface";

export class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        const created = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                totalpoints: data.totalpoints ?? 0,
                paypoints: data.paypoints ?? 0,
                doneQuiz: data.doneQuiz ?? [],
            }
        });

        return this.mapToInterface(created);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user ? this.mapToInterface(user) : null;
    }

    async get(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user ? this.mapToInterface(user) : null;
    }

    async update(id: string, data: UserUpdate): Promise<User> {
        const updated = await prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                totalpoints: data.totalpoints,
                paypoints: data.paypoints,
                doneQuiz: data.doneQuiz,
            }
        });

        return this.mapToInterface(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }

    private mapToInterface(prismaUser: any): User {
        return {
            id: prismaUser.id,
            name: prismaUser.name,
            email: prismaUser.email,
            password: prismaUser.password,
            totalpoints: prismaUser.totalpoints,
            paypoints: prismaUser.paypoints,
            doneQuiz: prismaUser.doneQuiz,
            createdAt: prismaUser.createdAt.toISOString(),
            updatedAt: prismaUser.updatedAt.toISOString(),
        };
    }
}
