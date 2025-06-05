import { FastifyInstance } from "fastify";
import { JogoUseCase } from "../usecases/jogo.usecase";
import { JogoCreate } from "../interfaces/Jogo.interface";

export async function JogoRoutes(fastify: FastifyInstance) {
    const JogoUseCase = new JogoUseCase();

    fastify.post<{ Body: JogoCreate }>("/", async (req, reply) => {
        const { name, descricao, points} = req.body;
        try {
            const existingJogo = await JogoUseCase.getByName(name);
            if (existingJogo) {
                return reply.status(400).send({ error: "Jogo already exists" });
            }

        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.post<{ Body: { name: string, descricao: string; points: number } }>("/cadastrar", async (req, reply) => {
        try {
            const { name } = req.body;
            const Jogo = await JogoUseCase.getByName(name);
            if (!Jogo) {
                return reply.status(401).send({ error: "Invalid name" });
            }

        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const Jogo = await JogoUseCase.get(req.params.id);
            if (!Jogo) {
                return reply.status(404).send({ message: "Jogo not found" });
            }
            return reply.send(Jogo);
        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.put<{ Params: { id: string }; Body: Partial<JogoCreate> }>("/:id", async (req, reply) => {
        try {
            const updated = await JogoUseCase.update(req.params.id, req.body);
            return reply.send(updated);
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            await JogoUseCase.delete(req.params.id);
            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });
}
