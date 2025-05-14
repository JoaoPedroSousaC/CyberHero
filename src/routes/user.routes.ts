import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/users.interface";

export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase();

    // Criar usuário
    fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
        const { name, email, password, points } = req.body;
        try {
            const data = await userUseCase.create({
                name,
                email,
                password,
                points: BigInt(points)
            });
            return reply.send(data);
        } catch (error) {
            return reply.status(400).send(error);
        }
    });

    // Buscar usuário por ID
    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const user = await userUseCase.get(req.params.id);
            if (!user) {
                return reply.status(404).send({ message: "User not found" });
            }
            return reply.send(user);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });

    // Atualizar usuário
    fastify.put<{ Params: { id: string }; Body: Partial<UserCreate> }>("/:id", async (req, reply) => {
        try {
            const updated = await userUseCase.update(req.params.id, {
                ...req.body,
                points: req.body.points !== undefined ? BigInt(req.body.points) : undefined
            });
            return reply.send(updated);
        } catch (error) {
            return reply.status(400).send(error);
        }
    });

    // Deletar usuário
    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            await userUseCase.delete(req.params.id);
            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send(error);
        }
    });
}
