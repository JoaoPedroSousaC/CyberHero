import { prisma } from "../database/prisma-client";
import { MedalhaDisponivelNaLoja, MedalhaDisponivelNaLojaCreate, MedalhaDisponivelNaLojaUpdate, MedalhaDisponivelNaLojaRepository} from "../interfaces/MedalhaDisponivelNaLoja.interface";

export class MedalhaDisponivelNaLojaRepositoryPrisma implements MedalhaDisponivelNaLojaRepository {
    async create(data: MedalhaDisponivelNaLojaCreate): Promise<MedalhaDisponivelNaLoja> {
        const created = await prisma.MedalhaDisponivelNaLoja.create({
            data: {
                preco: data.preco,
            }
        });

        return this.mapToInterface(created);
    }

    async findByName(Name: string): Promise<MedalhaDisponivelNaLoja | null> {
            const medalhadisponivelnaloja = await prisma.medalhadisponivelnaloja.findUnique({ where: { Name } });
            return medalhadisponivelnaloja ? this.mapToInterface(medalhadisponivelnaloja) : null;
        }

    async get(id: string): Promise<MedalhaDisponivelNaLoja | null> {
        const MedalhaDisponivelNaLoja = await prisma.medalhadisponivelnaloja.findUnique({ where: { id } });
        return MedalhaDisponivelNaLoja ? this.mapToInterface(MedalhaDisponivelNaLoja) : null;
    }

    async update(id: string, data: MedalhaDisponivelNaLojaUpdate): Promise<MedalhaDisponivelNaLoja> {
        const updated = await prisma.MedalhaDisponivelNaLoja.update({
            where: { id },
            data: {
                preco: data.preco,
            }
        });

        return this.mapToInterface(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.MedalhaDisponivelNaLoja.delete({ where: { id } });
    }

    private mapToInterface(prismaMedalhaDisponivelNaLoja: any): MedalhaDisponivelNaLoja {
        return {
            id: prismaMedalhaDisponivelNaLoja.id,
            preco: prismaMedalhaDisponivelNaLoja.preco,
            createdAt: prismaMedalhaDisponivelNaLoja.createdAt.toISOString(),
            updatedAt: prismaMedalhaDisponivelNaLoja.updatedAt.toISOString(),
        };
    }
}
