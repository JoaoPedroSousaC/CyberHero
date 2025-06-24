import { prisma } from "../database/prisma-client";
import { Administrador, AdministradorCreate, AdministradorUpdate, AdministradorRepository} from "../interfaces/administrador.interface";

export class AdministradorRepositoryPrisma implements AdministradorRepository {
    async create(data: AdministradorCreate): Promise<Administrador> {
        const created = await prisma.administrador.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        });

        return this.mapToInterface(created);
    }

    async findByEmail(email: string): Promise<Administrador | null> {
        const administrador = await prisma.administrador.findUnique({ where: { email } });
        return administrador ? this.mapToInterface(administrador) : null;
    }

    async get(id: string): Promise<Administrador | null> {
        const administrador = await prisma.administrador.findUnique({ where: { id } });
        return administrador ? this.mapToInterface(administrador) : null;
    }

    async update(id: string, data: AdministradorUpdate): Promise<Administrador> {
        const updated = await prisma.administrador.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        });

        return this.mapToInterface(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.administrador.delete({ where: { id } });
    }

    private mapToInterface(prismaAdministrador: any): Administrador {
        return {
            id: prismaAdministrador.id,
            name: prismaAdministrador.name,
            email: prismaAdministrador.email,
            password: prismaAdministrador.password,
            createdAt: prismaAdministrador.createdAt.toISOString(),
            updatedAt: prismaAdministrador.updatedAt.toISOString(),
        };
    }
}
