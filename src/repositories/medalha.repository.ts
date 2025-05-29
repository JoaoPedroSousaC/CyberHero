import { prisma } from "../database/prisma-client";
import { Medalha, MedalhaCreate, MedalhaUpdate, MedalhaRepository} from "../interfaces/Medalha.interface";

export class MedalhaRepositoryPrisma implements MedalhaRepository {
    async create(data: MedalhaCreate): Promise<Medalha> {
        const created = await prisma.Medalha.create({
            data: {
                name: data.name,
                descricao: data.descricao,
                icon: data.icon,
            }
        });

        return this.mapToInterface(created);
    }

    async findByDescricao(Descricao: string): Promise<Medalha | null> {
            const medalha = await prisma.medalha.findUnique({ where: { Descricao } });
            return medalha ? this.mapToInterface(medalha) : null;
        }

    async get(id: string): Promise<Medalha | null> {
        const Medalha = await prisma.medalha.findUnique({ where: { id } });
        return Medalha ? this.mapToInterface(Medalha) : null;
    }

    async update(id: string, data: MedalhaUpdate): Promise<Medalha> {
        const updated = await prisma.Medalha.update({
            where: { id },
            data: {
                name: data.name,
                descricao: data.descricao,
                icon: data.icon,
            }
        });

        return this.mapToInterface(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.Medalha.delete({ where: { id } });
    }

    private mapToInterface(prismaMedalha: any): Medalha {
        return {
            id: prismaMedalha.id,
            name: prismaMedalha.name,
            descricao: prismaMedalha.descricao,
            icon: prismaMedalha.icon,
            createdAt: prismaMedalha.createdAt.toISOString(),
            updatedAt: prismaMedalha.updatedAt.toISOString(),
        };
    }
}
