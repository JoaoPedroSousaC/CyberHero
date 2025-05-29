import { FastifyInstance } from "fastify";
import { LojaUseCase } from "../usecases/Loja.usecase";
import { LojaCreate } from "../interfaces/Loja.interface";

export async function LojaRoutes(fastify: FastifyInstance) {
    const LojaUseCase = new LojaUseCase();

    fastify.post<{ Body: LojaCreate }>("/", async (req, reply) => {
        const { name } = req.body;
        try {
            const existingLoja = await LojaUseCase.getByName(name);
            if (existingLoja) {
                return reply.status(400).send({ error: "Loja already exists" });
            }

        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.post<{ Body: { name: string, descricao: string; points: number } }>("/cadastrar", async (req, reply) => {
        try {
            const { name } = req.body;
            const Loja = await LojaUseCase.getByName(name);
            if (!Loja) {
                return reply.status(401).send({ error: "Invalid name" });
            }

        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const Loja = await LojaUseCase.get(req.params.id);
            if (!Loja) {
                return reply.status(404).send({ message: "Loja not found" });
            }
            return reply.send(Loja);
        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.put<{ Params: { id: string }; Body: Partial<LojaCreate> }>("/:id", async (req, reply) => {
        try {
            const updated = await LojaUseCase.update(req.params.id, req.body);
            return reply.send(updated);
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            await LojaUseCase.delete(req.params.id);
            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });
}
