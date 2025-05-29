import { FastifyInstance } from "fastify";
import { MedalhaDisponivelNaLojaUseCase } from "../usecases/MedalhaDisponivelNaLoja.usecase";
import { MedalhaDisponivelNaLojaCreate } from "../interfaces/MedalhaDisponivelNaLoja.interface";

export async function MedalhaDisponivelNaLojaRoutes(fastify: FastifyInstance) {
    const MedalhaDisponivelNaLojaUseCase = new MedalhaDisponivelNaLojaUseCase();

    fastify.post<{ Body: MedalhaDisponivelNaLojaCreate }>("/", async (req, reply) => {
        const { preco } = req.body;
        try {
            const existingMedalhaDisponivelNaLoja = await MedalhaDisponivelNaLojaUseCase.getByPreco(preco);
            if (existingMedalhaDisponivelNaLoja) {
                return reply.status(400).send({ error: "MedalhaDisponivelNaLoja already exists" });
            }

        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.post<{ Body: { preco: string, descricao: string; points: number } }>("/cadastrar", async (req, reply) => {
        try {
            const { preco } = req.body;
            const MedalhaDisponivelNaLoja = await MedalhaDisponivelNaLojaUseCase.getByPreco(preco);
            if (!MedalhaDisponivelNaLoja) {
                return reply.status(401).send({ error: "Invalid preco" });
            }

        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const MedalhaDisponivelNaLoja = await MedalhaDisponivelNaLojaUseCase.get(req.params.id);
            if (!MedalhaDisponivelNaLoja) {
                return reply.status(404).send({ message: "MedalhaDisponivelNaLoja not found" });
            }
            return reply.send(MedalhaDisponivelNaLoja);
        } catch (error) {
            return reply.status(500).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.put<{ Params: { id: string }; Body: Partial<MedalhaDisponivelNaLojaCreate> }>("/:id", async (req, reply) => {
        try {
            const updated = await MedalhaDisponivelNaLojaUseCase.update(req.params.id, req.body);
            return reply.send(updated);
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });

    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            await MedalhaDisponivelNaLojaUseCase.delete(req.params.id);
            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : error });
        }
    });
}
