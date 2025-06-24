import { prisma } from "../database/prisma-client";
import { Jogo, JogoCreate, JogoUpdate, JogoRepository} from "../interfaces/Jogo.interface";

export class JogoRepositoryPrisma implements JogoRepository {
    async create(data: JogoCreate): Promise<Jogo> {
        const created = await prisma.Jogo.create({
            data: {
                name: data.name,
                descricao: data.descricao,
                points: data.points,
            }
        });

        return this.mapToInterface(created);
    }

    async findByName(Name: string): Promise<Jogo | null> {
            const jogo = await prisma.jogo.findUnique({ where: { Name } });
            return jogo ? this.mapToInterface(jogo) : null;
        }

    async get(id: string): Promise<Jogo | null> {
        const Jogo = await prisma.jogo.findUnique({ where: { id } });
        return Jogo ? this.mapToInterface(Jogo) : null;
    }

    async update(id: string, data: JogoUpdate): Promise<Jogo> {
        const updated = await prisma.Jogo.update({
            where: { id },
            data: {
                name: data.name,
                descricao: data.descricao,
                points: data.points,
            }
        });

        return this.mapToInterface(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.Jogo.delete({ where: { id } });
    }

    private mapToInterface(prismaJogo: any): Jogo {
        return {
            id: prismaJogo.id,
            name: prismaJogo.name,
            descricao: prismaJogo.descricao,
            points: prismaJogo.points,
            createdAt: prismaJogo.createdAt.toISOString(),
            updatedAt: prismaJogo.updatedAt.toISOString(),
        };
    }
}
