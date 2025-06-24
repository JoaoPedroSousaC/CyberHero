import { prisma } from "../database/prisma-client";
import { ConteudoEducativo, ConteudoEducativoCreate, ConteudoEducativoUpdate, ConteudoEducativoRepository} from "../interfaces/ConteudoEducativo.interface";

export class ConteudoEducativoRepositoryPrisma implements ConteudoEducativoRepository {
    async create(data: ConteudoEducativoCreate): Promise<ConteudoEducativo> {
        const created = await prisma.ConteudoEducativo.create({
            data: {
                name: data.name,
                titulo: data.titulo,
                texto: data.texto,
            }
        });

        return this.mapToInterface(created);
    }

    async findByTitulo(Titulo: string): Promise<ConteudoEducativo | null> {
            const conteudoeducativo = await prisma.conteudoeducativo.findUnique({ where: { Titulo } });
            return conteudoeducativo ? this.mapToInterface(conteudoeducativo) : null;
        }

    async get(id: string): Promise<ConteudoEducativo | null> {
        const ConteudoEducativo = await prisma.conteudoeducativo.findUnique({ where: { id } });
        return ConteudoEducativo ? this.mapToInterface(ConteudoEducativo) : null;
    }

    async update(id: string, data: ConteudoEducativoUpdate): Promise<ConteudoEducativo> {
        const updated = await prisma.ConteudoEducativo.update({
            where: { id },
            data: {
                name: data.name,
                titulo: data.titulo,
                texto: data.texto,
            }
        });

        return this.mapToInterface(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.ConteudoEducativo.delete({ where: { id } });
    }

    private mapToInterface(prismaConteudoEducativo: any): ConteudoEducativo {
        return {
            id: prismaConteudoEducativo.id,
            name: prismaConteudoEducativo.name,
            titulo: prismaConteudoEducativo.titulo,
            texto: prismaConteudoEducativo.texto,
            createdAt: prismaConteudoEducativo.createdAt.toISOString(),
            updatedAt: prismaConteudoEducativo.updatedAt.toISOString(),
        };
    }
}
