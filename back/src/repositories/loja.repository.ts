import { prisma } from "../database/prisma-client";
import { Loja, LojaCreate, LojaUpdate, LojaRepository} from "../interfaces/Loja.interface";

export class LojaRepositoryPrisma implements LojaRepository {
    async create(data: LojaCreate): Promise<Loja> {
        const created = await prisma.Loja.create({
            data: {
                name: data.name,
            }
        });

        return this.mapToInterface(created);
    }

    async findByName(Name: string): Promise<Loja | null> {
            const loja = await prisma.loja.findUnique({ where: { Name } });
            return loja ? this.mapToInterface(loja) : null;
        }

    async get(id: string): Promise<Loja | null> {
        const Loja = await prisma.loja.findUnique({ where: { id } });
        return Loja ? this.mapToInterface(Loja) : null;
    }

    async update(id: string, data: LojaUpdate): Promise<Loja> {
        const updated = await prisma.Loja.update({
            where: { id },
            data: {
                name: data.name,
            }
        });

        return this.mapToInterface(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.Loja.delete({ where: { id } });
    }

    private mapToInterface(prismaLoja: any): Loja {
        return {
            id: prismaLoja.id,
            name: prismaLoja.name,
            createdAt: prismaLoja.createdAt.toISOString(),
            updatedAt: prismaLoja.updatedAt.toISOString(),
        };
    }
}
