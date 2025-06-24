import { FastifyInstance } from "fastify";
import { MedalhaUseCase } from "../usecases/medalha.usecase";
import { MedalhaCreate } from "../interfaces/medalha.interface";

export async function MedalhaRoutes(fastify: FastifyInstance) {
    const { MedalhaUseCase } = require('../usecases/medalha.usecase');
    const medalha = new MedalhaUseCase();

    fastify.post<{ Body: MedalhaCreate }>("/", async (req, reply) => {
        const { name, descricao, icon} = req.body;
        try {
            const existingMedalha = await MedalhaUseCase.getByDescricao(descricao);
            if (existingMedalha) {
                return reply.status(400).send({ error: "Medalha already exists" });
            }

        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.post<{ Body: { descricao: string; icon: string } }>("/cadastrar", async (req, reply) => {
        try {
            const { descricao} = req.body;
            const Medalha = await MedalhaUseCase.getByDescricao(descricao);
            if (!Medalha) {
                return reply.status(401).send({ error: "Invalid descricao or icon" });
            }

        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const Medalha = await MedalhaUseCase.get(req.params.id);
            if (!Medalha) {
                return reply.status(404).send({ message: "Medalha not found" });
            }
            return reply.send(Medalha);
        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.put<{ Params: { id: string }; Body: Partial<MedalhaCreate> }>("/:id", async (req, reply) => {
        try {
            const updated = await MedalhaUseCase.update(req.params.id, req.body);
            return reply.send(updated);
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            await MedalhaUseCase.delete(req.params.id);
            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });
}
