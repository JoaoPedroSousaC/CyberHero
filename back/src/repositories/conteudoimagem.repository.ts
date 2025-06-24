import { prisma } from "../database/prisma-client";
import { ConteudoImagem, ConteudoImagemCreate, ConteudoImagemUpdate, ConteudoImagemRepository} from "../interfaces/ConteudoImagem.interface";

export class ConteudoImagemRepositoryPrisma implements ConteudoImagemRepository {
    async create(data: ConteudoImagemCreate): Promise<ConteudoImagem> {
        const created = await prisma.ConteudoImagem.create({
            data: {
                url: data.url
            }
        });

        return this.mapToInterface(created);
    }

    async findByUrl(Id: string): Promise<ConteudoImagem | null> {
            const conteudoimagem = await prisma.conteudoimagem.findUnique({ where: { Url } });
            return conteudoimagem ? this.mapToInterface(conteudoimagem) : null;
        }

    async get(id: string): Promise<ConteudoImagem | null> {
        const ConteudoImagem = await prisma.conteudoimagem.findUnique({ where: { id } });
        return ConteudoImagem ? this.mapToInterface(ConteudoImagem) : null;
    }

    async update(id: string, data: ConteudoImagemUpdate): Promise<ConteudoImagem> {
        const updated = await prisma.ConteudoImagem.update({
            where: { id },
            data: {
                url: data.url
            }
        });

        return this.mapToInterface(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.ConteudoImagem.delete({ where: { id } });
    }

    private mapToInterface(prismaConteudoImagem: any): ConteudoImagem {
        return {
            id: prismaConteudoImagem.id,
            url: prismaConteudoImagem.url,
            createdAt: prismaConteudoImagem.createdAt.toISOString(),
            updatedAt: prismaConteudoImagem.updatedAt.toISOString(),
        };
    }
}
